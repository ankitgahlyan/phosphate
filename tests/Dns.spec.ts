import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Dns } from '../wrappers/Dns';
import '@ton/test-utils';

describe('Dns', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let dns: SandboxContract<Dns>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        dns = blockchain.openContract(await Dns.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await dns.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: dns.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and dns are ready to use
    });
});
