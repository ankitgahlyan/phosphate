import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Ids } from '../build/Ids/Ids_Ids';
import '@ton/test-utils';

describe('Ids', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let ids: SandboxContract<Ids>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        ids = blockchain.openContract(await Ids.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await ids.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            null,
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: ids.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and ids are ready to use
    });
});
