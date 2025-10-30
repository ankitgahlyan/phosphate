import { Address, toNano, Cell } from "@ton/ton"
import { JettonMinterSharded, Upgrade } from "../build/root/Root_JettonMinterSharded"

import { printSeparator } from "../src/utils/print"
import "dotenv/config"
import { getJettonHttpLink, getNetworkFromEnv } from "../src/utils/utils"
import { buildJettonMinterFromEnv, buildJettonWalletFromEnv, buildJettonWalletOnlyFromEnv } from "../src/utils/jetton-helpers"
// import { client, deployerWalletContract, network, secretKey } from "./shard.deploy"
import { ROOT_ADDRESS } from "../src/scripts/consts"
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const deployer = process.env.DEPLOYER;
    if (deployer === undefined) {
        console.error("deployer address is not provided, please add it to .env file")
        throw new Error("deployer address is not provided")
    }
    const deployerAddress = Address.parse(deployer);
    const network = getNetworkFromEnv()

    const minterAddress = Address.parse(ROOT_ADDRESS)
    const jettonMinter = provider.open(JettonMinterSharded.fromAddress(minterAddress))
    const jettonMinterNew = await buildJettonMinterFromEnv(deployerAddress)
    const jettonWalletNew = await buildJettonWalletFromEnv(deployerAddress, minterAddress)
    const jettonWalletOnlyNew = await buildJettonWalletOnlyFromEnv(deployerAddress, minterAddress)

    const deployAmount = toNano("2")

    // Ask user which contract(s) to upgrade
    const { createInterface } = await import("readline/promises")
    const rl = createInterface({ input: process.stdin, output: process.stdout })
    let choice: string;
    while (true) {
        choice = (await rl.question("Which contract to upgrade? (minter / wallet / both / m / w / b): ")).trim().toLowerCase()
        if (["minter", "wallet", "both", "m", "w", "b"].includes(choice)) break
        console.log("Invalid choice. Please type 'm', 'w', 'b', 'minter', 'wallet' or 'both'.")
    }
    await rl.close()

    const upgradeMinter = choice === "m" || choice === "b" || choice === "minter" || choice === "both"
    const upgradeWallet = choice === "w" || choice === "b" || choice === "wallet" || choice === "both"

    const minterCode: Cell | null = upgradeMinter ? jettonMinterNew!.init!.code : null
    const walletCode: Cell | null = upgradeWallet && choice === "w" ? jettonWalletOnlyNew!.init!.code : upgradeWallet ? jettonWalletNew!.init!.code : null;

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

    // const seqno: number = await provider.getContractState(deployerAddress).then(state => state?. ?? 0)
    console.log(`Running UPGRADE script for ${network} network and for ${choice}`)
    console.log(
        "🛠️Preparing new outgoing massage from deployment wallet. \n" +
        deployerAddress,
    )
    // console.log("Seqno: ", seqno + "\n")
    printSeparator()

    // Get deployment wallet balance
    // const balance: bigint = await deployerWalletContract.getBalance()

    // console.log("Current deployment wallet balance = ", fromNano(balance).toString(), "💎TON")
    // if (balance < deployAmount) {
    //     console.error("Not enough balance to deploy the contract")
    //     throw new Error("Not enough balance to deploy the contract")
    // }

    printSeparator()
    // ============================
    await jettonMinter.send(
        provider.sender(),
        { value: deployAmount },
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

// void main()
