//  SPDX-License-Identifier: MIT
//  Copyright © 2025 TON Studio

import {Address, beginCell, Cell, toNano} from "@ton/core"
import {Blockchain, BlockchainSnapshot, SandboxContract, TreasuryContract} from "ton-sandbox-dev"
// import {Blockchain, BlockchainSnapshot, SandboxContract, TreasuryContract} from "@ton/sandbox"
import "@ton/test-utils"

import {JettonUpdateContent, prefixLength} from "../../output/Shard_JettonMinterSharded"
import {ExtendedShardedJettonMinter} from "../../wrappers/ExtendedShardedJettonMinter"
import {ExtendedShardedJettonWallet} from "../../wrappers/ExtendedShardedJettonWallet"

// this is test suite for shard jetton minter
describe("Shard Jetton Minter", () => {
    let blockchain: Blockchain
    let jettonMinter: SandboxContract<ExtendedShardedJettonMinter>
    let jettonWallet: SandboxContract<ExtendedShardedJettonWallet>
    let deployer: SandboxContract<TreasuryContract> // me
    let mom: SandboxContract<TreasuryContract>

    let _jwallet_code = new Cell()
    let _minter_code = new Cell()

    let userWallet: (address: Address) => Promise<SandboxContract<ExtendedShardedJettonWallet>>
    let defaultContent: Cell
    let snapshot: BlockchainSnapshot
    beforeAll(async () => {
        jest.setTimeout(30000);
        blockchain = await Blockchain.create({webUI: true, connectionOptions: { host: "localhost", port: 7743 }})
        deployer = await blockchain.treasury("deployer")
        mom = await blockchain.treasury("mom")

        defaultContent = beginCell().endCell()
        const msg: JettonUpdateContent = {
            $$type: "JettonUpdateContent",
            queryId: 0n,
            content: defaultContent,
        }

        jettonMinter = blockchain.openContract(
            await ExtendedShardedJettonMinter.fromInit(0n, deployer.address, defaultContent, true),
        )

        const deployResult = await jettonMinter.send(
            deployer.getSender(),
            {value: toNano("0.1")},
            msg,
        )

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: jettonMinter.address,
            deploy: true,
            success: true,
        })

        const minterCode = jettonMinter.init?.code
        if (minterCode === undefined) {
            throw new Error("JettonMinter init is not defined")
        } else {
            _minter_code = minterCode
        }

        jettonWallet = blockchain.openContract(
            await ExtendedShardedJettonWallet.fromInit(deployer.address, jettonMinter.address, 0n),
        )
        const walletCode = jettonWallet.init?.code
        if (walletCode === undefined) {
            throw new Error("JettonWallet init is not defined")
        } else {
            _jwallet_code = walletCode
        }

        userWallet = async (address: Address) => {
            return blockchain.openContract(
                new ExtendedShardedJettonWallet(await jettonMinter.getGetWalletAddress(address)),
            )
        }

        snapshot = blockchain.snapshot()
    })

    // beforeEach(async () => {
    //     await blockchain.loadFrom(snapshot)
    // })

    it("should deploy in the same shard", async () => {
        const wallet = await userWallet(deployer.address)
        const walletHash = BigInt("0x" + wallet.address.hash.toString("hex"))
        const deployerHash = BigInt("0x" + deployer.address.hash.toString("hex"))
        expect(walletHash >> BigInt(256n - prefixLength)).toBe(
            deployerHash >> BigInt(256n - prefixLength),
        ) // compare only first prefixLength bits
    })

    // implementation detail
        it("should deploy", async () => {
            expect(jettonMinter).toBeDefined()
            expect(jettonWallet).toBeDefined()
        })
        // implementation detail
        it("minter admin should be able to mint jettons", async () => {
            // can mint from deployer
            let initialTotalSupply = await jettonMinter.getTotalSupply()
            const deployerJettonWallet = await userWallet(deployer.address)
            const initialJettonBalance = toNano("1000.23")
            const mintResult = await jettonMinter.sendMint(
                deployer.getSender(),
                deployer.address,
                initialJettonBalance,
                toNano("0.05"),
                toNano("1"),
            )
    
            expect(mintResult.transactions).toHaveTransaction({
                from: jettonMinter.address,
                to: deployerJettonWallet.address,
                deploy: true,
            })
            // Here was the check, that excesses are send to JettonMinter.
            // This is an implementation-defined behavior
            // In my implementation, excesses are sent to the deployer
            expect(mintResult.transactions).toHaveTransaction({
                // excesses
                from: deployerJettonWallet.address,
                to: deployer.address,
            })
    
            expect(await deployerJettonWallet.getJettonBalance()).toEqual(initialJettonBalance)
            expect(await jettonMinter.getTotalSupply()).toEqual(
                initialTotalSupply + initialJettonBalance,
            )
            initialTotalSupply += initialJettonBalance
            // can mint from deployer again
            const additionalJettonBalance = toNano("2.31")
            await jettonMinter.sendMint(
                deployer.getSender(),
                deployer.address,
                additionalJettonBalance,
                toNano("0.05"),
                toNano("1"),
            )
            expect(await deployerJettonWallet.getJettonBalance()).toEqual(
                initialJettonBalance + additionalJettonBalance,
            )
            expect(await jettonMinter.getTotalSupply()).toEqual(
                initialTotalSupply + additionalJettonBalance,
            )
            initialTotalSupply += additionalJettonBalance
            // can mint to other address
            const otherJettonBalance = toNano("3.12")
            await jettonMinter.sendMint(
                deployer.getSender(),
                mom.address,
                otherJettonBalance,
                toNano("0.05"),
                toNano("1"),
            )
            const momJettonWallet = await userWallet(mom.address)
            expect(await momJettonWallet.getJettonBalance()).toEqual(otherJettonBalance)
            expect(await jettonMinter.getTotalSupply()).toEqual(initialTotalSupply + otherJettonBalance)
        }, 30000)
    
        // implementation detail
        it("not a minter admin should not be able to mint jettons", async () => {
            const initialTotalSupply = await jettonMinter.getTotalSupply()
            const deployerJettonWallet = await userWallet(deployer.address)
            const initialJettonBalance = await deployerJettonWallet.getJettonBalance()
            const unAuthMintResult = await jettonMinter.sendMint(
                mom.getSender(),
                deployer.address,
                toNano("777"),
                toNano("0.05"),
                toNano("1"),
            )
    
            expect(unAuthMintResult.transactions).toHaveTransaction({
                from: mom.address,
                to: jettonMinter.address,
                aborted: true,
                exitCode: 700, // Incorrect sender
                // exitCode: JettonMinterSharded.errors["Incorrect sender"],
            })
            expect(await deployerJettonWallet.getJettonBalance()).toEqual(initialJettonBalance)
            expect(await jettonMinter.getTotalSupply()).toEqual(initialTotalSupply)
        })

    it("invite successfull", async () => {
        const deployerJettonWallet = await userWallet(deployer.address)
        const momJettonWallet = await userWallet(mom.address)
        const inviteResult = await jettonWallet.sendTransfer(
            deployer.getSender(), // via
            toNano("0.05"), // value
            toNano("0.01"), // amount
            mom.address, // to
            deployer.address, // responseDestination
            null, // customPayload
            toNano("1"), // forwardTonAmount
            null, // forwardPayload
        )

        // expect(inviteResult.transactions).toHaveTransaction({
        //     from: deployerJettonWallet.address,
        //     to: momJettonWallet.address,
        //     deploy: true,
        // })
    })

    // it("activate invite", async () => {
    //     const deployerJettonWallet = await userWallet(deployer.address)
    //     const momJettonWallet = await userWallet(mom.address)
    // })    
})
