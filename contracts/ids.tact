// Since v1.6.0, Tact has a contract parameters syntax that can supersede
// lazy initialization by init() for all contracts that do not require specific on-chain
// deployment logic that must be run only once in the `init()` function.
//
// Note that the empty parameter list above is still a parameter list,
// meaning that the contract won't have an implicit or explicit `init(){:tact}` function
// and will enjoy storage write optimizations and use less gas overall.
//
// See: https://docs.tact-lang.org/book/contracts/#parameters

import "../src/contracts/shard/messages.tact";
import "../src/contracts/shard/constants";
import "../src/contracts/shard/jetton-wallet";
import "../src/contracts/shard/shard-utils";


contract Ids {
    root: Address;
    lat: Int;
    long: Int;
    users: map<Address, Int>;
    jettonWalletInitialCode: Cell;
    
    init(lat: String, long: String, root: Address, jettonWalletInitialCode: Cell) {
        self.lat = lat.hashData();
        self.long = long.hashData();
        self.root = root;
        self.jettonWalletInitialCode = jettonWalletInitialCode;
        // self.users.set(address, name.hashData());
    }
    
    // Empty receiver for the deployment,
    // which expects the `null` message body
    receive() {
        // Forward the remaining value in the
        // incoming message back to the sender
        cashback(sender());
    }

    receive(msg: AddId) {
        self.correctInternalSender(msg.address);

        self.users.set(msg.address, msg.username.hashData());
    }

    receive(msg: RemoveId) {
        self.correctInternalSender(msg.address);

        let _ = self.users.del(msg.address);
    }

    get fun idsState(): Ids {return self;}

    // get fun idsUserInfo(address: Address):  {}

    inline fun correctInternalSender(address: Address) {
        let sender = parseStdAddress(sender().asSlice());
        let wallet = self.getJettonBasechainWalletByOwner(address);

        // Workchain 0 is basechain
        throwUnless(INCORRECT_SENDER, sender.workchain == Basechain && sender.address == wallet.hash!!);
    }

    inline fun getWalletInit(address: Address): StateInit {
        let walletInit: StateInit = initOf JettonWalletSharded(address, self.root, 0);
        return StateInit { code: self.jettonWalletInitialCode, data: walletInit.data };
    }

    inline fun getJettonWalletInit(address: Address): Cell {
        let init = self.getWalletInit(address);

        return beginCell().storeShardedStateInit(init).endCell();
    }

    inline fun getJettonWalletByOwner(jettonWalletOwner: Address): Address {
        let init = self.getJettonWalletInit(jettonWalletOwner);

        let ownerShard = jettonWalletOwner.getShard();

        let expectedAddr = beginCell()
            .storeUint(4, 3) // addr_std$10, anycast: false
            .storeUint(0, 8) // workchain_id: 0
            .storeUint(changeShard(init.hash(), ownerShard), 256)
            .asSlice();

        return expectedAddr.loadAddress();
    }

    inline fun getJettonBasechainWalletByOwner(jettonWalletOwner: Address): BasechainAddress {
        let init = self.getJettonWalletInit(jettonWalletOwner);

        let ownerShard = jettonWalletOwner.getShard();

        return BasechainAddress { hash: changeShard(init.hash(), ownerShard) };
    }
}
