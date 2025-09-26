import { toNano } from '@ton/core';
import { Dns } from '../wrappers/Dns';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const dns = provider.open(await Dns.fromInit());

    await dns.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(dns.address);

    // run methods on `dns`
}
