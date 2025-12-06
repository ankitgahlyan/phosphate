import * as fs from 'fs';
import * as path from 'path';
import { Address, contractAddress } from "@ton/ton";
import { JettonMinterSharded } from '../build/root/Root_JettonMinterSharded';
import { prepareTactDeployment } from "@tact-lang/deployer";
import { content } from '../src/utils/jetton-helpers';
import "dotenv/config"

export async function run() {
    const deployer = process.env.DEPLOYER;
    if (deployer === undefined) {
        console.error("deployer address is not provided, please add it to .env file")
        throw new Error("deployer address is not provided")
    }
    // const supply = toNano(process.env.JETTON_SUPPLY ?? 1000000000) // 1_000_000_000 jettons
    // const deployAmount = toNano("2");
    const deployerAddress = Address.parse(deployer);
    
    // Parameters
    const testnet = true;
    const packageName = 'Root_JettonMinterSharded.pkg';
    const init = await JettonMinterSharded.init(0n, deployerAddress, content, deployerAddress);
    // Load required data
    const address = contractAddress(0, init);
    const data = init.data.toBoc();
    const pkg = fs.readFileSync(path.resolve(__dirname, '../build/root', packageName));

    // Prepareing
    console.log('Uploading package...');
    const prepare = await prepareTactDeployment({ pkg, data, testnet });

    // Deploying
    console.log("============================================================================================");
    console.log('Contract Address')
    console.log("============================================================================================");
    console.log();
    console.log(address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log('Please, follow deployment link')
    console.log("============================================================================================");
    console.log();
    console.log(prepare);
    console.log();
    console.log("============================================================================================");
}