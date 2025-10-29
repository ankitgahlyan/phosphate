import { toNano } from '@ton/core';
import { Ids } from '../build/Ids/Ids_Ids';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const ids = provider.open(await Ids.fromInit());

    await ids.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        null,
    );

    await provider.waitForDeploy(ids.address);

    // run methods on `ids`
}
