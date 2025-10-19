//  SPDX-License-Identifier: MIT
//  Copyright © 2025 TON Studio

// import { Address, toNano, fromNano } from "@ton/core"
import { Address, TonClient, WalletContractV4, toNano, fromNano, Cell } from "@ton/ton"
import { getHttpEndpoint } from "@orbs-network/ton-access"
import { mnemonicToPrivateKey } from "@ton/crypto"
// import {storeMint} from "../output/Jetton_JettonMinter"
import { JettonMinterSharded, Upgrade } from "../../build/root/Root_JettonMinterSharded"

import { printSeparator } from "../utils/print"
import "dotenv/config"
import { getJettonHttpLink, getNetworkFromEnv } from "../utils/utils"
import { buildJettonMinterFromEnv, buildJettonWalletFromEnv } from "../utils/jetton-helpers"

// import {createInterface} from "readline/promises"
// import { client, deployerWalletContract, network, secretKey } from "./shard.deploy"
import { ROOT_ADDRESS } from "./consts"
// import chalk from "chalk"

const main = async () => {
    const mnemonicsRaw = process.env.MNEMONICS
    if (!mnemonicsRaw) {
        console.error("Mnemonics is not provided, please add it to .env file")
        throw new Error("Mnemonics is not provided")
    }
    // robust split: trim and split on any whitespace
    const mnemonics = mnemonicsRaw.trim().split(/\s+/)
    if (mnemonics.length !== 24) {
        console.error("Invalid mnemonics, it should be 24 words")
        throw new Error("Invalid mnemonics, it should be 24 words")
    }

    const network = getNetworkFromEnv()

    const endpoint = await getHttpEndpoint({ network })
    const client = new TonClient({
        endpoint: endpoint,
    })
    const keyPair = await mnemonicToPrivateKey(mnemonics)
    const secretKey = keyPair.secretKey
    const workchain = 0 // we are working in basechain.
    const deployerWallet = WalletContractV4.create({
        workchain: workchain,
        publicKey: keyPair.publicKey,
    })

    const deployerWalletContract = client.open(deployerWallet)

    // const readContractAddress = async () => {
    //     const readline = createInterface({
    //         input: process.stdin,
    //         output: process.stdout,
    //     })

    //     while (true) {
    //         try {
    //             const walletAddress = await readline.question("Enter minter address: ")
    //             const address = Address.parse(walletAddress)
    //             readline.close()
    //             return address
    //         } catch (_e) {
    //             console.error("Invalid minter address, please try again.")
    //         }
    //     }
    // }

    const minterAddress = Address.parse(ROOT_ADDRESS)
    // const minterAddress = await readContractAddress()
    const jettonMinter = client.open(JettonMinterSharded.fromAddress(minterAddress))
    const jettonMinterNew = await buildJettonMinterFromEnv(deployerWalletContract.address)
    const jettonWalletNew = await buildJettonWalletFromEnv(deployerWalletContract.address, minterAddress)

    // const wallet = client.open(JettonWalletSharded.fromAddress(walletAddress))
    const deployAmount = toNano("2")

    // Ask user which contract(s) to upgrade
    const { createInterface } = await import("readline/promises")
    const rl = createInterface({ input: process.stdin, output: process.stdout })

    // FIXME for now upgrade both as wallet init is coming from Root config builds or import from Wallet config build
    const choice: string = 'b';
    while (true) {
        // choice = (await rl.question("Which contract to upgrade? (minter / wallet / both / m / w / b): ")).trim().toLowerCase()
        if (["minter", "wallet", "both", "m", "w", "b"].includes(choice)) break
        console.log("Invalid choice. Please type 'm', 'w', 'b', 'minter', 'wallet' or 'both'.")
    }
    await rl.close()

    const upgradeMinter = choice === "m" || choice === "b" || choice === "minter" || choice === "both"
    const upgradeWallet = choice === "w" || choice === "b" || choice === "wallet" || choice === "both"

    const minterCode: Cell | null = upgradeMinter ? jettonMinterNew!.init!.code : null
    const walletCode: Cell | null = upgradeWallet ? jettonWalletNew!.init!.code : null

    console.log("Upgrade selection:", upgradeMinter ? "minter" : "", upgradeWallet ? "wallet" : "")

    // Validate built artifacts when selected for upgrade
    // if (upgradeMinter && (!jettonMinterNew || !jettonMinterNew.init)) {
    //     throw new Error("Failed to build new minter artifact from env — cannot upgrade minter")
    // }
    // if (upgradeWallet && (!jettonWalletNew || !jettonWalletNew.init)) {
    //     throw new Error("Failed to build new wallet artifact from env — cannot upgrade wallet")
    // }

    const msg: Upgrade = {
        $$type: "Upgrade",
        rootVersion: null,
        walletVersion: null,
        sender: null,
        newRootData: null,
        newRootCode: minterCode,
        newWalletData: null,
        newWalletCode: walletCode,
    }

    const seqno: number = await deployerWalletContract.getSeqno()
    console.log(`Running UPGRADE script for ${network} network and for Minter`)
    console.log(
        "🛠️Preparing new outgoing massage from deployment wallet. \n" +
        deployerWalletContract.address,
    )
    console.log("Seqno: ", seqno + "\n")
    printSeparator()

    // Get deployment wallet balance
    const balance: bigint = await deployerWalletContract.getBalance()

    console.log("Current deployment wallet balance = ", fromNano(balance).toString(), "💎TON")
    if (balance < deployAmount) {
        console.error("Not enough balance to deploy the contract")
        throw new Error("Not enough balance to deploy the contract")
    }

    printSeparator()
    // ============================
    await jettonMinter.send(
        deployerWalletContract.sender(secretKey),
        { value: deployAmount, bounce: true },
        msg,
    )
    // await deployerWalletContract.sendTransfer({
    //     seqno,
    //     secretKey,
    //     messages: [
    //         internal({
    //             to: jettonMinter!!.address,
    //             value: deployAmount,
    //             init: {
    //                 code: jettonMinter!!.init?.code,// change this to old
    //                 data: jettonMinter!!.init?.data,
    //             },
    //             body: msg,
    //         }),
    //     ],
    // })
    console.log("====== UPGRADE message sent to =======\n", jettonMinter!.address)
    const link = getJettonHttpLink(network, jettonMinter!.address, "tonviewer")
    console.log(`You can soon check your upgraded contract at ${link}`)
}

void main()
