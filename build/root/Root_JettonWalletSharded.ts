import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    ComputeError,
    TupleItem,
    TupleReader,
    Dictionary,
    contractAddress,
    address,
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

export function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    }
}

export type SignedBundle = {
    $$type: 'SignedBundle';
    signature: Buffer;
    signedData: Slice;
}

export function storeSignedBundle(src: SignedBundle) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBuffer(src.signature);
        b_0.storeBuilder(src.signedData.asBuilder());
    };
}

export function loadSignedBundle(slice: Slice) {
    const sc_0 = slice;
    const _signature = sc_0.loadBuffer(64);
    const _signedData = sc_0;
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadGetterTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function storeTupleSignedBundle(source: SignedBundle) {
    const builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.signedData.asCell());
    return builder.build();
}

export function dictValueParserSignedBundle(): DictionaryValue<SignedBundle> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSignedBundle(src)).endCell());
        },
        parse: (src) => {
            return loadSignedBundle(src.loadRef().beginParse());
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

export function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

export function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

export function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

export function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

export function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

export function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletSharded$Data = {
    $$type: 'JettonWalletSharded$Data';
    owner: Address;
    ownerAfterRecovery: Address;
    minter: Address;
    treasuryAccount: Address;
    nominee: Address;
    invitor: Address;
    invitor0: Address | null;
    id: Slice;
    balance: bigint;
    taxAsTxnFeePercent: bigint;
    turnover: bigint;
    debts: Dictionary<Address, bigint>;
    debt: bigint;
    insurance: Insurance;
    invited: Dictionary<Address, bigint>;
    friends: Dictionary<Address, bigint>;
    closeFriendsAndVouched: Dictionary<Address, boolean>;
    closeFriendsCount: bigint;
    recoveryVouchersCount: bigint;
    pendingRequests: Dictionary<Address, bigint>;
    followers: Dictionary<Address, bigint>;
    followings: Dictionary<Address, bigint>;
    reports: Dictionary<Address, boolean>;
    reportReason: boolean;
    reporterCount: bigint;
    disputerCount: bigint;
    reportResolutionTime: bigint;
    connections: bigint;
    terminated: boolean;
    active: boolean;
    accountInitTime: bigint;
    lastTxnTime: bigint;
    lastMsgTo: Address;
    version: bigint;
    mintable: boolean;
    lastRewardClaimTime: bigint;
    baseWalletCode: Cell;
}

export function storeJettonWalletSharded$Data(src: JettonWalletSharded$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.ownerAfterRecovery);
        b_0.storeAddress(src.minter);
        const b_1 = new Builder();
        b_1.storeAddress(src.treasuryAccount);
        b_1.storeAddress(src.nominee);
        b_1.storeAddress(src.invitor);
        const b_2 = new Builder();
        b_2.storeAddress(src.invitor0);
        b_2.storeRef(src.id.asCell());
        b_2.storeCoins(src.balance);
        b_2.storeInt(src.taxAsTxnFeePercent, 6);
        b_2.storeCoins(src.turnover);
        b_2.storeDict(src.debts, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        b_2.storeCoins(src.debt);
        b_2.store(storeInsurance(src.insurance));
        b_2.storeDict(src.invited, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        const b_3 = new Builder();
        b_3.storeDict(src.friends, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        b_3.storeDict(src.closeFriendsAndVouched, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_3.storeUint(src.closeFriendsCount, 4);
        b_3.storeUint(src.recoveryVouchersCount, 4);
        b_3.storeDict(src.pendingRequests, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        const b_4 = new Builder();
        b_4.storeDict(src.followers, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        b_4.storeDict(src.followings, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        b_4.storeDict(src.reports, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_4.storeBit(src.reportReason);
        b_4.storeUint(src.reporterCount, 10);
        b_4.storeUint(src.disputerCount, 10);
        b_4.storeUint(src.reportResolutionTime, 32);
        b_4.storeUint(src.connections, 8);
        b_4.storeBit(src.terminated);
        b_4.storeBit(src.active);
        b_4.storeUint(src.accountInitTime, 32);
        b_4.storeUint(src.lastTxnTime, 32);
        b_4.storeAddress(src.lastMsgTo);
        b_4.storeUint(src.version, 10);
        b_4.storeBit(src.mintable);
        b_4.storeUint(src.lastRewardClaimTime, 32);
        b_4.storeRef(src.baseWalletCode);
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadJettonWalletSharded$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _ownerAfterRecovery = sc_0.loadAddress();
    const _minter = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _treasuryAccount = sc_1.loadAddress();
    const _nominee = sc_1.loadAddress();
    const _invitor = sc_1.loadAddress();
    const sc_2 = sc_1.loadRef().beginParse();
    const _invitor0 = sc_2.loadMaybeAddress();
    const _id = sc_2.loadRef().asSlice();
    const _balance = sc_2.loadCoins();
    const _taxAsTxnFeePercent = sc_2.loadIntBig(6);
    const _turnover = sc_2.loadCoins();
    const _debts = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_2);
    const _debt = sc_2.loadCoins();
    const _insurance = loadInsurance(sc_2);
    const _invited = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_2);
    const sc_3 = sc_2.loadRef().beginParse();
    const _friends = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_3);
    const _closeFriendsAndVouched = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_3);
    const _closeFriendsCount = sc_3.loadUintBig(4);
    const _recoveryVouchersCount = sc_3.loadUintBig(4);
    const _pendingRequests = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_3);
    const sc_4 = sc_3.loadRef().beginParse();
    const _followers = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_4);
    const _followings = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_4);
    const _reports = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_4);
    const _reportReason = sc_4.loadBit();
    const _reporterCount = sc_4.loadUintBig(10);
    const _disputerCount = sc_4.loadUintBig(10);
    const _reportResolutionTime = sc_4.loadUintBig(32);
    const _connections = sc_4.loadUintBig(8);
    const _terminated = sc_4.loadBit();
    const _active = sc_4.loadBit();
    const _accountInitTime = sc_4.loadUintBig(32);
    const _lastTxnTime = sc_4.loadUintBig(32);
    const _lastMsgTo = sc_4.loadAddress();
    const _version = sc_4.loadUintBig(10);
    const _mintable = sc_4.loadBit();
    const _lastRewardClaimTime = sc_4.loadUintBig(32);
    const _baseWalletCode = sc_4.loadRef();
    return { $$type: 'JettonWalletSharded$Data' as const, owner: _owner, ownerAfterRecovery: _ownerAfterRecovery, minter: _minter, treasuryAccount: _treasuryAccount, nominee: _nominee, invitor: _invitor, invitor0: _invitor0, id: _id, balance: _balance, taxAsTxnFeePercent: _taxAsTxnFeePercent, turnover: _turnover, debts: _debts, debt: _debt, insurance: _insurance, invited: _invited, friends: _friends, closeFriendsAndVouched: _closeFriendsAndVouched, closeFriendsCount: _closeFriendsCount, recoveryVouchersCount: _recoveryVouchersCount, pendingRequests: _pendingRequests, followers: _followers, followings: _followings, reports: _reports, reportReason: _reportReason, reporterCount: _reporterCount, disputerCount: _disputerCount, reportResolutionTime: _reportResolutionTime, connections: _connections, terminated: _terminated, active: _active, accountInitTime: _accountInitTime, lastTxnTime: _lastTxnTime, lastMsgTo: _lastMsgTo, version: _version, mintable: _mintable, lastRewardClaimTime: _lastRewardClaimTime, baseWalletCode: _baseWalletCode };
}

export function loadTupleJettonWalletSharded$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _ownerAfterRecovery = source.readAddress();
    const _minter = source.readAddress();
    const _treasuryAccount = source.readAddress();
    const _nominee = source.readAddress();
    const _invitor = source.readAddress();
    const _invitor0 = source.readAddressOpt();
    const _id = source.readCell().asSlice();
    const _balance = source.readBigNumber();
    const _taxAsTxnFeePercent = source.readBigNumber();
    const _turnover = source.readBigNumber();
    const _debts = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _debt = source.readBigNumber();
    const _insurance = loadTupleInsurance(source);
    source = source.readTuple();
    const _invited = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _friends = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _closeFriendsAndVouched = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    const _closeFriendsCount = source.readBigNumber();
    const _recoveryVouchersCount = source.readBigNumber();
    const _pendingRequests = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _followers = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _followings = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _reports = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    const _reportReason = source.readBoolean();
    const _reporterCount = source.readBigNumber();
    const _disputerCount = source.readBigNumber();
    const _reportResolutionTime = source.readBigNumber();
    const _connections = source.readBigNumber();
    source = source.readTuple();
    const _terminated = source.readBoolean();
    const _active = source.readBoolean();
    const _accountInitTime = source.readBigNumber();
    const _lastTxnTime = source.readBigNumber();
    const _lastMsgTo = source.readAddress();
    const _version = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _lastRewardClaimTime = source.readBigNumber();
    const _baseWalletCode = source.readCell();
    return { $$type: 'JettonWalletSharded$Data' as const, owner: _owner, ownerAfterRecovery: _ownerAfterRecovery, minter: _minter, treasuryAccount: _treasuryAccount, nominee: _nominee, invitor: _invitor, invitor0: _invitor0, id: _id, balance: _balance, taxAsTxnFeePercent: _taxAsTxnFeePercent, turnover: _turnover, debts: _debts, debt: _debt, insurance: _insurance, invited: _invited, friends: _friends, closeFriendsAndVouched: _closeFriendsAndVouched, closeFriendsCount: _closeFriendsCount, recoveryVouchersCount: _recoveryVouchersCount, pendingRequests: _pendingRequests, followers: _followers, followings: _followings, reports: _reports, reportReason: _reportReason, reporterCount: _reporterCount, disputerCount: _disputerCount, reportResolutionTime: _reportResolutionTime, connections: _connections, terminated: _terminated, active: _active, accountInitTime: _accountInitTime, lastTxnTime: _lastTxnTime, lastMsgTo: _lastMsgTo, version: _version, mintable: _mintable, lastRewardClaimTime: _lastRewardClaimTime, baseWalletCode: _baseWalletCode };
}

export function loadGetterTupleJettonWalletSharded$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _ownerAfterRecovery = source.readAddress();
    const _minter = source.readAddress();
    const _treasuryAccount = source.readAddress();
    const _nominee = source.readAddress();
    const _invitor = source.readAddress();
    const _invitor0 = source.readAddressOpt();
    const _id = source.readCell().asSlice();
    const _balance = source.readBigNumber();
    const _taxAsTxnFeePercent = source.readBigNumber();
    const _turnover = source.readBigNumber();
    const _debts = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _debt = source.readBigNumber();
    const _insurance = loadGetterTupleInsurance(source);
    const _invited = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _friends = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _closeFriendsAndVouched = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    const _closeFriendsCount = source.readBigNumber();
    const _recoveryVouchersCount = source.readBigNumber();
    const _pendingRequests = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _followers = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _followings = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _reports = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    const _reportReason = source.readBoolean();
    const _reporterCount = source.readBigNumber();
    const _disputerCount = source.readBigNumber();
    const _reportResolutionTime = source.readBigNumber();
    const _connections = source.readBigNumber();
    const _terminated = source.readBoolean();
    const _active = source.readBoolean();
    const _accountInitTime = source.readBigNumber();
    const _lastTxnTime = source.readBigNumber();
    const _lastMsgTo = source.readAddress();
    const _version = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _lastRewardClaimTime = source.readBigNumber();
    const _baseWalletCode = source.readCell();
    return { $$type: 'JettonWalletSharded$Data' as const, owner: _owner, ownerAfterRecovery: _ownerAfterRecovery, minter: _minter, treasuryAccount: _treasuryAccount, nominee: _nominee, invitor: _invitor, invitor0: _invitor0, id: _id, balance: _balance, taxAsTxnFeePercent: _taxAsTxnFeePercent, turnover: _turnover, debts: _debts, debt: _debt, insurance: _insurance, invited: _invited, friends: _friends, closeFriendsAndVouched: _closeFriendsAndVouched, closeFriendsCount: _closeFriendsCount, recoveryVouchersCount: _recoveryVouchersCount, pendingRequests: _pendingRequests, followers: _followers, followings: _followings, reports: _reports, reportReason: _reportReason, reporterCount: _reporterCount, disputerCount: _disputerCount, reportResolutionTime: _reportResolutionTime, connections: _connections, terminated: _terminated, active: _active, accountInitTime: _accountInitTime, lastTxnTime: _lastTxnTime, lastMsgTo: _lastMsgTo, version: _version, mintable: _mintable, lastRewardClaimTime: _lastRewardClaimTime, baseWalletCode: _baseWalletCode };
}

export function storeTupleJettonWalletSharded$Data(source: JettonWalletSharded$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.ownerAfterRecovery);
    builder.writeAddress(source.minter);
    builder.writeAddress(source.treasuryAccount);
    builder.writeAddress(source.nominee);
    builder.writeAddress(source.invitor);
    builder.writeAddress(source.invitor0);
    builder.writeSlice(source.id.asCell());
    builder.writeNumber(source.balance);
    builder.writeNumber(source.taxAsTxnFeePercent);
    builder.writeNumber(source.turnover);
    builder.writeCell(source.debts.size > 0 ? beginCell().storeDictDirect(source.debts, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeNumber(source.debt);
    builder.writeTuple(storeTupleInsurance(source.insurance));
    builder.writeCell(source.invited.size > 0 ? beginCell().storeDictDirect(source.invited, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.friends.size > 0 ? beginCell().storeDictDirect(source.friends, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.closeFriendsAndVouched.size > 0 ? beginCell().storeDictDirect(source.closeFriendsAndVouched, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeNumber(source.closeFriendsCount);
    builder.writeNumber(source.recoveryVouchersCount);
    builder.writeCell(source.pendingRequests.size > 0 ? beginCell().storeDictDirect(source.pendingRequests, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.followers.size > 0 ? beginCell().storeDictDirect(source.followers, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.followings.size > 0 ? beginCell().storeDictDirect(source.followings, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.reports.size > 0 ? beginCell().storeDictDirect(source.reports, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeBoolean(source.reportReason);
    builder.writeNumber(source.reporterCount);
    builder.writeNumber(source.disputerCount);
    builder.writeNumber(source.reportResolutionTime);
    builder.writeNumber(source.connections);
    builder.writeBoolean(source.terminated);
    builder.writeBoolean(source.active);
    builder.writeNumber(source.accountInitTime);
    builder.writeNumber(source.lastTxnTime);
    builder.writeAddress(source.lastMsgTo);
    builder.writeNumber(source.version);
    builder.writeBoolean(source.mintable);
    builder.writeNumber(source.lastRewardClaimTime);
    builder.writeCell(source.baseWalletCode);
    return builder.build();
}

export function dictValueParserJettonWalletSharded$Data(): DictionaryValue<JettonWalletSharded$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonWalletSharded$Data(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletSharded$Data(src.loadRef().beginParse());
        }
    }
}

export type ParsedString = {
    $$type: 'ParsedString';
    username: string;
    lattitude: string;
    longitude: string;
}

export function storeParsedString(src: ParsedString) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.username);
        b_0.storeStringRefTail(src.lattitude);
        b_0.storeStringRefTail(src.longitude);
    };
}

export function loadParsedString(slice: Slice) {
    const sc_0 = slice;
    const _username = sc_0.loadStringRefTail();
    const _lattitude = sc_0.loadStringRefTail();
    const _longitude = sc_0.loadStringRefTail();
    return { $$type: 'ParsedString' as const, username: _username, lattitude: _lattitude, longitude: _longitude };
}

export function loadTupleParsedString(source: TupleReader) {
    const _username = source.readString();
    const _lattitude = source.readString();
    const _longitude = source.readString();
    return { $$type: 'ParsedString' as const, username: _username, lattitude: _lattitude, longitude: _longitude };
}

export function loadGetterTupleParsedString(source: TupleReader) {
    const _username = source.readString();
    const _lattitude = source.readString();
    const _longitude = source.readString();
    return { $$type: 'ParsedString' as const, username: _username, lattitude: _lattitude, longitude: _longitude };
}

export function storeTupleParsedString(source: ParsedString) {
    const builder = new TupleBuilder();
    builder.writeString(source.username);
    builder.writeString(source.lattitude);
    builder.writeString(source.longitude);
    return builder.build();
}

export function dictValueParserParsedString(): DictionaryValue<ParsedString> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeParsedString(src)).endCell());
        },
        parse: (src) => {
            return loadParsedString(src.loadRef().beginParse());
        }
    }
}

export type IdInfo = {
    $$type: 'IdInfo';
    username: string;
    lattitude: string;
    longitude: string;
    address: Address;
}

export function storeIdInfo(src: IdInfo) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.username);
        b_0.storeStringRefTail(src.lattitude);
        b_0.storeStringRefTail(src.longitude);
        b_0.storeAddress(src.address);
    };
}

export function loadIdInfo(slice: Slice) {
    const sc_0 = slice;
    const _username = sc_0.loadStringRefTail();
    const _lattitude = sc_0.loadStringRefTail();
    const _longitude = sc_0.loadStringRefTail();
    const _address = sc_0.loadAddress();
    return { $$type: 'IdInfo' as const, username: _username, lattitude: _lattitude, longitude: _longitude, address: _address };
}

export function loadTupleIdInfo(source: TupleReader) {
    const _username = source.readString();
    const _lattitude = source.readString();
    const _longitude = source.readString();
    const _address = source.readAddress();
    return { $$type: 'IdInfo' as const, username: _username, lattitude: _lattitude, longitude: _longitude, address: _address };
}

export function loadGetterTupleIdInfo(source: TupleReader) {
    const _username = source.readString();
    const _lattitude = source.readString();
    const _longitude = source.readString();
    const _address = source.readAddress();
    return { $$type: 'IdInfo' as const, username: _username, lattitude: _lattitude, longitude: _longitude, address: _address };
}

export function storeTupleIdInfo(source: IdInfo) {
    const builder = new TupleBuilder();
    builder.writeString(source.username);
    builder.writeString(source.lattitude);
    builder.writeString(source.longitude);
    builder.writeAddress(source.address);
    return builder.build();
}

export function dictValueParserIdInfo(): DictionaryValue<IdInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeIdInfo(src)).endCell());
        },
        parse: (src) => {
            return loadIdInfo(src.loadRef().beginParse());
        }
    }
}

export type AddId = {
    $$type: 'AddId';
    username: string;
    lattitude: string;
    longitude: string;
    address: Address;
}

export function storeAddId(src: AddId) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(73, 32);
        b_0.storeStringRefTail(src.username);
        b_0.storeStringRefTail(src.lattitude);
        b_0.storeStringRefTail(src.longitude);
        b_0.storeAddress(src.address);
    };
}

export function loadAddId(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 73) { throw Error('Invalid prefix'); }
    const _username = sc_0.loadStringRefTail();
    const _lattitude = sc_0.loadStringRefTail();
    const _longitude = sc_0.loadStringRefTail();
    const _address = sc_0.loadAddress();
    return { $$type: 'AddId' as const, username: _username, lattitude: _lattitude, longitude: _longitude, address: _address };
}

export function loadTupleAddId(source: TupleReader) {
    const _username = source.readString();
    const _lattitude = source.readString();
    const _longitude = source.readString();
    const _address = source.readAddress();
    return { $$type: 'AddId' as const, username: _username, lattitude: _lattitude, longitude: _longitude, address: _address };
}

export function loadGetterTupleAddId(source: TupleReader) {
    const _username = source.readString();
    const _lattitude = source.readString();
    const _longitude = source.readString();
    const _address = source.readAddress();
    return { $$type: 'AddId' as const, username: _username, lattitude: _lattitude, longitude: _longitude, address: _address };
}

export function storeTupleAddId(source: AddId) {
    const builder = new TupleBuilder();
    builder.writeString(source.username);
    builder.writeString(source.lattitude);
    builder.writeString(source.longitude);
    builder.writeAddress(source.address);
    return builder.build();
}

export function dictValueParserAddId(): DictionaryValue<AddId> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddId(src)).endCell());
        },
        parse: (src) => {
            return loadAddId(src.loadRef().beginParse());
        }
    }
}

export type RemoveId = {
    $$type: 'RemoveId';
    address: Address;
}

export function storeRemoveId(src: RemoveId) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(80, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadRemoveId(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 80) { throw Error('Invalid prefix'); }
    const _address = sc_0.loadAddress();
    return { $$type: 'RemoveId' as const, address: _address };
}

export function loadTupleRemoveId(source: TupleReader) {
    const _address = source.readAddress();
    return { $$type: 'RemoveId' as const, address: _address };
}

export function loadGetterTupleRemoveId(source: TupleReader) {
    const _address = source.readAddress();
    return { $$type: 'RemoveId' as const, address: _address };
}

export function storeTupleRemoveId(source: RemoveId) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

export function dictValueParserRemoveId(): DictionaryValue<RemoveId> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRemoveId(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveId(src.loadRef().beginParse());
        }
    }
}

export type Insurance = {
    $$type: 'Insurance';
    emi: bigint;
    startStop: bigint;
}

export function storeInsurance(src: Insurance) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeCoins(src.emi);
        b_0.storeUint(src.startStop, 42);
    };
}

export function loadInsurance(slice: Slice) {
    const sc_0 = slice;
    const _emi = sc_0.loadCoins();
    const _startStop = sc_0.loadUintBig(42);
    return { $$type: 'Insurance' as const, emi: _emi, startStop: _startStop };
}

export function loadTupleInsurance(source: TupleReader) {
    const _emi = source.readBigNumber();
    const _startStop = source.readBigNumber();
    return { $$type: 'Insurance' as const, emi: _emi, startStop: _startStop };
}

export function loadGetterTupleInsurance(source: TupleReader) {
    const _emi = source.readBigNumber();
    const _startStop = source.readBigNumber();
    return { $$type: 'Insurance' as const, emi: _emi, startStop: _startStop };
}

export function storeTupleInsurance(source: Insurance) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.emi);
    builder.writeNumber(source.startStop);
    return builder.build();
}

export function dictValueParserInsurance(): DictionaryValue<Insurance> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInsurance(src)).endCell());
        },
        parse: (src) => {
            return loadInsurance(src.loadRef().beginParse());
        }
    }
}

export type FriendsAndFollowings = {
    $$type: 'FriendsAndFollowings';
    friends: Cell | null;
    followings: Cell | null;
    followers: Cell | null;
    invited: Cell | null;
    pendingRequests: Cell | null;
    debts: Cell | null;
    reports: Cell | null;
}

export function storeFriendsAndFollowings(src: FriendsAndFollowings) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.friends !== null && src.friends !== undefined) { b_0.storeBit(true).storeRef(src.friends); } else { b_0.storeBit(false); }
        if (src.followings !== null && src.followings !== undefined) { b_0.storeBit(true).storeRef(src.followings); } else { b_0.storeBit(false); }
        const b_1 = new Builder();
        if (src.followers !== null && src.followers !== undefined) { b_1.storeBit(true).storeRef(src.followers); } else { b_1.storeBit(false); }
        if (src.invited !== null && src.invited !== undefined) { b_1.storeBit(true).storeRef(src.invited); } else { b_1.storeBit(false); }
        if (src.pendingRequests !== null && src.pendingRequests !== undefined) { b_1.storeBit(true).storeRef(src.pendingRequests); } else { b_1.storeBit(false); }
        const b_2 = new Builder();
        if (src.debts !== null && src.debts !== undefined) { b_2.storeBit(true).storeRef(src.debts); } else { b_2.storeBit(false); }
        if (src.reports !== null && src.reports !== undefined) { b_2.storeBit(true).storeRef(src.reports); } else { b_2.storeBit(false); }
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadFriendsAndFollowings(slice: Slice) {
    const sc_0 = slice;
    const _friends = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _followings = sc_0.loadBit() ? sc_0.loadRef() : null;
    const sc_1 = sc_0.loadRef().beginParse();
    const _followers = sc_1.loadBit() ? sc_1.loadRef() : null;
    const _invited = sc_1.loadBit() ? sc_1.loadRef() : null;
    const _pendingRequests = sc_1.loadBit() ? sc_1.loadRef() : null;
    const sc_2 = sc_1.loadRef().beginParse();
    const _debts = sc_2.loadBit() ? sc_2.loadRef() : null;
    const _reports = sc_2.loadBit() ? sc_2.loadRef() : null;
    return { $$type: 'FriendsAndFollowings' as const, friends: _friends, followings: _followings, followers: _followers, invited: _invited, pendingRequests: _pendingRequests, debts: _debts, reports: _reports };
}

export function loadTupleFriendsAndFollowings(source: TupleReader) {
    const _friends = source.readCellOpt();
    const _followings = source.readCellOpt();
    const _followers = source.readCellOpt();
    const _invited = source.readCellOpt();
    const _pendingRequests = source.readCellOpt();
    const _debts = source.readCellOpt();
    const _reports = source.readCellOpt();
    return { $$type: 'FriendsAndFollowings' as const, friends: _friends, followings: _followings, followers: _followers, invited: _invited, pendingRequests: _pendingRequests, debts: _debts, reports: _reports };
}

export function loadGetterTupleFriendsAndFollowings(source: TupleReader) {
    const _friends = source.readCellOpt();
    const _followings = source.readCellOpt();
    const _followers = source.readCellOpt();
    const _invited = source.readCellOpt();
    const _pendingRequests = source.readCellOpt();
    const _debts = source.readCellOpt();
    const _reports = source.readCellOpt();
    return { $$type: 'FriendsAndFollowings' as const, friends: _friends, followings: _followings, followers: _followers, invited: _invited, pendingRequests: _pendingRequests, debts: _debts, reports: _reports };
}

export function storeTupleFriendsAndFollowings(source: FriendsAndFollowings) {
    const builder = new TupleBuilder();
    builder.writeCell(source.friends);
    builder.writeCell(source.followings);
    builder.writeCell(source.followers);
    builder.writeCell(source.invited);
    builder.writeCell(source.pendingRequests);
    builder.writeCell(source.debts);
    builder.writeCell(source.reports);
    return builder.build();
}

export function dictValueParserFriendsAndFollowings(): DictionaryValue<FriendsAndFollowings> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFriendsAndFollowings(src)).endCell());
        },
        parse: (src) => {
            return loadFriendsAndFollowings(src.loadRef().beginParse());
        }
    }
}

export type OtherStateConsts = {
    $$type: 'OtherStateConsts';
    reportReason: boolean;
    reporterCount: bigint;
    disputerCount: bigint;
    reportResolutionTime: bigint;
    connections: bigint;
    terminated: boolean;
    mbrpAmount: bigint;
    closureWait: bigint;
    active: boolean;
    lastMsgTo: Address;
    insurance: Cell;
}

export function storeOtherStateConsts(src: OtherStateConsts) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.reportReason);
        b_0.storeUint(src.reporterCount, 10);
        b_0.storeUint(src.disputerCount, 10);
        b_0.storeUint(src.reportResolutionTime, 32);
        b_0.storeUint(src.connections, 8);
        b_0.storeBit(src.terminated);
        b_0.storeCoins(src.mbrpAmount);
        b_0.storeUint(src.closureWait, 32);
        b_0.storeBit(src.active);
        b_0.storeAddress(src.lastMsgTo);
        b_0.storeRef(src.insurance);
    };
}

export function loadOtherStateConsts(slice: Slice) {
    const sc_0 = slice;
    const _reportReason = sc_0.loadBit();
    const _reporterCount = sc_0.loadUintBig(10);
    const _disputerCount = sc_0.loadUintBig(10);
    const _reportResolutionTime = sc_0.loadUintBig(32);
    const _connections = sc_0.loadUintBig(8);
    const _terminated = sc_0.loadBit();
    const _mbrpAmount = sc_0.loadCoins();
    const _closureWait = sc_0.loadUintBig(32);
    const _active = sc_0.loadBit();
    const _lastMsgTo = sc_0.loadAddress();
    const _insurance = sc_0.loadRef();
    return { $$type: 'OtherStateConsts' as const, reportReason: _reportReason, reporterCount: _reporterCount, disputerCount: _disputerCount, reportResolutionTime: _reportResolutionTime, connections: _connections, terminated: _terminated, mbrpAmount: _mbrpAmount, closureWait: _closureWait, active: _active, lastMsgTo: _lastMsgTo, insurance: _insurance };
}

export function loadTupleOtherStateConsts(source: TupleReader) {
    const _reportReason = source.readBoolean();
    const _reporterCount = source.readBigNumber();
    const _disputerCount = source.readBigNumber();
    const _reportResolutionTime = source.readBigNumber();
    const _connections = source.readBigNumber();
    const _terminated = source.readBoolean();
    const _mbrpAmount = source.readBigNumber();
    const _closureWait = source.readBigNumber();
    const _active = source.readBoolean();
    const _lastMsgTo = source.readAddress();
    const _insurance = source.readCell();
    return { $$type: 'OtherStateConsts' as const, reportReason: _reportReason, reporterCount: _reporterCount, disputerCount: _disputerCount, reportResolutionTime: _reportResolutionTime, connections: _connections, terminated: _terminated, mbrpAmount: _mbrpAmount, closureWait: _closureWait, active: _active, lastMsgTo: _lastMsgTo, insurance: _insurance };
}

export function loadGetterTupleOtherStateConsts(source: TupleReader) {
    const _reportReason = source.readBoolean();
    const _reporterCount = source.readBigNumber();
    const _disputerCount = source.readBigNumber();
    const _reportResolutionTime = source.readBigNumber();
    const _connections = source.readBigNumber();
    const _terminated = source.readBoolean();
    const _mbrpAmount = source.readBigNumber();
    const _closureWait = source.readBigNumber();
    const _active = source.readBoolean();
    const _lastMsgTo = source.readAddress();
    const _insurance = source.readCell();
    return { $$type: 'OtherStateConsts' as const, reportReason: _reportReason, reporterCount: _reporterCount, disputerCount: _disputerCount, reportResolutionTime: _reportResolutionTime, connections: _connections, terminated: _terminated, mbrpAmount: _mbrpAmount, closureWait: _closureWait, active: _active, lastMsgTo: _lastMsgTo, insurance: _insurance };
}

export function storeTupleOtherStateConsts(source: OtherStateConsts) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.reportReason);
    builder.writeNumber(source.reporterCount);
    builder.writeNumber(source.disputerCount);
    builder.writeNumber(source.reportResolutionTime);
    builder.writeNumber(source.connections);
    builder.writeBoolean(source.terminated);
    builder.writeNumber(source.mbrpAmount);
    builder.writeNumber(source.closureWait);
    builder.writeBoolean(source.active);
    builder.writeAddress(source.lastMsgTo);
    builder.writeCell(source.insurance);
    return builder.build();
}

export function dictValueParserOtherStateConsts(): DictionaryValue<OtherStateConsts> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOtherStateConsts(src)).endCell());
        },
        parse: (src) => {
            return loadOtherStateConsts(src.loadRef().beginParse());
        }
    }
}

export type InvitorNominee = {
    $$type: 'InvitorNominee';
    invitor: Address;
    nominee: Address;
}

export function storeInvitorNominee(src: InvitorNominee) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.invitor);
        b_0.storeAddress(src.nominee);
    };
}

export function loadInvitorNominee(slice: Slice) {
    const sc_0 = slice;
    const _invitor = sc_0.loadAddress();
    const _nominee = sc_0.loadAddress();
    return { $$type: 'InvitorNominee' as const, invitor: _invitor, nominee: _nominee };
}

export function loadTupleInvitorNominee(source: TupleReader) {
    const _invitor = source.readAddress();
    const _nominee = source.readAddress();
    return { $$type: 'InvitorNominee' as const, invitor: _invitor, nominee: _nominee };
}

export function loadGetterTupleInvitorNominee(source: TupleReader) {
    const _invitor = source.readAddress();
    const _nominee = source.readAddress();
    return { $$type: 'InvitorNominee' as const, invitor: _invitor, nominee: _nominee };
}

export function storeTupleInvitorNominee(source: InvitorNominee) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.invitor);
    builder.writeAddress(source.nominee);
    return builder.build();
}

export function dictValueParserInvitorNominee(): DictionaryValue<InvitorNominee> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInvitorNominee(src)).endCell());
        },
        parse: (src) => {
            return loadInvitorNominee(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    totalSupply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    jettonWalletCode: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeCoins(src.totalSupply);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.jettonWalletCode);
    };
}

export function loadJettonData(slice: Slice) {
    const sc_0 = slice;
    const _totalSupply = sc_0.loadCoins();
    const _mintable = sc_0.loadBit();
    const _owner = sc_0.loadAddress();
    const _content = sc_0.loadRef();
    const _jettonWalletCode = sc_0.loadRef();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, jettonWalletCode: _jettonWalletCode };
}

export function loadTupleJettonData(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _jettonWalletCode = source.readCell();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, jettonWalletCode: _jettonWalletCode };
}

export function loadGetterTupleJettonData(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _jettonWalletCode = source.readCell();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, jettonWalletCode: _jettonWalletCode };
}

export function storeTupleJettonData(source: JettonData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.jettonWalletCode);
    return builder.build();
}

export function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    minter: Address;
    code: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeCoins(src.balance);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.minter);
        b_0.storeRef(src.code);
    };
}

export function loadJettonWalletData(slice: Slice) {
    const sc_0 = slice;
    const _balance = sc_0.loadCoins();
    const _owner = sc_0.loadAddress();
    const _minter = sc_0.loadAddress();
    const _code = sc_0.loadRef();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, minter: _minter, code: _code };
}

export function loadTupleJettonWalletData(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _minter = source.readAddress();
    const _code = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, minter: _minter, code: _code };
}

export function loadGetterTupleJettonWalletData(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _minter = source.readAddress();
    const _code = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, minter: _minter, code: _code };
}

export function storeTupleJettonWalletData(source: JettonWalletData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.minter);
    builder.writeCell(source.code);
    return builder.build();
}

export function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    }
}

export type MaybeAddress = {
    $$type: 'MaybeAddress';
    address: Address | null;
}

export function storeMaybeAddress(src: MaybeAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.address);
    };
}

export function loadMaybeAddress(slice: Slice) {
    const sc_0 = slice;
    const _address = sc_0.loadMaybeAddress();
    return { $$type: 'MaybeAddress' as const, address: _address };
}

export function loadTupleMaybeAddress(source: TupleReader) {
    const _address = source.readAddressOpt();
    return { $$type: 'MaybeAddress' as const, address: _address };
}

export function loadGetterTupleMaybeAddress(source: TupleReader) {
    const _address = source.readAddressOpt();
    return { $$type: 'MaybeAddress' as const, address: _address };
}

export function storeTupleMaybeAddress(source: MaybeAddress) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

export function dictValueParserMaybeAddress(): DictionaryValue<MaybeAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMaybeAddress(src)).endCell());
        },
        parse: (src) => {
            return loadMaybeAddress(src.loadRef().beginParse());
        }
    }
}

export type JettonNotification = {
    $$type: 'JettonNotification';
    queryId: bigint;
    amount: bigint;
    sender: Address;
    forwardPayload: Slice;
}

export function storeJettonNotification(src: JettonNotification) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadJettonNotification(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'JettonNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadTupleJettonNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadGetterTupleJettonNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function storeTupleJettonNotification(source: JettonNotification) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserJettonNotification(): DictionaryValue<JettonNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonNotification(src.loadRef().beginParse());
        }
    }
}

export type JettonBurn = {
    $$type: 'JettonBurn';
    queryId: bigint;
    amount: bigint;
    responseDestination: Address | null;
    customPayload: Cell | null;
}

export function storeJettonBurn(src: JettonBurn) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
    };
}

export function loadJettonBurn(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _responseDestination = sc_0.loadMaybeAddress();
    const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'JettonBurn' as const, queryId: _queryId, amount: _amount, responseDestination: _responseDestination, customPayload: _customPayload };
}

export function loadTupleJettonBurn(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _responseDestination = source.readAddressOpt();
    const _customPayload = source.readCellOpt();
    return { $$type: 'JettonBurn' as const, queryId: _queryId, amount: _amount, responseDestination: _responseDestination, customPayload: _customPayload };
}

export function loadGetterTupleJettonBurn(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _responseDestination = source.readAddressOpt();
    const _customPayload = source.readCellOpt();
    return { $$type: 'JettonBurn' as const, queryId: _queryId, amount: _amount, responseDestination: _responseDestination, customPayload: _customPayload };
}

export function storeTupleJettonBurn(source: JettonBurn) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    return builder.build();
}

export function dictValueParserJettonBurn(): DictionaryValue<JettonBurn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonBurn(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurn(src.loadRef().beginParse());
        }
    }
}

export type JettonBurnNotification = {
    $$type: 'JettonBurnNotification';
    queryId: bigint;
    amount: bigint;
    sender: Address;
    responseDestination: Address | null;
}

export function storeJettonBurnNotification(src: JettonBurnNotification) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.responseDestination);
    };
}

export function loadJettonBurnNotification(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _responseDestination = sc_0.loadMaybeAddress();
    return { $$type: 'JettonBurnNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination };
}

export function loadTupleJettonBurnNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    return { $$type: 'JettonBurnNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination };
}

export function loadGetterTupleJettonBurnNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    return { $$type: 'JettonBurnNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination };
}

export function storeTupleJettonBurnNotification(source: JettonBurnNotification) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.responseDestination);
    return builder.build();
}

export function dictValueParserJettonBurnNotification(): DictionaryValue<JettonBurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    queryId: bigint;
    ownerAddress: Address;
    includeAddress: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.ownerAddress);
        b_0.storeBit(src.includeAddress);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _ownerAddress = sc_0.loadAddress();
    const _includeAddress = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, queryId: _queryId, ownerAddress: _ownerAddress, includeAddress: _includeAddress };
}

export function loadTupleProvideWalletAddress(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _ownerAddress = source.readAddress();
    const _includeAddress = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, queryId: _queryId, ownerAddress: _ownerAddress, includeAddress: _includeAddress };
}

export function loadGetterTupleProvideWalletAddress(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _ownerAddress = source.readAddress();
    const _includeAddress = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, queryId: _queryId, ownerAddress: _ownerAddress, includeAddress: _includeAddress };
}

export function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.ownerAddress);
    builder.writeBoolean(source.includeAddress);
    return builder.build();
}

export function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    queryId: bigint;
    walletAddress: Address;
    ownerAddress: Cell | null;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.walletAddress);
        if (src.ownerAddress !== null && src.ownerAddress !== undefined) { b_0.storeBit(true).storeRef(src.ownerAddress); } else { b_0.storeBit(false); }
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _walletAddress = sc_0.loadAddress();
    const _ownerAddress = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TakeWalletAddress' as const, queryId: _queryId, walletAddress: _walletAddress, ownerAddress: _ownerAddress };
}

export function loadTupleTakeWalletAddress(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _walletAddress = source.readAddress();
    const _ownerAddress = source.readCellOpt();
    return { $$type: 'TakeWalletAddress' as const, queryId: _queryId, walletAddress: _walletAddress, ownerAddress: _ownerAddress };
}

export function loadGetterTupleTakeWalletAddress(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _walletAddress = source.readAddress();
    const _ownerAddress = source.readCellOpt();
    return { $$type: 'TakeWalletAddress' as const, queryId: _queryId, walletAddress: _walletAddress, ownerAddress: _ownerAddress };
}

export function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.walletAddress);
    builder.writeCell(source.ownerAddress);
    return builder.build();
}

export function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletBalance = {
    $$type: 'ProvideWalletBalance';
    receiver: Address;
    includeVerifyInfo: boolean;
}

export function storeProvideWalletBalance(src: ProvideWalletBalance) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2059982169, 32);
        b_0.storeAddress(src.receiver);
        b_0.storeBit(src.includeVerifyInfo);
    };
}

export function loadProvideWalletBalance(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2059982169) { throw Error('Invalid prefix'); }
    const _receiver = sc_0.loadAddress();
    const _includeVerifyInfo = sc_0.loadBit();
    return { $$type: 'ProvideWalletBalance' as const, receiver: _receiver, includeVerifyInfo: _includeVerifyInfo };
}

export function loadTupleProvideWalletBalance(source: TupleReader) {
    const _receiver = source.readAddress();
    const _includeVerifyInfo = source.readBoolean();
    return { $$type: 'ProvideWalletBalance' as const, receiver: _receiver, includeVerifyInfo: _includeVerifyInfo };
}

export function loadGetterTupleProvideWalletBalance(source: TupleReader) {
    const _receiver = source.readAddress();
    const _includeVerifyInfo = source.readBoolean();
    return { $$type: 'ProvideWalletBalance' as const, receiver: _receiver, includeVerifyInfo: _includeVerifyInfo };
}

export function storeTupleProvideWalletBalance(source: ProvideWalletBalance) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.receiver);
    builder.writeBoolean(source.includeVerifyInfo);
    return builder.build();
}

export function dictValueParserProvideWalletBalance(): DictionaryValue<ProvideWalletBalance> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideWalletBalance(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletBalance(src.loadRef().beginParse());
        }
    }
}

export type VerifyInfo = {
    $$type: 'VerifyInfo';
    owner: Address;
    minter: Address;
    code: Cell;
}

export function storeVerifyInfo(src: VerifyInfo) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.minter);
        b_0.storeRef(src.code);
    };
}

export function loadVerifyInfo(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _minter = sc_0.loadAddress();
    const _code = sc_0.loadRef();
    return { $$type: 'VerifyInfo' as const, owner: _owner, minter: _minter, code: _code };
}

export function loadTupleVerifyInfo(source: TupleReader) {
    const _owner = source.readAddress();
    const _minter = source.readAddress();
    const _code = source.readCell();
    return { $$type: 'VerifyInfo' as const, owner: _owner, minter: _minter, code: _code };
}

export function loadGetterTupleVerifyInfo(source: TupleReader) {
    const _owner = source.readAddress();
    const _minter = source.readAddress();
    const _code = source.readCell();
    return { $$type: 'VerifyInfo' as const, owner: _owner, minter: _minter, code: _code };
}

export function storeTupleVerifyInfo(source: VerifyInfo) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.minter);
    builder.writeCell(source.code);
    return builder.build();
}

export function dictValueParserVerifyInfo(): DictionaryValue<VerifyInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVerifyInfo(src)).endCell());
        },
        parse: (src) => {
            return loadVerifyInfo(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletBalance = {
    $$type: 'TakeWalletBalance';
    balance: bigint;
    verifyInfo: VerifyInfo | null;
}

export function storeTakeWalletBalance(src: TakeWalletBalance) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3396861378, 32);
        b_0.storeCoins(src.balance);
        if (src.verifyInfo !== null && src.verifyInfo !== undefined) { b_0.storeBit(true); b_0.store(storeVerifyInfo(src.verifyInfo)); } else { b_0.storeBit(false); }
    };
}

export function loadTakeWalletBalance(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3396861378) { throw Error('Invalid prefix'); }
    const _balance = sc_0.loadCoins();
    const _verifyInfo = sc_0.loadBit() ? loadVerifyInfo(sc_0) : null;
    return { $$type: 'TakeWalletBalance' as const, balance: _balance, verifyInfo: _verifyInfo };
}

export function loadTupleTakeWalletBalance(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _verifyInfo_p = source.readTupleOpt();
    const _verifyInfo = _verifyInfo_p ? loadTupleVerifyInfo(_verifyInfo_p) : null;
    return { $$type: 'TakeWalletBalance' as const, balance: _balance, verifyInfo: _verifyInfo };
}

export function loadGetterTupleTakeWalletBalance(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _verifyInfo_p = source.readTupleOpt();
    const _verifyInfo = _verifyInfo_p ? loadTupleVerifyInfo(_verifyInfo_p) : null;
    return { $$type: 'TakeWalletBalance' as const, balance: _balance, verifyInfo: _verifyInfo };
}

export function storeTupleTakeWalletBalance(source: TakeWalletBalance) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    if (source.verifyInfo !== null && source.verifyInfo !== undefined) {
        builder.writeTuple(storeTupleVerifyInfo(source.verifyInfo));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

export function dictValueParserTakeWalletBalance(): DictionaryValue<TakeWalletBalance> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeWalletBalance(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletBalance(src.loadRef().beginParse());
        }
    }
}

export type Mint = {
    $$type: 'Mint';
    queryId: bigint;
    receiver: Address;
    mintMessage: JettonTransferInternal;
}

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1680571655, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.receiver);
        const b_1 = new Builder();
        b_1.store(storeJettonTransferInternal(src.mintMessage));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMint(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1680571655) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _receiver = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _mintMessage = loadJettonTransferInternal(sc_1);
    return { $$type: 'Mint' as const, queryId: _queryId, receiver: _receiver, mintMessage: _mintMessage };
}

export function loadTupleMint(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _receiver = source.readAddress();
    const _mintMessage = loadTupleJettonTransferInternal(source);
    return { $$type: 'Mint' as const, queryId: _queryId, receiver: _receiver, mintMessage: _mintMessage };
}

export function loadGetterTupleMint(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _receiver = source.readAddress();
    const _mintMessage = loadGetterTupleJettonTransferInternal(source);
    return { $$type: 'Mint' as const, queryId: _queryId, receiver: _receiver, mintMessage: _mintMessage };
}

export function storeTupleMint(source: Mint) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.receiver);
    builder.writeTuple(storeTupleJettonTransferInternal(source.mintMessage));
    return builder.build();
}

export function dictValueParserMint(): DictionaryValue<Mint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        }
    }
}

export type JettonTransfer = {
    $$type: 'JettonTransfer';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    responseDestination: Address | null;
    customPayload: Cell | null;
    forwardTonAmount: bigint;
    forwardPayload: Slice;
}

export function storeJettonTransfer(src: JettonTransfer) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardTonAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadJettonTransfer(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _destination = sc_0.loadAddress();
    const _responseDestination = sc_0.loadMaybeAddress();
    const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _forwardTonAmount = sc_0.loadCoins();
    const _forwardPayload = sc_0;
    return { $$type: 'JettonTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

export function loadTupleJettonTransfer(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _customPayload = source.readCellOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

export function loadGetterTupleJettonTransfer(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _customPayload = source.readCellOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

export function storeTupleJettonTransfer(source: JettonTransfer) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransfer(src.loadRef().beginParse());
        }
    }
}

export type JettonTransferInternal = {
    $$type: 'JettonTransferInternal';
    queryId: bigint;
    walletVersion: bigint;
    amount: bigint;
    sender: Address;
    responseDestination: Address | null;
    forwardTonAmount: bigint;
    forwardPayload: Slice;
}

export function storeJettonTransferInternal(src: JettonTransferInternal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.walletVersion, 10);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.responseDestination);
        b_0.storeCoins(src.forwardTonAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadJettonTransferInternal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _walletVersion = sc_0.loadUintBig(10);
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _responseDestination = sc_0.loadMaybeAddress();
    const _forwardTonAmount = sc_0.loadCoins();
    const _forwardPayload = sc_0;
    return { $$type: 'JettonTransferInternal' as const, queryId: _queryId, walletVersion: _walletVersion, amount: _amount, sender: _sender, responseDestination: _responseDestination, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

export function loadTupleJettonTransferInternal(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _walletVersion = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransferInternal' as const, queryId: _queryId, walletVersion: _walletVersion, amount: _amount, sender: _sender, responseDestination: _responseDestination, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

export function loadGetterTupleJettonTransferInternal(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _walletVersion = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransferInternal' as const, queryId: _queryId, walletVersion: _walletVersion, amount: _amount, sender: _sender, responseDestination: _responseDestination, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

export function storeTupleJettonTransferInternal(source: JettonTransferInternal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.walletVersion);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.responseDestination);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserJettonTransferInternal(): DictionaryValue<JettonTransferInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransferInternal(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransferInternal(src.loadRef().beginParse());
        }
    }
}

export type JettonExcesses = {
    $$type: 'JettonExcesses';
    queryId: bigint;
}

export function storeJettonExcesses(src: JettonExcesses) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadJettonExcesses(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'JettonExcesses' as const, queryId: _queryId };
}

export function loadTupleJettonExcesses(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'JettonExcesses' as const, queryId: _queryId };
}

export function loadGetterTupleJettonExcesses(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'JettonExcesses' as const, queryId: _queryId };
}

export function storeTupleJettonExcesses(source: JettonExcesses) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserJettonExcesses(): DictionaryValue<JettonExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadJettonExcesses(src.loadRef().beginParse());
        }
    }
}

export type ClaimTON = {
    $$type: 'ClaimTON';
    receiver: Address;
}

export function storeClaimTON(src: ClaimTON) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(60010958, 32);
        b_0.storeAddress(src.receiver);
    };
}

export function loadClaimTON(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 60010958) { throw Error('Invalid prefix'); }
    const _receiver = sc_0.loadAddress();
    return { $$type: 'ClaimTON' as const, receiver: _receiver };
}

export function loadTupleClaimTON(source: TupleReader) {
    const _receiver = source.readAddress();
    return { $$type: 'ClaimTON' as const, receiver: _receiver };
}

export function loadGetterTupleClaimTON(source: TupleReader) {
    const _receiver = source.readAddress();
    return { $$type: 'ClaimTON' as const, receiver: _receiver };
}

export function storeTupleClaimTON(source: ClaimTON) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.receiver);
    return builder.build();
}

export function dictValueParserClaimTON(): DictionaryValue<ClaimTON> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimTON(src)).endCell());
        },
        parse: (src) => {
            return loadClaimTON(src.loadRef().beginParse());
        }
    }
}

export type RequestUpgradeCode = {
    $$type: 'RequestUpgradeCode';
    version: bigint;
}

export function storeRequestUpgradeCode(src: RequestUpgradeCode) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(56, 32);
        b_0.storeUint(src.version, 10);
    };
}

export function loadRequestUpgradeCode(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 56) { throw Error('Invalid prefix'); }
    const _version = sc_0.loadUintBig(10);
    return { $$type: 'RequestUpgradeCode' as const, version: _version };
}

export function loadTupleRequestUpgradeCode(source: TupleReader) {
    const _version = source.readBigNumber();
    return { $$type: 'RequestUpgradeCode' as const, version: _version };
}

export function loadGetterTupleRequestUpgradeCode(source: TupleReader) {
    const _version = source.readBigNumber();
    return { $$type: 'RequestUpgradeCode' as const, version: _version };
}

export function storeTupleRequestUpgradeCode(source: RequestUpgradeCode) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.version);
    return builder.build();
}

export function dictValueParserRequestUpgradeCode(): DictionaryValue<RequestUpgradeCode> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRequestUpgradeCode(src)).endCell());
        },
        parse: (src) => {
            return loadRequestUpgradeCode(src.loadRef().beginParse());
        }
    }
}

export type UpgradeReqFromMainnet = {
    $$type: 'UpgradeReqFromMainnet';
    sender: Address;
}

export function storeUpgradeReqFromMainnet(src: UpgradeReqFromMainnet) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(71, 32);
        b_0.storeAddress(src.sender);
    };
}

export function loadUpgradeReqFromMainnet(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 71) { throw Error('Invalid prefix'); }
    const _sender = sc_0.loadAddress();
    return { $$type: 'UpgradeReqFromMainnet' as const, sender: _sender };
}

export function loadTupleUpgradeReqFromMainnet(source: TupleReader) {
    const _sender = source.readAddress();
    return { $$type: 'UpgradeReqFromMainnet' as const, sender: _sender };
}

export function loadGetterTupleUpgradeReqFromMainnet(source: TupleReader) {
    const _sender = source.readAddress();
    return { $$type: 'UpgradeReqFromMainnet' as const, sender: _sender };
}

export function storeTupleUpgradeReqFromMainnet(source: UpgradeReqFromMainnet) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.sender);
    return builder.build();
}

export function dictValueParserUpgradeReqFromMainnet(): DictionaryValue<UpgradeReqFromMainnet> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpgradeReqFromMainnet(src)).endCell());
        },
        parse: (src) => {
            return loadUpgradeReqFromMainnet(src.loadRef().beginParse());
        }
    }
}

export type Upgrade = {
    $$type: 'Upgrade';
    rootVersion: bigint | null;
    walletVersion: bigint | null;
    sender: Address | null;
    newRootData: Cell | null;
    newRootCode: Cell | null;
    newWalletData: Cell | null;
    newWalletCode: Cell | null;
}

export function storeUpgrade(src: Upgrade) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(621336170, 32);
        if (src.rootVersion !== null && src.rootVersion !== undefined) { b_0.storeBit(true).storeUint(src.rootVersion, 10); } else { b_0.storeBit(false); }
        if (src.walletVersion !== null && src.walletVersion !== undefined) { b_0.storeBit(true).storeUint(src.walletVersion, 10); } else { b_0.storeBit(false); }
        b_0.storeAddress(src.sender);
        if (src.newRootData !== null && src.newRootData !== undefined) { b_0.storeBit(true).storeRef(src.newRootData); } else { b_0.storeBit(false); }
        if (src.newRootCode !== null && src.newRootCode !== undefined) { b_0.storeBit(true).storeRef(src.newRootCode); } else { b_0.storeBit(false); }
        const b_1 = new Builder();
        if (src.newWalletData !== null && src.newWalletData !== undefined) { b_1.storeBit(true).storeRef(src.newWalletData); } else { b_1.storeBit(false); }
        if (src.newWalletCode !== null && src.newWalletCode !== undefined) { b_1.storeBit(true).storeRef(src.newWalletCode); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpgrade(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 621336170) { throw Error('Invalid prefix'); }
    const _rootVersion = sc_0.loadBit() ? sc_0.loadUintBig(10) : null;
    const _walletVersion = sc_0.loadBit() ? sc_0.loadUintBig(10) : null;
    const _sender = sc_0.loadMaybeAddress();
    const _newRootData = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _newRootCode = sc_0.loadBit() ? sc_0.loadRef() : null;
    const sc_1 = sc_0.loadRef().beginParse();
    const _newWalletData = sc_1.loadBit() ? sc_1.loadRef() : null;
    const _newWalletCode = sc_1.loadBit() ? sc_1.loadRef() : null;
    return { $$type: 'Upgrade' as const, rootVersion: _rootVersion, walletVersion: _walletVersion, sender: _sender, newRootData: _newRootData, newRootCode: _newRootCode, newWalletData: _newWalletData, newWalletCode: _newWalletCode };
}

export function loadTupleUpgrade(source: TupleReader) {
    const _rootVersion = source.readBigNumberOpt();
    const _walletVersion = source.readBigNumberOpt();
    const _sender = source.readAddressOpt();
    const _newRootData = source.readCellOpt();
    const _newRootCode = source.readCellOpt();
    const _newWalletData = source.readCellOpt();
    const _newWalletCode = source.readCellOpt();
    return { $$type: 'Upgrade' as const, rootVersion: _rootVersion, walletVersion: _walletVersion, sender: _sender, newRootData: _newRootData, newRootCode: _newRootCode, newWalletData: _newWalletData, newWalletCode: _newWalletCode };
}

export function loadGetterTupleUpgrade(source: TupleReader) {
    const _rootVersion = source.readBigNumberOpt();
    const _walletVersion = source.readBigNumberOpt();
    const _sender = source.readAddressOpt();
    const _newRootData = source.readCellOpt();
    const _newRootCode = source.readCellOpt();
    const _newWalletData = source.readCellOpt();
    const _newWalletCode = source.readCellOpt();
    return { $$type: 'Upgrade' as const, rootVersion: _rootVersion, walletVersion: _walletVersion, sender: _sender, newRootData: _newRootData, newRootCode: _newRootCode, newWalletData: _newWalletData, newWalletCode: _newWalletCode };
}

export function storeTupleUpgrade(source: Upgrade) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.rootVersion);
    builder.writeNumber(source.walletVersion);
    builder.writeAddress(source.sender);
    builder.writeCell(source.newRootData);
    builder.writeCell(source.newRootCode);
    builder.writeCell(source.newWalletData);
    builder.writeCell(source.newWalletCode);
    return builder.build();
}

export function dictValueParserUpgrade(): DictionaryValue<Upgrade> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpgrade(src)).endCell());
        },
        parse: (src) => {
            return loadUpgrade(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

export function loadTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

export function loadGetterTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

export function storeTupleChangeOwner(source: ChangeOwner) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

export function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type Invite = {
    $$type: 'Invite';
    target: Address;
    id: IdInfo;
}

export function storeInvite(src: Invite) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(72, 32);
        b_0.storeAddress(src.target);
        b_0.store(storeIdInfo(src.id));
    };
}

export function loadInvite(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 72) { throw Error('Invalid prefix'); }
    const _target = sc_0.loadAddress();
    const _id = loadIdInfo(sc_0);
    return { $$type: 'Invite' as const, target: _target, id: _id };
}

export function loadTupleInvite(source: TupleReader) {
    const _target = source.readAddress();
    const _id = loadTupleIdInfo(source);
    return { $$type: 'Invite' as const, target: _target, id: _id };
}

export function loadGetterTupleInvite(source: TupleReader) {
    const _target = source.readAddress();
    const _id = loadGetterTupleIdInfo(source);
    return { $$type: 'Invite' as const, target: _target, id: _id };
}

export function storeTupleInvite(source: Invite) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.target);
    builder.writeTuple(storeTupleIdInfo(source.id));
    return builder.build();
}

export function dictValueParserInvite(): DictionaryValue<Invite> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInvite(src)).endCell());
        },
        parse: (src) => {
            return loadInvite(src.loadRef().beginParse());
        }
    }
}

export type InviteInternal = {
    $$type: 'InviteInternal';
    version: bigint;
    id: IdInfo | null;
    sender: Address;
    invitor: Address;
    currentWalletCode: Cell;
    forwardPayload: Slice;
}

export function storeInviteInternal(src: InviteInternal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1, 32);
        b_0.storeUint(src.version, 10);
        const b_1 = new Builder();
        if (src.id !== null && src.id !== undefined) { b_1.storeBit(true); b_1.store(storeIdInfo(src.id)); } else { b_1.storeBit(false); }
        b_1.storeAddress(src.sender);
        b_1.storeAddress(src.invitor);
        b_1.storeRef(src.currentWalletCode);
        b_1.storeBuilder(src.forwardPayload.asBuilder());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadInviteInternal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1) { throw Error('Invalid prefix'); }
    const _version = sc_0.loadUintBig(10);
    const sc_1 = sc_0.loadRef().beginParse();
    const _id = sc_1.loadBit() ? loadIdInfo(sc_1) : null;
    const _sender = sc_1.loadAddress();
    const _invitor = sc_1.loadAddress();
    const _currentWalletCode = sc_1.loadRef();
    const _forwardPayload = sc_1;
    return { $$type: 'InviteInternal' as const, version: _version, id: _id, sender: _sender, invitor: _invitor, currentWalletCode: _currentWalletCode, forwardPayload: _forwardPayload };
}

export function loadTupleInviteInternal(source: TupleReader) {
    const _version = source.readBigNumber();
    const _id_p = source.readTupleOpt();
    const _id = _id_p ? loadTupleIdInfo(_id_p) : null;
    const _sender = source.readAddress();
    const _invitor = source.readAddress();
    const _currentWalletCode = source.readCell();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'InviteInternal' as const, version: _version, id: _id, sender: _sender, invitor: _invitor, currentWalletCode: _currentWalletCode, forwardPayload: _forwardPayload };
}

export function loadGetterTupleInviteInternal(source: TupleReader) {
    const _version = source.readBigNumber();
    const _id_p = source.readTupleOpt();
    const _id = _id_p ? loadTupleIdInfo(_id_p) : null;
    const _sender = source.readAddress();
    const _invitor = source.readAddress();
    const _currentWalletCode = source.readCell();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'InviteInternal' as const, version: _version, id: _id, sender: _sender, invitor: _invitor, currentWalletCode: _currentWalletCode, forwardPayload: _forwardPayload };
}

export function storeTupleInviteInternal(source: InviteInternal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.version);
    if (source.id !== null && source.id !== undefined) {
        builder.writeTuple(storeTupleIdInfo(source.id));
    } else {
        builder.writeTuple(null);
    }
    builder.writeAddress(source.sender);
    builder.writeAddress(source.invitor);
    builder.writeCell(source.currentWalletCode);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserInviteInternal(): DictionaryValue<InviteInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInviteInternal(src)).endCell());
        },
        parse: (src) => {
            return loadInviteInternal(src.loadRef().beginParse());
        }
    }
}

export type Follow = {
    $$type: 'Follow';
    target: Address;
    amount: bigint;
}

export function storeFollow(src: Follow) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2, 32);
        b_0.storeAddress(src.target);
        b_0.storeCoins(src.amount);
    };
}

export function loadFollow(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2) { throw Error('Invalid prefix'); }
    const _target = sc_0.loadAddress();
    const _amount = sc_0.loadCoins();
    return { $$type: 'Follow' as const, target: _target, amount: _amount };
}

export function loadTupleFollow(source: TupleReader) {
    const _target = source.readAddress();
    const _amount = source.readBigNumber();
    return { $$type: 'Follow' as const, target: _target, amount: _amount };
}

export function loadGetterTupleFollow(source: TupleReader) {
    const _target = source.readAddress();
    const _amount = source.readBigNumber();
    return { $$type: 'Follow' as const, target: _target, amount: _amount };
}

export function storeTupleFollow(source: Follow) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.target);
    builder.writeNumber(source.amount);
    return builder.build();
}

export function dictValueParserFollow(): DictionaryValue<Follow> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFollow(src)).endCell());
        },
        parse: (src) => {
            return loadFollow(src.loadRef().beginParse());
        }
    }
}

export type FollowInternal = {
    $$type: 'FollowInternal';
    amount: bigint;
    sender: Address;
    forwardPayload: Slice;
}

export function storeFollowInternal(src: FollowInternal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(23, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadFollowInternal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 23) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'FollowInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadTupleFollowInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'FollowInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadGetterTupleFollowInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'FollowInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function storeTupleFollowInternal(source: FollowInternal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserFollowInternal(): DictionaryValue<FollowInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFollowInternal(src)).endCell());
        },
        parse: (src) => {
            return loadFollowInternal(src.loadRef().beginParse());
        }
    }
}

export type Unfollow = {
    $$type: 'Unfollow';
    target: Address;
    amount: bigint;
}

export function storeUnfollow(src: Unfollow) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(21, 32);
        b_0.storeAddress(src.target);
        b_0.storeUint(src.amount, 16);
    };
}

export function loadUnfollow(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 21) { throw Error('Invalid prefix'); }
    const _target = sc_0.loadAddress();
    const _amount = sc_0.loadUintBig(16);
    return { $$type: 'Unfollow' as const, target: _target, amount: _amount };
}

export function loadTupleUnfollow(source: TupleReader) {
    const _target = source.readAddress();
    const _amount = source.readBigNumber();
    return { $$type: 'Unfollow' as const, target: _target, amount: _amount };
}

export function loadGetterTupleUnfollow(source: TupleReader) {
    const _target = source.readAddress();
    const _amount = source.readBigNumber();
    return { $$type: 'Unfollow' as const, target: _target, amount: _amount };
}

export function storeTupleUnfollow(source: Unfollow) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.target);
    builder.writeNumber(source.amount);
    return builder.build();
}

export function dictValueParserUnfollow(): DictionaryValue<Unfollow> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUnfollow(src)).endCell());
        },
        parse: (src) => {
            return loadUnfollow(src.loadRef().beginParse());
        }
    }
}

export type UnfollowInternal = {
    $$type: 'UnfollowInternal';
    amount: bigint;
    sender: Address;
    forwardPayload: Slice;
}

export function storeUnfollowInternal(src: UnfollowInternal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(5, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadUnfollowInternal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 5) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'UnfollowInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadTupleUnfollowInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'UnfollowInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadGetterTupleUnfollowInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'UnfollowInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function storeTupleUnfollowInternal(source: UnfollowInternal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserUnfollowInternal(): DictionaryValue<UnfollowInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUnfollowInternal(src)).endCell());
        },
        parse: (src) => {
            return loadUnfollowInternal(src.loadRef().beginParse());
        }
    }
}

export type FriendRequestInternal = {
    $$type: 'FriendRequestInternal';
    amount: bigint;
    sender: Address;
    forwardPayload: Slice;
}

export function storeFriendRequestInternal(src: FriendRequestInternal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(6, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadFriendRequestInternal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 6) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'FriendRequestInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadTupleFriendRequestInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'FriendRequestInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadGetterTupleFriendRequestInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'FriendRequestInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function storeTupleFriendRequestInternal(source: FriendRequestInternal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserFriendRequestInternal(): DictionaryValue<FriendRequestInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFriendRequestInternal(src)).endCell());
        },
        parse: (src) => {
            return loadFriendRequestInternal(src.loadRef().beginParse());
        }
    }
}

export type ConfirmRequestInternal = {
    $$type: 'ConfirmRequestInternal';
    amount: bigint;
    sender: Address;
    forwardPayload: Slice;
}

export function storeConfirmRequestInternal(src: ConfirmRequestInternal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(7, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadConfirmRequestInternal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 7) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'ConfirmRequestInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadTupleConfirmRequestInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'ConfirmRequestInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadGetterTupleConfirmRequestInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'ConfirmRequestInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function storeTupleConfirmRequestInternal(source: ConfirmRequestInternal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserConfirmRequestInternal(): DictionaryValue<ConfirmRequestInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeConfirmRequestInternal(src)).endCell());
        },
        parse: (src) => {
            return loadConfirmRequestInternal(src.loadRef().beginParse());
        }
    }
}

export type ReportInternal = {
    $$type: 'ReportInternal';
    amount: bigint;
    reason: boolean;
    sender: Address;
    forwardPayload: Slice;
}

export function storeReportInternal(src: ReportInternal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(8, 32);
        b_0.storeCoins(src.amount);
        b_0.storeBit(src.reason);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadReportInternal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 8) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    const _reason = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'ReportInternal' as const, amount: _amount, reason: _reason, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadTupleReportInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _reason = source.readBoolean();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'ReportInternal' as const, amount: _amount, reason: _reason, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadGetterTupleReportInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _reason = source.readBoolean();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'ReportInternal' as const, amount: _amount, reason: _reason, sender: _sender, forwardPayload: _forwardPayload };
}

export function storeTupleReportInternal(source: ReportInternal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeBoolean(source.reason);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserReportInternal(): DictionaryValue<ReportInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportInternal(src)).endCell());
        },
        parse: (src) => {
            return loadReportInternal(src.loadRef().beginParse());
        }
    }
}

export type DisputeInternal = {
    $$type: 'DisputeInternal';
    amount: bigint;
    sender: Address;
    forwardPayload: Slice;
}

export function storeDisputeInternal(src: DisputeInternal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(9, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadDisputeInternal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 9) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'DisputeInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadTupleDisputeInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'DisputeInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadGetterTupleDisputeInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'DisputeInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function storeTupleDisputeInternal(source: DisputeInternal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserDisputeInternal(): DictionaryValue<DisputeInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDisputeInternal(src)).endCell());
        },
        parse: (src) => {
            return loadDisputeInternal(src.loadRef().beginParse());
        }
    }
}

export type ResolutionInternal = {
    $$type: 'ResolutionInternal';
    amount: bigint;
    sender: Address;
    forwardPayload: Slice;
}

export function storeResolutionInternal(src: ResolutionInternal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(10, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadResolutionInternal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 10) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'ResolutionInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadTupleResolutionInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'ResolutionInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadGetterTupleResolutionInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'ResolutionInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function storeTupleResolutionInternal(source: ResolutionInternal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserResolutionInternal(): DictionaryValue<ResolutionInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeResolutionInternal(src)).endCell());
        },
        parse: (src) => {
            return loadResolutionInternal(src.loadRef().beginParse());
        }
    }
}

export type Report = {
    $$type: 'Report';
    target: Address;
    reason: boolean;
}

export function storeReport(src: Report) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(17, 32);
        b_0.storeAddress(src.target);
        b_0.storeBit(src.reason);
    };
}

export function loadReport(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 17) { throw Error('Invalid prefix'); }
    const _target = sc_0.loadAddress();
    const _reason = sc_0.loadBit();
    return { $$type: 'Report' as const, target: _target, reason: _reason };
}

export function loadTupleReport(source: TupleReader) {
    const _target = source.readAddress();
    const _reason = source.readBoolean();
    return { $$type: 'Report' as const, target: _target, reason: _reason };
}

export function loadGetterTupleReport(source: TupleReader) {
    const _target = source.readAddress();
    const _reason = source.readBoolean();
    return { $$type: 'Report' as const, target: _target, reason: _reason };
}

export function storeTupleReport(source: Report) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.target);
    builder.writeBoolean(source.reason);
    return builder.build();
}

export function dictValueParserReport(): DictionaryValue<Report> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReport(src)).endCell());
        },
        parse: (src) => {
            return loadReport(src.loadRef().beginParse());
        }
    }
}

export type Dispute = {
    $$type: 'Dispute';
    target: Address;
}

export function storeDispute(src: Dispute) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(18, 32);
        b_0.storeAddress(src.target);
    };
}

export function loadDispute(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 18) { throw Error('Invalid prefix'); }
    const _target = sc_0.loadAddress();
    return { $$type: 'Dispute' as const, target: _target };
}

export function loadTupleDispute(source: TupleReader) {
    const _target = source.readAddress();
    return { $$type: 'Dispute' as const, target: _target };
}

export function loadGetterTupleDispute(source: TupleReader) {
    const _target = source.readAddress();
    return { $$type: 'Dispute' as const, target: _target };
}

export function storeTupleDispute(source: Dispute) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.target);
    return builder.build();
}

export function dictValueParserDispute(): DictionaryValue<Dispute> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDispute(src)).endCell());
        },
        parse: (src) => {
            return loadDispute(src.loadRef().beginParse());
        }
    }
}

export type ProcessComplaint = {
    $$type: 'ProcessComplaint';
    target: Address;
}

export function storeProcessComplaint(src: ProcessComplaint) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(19, 32);
        b_0.storeAddress(src.target);
    };
}

export function loadProcessComplaint(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 19) { throw Error('Invalid prefix'); }
    const _target = sc_0.loadAddress();
    return { $$type: 'ProcessComplaint' as const, target: _target };
}

export function loadTupleProcessComplaint(source: TupleReader) {
    const _target = source.readAddress();
    return { $$type: 'ProcessComplaint' as const, target: _target };
}

export function loadGetterTupleProcessComplaint(source: TupleReader) {
    const _target = source.readAddress();
    return { $$type: 'ProcessComplaint' as const, target: _target };
}

export function storeTupleProcessComplaint(source: ProcessComplaint) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.target);
    return builder.build();
}

export function dictValueParserProcessComplaint(): DictionaryValue<ProcessComplaint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProcessComplaint(src)).endCell());
        },
        parse: (src) => {
            return loadProcessComplaint(src.loadRef().beginParse());
        }
    }
}

export type AdminAction = {
    $$type: 'AdminAction';
    action: bigint;
    value: bigint;
}

export function storeAdminAction(src: AdminAction) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(20, 32);
        b_0.storeUint(src.action, 8);
        b_0.storeCoins(src.value);
    };
}

export function loadAdminAction(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 20) { throw Error('Invalid prefix'); }
    const _action = sc_0.loadUintBig(8);
    const _value = sc_0.loadCoins();
    return { $$type: 'AdminAction' as const, action: _action, value: _value };
}

export function loadTupleAdminAction(source: TupleReader) {
    const _action = source.readBigNumber();
    const _value = source.readBigNumber();
    return { $$type: 'AdminAction' as const, action: _action, value: _value };
}

export function loadGetterTupleAdminAction(source: TupleReader) {
    const _action = source.readBigNumber();
    const _value = source.readBigNumber();
    return { $$type: 'AdminAction' as const, action: _action, value: _value };
}

export function storeTupleAdminAction(source: AdminAction) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.action);
    builder.writeNumber(source.value);
    return builder.build();
}

export function dictValueParserAdminAction(): DictionaryValue<AdminAction> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAdminAction(src)).endCell());
        },
        parse: (src) => {
            return loadAdminAction(src.loadRef().beginParse());
        }
    }
}

export type JettonUpdateContent = {
    $$type: 'JettonUpdateContent';
    queryId: bigint;
    content: Cell;
}

export function storeJettonUpdateContent(src: JettonUpdateContent) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeRef(src.content);
    };
}

export function loadJettonUpdateContent(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _content = sc_0.loadRef();
    return { $$type: 'JettonUpdateContent' as const, queryId: _queryId, content: _content };
}

export function loadTupleJettonUpdateContent(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _content = source.readCell();
    return { $$type: 'JettonUpdateContent' as const, queryId: _queryId, content: _content };
}

export function loadGetterTupleJettonUpdateContent(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _content = source.readCell();
    return { $$type: 'JettonUpdateContent' as const, queryId: _queryId, content: _content };
}

export function storeTupleJettonUpdateContent(source: JettonUpdateContent) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeCell(source.content);
    return builder.build();
}

export function dictValueParserJettonUpdateContent(): DictionaryValue<JettonUpdateContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonUpdateContent(src)).endCell());
        },
        parse: (src) => {
            return loadJettonUpdateContent(src.loadRef().beginParse());
        }
    }
}

export type Mintable = {
    $$type: 'Mintable';
    mintable: boolean;
}

export function storeMintable(src: Mintable) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(37, 32);
        b_0.storeBit(src.mintable);
    };
}

export function loadMintable(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 37) { throw Error('Invalid prefix'); }
    const _mintable = sc_0.loadBit();
    return { $$type: 'Mintable' as const, mintable: _mintable };
}

export function loadTupleMintable(source: TupleReader) {
    const _mintable = source.readBoolean();
    return { $$type: 'Mintable' as const, mintable: _mintable };
}

export function loadGetterTupleMintable(source: TupleReader) {
    const _mintable = source.readBoolean();
    return { $$type: 'Mintable' as const, mintable: _mintable };
}

export function storeTupleMintable(source: Mintable) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.mintable);
    return builder.build();
}

export function dictValueParserMintable(): DictionaryValue<Mintable> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintable(src)).endCell());
        },
        parse: (src) => {
            return loadMintable(src.loadRef().beginParse());
        }
    }
}

export type UnfriendInternal = {
    $$type: 'UnfriendInternal';
    amount: bigint;
    sender: Address;
    forwardPayload: Slice;
}

export function storeUnfriendInternal(src: UnfriendInternal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(49, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadUnfriendInternal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 49) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'UnfriendInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadTupleUnfriendInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'UnfriendInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadGetterTupleUnfriendInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'UnfriendInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function storeTupleUnfriendInternal(source: UnfriendInternal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserUnfriendInternal(): DictionaryValue<UnfriendInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUnfriendInternal(src)).endCell());
        },
        parse: (src) => {
            return loadUnfriendInternal(src.loadRef().beginParse());
        }
    }
}

export type ReInviteInternal = {
    $$type: 'ReInviteInternal';
    amount: bigint;
    sender: Address;
    forwardPayload: Slice;
}

export function storeReInviteInternal(src: ReInviteInternal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(50, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadReInviteInternal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 50) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'ReInviteInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadTupleReInviteInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'ReInviteInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadGetterTupleReInviteInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'ReInviteInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function storeTupleReInviteInternal(source: ReInviteInternal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserReInviteInternal(): DictionaryValue<ReInviteInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReInviteInternal(src)).endCell());
        },
        parse: (src) => {
            return loadReInviteInternal(src.loadRef().beginParse());
        }
    }
}

export type UnInviteInternal = {
    $$type: 'UnInviteInternal';
    amount: bigint;
    sender: Address;
    forwardPayload: Slice;
}

export function storeUnInviteInternal(src: UnInviteInternal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(52, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadUnInviteInternal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 52) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'UnInviteInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadTupleUnInviteInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'UnInviteInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadGetterTupleUnInviteInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'UnInviteInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function storeTupleUnInviteInternal(source: UnInviteInternal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserUnInviteInternal(): DictionaryValue<UnInviteInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUnInviteInternal(src)).endCell());
        },
        parse: (src) => {
            return loadUnInviteInternal(src.loadRef().beginParse());
        }
    }
}

export type U = {
    $$type: 'U';
    op: bigint;
    amount: bigint | null;
    sender: Address | null;
    receiver: Address | null;
    forwardPayload: Slice;
}

export function storeU(src: U) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(51, 32);
        b_0.storeUint(src.op, 6);
        if (src.amount !== null && src.amount !== undefined) { b_0.storeBit(true).storeCoins(src.amount); } else { b_0.storeBit(false); }
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.receiver);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadU(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 51) { throw Error('Invalid prefix'); }
    const _op = sc_0.loadUintBig(6);
    const _amount = sc_0.loadBit() ? sc_0.loadCoins() : null;
    const _sender = sc_0.loadMaybeAddress();
    const _receiver = sc_0.loadMaybeAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'U' as const, op: _op, amount: _amount, sender: _sender, receiver: _receiver, forwardPayload: _forwardPayload };
}

export function loadTupleU(source: TupleReader) {
    const _op = source.readBigNumber();
    const _amount = source.readBigNumberOpt();
    const _sender = source.readAddressOpt();
    const _receiver = source.readAddressOpt();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'U' as const, op: _op, amount: _amount, sender: _sender, receiver: _receiver, forwardPayload: _forwardPayload };
}

export function loadGetterTupleU(source: TupleReader) {
    const _op = source.readBigNumber();
    const _amount = source.readBigNumberOpt();
    const _sender = source.readAddressOpt();
    const _receiver = source.readAddressOpt();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'U' as const, op: _op, amount: _amount, sender: _sender, receiver: _receiver, forwardPayload: _forwardPayload };
}

export function storeTupleU(source: U) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.op);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.receiver);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserU(): DictionaryValue<U> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeU(src)).endCell());
        },
        parse: (src) => {
            return loadU(src.loadRef().beginParse());
        }
    }
}

export type AccCloseBurnInternal = {
    $$type: 'AccCloseBurnInternal';
    amount: bigint;
    sender: Address;
    forwardPayload: Slice;
}

export function storeAccCloseBurnInternal(src: AccCloseBurnInternal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(53, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadAccCloseBurnInternal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 53) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'AccCloseBurnInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadTupleAccCloseBurnInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'AccCloseBurnInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadGetterTupleAccCloseBurnInternal(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'AccCloseBurnInternal' as const, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function storeTupleAccCloseBurnInternal(source: AccCloseBurnInternal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserAccCloseBurnInternal(): DictionaryValue<AccCloseBurnInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAccCloseBurnInternal(src)).endCell());
        },
        parse: (src) => {
            return loadAccCloseBurnInternal(src.loadRef().beginParse());
        }
    }
}

export type EnquireInvitor = {
    $$type: 'EnquireInvitor';
    sender: Address;
}

export function storeEnquireInvitor(src: EnquireInvitor) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(54, 32);
        b_0.storeAddress(src.sender);
    };
}

export function loadEnquireInvitor(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 54) { throw Error('Invalid prefix'); }
    const _sender = sc_0.loadAddress();
    return { $$type: 'EnquireInvitor' as const, sender: _sender };
}

export function loadTupleEnquireInvitor(source: TupleReader) {
    const _sender = source.readAddress();
    return { $$type: 'EnquireInvitor' as const, sender: _sender };
}

export function loadGetterTupleEnquireInvitor(source: TupleReader) {
    const _sender = source.readAddress();
    return { $$type: 'EnquireInvitor' as const, sender: _sender };
}

export function storeTupleEnquireInvitor(source: EnquireInvitor) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.sender);
    return builder.build();
}

export function dictValueParserEnquireInvitor(): DictionaryValue<EnquireInvitor> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEnquireInvitor(src)).endCell());
        },
        parse: (src) => {
            return loadEnquireInvitor(src.loadRef().beginParse());
        }
    }
}

export type TakeInvitor = {
    $$type: 'TakeInvitor';
    sender: Address;
    invitor: Address;
}

export function storeTakeInvitor(src: TakeInvitor) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(55, 32);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.invitor);
    };
}

export function loadTakeInvitor(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 55) { throw Error('Invalid prefix'); }
    const _sender = sc_0.loadAddress();
    const _invitor = sc_0.loadAddress();
    return { $$type: 'TakeInvitor' as const, sender: _sender, invitor: _invitor };
}

export function loadTupleTakeInvitor(source: TupleReader) {
    const _sender = source.readAddress();
    const _invitor = source.readAddress();
    return { $$type: 'TakeInvitor' as const, sender: _sender, invitor: _invitor };
}

export function loadGetterTupleTakeInvitor(source: TupleReader) {
    const _sender = source.readAddress();
    const _invitor = source.readAddress();
    return { $$type: 'TakeInvitor' as const, sender: _sender, invitor: _invitor };
}

export function storeTupleTakeInvitor(source: TakeInvitor) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.sender);
    builder.writeAddress(source.invitor);
    return builder.build();
}

export function dictValueParserTakeInvitor(): DictionaryValue<TakeInvitor> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeInvitor(src)).endCell());
        },
        parse: (src) => {
            return loadTakeInvitor(src.loadRef().beginParse());
        }
    }
}

export type AccountGenerated = {
    $$type: 'AccountGenerated';
    deployer: Address;
    newAccount: Address;
}

export function storeAccountGenerated(src: AccountGenerated) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(64, 32);
        b_0.storeAddress(src.deployer);
        b_0.storeAddress(src.newAccount);
    };
}

export function loadAccountGenerated(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 64) { throw Error('Invalid prefix'); }
    const _deployer = sc_0.loadAddress();
    const _newAccount = sc_0.loadAddress();
    return { $$type: 'AccountGenerated' as const, deployer: _deployer, newAccount: _newAccount };
}

export function loadTupleAccountGenerated(source: TupleReader) {
    const _deployer = source.readAddress();
    const _newAccount = source.readAddress();
    return { $$type: 'AccountGenerated' as const, deployer: _deployer, newAccount: _newAccount };
}

export function loadGetterTupleAccountGenerated(source: TupleReader) {
    const _deployer = source.readAddress();
    const _newAccount = source.readAddress();
    return { $$type: 'AccountGenerated' as const, deployer: _deployer, newAccount: _newAccount };
}

export function storeTupleAccountGenerated(source: AccountGenerated) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.deployer);
    builder.writeAddress(source.newAccount);
    return builder.build();
}

export function dictValueParserAccountGenerated(): DictionaryValue<AccountGenerated> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAccountGenerated(src)).endCell());
        },
        parse: (src) => {
            return loadAccountGenerated(src.loadRef().beginParse());
        }
    }
}

export type ApplyGrant = {
    $$type: 'ApplyGrant';
    sender: Address;
    amount: bigint;
}

export function storeApplyGrant(src: ApplyGrant) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(65, 32);
        b_0.storeAddress(src.sender);
        b_0.storeCoins(src.amount);
    };
}

export function loadApplyGrant(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 65) { throw Error('Invalid prefix'); }
    const _sender = sc_0.loadAddress();
    const _amount = sc_0.loadCoins();
    return { $$type: 'ApplyGrant' as const, sender: _sender, amount: _amount };
}

export function loadTupleApplyGrant(source: TupleReader) {
    const _sender = source.readAddress();
    const _amount = source.readBigNumber();
    return { $$type: 'ApplyGrant' as const, sender: _sender, amount: _amount };
}

export function loadGetterTupleApplyGrant(source: TupleReader) {
    const _sender = source.readAddress();
    const _amount = source.readBigNumber();
    return { $$type: 'ApplyGrant' as const, sender: _sender, amount: _amount };
}

export function storeTupleApplyGrant(source: ApplyGrant) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.sender);
    builder.writeNumber(source.amount);
    return builder.build();
}

export function dictValueParserApplyGrant(): DictionaryValue<ApplyGrant> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeApplyGrant(src)).endCell());
        },
        parse: (src) => {
            return loadApplyGrant(src.loadRef().beginParse());
        }
    }
}

export type VoteProposal = {
    $$type: 'VoteProposal';
    sender: Address;
    proposer: Address;
    turnover: bigint;
}

export function storeVoteProposal(src: VoteProposal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(66, 32);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.proposer);
        b_0.storeCoins(src.turnover);
    };
}

export function loadVoteProposal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 66) { throw Error('Invalid prefix'); }
    const _sender = sc_0.loadAddress();
    const _proposer = sc_0.loadAddress();
    const _turnover = sc_0.loadCoins();
    return { $$type: 'VoteProposal' as const, sender: _sender, proposer: _proposer, turnover: _turnover };
}

export function loadTupleVoteProposal(source: TupleReader) {
    const _sender = source.readAddress();
    const _proposer = source.readAddress();
    const _turnover = source.readBigNumber();
    return { $$type: 'VoteProposal' as const, sender: _sender, proposer: _proposer, turnover: _turnover };
}

export function loadGetterTupleVoteProposal(source: TupleReader) {
    const _sender = source.readAddress();
    const _proposer = source.readAddress();
    const _turnover = source.readBigNumber();
    return { $$type: 'VoteProposal' as const, sender: _sender, proposer: _proposer, turnover: _turnover };
}

export function storeTupleVoteProposal(source: VoteProposal) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.sender);
    builder.writeAddress(source.proposer);
    builder.writeNumber(source.turnover);
    return builder.build();
}

export function dictValueParserVoteProposal(): DictionaryValue<VoteProposal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVoteProposal(src)).endCell());
        },
        parse: (src) => {
            return loadVoteProposal(src.loadRef().beginParse());
        }
    }
}

export type CitizenAdded = {
    $$type: 'CitizenAdded';
    sender: Address;
    newAccount: Address;
}

export function storeCitizenAdded(src: CitizenAdded) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(67, 32);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.newAccount);
    };
}

export function loadCitizenAdded(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 67) { throw Error('Invalid prefix'); }
    const _sender = sc_0.loadAddress();
    const _newAccount = sc_0.loadAddress();
    return { $$type: 'CitizenAdded' as const, sender: _sender, newAccount: _newAccount };
}

export function loadTupleCitizenAdded(source: TupleReader) {
    const _sender = source.readAddress();
    const _newAccount = source.readAddress();
    return { $$type: 'CitizenAdded' as const, sender: _sender, newAccount: _newAccount };
}

export function loadGetterTupleCitizenAdded(source: TupleReader) {
    const _sender = source.readAddress();
    const _newAccount = source.readAddress();
    return { $$type: 'CitizenAdded' as const, sender: _sender, newAccount: _newAccount };
}

export function storeTupleCitizenAdded(source: CitizenAdded) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.sender);
    builder.writeAddress(source.newAccount);
    return builder.build();
}

export function dictValueParserCitizenAdded(): DictionaryValue<CitizenAdded> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCitizenAdded(src)).endCell());
        },
        parse: (src) => {
            return loadCitizenAdded(src.loadRef().beginParse());
        }
    }
}

export type InviteApproval = {
    $$type: 'InviteApproval';
    approved: boolean;
    invitor: Address;
    invitee: Address;
    approver: Address;
}

export function storeInviteApproval(src: InviteApproval) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(68, 32);
        b_0.storeBit(src.approved);
        b_0.storeAddress(src.invitor);
        b_0.storeAddress(src.invitee);
        b_0.storeAddress(src.approver);
    };
}

export function loadInviteApproval(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 68) { throw Error('Invalid prefix'); }
    const _approved = sc_0.loadBit();
    const _invitor = sc_0.loadAddress();
    const _invitee = sc_0.loadAddress();
    const _approver = sc_0.loadAddress();
    return { $$type: 'InviteApproval' as const, approved: _approved, invitor: _invitor, invitee: _invitee, approver: _approver };
}

export function loadTupleInviteApproval(source: TupleReader) {
    const _approved = source.readBoolean();
    const _invitor = source.readAddress();
    const _invitee = source.readAddress();
    const _approver = source.readAddress();
    return { $$type: 'InviteApproval' as const, approved: _approved, invitor: _invitor, invitee: _invitee, approver: _approver };
}

export function loadGetterTupleInviteApproval(source: TupleReader) {
    const _approved = source.readBoolean();
    const _invitor = source.readAddress();
    const _invitee = source.readAddress();
    const _approver = source.readAddress();
    return { $$type: 'InviteApproval' as const, approved: _approved, invitor: _invitor, invitee: _invitee, approver: _approver };
}

export function storeTupleInviteApproval(source: InviteApproval) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.approved);
    builder.writeAddress(source.invitor);
    builder.writeAddress(source.invitee);
    builder.writeAddress(source.approver);
    return builder.build();
}

export function dictValueParserInviteApproval(): DictionaryValue<InviteApproval> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInviteApproval(src)).endCell());
        },
        parse: (src) => {
            return loadInviteApproval(src.loadRef().beginParse());
        }
    }
}

export type ChangeMetadataUri = {
    $$type: 'ChangeMetadataUri';
    queryId: bigint;
    metadata: Slice;
}

export function storeChangeMetadataUri(src: ChangeMetadataUri) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3414567170, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeBuilder(src.metadata.asBuilder());
    };
}

export function loadChangeMetadataUri(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3414567170) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _metadata = sc_0;
    return { $$type: 'ChangeMetadataUri' as const, queryId: _queryId, metadata: _metadata };
}

export function loadTupleChangeMetadataUri(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _metadata = source.readCell().asSlice();
    return { $$type: 'ChangeMetadataUri' as const, queryId: _queryId, metadata: _metadata };
}

export function loadGetterTupleChangeMetadataUri(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _metadata = source.readCell().asSlice();
    return { $$type: 'ChangeMetadataUri' as const, queryId: _queryId, metadata: _metadata };
}

export function storeTupleChangeMetadataUri(source: ChangeMetadataUri) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeSlice(source.metadata.asCell());
    return builder.build();
}

export function dictValueParserChangeMetadataUri(): DictionaryValue<ChangeMetadataUri> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeMetadataUri(src)).endCell());
        },
        parse: (src) => {
            return loadChangeMetadataUri(src.loadRef().beginParse());
        }
    }
}

export type StopEngageMint = {
    $$type: 'StopEngageMint';
    sender: Address;
}

export function storeStopEngageMint(src: StopEngageMint) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(69, 32);
        b_0.storeAddress(src.sender);
    };
}

export function loadStopEngageMint(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 69) { throw Error('Invalid prefix'); }
    const _sender = sc_0.loadAddress();
    return { $$type: 'StopEngageMint' as const, sender: _sender };
}

export function loadTupleStopEngageMint(source: TupleReader) {
    const _sender = source.readAddress();
    return { $$type: 'StopEngageMint' as const, sender: _sender };
}

export function loadGetterTupleStopEngageMint(source: TupleReader) {
    const _sender = source.readAddress();
    return { $$type: 'StopEngageMint' as const, sender: _sender };
}

export function storeTupleStopEngageMint(source: StopEngageMint) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.sender);
    return builder.build();
}

export function dictValueParserStopEngageMint(): DictionaryValue<StopEngageMint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStopEngageMint(src)).endCell());
        },
        parse: (src) => {
            return loadStopEngageMint(src.loadRef().beginParse());
        }
    }
}

export type MintNotify = {
    $$type: 'MintNotify';
    amount: bigint;
    sender: Address;
}

export function storeMintNotify(src: MintNotify) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(70, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
    };
}

export function loadMintNotify(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 70) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    return { $$type: 'MintNotify' as const, amount: _amount, sender: _sender };
}

export function loadTupleMintNotify(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    return { $$type: 'MintNotify' as const, amount: _amount, sender: _sender };
}

export function loadGetterTupleMintNotify(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    return { $$type: 'MintNotify' as const, amount: _amount, sender: _sender };
}

export function storeTupleMintNotify(source: MintNotify) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    return builder.build();
}

export function dictValueParserMintNotify(): DictionaryValue<MintNotify> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintNotify(src)).endCell());
        },
        parse: (src) => {
            return loadMintNotify(src.loadRef().beginParse());
        }
    }
}

export type IdGenTrack = {
    $$type: 'IdGenTrack';
    account: Address;
    invitor: Address;
    approver: Address;
    payload: Slice;
}

export function storeIdGenTrack(src: IdGenTrack) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(81, 32);
        b_0.storeAddress(src.account);
        b_0.storeAddress(src.invitor);
        b_0.storeAddress(src.approver);
        b_0.storeBuilder(src.payload.asBuilder());
    };
}

export function loadIdGenTrack(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 81) { throw Error('Invalid prefix'); }
    const _account = sc_0.loadAddress();
    const _invitor = sc_0.loadAddress();
    const _approver = sc_0.loadAddress();
    const _payload = sc_0;
    return { $$type: 'IdGenTrack' as const, account: _account, invitor: _invitor, approver: _approver, payload: _payload };
}

export function loadTupleIdGenTrack(source: TupleReader) {
    const _account = source.readAddress();
    const _invitor = source.readAddress();
    const _approver = source.readAddress();
    const _payload = source.readCell().asSlice();
    return { $$type: 'IdGenTrack' as const, account: _account, invitor: _invitor, approver: _approver, payload: _payload };
}

export function loadGetterTupleIdGenTrack(source: TupleReader) {
    const _account = source.readAddress();
    const _invitor = source.readAddress();
    const _approver = source.readAddress();
    const _payload = source.readCell().asSlice();
    return { $$type: 'IdGenTrack' as const, account: _account, invitor: _invitor, approver: _approver, payload: _payload };
}

export function storeTupleIdGenTrack(source: IdGenTrack) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeAddress(source.invitor);
    builder.writeAddress(source.approver);
    builder.writeSlice(source.payload.asCell());
    return builder.build();
}

export function dictValueParserIdGenTrack(): DictionaryValue<IdGenTrack> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeIdGenTrack(src)).endCell());
        },
        parse: (src) => {
            return loadIdGenTrack(src.loadRef().beginParse());
        }
    }
}

export type InternalDeActivate = {
    $$type: 'InternalDeActivate';
    amt: bigint;
    sender: Address;
    invitor: Address;
    invitor0: Address;
}

export function storeInternalDeActivate(src: InternalDeActivate) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(82, 32);
        b_0.storeCoins(src.amt);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.invitor);
        b_0.storeAddress(src.invitor0);
    };
}

export function loadInternalDeActivate(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 82) { throw Error('Invalid prefix'); }
    const _amt = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _invitor = sc_0.loadAddress();
    const _invitor0 = sc_0.loadAddress();
    return { $$type: 'InternalDeActivate' as const, amt: _amt, sender: _sender, invitor: _invitor, invitor0: _invitor0 };
}

export function loadTupleInternalDeActivate(source: TupleReader) {
    const _amt = source.readBigNumber();
    const _sender = source.readAddress();
    const _invitor = source.readAddress();
    const _invitor0 = source.readAddress();
    return { $$type: 'InternalDeActivate' as const, amt: _amt, sender: _sender, invitor: _invitor, invitor0: _invitor0 };
}

export function loadGetterTupleInternalDeActivate(source: TupleReader) {
    const _amt = source.readBigNumber();
    const _sender = source.readAddress();
    const _invitor = source.readAddress();
    const _invitor0 = source.readAddress();
    return { $$type: 'InternalDeActivate' as const, amt: _amt, sender: _sender, invitor: _invitor, invitor0: _invitor0 };
}

export function storeTupleInternalDeActivate(source: InternalDeActivate) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amt);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.invitor);
    builder.writeAddress(source.invitor0);
    return builder.build();
}

export function dictValueParserInternalDeActivate(): DictionaryValue<InternalDeActivate> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInternalDeActivate(src)).endCell());
        },
        parse: (src) => {
            return loadInternalDeActivate(src.loadRef().beginParse());
        }
    }
}

export type SliceBitsAndRefs = {
    $$type: 'SliceBitsAndRefs';
    bits: bigint;
    refs: bigint;
}

export function storeSliceBitsAndRefs(src: SliceBitsAndRefs) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadSliceBitsAndRefs(slice: Slice) {
    const sc_0 = slice;
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'SliceBitsAndRefs' as const, bits: _bits, refs: _refs };
}

export function loadTupleSliceBitsAndRefs(source: TupleReader) {
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'SliceBitsAndRefs' as const, bits: _bits, refs: _refs };
}

export function loadGetterTupleSliceBitsAndRefs(source: TupleReader) {
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'SliceBitsAndRefs' as const, bits: _bits, refs: _refs };
}

export function storeTupleSliceBitsAndRefs(source: SliceBitsAndRefs) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

export function dictValueParserSliceBitsAndRefs(): DictionaryValue<SliceBitsAndRefs> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSliceBitsAndRefs(src)).endCell());
        },
        parse: (src) => {
            return loadSliceBitsAndRefs(src.loadRef().beginParse());
        }
    }
}

export type ShardDeployParameters = {
    $$type: 'ShardDeployParameters';
    deployParameters: DeployParameters;
    shard: bigint;
}

export function storeShardDeployParameters(src: ShardDeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.store(storeDeployParameters(src.deployParameters));
        b_0.storeUint(src.shard, 8);
    };
}

export function loadShardDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _deployParameters = loadDeployParameters(sc_0);
    const _shard = sc_0.loadUintBig(8);
    return { $$type: 'ShardDeployParameters' as const, deployParameters: _deployParameters, shard: _shard };
}

export function loadTupleShardDeployParameters(source: TupleReader) {
    const _deployParameters = loadTupleDeployParameters(source);
    const _shard = source.readBigNumber();
    return { $$type: 'ShardDeployParameters' as const, deployParameters: _deployParameters, shard: _shard };
}

export function loadGetterTupleShardDeployParameters(source: TupleReader) {
    const _deployParameters = loadGetterTupleDeployParameters(source);
    const _shard = source.readBigNumber();
    return { $$type: 'ShardDeployParameters' as const, deployParameters: _deployParameters, shard: _shard };
}

export function storeTupleShardDeployParameters(source: ShardDeployParameters) {
    const builder = new TupleBuilder();
    builder.writeTuple(storeTupleDeployParameters(source.deployParameters));
    builder.writeNumber(source.shard);
    return builder.build();
}

export function dictValueParserShardDeployParameters(): DictionaryValue<ShardDeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeShardDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadShardDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type ShardMessageParameters = {
    $$type: 'ShardMessageParameters';
    messageParameters: MessageParameters;
    shard: bigint;
}

export function storeShardMessageParameters(src: ShardMessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.store(storeMessageParameters(src.messageParameters));
        b_0.storeUint(src.shard, 8);
    };
}

export function loadShardMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _messageParameters = loadMessageParameters(sc_0);
    const _shard = sc_0.loadUintBig(8);
    return { $$type: 'ShardMessageParameters' as const, messageParameters: _messageParameters, shard: _shard };
}

export function loadTupleShardMessageParameters(source: TupleReader) {
    const _messageParameters = loadTupleMessageParameters(source);
    const _shard = source.readBigNumber();
    return { $$type: 'ShardMessageParameters' as const, messageParameters: _messageParameters, shard: _shard };
}

export function loadGetterTupleShardMessageParameters(source: TupleReader) {
    const _messageParameters = loadGetterTupleMessageParameters(source);
    const _shard = source.readBigNumber();
    return { $$type: 'ShardMessageParameters' as const, messageParameters: _messageParameters, shard: _shard };
}

export function storeTupleShardMessageParameters(source: ShardMessageParameters) {
    const builder = new TupleBuilder();
    builder.writeTuple(storeTupleMessageParameters(source.messageParameters));
    builder.writeNumber(source.shard);
    return builder.build();
}

export function dictValueParserShardMessageParameters(): DictionaryValue<ShardMessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeShardMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadShardMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type Ids$Data = {
    $$type: 'Ids$Data';
    root: Address;
    treasuryAccount: Address;
    lat: string;
    long: string;
    users: Dictionary<Address, Cell>;
    jettonWalletInitialCode: Cell;
}

export function storeIds$Data(src: Ids$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.root);
        b_0.storeAddress(src.treasuryAccount);
        b_0.storeStringRefTail(src.lat);
        b_0.storeStringRefTail(src.long);
        const b_1 = new Builder();
        b_1.storeDict(src.users, Dictionary.Keys.Address(), Dictionary.Values.Cell());
        b_1.storeRef(src.jettonWalletInitialCode);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadIds$Data(slice: Slice) {
    const sc_0 = slice;
    const _root = sc_0.loadAddress();
    const _treasuryAccount = sc_0.loadAddress();
    const _lat = sc_0.loadStringRefTail();
    const _long = sc_0.loadStringRefTail();
    const sc_1 = sc_0.loadRef().beginParse();
    const _users = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Cell(), sc_1);
    const _jettonWalletInitialCode = sc_1.loadRef();
    return { $$type: 'Ids$Data' as const, root: _root, treasuryAccount: _treasuryAccount, lat: _lat, long: _long, users: _users, jettonWalletInitialCode: _jettonWalletInitialCode };
}

export function loadTupleIds$Data(source: TupleReader) {
    const _root = source.readAddress();
    const _treasuryAccount = source.readAddress();
    const _lat = source.readString();
    const _long = source.readString();
    const _users = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Cell(), source.readCellOpt());
    const _jettonWalletInitialCode = source.readCell();
    return { $$type: 'Ids$Data' as const, root: _root, treasuryAccount: _treasuryAccount, lat: _lat, long: _long, users: _users, jettonWalletInitialCode: _jettonWalletInitialCode };
}

export function loadGetterTupleIds$Data(source: TupleReader) {
    const _root = source.readAddress();
    const _treasuryAccount = source.readAddress();
    const _lat = source.readString();
    const _long = source.readString();
    const _users = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Cell(), source.readCellOpt());
    const _jettonWalletInitialCode = source.readCell();
    return { $$type: 'Ids$Data' as const, root: _root, treasuryAccount: _treasuryAccount, lat: _lat, long: _long, users: _users, jettonWalletInitialCode: _jettonWalletInitialCode };
}

export function storeTupleIds$Data(source: Ids$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.root);
    builder.writeAddress(source.treasuryAccount);
    builder.writeString(source.lat);
    builder.writeString(source.long);
    builder.writeCell(source.users.size > 0 ? beginCell().storeDictDirect(source.users, Dictionary.Keys.Address(), Dictionary.Values.Cell()).endCell() : null);
    builder.writeCell(source.jettonWalletInitialCode);
    return builder.build();
}

export function dictValueParserIds$Data(): DictionaryValue<Ids$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeIds$Data(src)).endCell());
        },
        parse: (src) => {
            return loadIds$Data(src.loadRef().beginParse());
        }
    }
}

export type JettonMinterState = {
    $$type: 'JettonMinterState';
    totalSupply: bigint;
    mintable: boolean;
    adminAddress: Address;
    jettonContent: Cell;
    jettonWalletCode: Cell;
}

export function storeJettonMinterState(src: JettonMinterState) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeCoins(src.totalSupply);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.adminAddress);
        b_0.storeRef(src.jettonContent);
        b_0.storeRef(src.jettonWalletCode);
    };
}

export function loadJettonMinterState(slice: Slice) {
    const sc_0 = slice;
    const _totalSupply = sc_0.loadCoins();
    const _mintable = sc_0.loadBit();
    const _adminAddress = sc_0.loadAddress();
    const _jettonContent = sc_0.loadRef();
    const _jettonWalletCode = sc_0.loadRef();
    return { $$type: 'JettonMinterState' as const, totalSupply: _totalSupply, mintable: _mintable, adminAddress: _adminAddress, jettonContent: _jettonContent, jettonWalletCode: _jettonWalletCode };
}

export function loadTupleJettonMinterState(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _adminAddress = source.readAddress();
    const _jettonContent = source.readCell();
    const _jettonWalletCode = source.readCell();
    return { $$type: 'JettonMinterState' as const, totalSupply: _totalSupply, mintable: _mintable, adminAddress: _adminAddress, jettonContent: _jettonContent, jettonWalletCode: _jettonWalletCode };
}

export function loadGetterTupleJettonMinterState(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _adminAddress = source.readAddress();
    const _jettonContent = source.readCell();
    const _jettonWalletCode = source.readCell();
    return { $$type: 'JettonMinterState' as const, totalSupply: _totalSupply, mintable: _mintable, adminAddress: _adminAddress, jettonContent: _jettonContent, jettonWalletCode: _jettonWalletCode };
}

export function storeTupleJettonMinterState(source: JettonMinterState) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.adminAddress);
    builder.writeCell(source.jettonContent);
    builder.writeCell(source.jettonWalletCode);
    return builder.build();
}

export function dictValueParserJettonMinterState(): DictionaryValue<JettonMinterState> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonMinterState(src)).endCell());
        },
        parse: (src) => {
            return loadJettonMinterState(src.loadRef().beginParse());
        }
    }
}

export type JettonMinterSharded$Data = {
    $$type: 'JettonMinterSharded$Data';
    totalSupply: bigint;
    totalAccounts: bigint;
    treasurySurplus: bigint;
    treasuryDeficits: bigint;
    owner: Address;
    treasuryAccount: Address;
    jettonContent: Cell;
    jettonWalletCode: Cell;
    jettonWalletInitialCode: Cell;
    mintable: boolean;
    version: bigint;
    walletVersion: bigint;
    tosHash: string;
    mbrpAmount: bigint;
    publicWorks: Dictionary<Address, number>;
    votes: Dictionary<Address, number>;
    crowdFund: Dictionary<number, number>;
}

export function storeJettonMinterSharded$Data(src: JettonMinterSharded$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeCoins(src.totalSupply);
        b_0.storeUint(src.totalAccounts, 32);
        b_0.storeCoins(src.treasurySurplus);
        b_0.storeCoins(src.treasuryDeficits);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.treasuryAccount);
        b_0.storeRef(src.jettonContent);
        b_0.storeRef(src.jettonWalletCode);
        const b_1 = new Builder();
        b_1.storeRef(src.jettonWalletInitialCode);
        b_1.storeBit(src.mintable);
        b_1.storeUint(src.version, 10);
        b_1.storeUint(src.walletVersion, 10);
        b_1.storeStringRefTail(src.tosHash);
        b_1.storeCoins(src.mbrpAmount);
        b_1.storeDict(src.publicWorks, Dictionary.Keys.Address(), Dictionary.Values.Uint(10));
        const b_2 = new Builder();
        b_2.storeDict(src.votes, Dictionary.Keys.Address(), Dictionary.Values.Uint(20));
        b_2.storeDict(src.crowdFund, Dictionary.Keys.Uint(10), Dictionary.Values.Uint(10));
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadJettonMinterSharded$Data(slice: Slice) {
    const sc_0 = slice;
    const _totalSupply = sc_0.loadCoins();
    const _totalAccounts = sc_0.loadUintBig(32);
    const _treasurySurplus = sc_0.loadCoins();
    const _treasuryDeficits = sc_0.loadCoins();
    const _owner = sc_0.loadAddress();
    const _treasuryAccount = sc_0.loadAddress();
    const _jettonContent = sc_0.loadRef();
    const _jettonWalletCode = sc_0.loadRef();
    const sc_1 = sc_0.loadRef().beginParse();
    const _jettonWalletInitialCode = sc_1.loadRef();
    const _mintable = sc_1.loadBit();
    const _version = sc_1.loadUintBig(10);
    const _walletVersion = sc_1.loadUintBig(10);
    const _tosHash = sc_1.loadStringRefTail();
    const _mbrpAmount = sc_1.loadCoins();
    const _publicWorks = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Uint(10), sc_1);
    const sc_2 = sc_1.loadRef().beginParse();
    const _votes = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Uint(20), sc_2);
    const _crowdFund = Dictionary.load(Dictionary.Keys.Uint(10), Dictionary.Values.Uint(10), sc_2);
    return { $$type: 'JettonMinterSharded$Data' as const, totalSupply: _totalSupply, totalAccounts: _totalAccounts, treasurySurplus: _treasurySurplus, treasuryDeficits: _treasuryDeficits, owner: _owner, treasuryAccount: _treasuryAccount, jettonContent: _jettonContent, jettonWalletCode: _jettonWalletCode, jettonWalletInitialCode: _jettonWalletInitialCode, mintable: _mintable, version: _version, walletVersion: _walletVersion, tosHash: _tosHash, mbrpAmount: _mbrpAmount, publicWorks: _publicWorks, votes: _votes, crowdFund: _crowdFund };
}

export function loadTupleJettonMinterSharded$Data(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _totalAccounts = source.readBigNumber();
    const _treasurySurplus = source.readBigNumber();
    const _treasuryDeficits = source.readBigNumber();
    const _owner = source.readAddress();
    const _treasuryAccount = source.readAddress();
    const _jettonContent = source.readCell();
    const _jettonWalletCode = source.readCell();
    const _jettonWalletInitialCode = source.readCell();
    const _mintable = source.readBoolean();
    const _version = source.readBigNumber();
    const _walletVersion = source.readBigNumber();
    const _tosHash = source.readString();
    const _mbrpAmount = source.readBigNumber();
    source = source.readTuple();
    const _publicWorks = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Uint(10), source.readCellOpt());
    const _votes = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Uint(20), source.readCellOpt());
    const _crowdFund = Dictionary.loadDirect(Dictionary.Keys.Uint(10), Dictionary.Values.Uint(10), source.readCellOpt());
    return { $$type: 'JettonMinterSharded$Data' as const, totalSupply: _totalSupply, totalAccounts: _totalAccounts, treasurySurplus: _treasurySurplus, treasuryDeficits: _treasuryDeficits, owner: _owner, treasuryAccount: _treasuryAccount, jettonContent: _jettonContent, jettonWalletCode: _jettonWalletCode, jettonWalletInitialCode: _jettonWalletInitialCode, mintable: _mintable, version: _version, walletVersion: _walletVersion, tosHash: _tosHash, mbrpAmount: _mbrpAmount, publicWorks: _publicWorks, votes: _votes, crowdFund: _crowdFund };
}

export function loadGetterTupleJettonMinterSharded$Data(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _totalAccounts = source.readBigNumber();
    const _treasurySurplus = source.readBigNumber();
    const _treasuryDeficits = source.readBigNumber();
    const _owner = source.readAddress();
    const _treasuryAccount = source.readAddress();
    const _jettonContent = source.readCell();
    const _jettonWalletCode = source.readCell();
    const _jettonWalletInitialCode = source.readCell();
    const _mintable = source.readBoolean();
    const _version = source.readBigNumber();
    const _walletVersion = source.readBigNumber();
    const _tosHash = source.readString();
    const _mbrpAmount = source.readBigNumber();
    const _publicWorks = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Uint(10), source.readCellOpt());
    const _votes = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Uint(20), source.readCellOpt());
    const _crowdFund = Dictionary.loadDirect(Dictionary.Keys.Uint(10), Dictionary.Values.Uint(10), source.readCellOpt());
    return { $$type: 'JettonMinterSharded$Data' as const, totalSupply: _totalSupply, totalAccounts: _totalAccounts, treasurySurplus: _treasurySurplus, treasuryDeficits: _treasuryDeficits, owner: _owner, treasuryAccount: _treasuryAccount, jettonContent: _jettonContent, jettonWalletCode: _jettonWalletCode, jettonWalletInitialCode: _jettonWalletInitialCode, mintable: _mintable, version: _version, walletVersion: _walletVersion, tosHash: _tosHash, mbrpAmount: _mbrpAmount, publicWorks: _publicWorks, votes: _votes, crowdFund: _crowdFund };
}

export function storeTupleJettonMinterSharded$Data(source: JettonMinterSharded$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeNumber(source.totalAccounts);
    builder.writeNumber(source.treasurySurplus);
    builder.writeNumber(source.treasuryDeficits);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.treasuryAccount);
    builder.writeCell(source.jettonContent);
    builder.writeCell(source.jettonWalletCode);
    builder.writeCell(source.jettonWalletInitialCode);
    builder.writeBoolean(source.mintable);
    builder.writeNumber(source.version);
    builder.writeNumber(source.walletVersion);
    builder.writeString(source.tosHash);
    builder.writeNumber(source.mbrpAmount);
    builder.writeCell(source.publicWorks.size > 0 ? beginCell().storeDictDirect(source.publicWorks, Dictionary.Keys.Address(), Dictionary.Values.Uint(10)).endCell() : null);
    builder.writeCell(source.votes.size > 0 ? beginCell().storeDictDirect(source.votes, Dictionary.Keys.Address(), Dictionary.Values.Uint(20)).endCell() : null);
    builder.writeCell(source.crowdFund.size > 0 ? beginCell().storeDictDirect(source.crowdFund, Dictionary.Keys.Uint(10), Dictionary.Values.Uint(10)).endCell() : null);
    return builder.build();
}

export function dictValueParserJettonMinterSharded$Data(): DictionaryValue<JettonMinterSharded$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonMinterSharded$Data(src)).endCell());
        },
        parse: (src) => {
            return loadJettonMinterSharded$Data(src.loadRef().beginParse());
        }
    }
}

 type JettonWalletSharded_init_args = {
    $$type: 'JettonWalletSharded_init_args';
    owner: Address;
    minter: Address;
    balance: bigint;
    treasury: Address;
}

function initJettonWalletSharded_init_args(src: JettonWalletSharded_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.minter);
        b_0.storeCoins(src.balance);
        b_0.storeAddress(src.treasury);
    };
}

async function JettonWalletSharded_init(owner: Address, minter: Address, balance: bigint, treasury: Address) {
    const __code = Cell.fromHex('b5ee9c7242020178000100009b2200000114ff00f4a413f4bcf2c80b0001020162000201570484d0eda2edfb01d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e90fa40fa40fa00fa40553004d15502db3ce30d1127e302705626d74920c21f016301740003001d04c411258020d7217021d749c21f9430d31f01de20c0448fc7303605d200013120b301e30f09c87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54e020c034000400060155000801f8112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0005014a0e11100e10df10ce10bd10ac109b108a10791068517210571046451504038218e8d4a5100000cd01f8112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f000701d80e11100e10df10ce10bd10ac109b108a1079106807104610354430128218e8d4a510008ebdeda2edfb561a561c6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571c5cbe9c571b01111a01a1111970db31e1a170111b9131e2e301e2d801111e01a0111d09a400e602fe8efc30fa000131aa00111581010b245617206e953059f4593098c801fa024133f441e201111c011115a007a4112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c07111d07111a111c111a1119111b11191118111a1118111711191117111611181116e0000e0009045c20c0078e9b30fa0001315333111681010bf45930111501112601112756275627e020c031e30220c017e30220c005000a000d000f001101fc20c101915b8e6a561f21be983101111e01a1111de0201120a17020561e81010b2559f40a6fa1318e1930561d81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111e0301111e01206e953059f4593098c801fa024133f441e201111c01111ea0111a111d111a111be20211110281010b0201112801000b01f81127206e953059f4593098c801fa024133f441e207a5112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113000c01c6111211141112111111131111111011121110071111070e11100e10df10ce10bd10ac109b108a095516c87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015501fa30fa000131230111150181010b015616206e953059f4593098c801fa024133f441e201111c011114a007a4112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c07111d07111a111c111a1119111b11191118111a1118111711191117111611181116000e01ea1115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a095516c87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015501fa5b522e81010bf4593007a5112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112111111131111001001ae1110111211100f11110f0e11100e107f10ce10bd10ac109b108a095516c87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed540155041ee30220c008e30220c009e30220c035001200140015001701fe30fa0001311e81010b5242206e953059f4593098c801fa024133f441e207a4112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114001301d21113111511131112111411121111111311111110111211100f11110f0e11100e107f10ce10bd10ac109b108a095516c87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015501f630fa00d20059303101111c01a0112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111d111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112111111131111001c01fc30fa00013101111c01a0112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111d111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112111111131111111011121110001601b60f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035443012c87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015502fe8efd5b112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f015100180234e0208210178d4519bae30282107bdd97debae3025f0f5f0f5f090019001b01f830d33fd309fa0055206c312082103b9aca00be9701111c01a0111b9130e25623c8cf8508ce70cf0b6ec98042fb00112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117001a01e01116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551cc87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015501f4d33ffa00596c2101111c01a0112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111d111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112111111131111001c01c21110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035443012c87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015504fce30021c00001c121b0e302c0008ea91125f90182f0535d44514554aee036c09a39063fe878ca30a50cb9b5f8f6f1ec24f13e3169e9bae302925725e2112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b1119001e0150015201540444315626d70b1f2082100f8a7ea5bae302208210178d4519bae30220c001e30220c052001f00a300b000b803ec5b11258020d721d33ffa00fa40d72c01916d93fa4001e201f404fa00f84220562cc705f2e2bc2d917f982682103b9aca00b9e2f2e2be25fa4430f2d08a21d749c200f2e2e3f8416f24135f0382101dcd6500bcf2e2bf2682103b9aca00bee30f7080506d2205112c05270504112c0403112e03112bc800200028009f02fc343a5bf8235321c705b3e303112511281125112411271124112311261123112211281122112111271121112011261120111f1128111f111e1127111e111d1126111d111c1128111c111b1127111b111a1126111a1119112811191118112711181117112611171116112811161115112711151114112611141113112811130021002701f6323336112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112002202d81111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046103510241023db3cc87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db310023015501f020718064a986112611281126112511271125112411281124112311271123112211281122112111271121112011281120111f1127111f111e1128111e111d1127111d111c1128111c111b1127111b111a1128111a111911271119111811281118111711271117111611281116111511271115111411281114002401a81113112711131112112811121111112711111110112811100f11270f0e11280e0d11270d0c11280c0b11270b0a11280a091127090811280807112707061128060511270504112804031127030211280201112701002501faf82327a1218218174876e800a90612a0561ac2009c561a5882109ca41900a986a09131e2111e561ea120c2fff2e2c501111c01111ea0111b70112880401128c85980415003cb1fce01fa02c9021128020111270156240140337fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112311251123112211241122002600ec112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e551d01981112112711121111112611111110112811100f11270f0e11260e0d11280d0c11270c0b11260b0a11280a091127090811260807112807061127060504112804031127030201112901112a56270083044c26821005f5e100bae3022682100bebc200bae30226821011e1a300bae30226821017d78400ba00290033003b004201fa145f046c22112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112002a02d81111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046103510241023db3cc87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31002b015501f42b8100fab9f2e0fa112511271125112411261124112311271123112211261122112111271121112011261120111f1127111f111e1126111e111d1127111d111c1126111c111b1127111b111a1126111a111911271119111811261118111711271117111611261116111511271115111411261114111311271113002c01a41112112611121111112711111110112611100f11270f0e11260e0d11270d0c11260c0b11270b0a11260a09112709081126080711270706112606051127050411260403112703021126020111270111265627002d01d6205627c705917f95562121c705e2917f9c561681010b2259f40a6fa131e2917f9c561081010b2259f40a6fa131e2917f9c561781010b2259f40a6fa131e292307f9c81010b56120259f40a6fa131e2917f9170e2b3f2e2cf708050f82a2602562902562502112c6d5530c8002e01f45550715007cb1f15cb09c8246eb38e1d7f01ca0004206ef2d0806f24104703c8ce14cd01c8cecd02c8ce12cdce9634705004ca00e212cece12cc12cecdc9112511271125112411261124112311271123112211261122112111271121112011261120111f1127111f111e1126111e111d1127111d111c1126111c002f01f8111b1127111b111a1126111a1119112711191118112611181117112711171116112611161115112711151114112611141113112711131112112611121111112711111110112611100f11270f0e11260e0d11270d0c11260c0b11270b0a11260a09112709081126080711270706112606051127050411260403112703003001a20211260201112701112656295624705625f82ac87001ca0055315034cece01fa02cec93152100411290403112a0302112802103410237f59112c800bd721d30730105610451034413001112c0155505505003101fac85a80285003cb057601cb03ccccc9c87101cb0113ca00830901cb0d22f90058018100f8a92801aaf7b101cbff58fa027301cb6accf400c901fb00112111251121112011241120111f1123111f111e1122111e111d1121111d111c1120111c111b111f111b111a111e111a1119111d11191118111c11181117111b1117003200a21116111a11161115111911151114111811141113111711131112111611121111111511111110111411100f11130f0e11120e0d11110d0c11100c10bf10ae109d108c107b106a105910481037464405431301fa145f046c22112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112003402e81111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035102410238219d1a94a200001db3cc87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db310035015501f42c8100fab9f2e0fa112511281125112411271124112311261123112211281122112111271121112011261120111f1128111f111e1127111e111d1126111d111c1128111c111b1127111b111a1126111a111911281119111811271118111711261117111611281116111511271115111411261114111311281113003601a41112112711121111112611111110112811100f11270f0e11260e0d11280d0c11270c0b11260b0a11280a09112709081126080711280706112706051126050411280403112703021126020111280111275626003701f8205627c705917f95562121c705e2917f9c561681010b2259f40a6fa131e2917f9c561081010b2259f40a6fa131e2917f9c561781010b2259f40a6fa131e292307f9c81010b56120259f40a6fa131e2917f9170e2b3f2e2cf112511261125112411251124112311241123112211231122112111221121112011211120003802fe111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550edb3c70112956278050112ac85520765004cb1f58fa02cecec9016d003901fa13021129020111280140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115003a00541114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551c01fe30112a112c112a1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116003c02fa1115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac2410ac109b108a10895560db3cc87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31003d015501ee6c61561381010b2359f40a6fa131f2e2c2561381010b2359f40a6fa193fa003092306de2206ef2d080112511281125112411271124112311261123112211281122112111271121112011261120111f1128111f111e1127111e111d1126111d111c1128111c111b1127111b111a1126111a111911281119003e01ec1118112711181117112611171116112811161115112711151114112611141113112811131112112711121111112611111110112811100f11270f0e11260e0d11280d0c11270c0b11260b0a11280a09112709081126080711280706112706051126050411280403112703021126020111280111275627003f03e68ebdeda2edfb561a561c6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571c5cbe9c571b01111a01a1111970db31e1a170111b9131e2e301e2d801111e01a0111d111581010b56275629206e953059f4593098c801fa024133f441e211155626db3c3570112856268050112bc800e6016d004001f85520775004cb1f58fa02cecec91035021128020111290140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb005623011124010f81010bf4593006a4112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c1119004100b01118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f061111060d11100d10cf10be10ad109c108b107a0910581047103641050402fe8efc10575f07112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112111111131111e00043004401ca1110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610354430125722c87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db310155044c2682101dcd6500bae30226821023c34600bae30226821029b92700bae3022682102faf0800ba004500470049005101fa145f046c22112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112004602d81111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046103510241023db3cc87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db310168015501fc112b112d112b112a112c112a1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117004802a81116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1089078218e8d4a510007f274879103644554313db3c004b014f01fc112b112d112b112a112c112a1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117004a02a81116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1089078218e8d4a5100070274879103644554313db3c004b014f01f46c611125112a11251124112911241123112811231122112711221121112611211120112a1120111f1129111f111e1128111e111d1127111d111c1126111c111b112a111b111a1129111a1119112811191118112711181117112611171116112a1116111511291115111411281114111311271113111211261112004c01981111112a11111110112911100f11280f0e11270e0d11260d0c112a0c0b11290b0a11280a091127090811260807112a070611290605112805041127040311260302112a02011129011128562a004d01f4f82327a1218218174876e800a90612a0561ac2009c561a5882109ca41900a986a09131e2111e561ea120c2fff2e2c501111c01111ea0111b112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b004e02ee111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550edb3c01112a0111297011288050112ac85530785005cb1f5003fa02ca00cecec903112803021126020111270140037f016d004f01fac8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112111251121112011241120111f1123111f111e1122111e111d1121111d111c1120111c111b111f111b111a111e111a1119111d11191118111c11181117111b11171116111a11161115111911151114111811141113111711131112111611121111111511110050005a1110111411100f11130f0e11120e0d11110d0c11100c10bf10ae109d108c107b106a1059104810374614503305043ce30226821035a4e900bae302268210068e7780bae30226821007270e00ba0052005a0060006301fc112b112d112b112a112c112a1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117005302a41116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1089078218e8d4a510005415765044451503db3c0054014f01f46c61112511291125112411281124112311271123112211261122112111291121112011281120111f1127111f111e1126111e111d1129111d111c1128111c111b1127111b111a1126111a111911291119111811281118111711271117111611261116111511291115111411281114111311271113111211261112005501981111112911111110112811100f11270f0e11260e0d11290d0c11280c0b11270b0a11260a09112909081128080711270706112606051129050411280403112703021126020111290111285626005601f4f82327a1218218174876e800a90612a0561ac2009c561a5882109ca41900a986a09131e2111e561ea120c2fff2e2c501111c01111ea0111b112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b005702e4111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e1129db3c11297011288050112ac85520795004cb1f58fa02cecec903112903021127020111280140037f016d005801fac8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a11171116111911161115111811151114111711141113111611131112111511120059003a1111111411111110111311100f11120f0e11110e0d11100d10cf552b1201fe30112a112c112a1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116005b02fa1115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac2410ac109b108a10895560db3cc87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31005c015501f6365f04112611281126112511271125112411281124112311271123112211281122112111271121112011281120111f1127111f111e1128111e111d1127111d111c1128111c111b1127111b111a1128111a111911271119111811281118111711271117111611281116111511271115111411281114111311271113005d02ec1112112811121111112711111110112811100f11270f0e11280e0d11270d0c11280c0b11270b0a11280a0911270908112808071127070611280605112705041128040311270302112802011127011128db3c7070112a56288050112bc855207a5004cb1f58fa02cecec9443002112a02011129014343016d005e01fac8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113005f00381112111411121111111311111110111211100f11110f0e11100e551d01fc5f08112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f006102ca0e11100e10df551c56116e936d5712df88c88258c000000000000000000000000101cb67ccc970fb00c87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db3100620155003400000000636c656172656450656e64696e67526571756573747302fe8efd145f046c22112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411120064006902d81111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046103510241023db3cc87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db310065015501f05210111281010bf459f2e2cd112411271124112311261123112211251122112111271121112011261120111f1125111f111e1127111e111d1126111d111c1125111c111b1127111b111a1126111a111911251119111811271118111711261117111611251116111511271115111411261114111311251113006602e61112112711121111112611111110112511100f11270f0e0d11250d0c11270c0b0a11250a09112709080711250706112706050411250403112703020111250111278218e8d4a5100011285626db3c3570112956268050112ac85520755004cb1f58fa02cecec91035021129020111280140037f016d006701fec8cf8580ca00cf8440ce01fa02806acf40f400c901fb0006a5112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a11171116111911161115111811151114111711141113111611131112111511120068005c1111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b107a091058104710364150140454e026821007bfa480bae30226821008583b00bae3026c223223821008f0d180bae30223821009896800ba006a00710078007a01fe30112a112c112a1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116006b02fa1115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac2410ac109b108a10895560db3cc87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31006c015501f26c615210111981010bf459f2e2d12081010b2359f40a6fa193fa003092306de2206ef2d080112511281125112411271124112311261123112211281122112111271121112011261120111f1128111f111e1127111e111d1126111d111c1128111c111b1127111b111a1126111a111911281119111811271118006d01b41117112611170111160111151127111511141126111401111301111211271112111111261111011110010f11270f0e11260e1d0c11270c0b11260b1a091127090811260817061127060511260514031127030211260211275627006e02fef82327a1218218174876e800a90612a0561ac2009c561a5882109ca41900a986a09131e2111e561ea120c2fff2e2c501111c01111ea0111b5626db3c357080501129ab0001562701112bc8552080345004cb1f58fa02cecec91035021129020111280140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb0006a5016d006f01fc112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d0070002c10cf10be10ad109c108b107a0910581047103641501401fe30112a112c112a1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116007202fa1115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac2410ac109b108a10895560db3cc87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db310073015501f66c61561781010b2359f40a6fa131f2e2d0561781010b2359f40a6fa193fa003092306de2206ef2d0805220111981010bf45930112511281125112411271124112311261123112211281122112111271121112011261120111f1128111f111e1127111e111d1126111d111c1128111c111b1127111b111a1126111a007401ca111911281119111811271118111711261117111611281116111511141126111411131128111311121111112611111110112811100f0e11260e0d11280d0c0b11260b0a11280a09081126080711280706051126050411280403021126020111280156265628007502fc20c101915b8e6a561f21be983101111e01a1111de0201120a17020561e81010b2559f40a6fa1318e1930561d81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111e0301111e01206e953059f4593098c801fa024133f441e201111c01111ea0111a111d111a111be25626db3c3570112856268050016d007601fe112bc8552080315004cb1f58fa02cecec91035021128020111290140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb0006a5112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a1117007700981116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b107a0910581047103641050401f810245f04112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112111111131111007901aa1110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610354430128d0860000000000000000000000000000000000000000000000000000000000000000004c705b3f2e2bc27f2e2be014f04fee3022382100a21fe80bae302238209312d00ba93f2c2c0e30e02112a020111290104112804031127031126041125040311240311230411220403112103112004111f0403111e03111d04111c0403111b03111a04111904031118031117041116040311150311140411130403111203111104111004103f0e104d103c0b104a007b007d0080009e01fc5f05112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f007c01940e11100e10df551c572456241124c87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015501fc5f05112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f007e02ba0e11100e10df551c88c88258c000000000000000000000000101cb67ccc970fb00c87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31007f0155002200000000636c61696d6564206772616e7403f82382103a699d00ba917f9823821006052340bae2e30f112a01112901112511281125112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a111711161119111600810084009d01fc112511281125112411271124112311261123112211281122112111271121112011261120111f1128111f111e1127111e111d1126111d111c1128111c111b1127111b111a1126111a111911281119111811271118111711261117111611281116111511271115111411261114111311281113111211271112111111261111008201961110112811100f11270f0e11260e0d11280d0c11270c0b11260b0a11280a091127090811260807112807061127060511260504112804031127030211260201112901112a8218174876e80000830070f82327a1218218174876e800a90612a0561ac2009c561a5882109ca41900a986a09131e2111e561ea120c2fff2e2c501111c01111ea0111b044c2382103b023380bae30223821006146580bae3022382103b8b87c0bae3022382101ddca740ba008500870089008b01fa10245f040111130181010b017071216e955b59f4593098c801cf004133f441e21111a4112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115008601ec11141116111411131115111311111114111111131110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610354430c87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015501f610245f0401111381010bf45930112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131114111111131111008801c41110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610354403c87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015501fc5f0511231125112311221124112256211124112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112111111131111111011121110008a019c0f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046103544030282100bebc20070801127c801803858cb1fcb09c94343c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00014f02fe8efc10245f04112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112111111131111e0008c008d01ba1110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035443012804056277003561fc8552080425004cb1f12cece01fa02c95626503340137fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00014f049423821017e6c640ba917f9823821017f60880bae2917f9823821018148d00bae2e3022382101a76e700bae302238210069db9c0bae3022382100db58580ba917f982382100e4e1c00bae2008e00910092009601f810345f04112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112111111131111008f014e1110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035443012009001b48e57eda2edfb56197022821017e6c640ba9c303157198218174876e800208e2b22821017f60880ba9c303157198218746a528800208e1302821018148d00ba965b705719db31e0111a01e2e201111a01bc965717f8231117ded8014f01fc5f05112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f015301fc5f05112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0093028c0e11100e10df551cdb3cc87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db310094015502f6f823f8232382015180a0bc9827a18209e13380b9923070e2f2e2df8212540be4008ebdeda2edfb561a561c6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571c5cbe9c571b01111a01a1111970db31e1a170111b9131e2e301e2d801111e01a0111d31f823820898968073708212540be4005629c800e6009500565980465003cb1f01fa02cec956275530441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb000102fe8efa5b32112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112e0112a0097009c02d81111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046103510244300db3cc87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db310098015501ec29f2e2be112411271124112311261123112211251122112111271121112011261120111f1125111f111e1127111e111d1126111d111c1125111c111b1127111b111a1126111a111911251119111811271118111711261117111611251116111511271115111411261114111311251113111211271112009902fa1111112611111110112511100f11270f0e11260e0d11250d0c11270c0b11260b0a11250a091127090811260807112507061127060511260504112504031127030211260201112501112770112780501129db3c5620206ef2d08001112801562701562301c8553080525005cb1f5003fa02cececec90311280302112902016d009a01fc0111270140337fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a1117111611191116111511181115111411171114111311161113009b006c1112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b107a10691058104710364513504200fc0111290104112804031127030211260204112504031124030211230204112204031121030211200204111f0403111e0302111d0204111c0403111b0302111a0204111904031118030211170204111604031115030211140204111304031112030211110204111004103f102e104d103c102b104a10391028104710361025008c1115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b107a10691058104710361025001210390810471036451501f655608210178d45195008cb1f16cb3f14cb0958fa02ce01206e9430cf84809201cee201fa02cec9112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a111911181119111811171118111700a001f41116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a1089107810671056104510341127550256295624705625f82ac87001ca0055315034cece01fa02cec93152100411280403112a0302112902103410237f59112c00a101f8800bd721d30730105610451034413001112c0155505505c85a80285003cb057601cb03ccccc9c87101cb0113ca00830901cb0d22f90058018100f8a92801aaf7b101cbff58fa027301cb6accf400c901fb00112111251121112011241120111f1123111f111e1122111e111d1121111d111c1120111c111b111f111b00a201d0111a111e111a1119111d11191118111c11181117111b11171116111a11161115111911151114111811141113111711131112111611121111111511111110111411100f11130f0e11120e0d11110d0c11100c10bf10ae109d108c107b106a10591048103746440503014f01fc5b11258020d721d33f31d309fa00fa40d72c01916d93fa4001e230fa0031112511271125112411261124112311271123112211261122112111271121112011261120111f1127111f111e1126111e111d1127111d111c1126111c111b1127111b111a1126111a11191127111911181126111811171127111711161126111600a402fc1115112711151114112611141113112711131112112611121111112711111110112611100f11270f0e11260e0d11270d0c11260c0b11270b0a11260a09112709081126080711270706112606051127050411260403112703021126020111280111295628db3c112511261125112411251124112311241123112211231122013e00a501e8112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e112700a604f65304ba91308eba24bc8e2ff84282100bebc20070801127c801803858cb1fcb09c94343c8cf8580ca00cf8440ce01fa02806acf40f400c901fb008e84f842db3ce2e2562682103b9aca00bee30f56251129112511281125112411271124112311261123112211251122112111241121112011231120111f1122111f014700a700a800af019256268ebdeda2edfb561a561c6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571c5cbe9c571b01111a01a1111970db31e1a170111b9131e2e301e2d801111e01a0111d00e6024856268209312d00ba8e98562682103a699d00ba9a111d8218174876e800a0e30e111de30d00a900ae03de5626821006052340ba8ed2562757258218174876e8008ebdeda2edfb561a561c6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571c5cbe9c571b01111a01a1111970db31e1a170111b9131e2e301e2d801111e01a0111d8f0d562682100623a7c0bae3035627e2111d00e600aa00ac01f8572657265726112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f00ab01940e11110e0d11100d10cf10be552ac87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015501ee561581010b2259f40a6fa131f2e2e0561581010b22714133f40a6fa19401d70030925b6de2206ef2d080b3f2e2e1561472a906561401be99f82327a182015180bc9170e28e290111150181010b017f71216e955b59f4593098c801cf004133f441e21112a401112501111211141112e30d01112501111200ad00ca3057125724562270561481010b7159f4826fa520965023d7003058966c216d326d01e2908e3d8e1d111581010b56167071216e955b59f4593098c801cf004133f441e21115de81010b561602714133f4746fa520965023d7003058966c216d326d01e2e85b00f656278218e8d4a5100020c101915b8e6a561f21be983101111e01a1111de0201120a17020561e81010b2559f40a6fa1318e1930561d81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111e0301111e01206e953059f4593098c801fa024133f441e201111c01111ea0111a111d111a111be201fa111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b107a1069105810471036454013012e01fa5b11258020d721d309d430d0d200018e12d401d001d401d001d401d001fa4055305f04defa40fa40d4112511281125112411271124112311261123112211281122112111271121112011261120111f1128111f111e1127111e111d1126111d111c1128111c111b1127111b111a1126111a11191128111911181127111800b102fe1117112611171116112811161115112711151114112611141113112811131112112711121111112611111110112811100f11270f0e11260e0d11280d0c11270c0b11260b0a11280a091127090811260807112807061127060511260504112804031127030211260201112901112a5627db3c571e571e571e571e23b3f2e2d3013e00b202fe562356245624562956285622bc9657211128fb048e95572911275620b9e300112611271126111f1126111fe282084c4b4073707020562a562ec8553082107362d09c5005cb1f13cb3f01fa02cecec956285530441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0082089896807370562603021129020111280100b300b601f8f8421124112611241123112511231122112411221121112311210111220102112102112011271120111f1128111f111c111e111c111b111d111b111a111c111a1119111b11191118111a111811171119111711161118111611151117111511141116111411131115111311121114111211111113111111101112111000b402fc0f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046103504112704031128030211270201112801db3c111e1127111e111f1126111f111e1125111e111f1124111f111e1123111e111f1122111f111e1121111e111f1120111f03111f0302111e0201111d01111c01111b01111a01111901111801111701014700b5002c111601111501111401111301111201111101111055d101f6112cc8553080515005cb1f13cecececec956220403112a0302112702112601441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112011251120111f1124111f111e1123111e111d1122111d111d1121111d111c111e111c1118111d11181117111c11171116111b11161115111a111511141119111400b701d81113111811131112111711121111111611111110111511100f11140f0e11130e0d11120d0c11110c0b11100b10af5549c87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015502fe8efc5b11258020d721fa00fa40fa40fa4030112511271125112411261124112311271123112211261122112111271121112011261120111f1127111f111e1126111e111d1127111d111c1126111c111b1127111b111a1126111a111911271119111811261118111711271117111611261116111511271115111411261114e000b900c704fe1113112711131112112611121111112711111110112611100f11270f0e11260e0d11270d0c11260c0b11270b0a11260a09112709081126080711270706112606051127050411260403112703021126020111280111295626db3c37561e6eb39c561e206ef2d080562601c7059170e2f2e2e4562682100db58580bae30f5300013e00ba00bb00bc00027f00027003fa8edf1125112611251124112611241123112611231122112611221121112611218218e8d4a510005627112211211120111f111e111d111c111b111a11191118111711161115111411131112111111100f0e0d0c0b491a1028401706050403112801e30d561f11251126112511241125112411231124112311221123112200bd00be00c000ea20c101915b8e6a561f21be983101111e01a1111de0201120a17020561e81010b2559f40a6fa1318e1930561d81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111e0301111e01206e953059f4593098c801fa024133f441e201111c01111ea0111a111d111a111be23408a501fc112511261125112411261124112311261123112211261122112111261121112011261120111f1126111f111e1126111e111d1126111d111c1126111c111b1126111b111a1126111a11191126111911181126111811171126111711161126111611151126111511141126111411131126111311121126111211111126111100bf01f61110112611100f11260f0e11260e0d11260d0c11260c0b11260b0a11260a0911260908112608556011268218e8d4a510008ebdeda2edfb561a561c6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571c5cbe9c571b01111a01a1111970db31e1a170111b9131e2e301e2d801111e01a0111d3408a400e601fc112111221121112011211120111f1120111f561e1120111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc102b00c101fc109a108910781617104513444056280201112b01562a01f8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0011251127112511241126112411231125112300c201fc112211241122112111231121112011221120111f1121111f561e1121111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e00c301f810df10ce10bd10ac109b108a107910681057104610354430520302112b0201112bf8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0011231125112300c401fc112211241122112111251121112011241120111f1125111f820afaf080801156261121112011281120111f111e1128111e111d111c1128111c111b111a1128111a111911181128111811171116112811161115111411281114111311121128111211111110112811100f0e11280e0d0c11280c0b0a11280a09081128080700c502fe0611280605041128040302112802011127db3c01112901562101562701112cc8553080445005cb1f13ca00cececec903112703021126020111290140337fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112111251121112011241120111f1123111f111e1122111e111d1121111d111c1120111c111b111f111b016d00c601a8111a111e111a1119111d11191118111c11181117111b11171116111a11161115111911151114111811141113111711131112111611121111111511111110111411100f11130f0e11120e0d11110d0c11100c553b014f042420c044e30220c034e30220c006e30220c00700c800d600db00e101fa5b11258020d721d200fa4031fa40fa4030112511261125112411261124112311261123112211261122112111261121112011261120111f1126111f111e1126111e111d1126111d111c1126111c111b1126111b111a1126111a11191126111911181126111811171126111711161126111611151126111511141126111400c904ca1113112611131112112611121111112611111110112611100f11260f0e11260e0d11260d0c11260c0b11260b0a11260a09112609081126080711260706112606051126050411260403112603021126020111270111285627db3c8219d1a94a20005627e30f013e00ca00cc00ce01fe111781010b56295619206e953059f4593098c801fa024133f441e2112511261125112411261124112311261123112211261122112111261121112011261120111f1126111f111e1126111e111d1126111d111c1126111c111b1126111b111a1126111a1119112611191118112611181117112611171116111511141113111200cb01a21111111055e056268ebdeda2edfb561a561c6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571c5cbe9c571b01111a01a1111970db31e1a170111b9131e2e301e2d801111e01a0111d09a400e601f2562801111881010bf45930112511261125112411261124112311261123112211261122112111261121112011261120111f1126111f111e1126111e111d1126111d111c1126111c111b1126111b111a1126111a111911261119111811261118111711261117111611151114111311121111111055e05628562700cd00e820c101915b8e6a561f21be983101111e01a1111de0201120a17020561e81010b2559f40a6fa1318e1930561d81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111e0301111e01206e953059f4593098c801fa024133f441e201111c01111ea0111a111d111a111be209a502fc88d056261128112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a111911181119111811171118111711161117111611151116111511141115111411131114111300cf00d0002400000000696e76697465207375636365737301641112111311121111111211111110111111100f11100f10ef10de10cd102c10ab109a108910781067105610451034562a431300d101c0f8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0056285627821aba7def300000d202fe821005f5e10073707005926d36df4430562b5006c8553082107bdd97de5005cb1f13cb3f01fa02ce01206e9430cf84809201cee2c956275044441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0082089896807370708218e8d4a5100088d0562b01c8553082107362d09c5005cb1f13cb3f01fa02cecec9562b00d300d4002800000000696e766974656420617070726f76656401fc5530441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0082089896801127737056280201112b01112cc8553080445005cb1f13ca00cececec95624040311280302112a02112901441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112211251122112111241121112011231120111f1122111f00d501d0111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d552c014f01fa5b11258020d721fa00fa40112511261125112411261124112311261123112211261122112111261121112011261120111f1126111f111e1126111e111d1126111d111c1126111c111b1126111b111a1126111a11191126111911181126111811171126111711161126111611151126111511141126111411131126111300d702fe1112112611121111112611111110112611100f11260f0e11260e0d11260d0c11260c0b11260b0a11260a09112609081126080711260706112606051126050411260403112603021126020111270111285627db3c56205628c705f2e2d156251127112511261125112411251124112311241123112211231122112111221121013e00d801fc112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a108910781067105600d901f61045103441305628541220112bf8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb003711241126112411231125112311221124112211211123112100da01fc112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079700900ee01fe5b11258020d721fa00fa402a8100fab9f2e0fa112511261125112411261124112311261123112211261122112111261121112011261120111f1126111f111e1126111e111d1126111d111c1126111c111b1126111b111a1126111a11191126111911181126111811171126111711161126111611151126111511141126111400dc02f81113112611131112112611121111112611111110112611100f11260f0e11260e0d11260d0c11260c0b11260b0a11260a09112609081126080711260706112606051126050411260403112603021126020111270111285627db3c56251127112511261125112411251124112311241123112211231122112111221121013e00dd01fc112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a108910781067105600de01e01045103441305628541220112bf8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb000211110281010b0201112701112800df01fc206e953059f4593098c801fa024133f441e2112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a111811171119111711161118111611151117111511141116111411131115111311121114111200e001ce11111113111111101112111011110e11100e10df10ce10bd10ac109b108a10791068105710461035440302c87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015502fe8efd5b11258020d721fa00fa40112511261125112411261124112311261123112211261122112111261121112011261120111f1126111f111e1126111e111d1126111d111c1126111c111b1126111b111a1126111a11191126111911181126111811171126111711161126111611151126111511141126111411131126111300e200e802f81112112611121111112611111110112611100f11260f0e11260e0d11260d0c11260c0b11260b0a11260a09112609081126080711260706112606051126050411260403112603021126020111270111285627db3c56251127112511261125112411251124112311241123112211231122112111221121112011211120013e00e301fc111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a108910781067105610451034413000e401bc5628541220112bf8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00562700e502f68ebdeda2edfb561a561c6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571c5cbe9c571b01111a01a1111970db31e1a170111b9131e2e301e2d801111e01a0111d0211150281010b02011127011128206e953059f4593098c801fa024133f441e207a411231125112311221124112211211123112100e600e700ee561b81010bf4826fa5209502fa00305895316d326d01e2908e5b22c101935bdb31e05320be91209122e266a15033a1228e1e01111d0181010b01561e5004206e953059f4593098c801fa024133f441e29a3220111d81010bf45930e281010b21111e59f4746fa5209502fa00305895316d326d01e2e85b01fa112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114071115071112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a0910685515014f0426e020c031e30220c017e30220c005e30220c00800e900ef00f500fc01fa5b11258020d721fa00fa40112511261125112411261124112311261123112211261122112111261121112011261120111f1126111f111e1126111e111d1126111d111c1126111c111b1126111b111a1126111a11191126111911181126111811171126111711161126111611151126111511141126111411131126111300ea02f81112112611121111112611111110112611100f11260f0e11260e0d11260d0c11260c0b11260b0a11260a09112609081126080711260706112606051126050411260403112603021126020111270111285627db3c56251127112511261125112411251124112311241123112211231122112111221121112011211120013e00eb01fc111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a108910781067105610451034413000ec01fe5628541220112bf8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00562601111681010bf4593011251127112511241126112411231125112311221124112200ed01fc112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a111811171119111711161118111611171114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a107900ee01fa106810571046103544301220c101915b8e6a561f21be983101111e01a1111de0201120a17020561e81010b2559f40a6fa1318e1930561d81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111e0301111e01206e953059f4593098c801fa024133f441e201111c01111ea0111a111d111a111be2014f01fe5b11258020d721fa00fa402a8100fab9f2e0fa112511261125112411261124112311261123112211261122112111261121112011261120111f1126111f111e1126111e111d1126111d111c1126111c111b1126111b111a1126111a11191126111911181126111811171126111711161126111611151126111511141126111400f002f81113112611131112112611121111112611111110112611100f11260f0e11260e0d11260d0c11260c0b11260b0a11260a09112609081126080711260706112606051126050411260403112603021126020111270111285627db3c56251128112511271125112411261124112311251123112211241122112111231121013e00f101fc112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106800f201fa1057104610354430541222112af8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00111d8218e8d4a51000a00111100181010b0111278218e8d4a5100000f301f4206e953059f4593098c801fa024133f441e208a4112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111b111c111b111a111b111a1119111a111911181119111811171118111711161117111611151116111511141115111411131114111300f401c01112111311121111111211111110111111100811100810ef10de10cd10bc10ab090a5507c87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015501fa5b11258020d721fa00fa40112511261125112411261124112311261123112211261122112111261121112011261120111f1126111f111e1126111e111d1126111d111c1126111c111b1126111b111a1126111a11191126111911181126111811171126111711161126111611151126111511141126111411131126111300f602f81112112611121111112611111110112611100f11260f0e11260e0d11260d0c11260c0b11260b0a11260a09112609081126080711260706112606051126050411260403112603021126020111270111285627db3c56251127112511261125112411251124112311241123112211231122112111221121112011211120013e00f701fc111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a108910781067105610451034413000f801f45628541220112bf8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0011251127112511241126112411231125112311221124112211211123112100f902e8112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551cdb3c00fa014f01342ec000f2e2c35210111381010bf459302bc200930ba50bde111200fb00e420c101915b8e6a561f21be983101111e01a1111de0201120a17020561e81010b2559f40a6fa1318e1930561d81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111e0301111e01206e953059f4593098c801fa024133f441e201111c01111ea0111a111d111a111be202fc8efa5b11258020d721fa00d200fa4020112511281125112411271124112311261123112211281122112111271121112011261120111f1128111f111e1127111e111d1126111d111c1128111c111b1127111b111a1126111a111911281119111811271118111711261117111611281116111511271115111411261114e02000fd010302fe1113112811131112112711121111112611111110112811100f11270f0e11260e0d11280d0c11270c0b11260b0a11280a091127090811260807112807061127060511260504112804031127030211260201112901112a5626db3c3a5626953c0b11250b925726e225f2e2be2c81010b562659f40a6fa131b3f2e2c60c81010b013e00fe02fa56257f71216e955b59f4593098c801cf004133f441e20aa4f82382015180a021925728e30e56231129112311281123112211271122112111261121112011251120111f1124111f111e1123111e111d1122111d111c1121111c111b1120111b111a111f111a1119111e11191118111d11181117111c11171116111b111600ff010201fc37112311241123112211231122112111221121112011211120111f1120111f7f561f1121111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a1119111811191118111711181117111611171116111511161115111411151114111311141113111211131112111111121111010002e01110111111100f11100f5e2c102d10bc108b191a107810671056104510341023112702db3c82083d0900708209312d005410222802562b02562d0211301045c855608210178d45195008cb1f16cb3f14cb0958fa02ce01206e9430cf84809201cee201fa02cec91201112a017050237f016d0101009cc8cf8580ca00cf8440ce01fa02806acf40f400c901fb0009112709112511241123112211211120111f111e111d111c111b111a11191118111711161115111411131112111111100f0e0d55900c0b01a01115111a11151114111911141113111811131112111711121111111611111110111511100f11140f0e11130e0b11120b0c11110c0111100110af10ae108d107c106b105a104910381027103610354130012e042cc009e30220c00ae30220c035e3022082107ac8d559ba01040108012f013301fa5b11258020d721fa00fa40112511261125112411261124112311261123112211261122112111261121112011261120111f1126111f111e1126111e111d1126111d111c1126111c111b1126111b111a1126111a111911261119111811261118111711261117111611261116111511261115111411261114111311261113010502ac1112112611121111112611111110112611100f11260f0e11260e0d11260d0c11260c0b11260b0a11260a09112609081126080711260706112606051126050411260403112603021126020111270111285627db3c5627013e010601fe3b2cc200f2e2c71e81010b500b7071216e955b59f4593098c801cf004133f441e20aa4f82382015180a050ba1e56251129112511281125112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c1119010701b21118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b107a1069105810471036454013012e01fc5b11258020d721fa00fa4020112511271125112411261124112311271123112211261122112111271121112011261120111f1127111f111e1126111e111d1127111d111c1126111c111b1127111b111a1126111a111911271119111811261118111711271117111611261116111511271115111411261114111311271113010902f41112112611121111112711111110112611100f11270f0e11260e0d11270d0c11260c0b11270b0a11260a09112709081126080711270706112606051127050411260403112703021126020111280111295626db3c562701562701112a112711281127112611271126112511261125112411251124112311241123013e010a01fc112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc010b02f410ab109a10891078106710561045103403112a03db3c56251129112511281125112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a1117111611191116010c012d04f6322cc200f2e2c2f8232dbef2e2df547ede21bc209132923101e270561381010b7159f4826fa520965023d7003058966c216d326d01e2908eb12091249170e292307f97b39223b39170e2e2e30081010b561502714133f4746fa520965023d7003058966c216d326d01e2e85f04e30f112311251123112211241122010d0111012a012b01fa5312b9998219d1a94a200002a4988218e8d4a5100002e21125112c11251124112b11241123112a1123112211291122112111281121112011271120111f1126111f111e112c111e111d112b111d111c112a111c111b1129111b111a1128111a1119112711191118112611181117112c11171116112b11161115112a1115010e02ec1114112911141113112811131112112711121111112611111110112c11100f112b0f0e112a0e0d11290d0c11280c0b11270b0a11260a09112c0908112b0807112a070611290605112805041127040311260302112c0201112b01112a562bdb3c7071545101011131015280562b01562c0156311045c8016d010f01fa55608210178d45195008cb1f16cb3f14cb0958fa02ce01206e9430cf84809201cee201fa02cec9413001112f0140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb001124112b11241123112a1123112211291122112111281121112011271120111f1126111f111e1125111e111d1124111d111c1123111c011000d6111b1122111b111a1121111a1119112011191118111f11181117111e11171116111d11161115111c11151114111b11141113111a11131112111911121111111811111110111711100f11160f0e11150e0d11140d0c11130c0b11120b0a11110a09111009108f107e55661604d2561181010bf4826fa5209502fa00305895316d326d01e2908ae85b561281010bf4826fa5209502fa00305895316d326d01e2908ae85b561781010bf4826fa5209502fa00305895316d326d01e2908ae85b561881010bf4826fa5209502fa00305895316d326d01e290011201150119011c01fc112511291125112411281124112311271123112211261122112111291121112011281120111f1127111f111e1126111e111d1129111d111c1128111c111b1127111b111a1126111a111911291119111811281118111711271117111611261116111511291115111411281114111311271113111211261112111111291111011302fe1110112811100f11270f0e11260e0d11290d0c11280c0b11270b0a11260a09112909081128080711270706112606051129050411280403112703021126020111290111285629db3c7071112b5628562bc8552080355004cb1f58fa02cecec9413001112b0140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00016d011401f481010b2f02112a59f4746fa5209502fa00305895316d326d01e21126112a1126112511291125112411281124112311271123112211261122112111251121112011241120111f1123111f111e1122111e111d1121111d111c1120111c111b111f111b111a111e111a1119111d11191118111c11181117111b1117011801fc112511291125112411281124112311271123112211261122112111291121112011281120111f1127111f111e1126111e111d1129111d111c1128111c111b1127111b111a1126111a111911291119111811281118111711271117111611261116111511291115111411281114111311271113111211261112111111291111011602fe1110112811100f11270f0e11260e0d11290d0c11280c0b11270b0a11260a09112909081128080711270706112606051129050411280403112703021126020111290111285629db3c7071112b5628562bc8552080355004cb1f58fa02cecec9413001112b0140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00016d011701f681010b561002112a59f4746fa5209502fa00305895316d326d01e21126112a1126112511291125112411281124112311271123112211261122112111251121112011241120111f1123111f111e1122111e111d1121111d111c1120111c111b111f111b111a111e111a1119111d11191118111c11181117111b1117011800981116111a11161115111911151114111811141113111711131112111611121111111511111110111411100f11130f0e11120e0d11110d0c11100c10bf10ae109d108c107b106a10591048103701fc112511291125112411281124112311271123112211261122112111291121112011281120111f1127111f111e1126111e111d1129111d111c1128111c111b1127111b111a1126111a111911291119111811281118111711271117111611261116111511291115111411281114111311271113111211261112111111291111011a02d41110112811100f11270f0e11260e0d11290d0c11280c0b11270b0a11260a09112909081128080711270706112606051129050411280403112703021126020111290111285629db3c7071112baa005628562bc8552080355004cb1f58fa02cecec9413001112b0140037f016d011b01f4c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0081010b561502112a59f4746fa5209502fa00305895316d326d01e21126112a1126112511291125112411281124112311271123112211261122112111251121112011241120111f1123111f111e1122111e111d1121111d111c1120111c111b111f111b012002fe8ae85b11251127112511241126112411231127112311221126112211211127112156261121112011281120111f111e1128111e111d111c1128111c111b111a1128111a111911181128111811171116112811161115111411281114111311121128111211111110112811100f0e11280e0d0c11280c0b0a11280a0908112808011d012101fc112511291125112411281124112311271123112211261122112111291121112011281120111f1127111f111e1126111e111d1129111d111c1128111c111b1127111b111a1126111a111911291119111811281118111711271117111611261116111511291115111411281114111311271113111211261112111111291111011e02d41110112811100f11270f0e11260e0d11290d0c11280c0b11270b0a11260a09112909081128080711270706112606051129050411280403112703021126020111290111285629db3c7071112ba7035628562bc8552080355004cb1f58fa02cecec9413001112b0140037f016d011f01f4c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0081010b561602112a59f4746fa5209502fa00305895316d326d01e21126112a1126112511291125112411281124112311271123112211261122112111251121112011241120111f1123111f111e1122111e111d1121111d111c1120111c111b111f111b012000c8111a111e111a1119111d11191118111c11181117111b11171116111a11161115111911151114111811141113111711131112111611121111111511111110111411100f11130f0e11120e0d11110d0c11100c10bf10ae109d108c107b106a10591048103703de070611280605041128040302112802011127db3c7071821aba7def30005629562cc8552080355004cb1f58fa02cecec940037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb002d925726e30e561981010bf4826fa5209502fa00305895316d326d01e2908ae85b3757257f016d0122012602fe705619c2009cf82328a1821925b3aee000b99170e29d3056187828561aa07aa98601a8de1125112611251124112611241123112611231122112611225626112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e01127db3c7071215621562ba05381562c01562f0156311045c8016d012301fc55608210178d45195008cb1f16cb3f14cb0958fa02ce01206e9430cf84809201cee201fa02cec940037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00707370228b021302112b0201112cc8553082107bdd97de5005cb1f13cb3f01fa02ce01206e9430cf84809201cee2c95625431402112a02112901441359012401fac8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a1119111811191118111711181117111611171116111511161115111411151114111311141113012500301112111311121111111211111110111111100f11100f550e01fc112511261125112411261124112311261123112211261122112111261121112011261120111f1126111f111e1126111e111d1126111d111c1126111c111b1126111b111a1126111a111911261119111811261118111711261117111611261116111511261115111411261114111311261113111211261112111111261111012702fe1110112611100f11260f0e11260e0d11260d0c11260c0b11260b0a11260a09112609081126080711260706112606051126050411260403112603021126020111260111275626db3c7071112a5628562cc8552080355004cb1f58fa02cecec9413001112a0140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00016d012801f681010b561a02112759f4746fa5209502fa00305895316d326d01e2112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811170129008c1116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a10891078106710561045103400e65b3a3a3a3a3a6d7053000b11240b091123090b11220b091121090b11200b09111f090b111e0b09111d090b111c0b09111b090b111a0b091119090b11180b091117090b11160b091115090b11140b091113090b11120b091111090b11100b109f10be109d10bc103b704a9b103806504407050301fc112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b012c001c108a107908105710461035443012018e1115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b107a1069105810471036454013012e01aaf8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00014f02fc5b11258020d721fa00305624562456245624562456245624562456245624562456245624562456245624562456245624562456245624562456245624562456245624562456245624562456245624562456245649564b5626ed41ed43ed44ed45ed47965b01111a01a0ed67ed65ed64ed63ed6180277fed118aed41edf1010130013201fc112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112111111131111111011121110013100b60f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035443012f82327a1218218174876e800a90612a0561ac2009c561a5882109ca41900a986a09131e2111e561ea120c2fff2e2c501111c01111ea0111b11190180f2ff1119c87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015502fc8efa5b11258020d721fa40d2003028b3f2e2bd6d019c30f82a562301562601126f03de561d01c8598210ca77fdc25003cb1f01fa02216eb38e117f01ca0001206ef2d0806f235023cececc947032ca00e2c90170804043137fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112311251123112211241122e0200134013501f0112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551c014f043e8210595f07bcbae30220820b93b1cebae30220c038e3022082102508d66aba01360139013a013c01fe5b11258020d721d33ffa00d72c01916d93fa4001e23129b3f2e2bdf8425627c705f2e2bc111e21a120c2fff2e2c5f8416f2443305230fa40fa0071d721fa00fa00306c6170f83a811f4070f836aa00a0bcf2e2bf708040504356287f1122c8553082107bdd97de5005cb1f13cb3f01fa02ce01206e9430cf84809201cee2c9013701f85625044313112001441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115013801cc1114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551cc87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015501fe5b5725112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f015301fa5b5725f842112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112111111131111013b02ca1110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035443012db3cc87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31014701550210e30220c047e30201013d014b03fc5b11258020d721d2000193d30931ded2000192d309926d01e2d72c01916d93fa4001e201f40431f40431d430d0f40431f4043001206ef2d0800211270201112801db3c5626206ef2d0805240b99457265726e30d112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d013e0142014a01f0112511261125112411261124112311261123112211261122112111261121112011261120111f1126111f111e1126111e111d1126111d111c1126111c111b1126111b111a1126111a111911261119111811261118111711261117111611261116111511261115111411261114111311261113111211261112013f02fc1111112611111110112611100f11260f0e11260e0d11260d0c11260c0b11260b0a11260a091126091126080706554056265624705625f82ac87001ca0055315034cece01fa02cec9315210f842fa443159c85980285003cb057601cb03ccccc9f900206ef2d0808100f8a928018100f8a928ba925726e30e112411251124014001410054f842562401c705f2e2bc279257268e1937571e571e7f562408a40611250608111f0806111e06508806e200fc112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e016e331125206ef2d0801126206ef2d080fb04561481010bf4826fa5209502fa00305895316d326d01e231908ae83011241125112401112401014301f8562456245624562456245624562456245624562456245624562456245624562456245624562456245624562456245624562456245624562456245624562456245624562456485624564956271125114a1125112411491124112311481123112211471122112111461121112011451120111f1144111f111e1143111e014401f8111d1142111d111c1141111c111b1140111b111a113f111a1119113e11191118113d11181117113c11171116113b11161115113a11151114113911141113113811131112113711121111113611111110113511100f11340f0e11330e0d11320d0c11310c0b11300b0a112f0a09112e0908112d0807112c0706112b06014502fc05112a050411290403114c030211270201114b0111285626db3c57105f0f57105f0f6c61112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a1119111811191118111711181117016d014602f81116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a108910781067105610450411270410230211270201112701db3c81010b561702112859f4746fa5209502fa00305895316d326d01e2310411270402112602021125020147014901cc7382100bebc20070f82a562a52926d6d50046d50036d01c8556082102508d66a5008cb1f266eb3977f01ca0016cb099636705006ca00e2246eb3977f01ca0014cb099634705004ca00e258206e9430cf84809201cee2f400f40001c8f40012f400cdc90350440148002ec8cf8580ca00cf8440ce01fa02806acf40f400c901fb0000dc021124020211230202112202021121020211200202111f0202111e0202111d0202111c0202111b0202111a0202111902021118020211170202111602021115020211140202111302021112020211110202111002102f102e102d102c102b102a102910281027102610251024102301b0111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e551d014f01fe5b11258020d721fa40307382100bebc20070c87101cb005628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628015628014c029601562801564d01564f011126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9f82a56295448306d046d5a6d59c80155014d01fa556082102508d66a5008cb1f266eb3977f01ca0016cb099636705006ca00e2246eb3977f01ca0014cb099634705004ca00e258206e9430cf84809201cee2f400f40001c8f40012f400cdc9035044c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112311251123112211241122112111231121112011221120014e01d8111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551c014f0178c87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015501fe305725112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f015101840e11100e10df551cc87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015501f8112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f015301dc0e11100e10df551cf8425626c705f2e2bc5625708100906d40037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015501f81118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551cc87f01ca001126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015501f6011125011126ce01112301ce01112101ce111fc8ce01111e01ce01111c01cec801111b206e9430cf84809201cee21119c8ce01111901cd011117fa0201111501ca05011113fa0201111101f400500ffa0240dc59fa02cb2919f40007c8f40016f40014cb0312cb03f40001c8f40012f40013f40013ca0013cb09130156004ccb0913cb1f13cb0713ca0013ca0013cb1f14cb1f14ce15cb0915ca0015cb1f15cc13cdcdcdcd0201200158015e0201200159015b03f9baf15ed44d0d200018e90fa40fa40fa00fa40553004d15502db3ce30d562556255625562556255625562556255625562556255625562556255625562556255625562556255625562556255625562556255625562556255625562556255625562556255625562556255726572657265726572657265726572657265726801630174015a00705726572657265726572657265726572657265726572657265726572657265726572657265726572657265726572657265726572657265726020158015c015d025db1ce3b513434800063a43e903e903e803e90154c01345540b6cf38c35588158895c495c417c3d5c495c417c3db10a001630174025bb2c0bb513434800063a43e903e903e803e90154c01345540b6cf38c37e0a9587805589c05589805b311b311b392001630174020158015f016002a3b5e35da89a1a400031d21f481f481f401f480aa6009a2aa05b679c61b0431d1a94a20010402a300ac34ac3590b2b3f405965392ac2006ac2006ac2006ac2006ac2006ac2006ac20a5c4d976d976d976d8b700163017402012001610162026bb1827b513434800063a43e903e903e803e90154c01345540b6cf38c34a2cfcb8af558555841584958655855587d5851b39db39db29e001630174024fb0b87b513434800063a43e903e903e803e90154c01345540b6cf38c34a95c417c3d5c417c3db18600163017402f6318d08600000000000000000000000000000000000000000000000000000000000000000048d08600000000000000000000000000000000000000000000000000000000000000000046d71706d5471116d6d6d53556d6d6d6d705475552070702289217f21562056218b085621f82382103b9aca00f82a112756250164016500438000000000000000000000000000000000000000000000000000000000000000001001e6c705b3925724e30d04112504031124030311230301112201011121010111200101111f0102111e0203111d0301111c0102111b0203111a0301111901021118020311170301111601021115020311140301111301021112020311110301111001102f103e4cd0103b49a0103846165055070304016603f888d0061127060511260505112505031124030311230303112203031121030411200401111f0103111e0304111d0401111c0103111b0304111a0401111901031118030411170401111601031115030411140401111301031112030411110401111001103f104e1d103c104b1a103910281047161035414013db3c1125016701680172002200000000666f6c6c6f7765644f776e657201f42b8100fab9f2e0fa112511271125112411261124112311271123112211261122112111271121112011261120111f1127111f111e1126111e111d1127111d111c1126111c111b1127111b111a1126111a111911271119111811261118111711271117111611261116111511271115111411261114111311271113016901a41112112611121111112711111110112611100f11270f0e11260e0d11270d0c11260c0b11270b0a11260a09112709081126080711270706112606051127050411260403112703021126020111270111265627016a01f4205627c705917f95562121c705e2917f9c561681010b2259f40a6fa131e2917f9c561081010b2259f40a6fa131e2917f9c561781010b2259f40a6fa131e292307f9c81010b56120259f40a6fa131e2917f9170e2b3f2e2cf8218e8d4a51000111081010b56295612206e953059f4593098c801fa024133f441e2016b01fc112511261125112411261124112311261123112211261122112111261121112011261120111f1126111f111e1126111e111d1126111d111c1126111c111b1126111b111a1126111a111911261119111811261118111711261117111611261116111511261115111411261114111311261113111211261112111111261111016c02f611101126111055e05628db3c3570112756268050112ac8552080175004cb1f58fa02cecec91035021127020111280140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb0006a4112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b016d017101f0112511261125112411261124112311261123112211261122112111261121112011261120111f1126111f111e1126111e111d1126111d111c1126111c111b1126111b111a1126111a111911261119111811261118111711261117111611261116111511261115111411261114111311261113111211261112016e01fc1111112611111110112611100f11260f0e11260e0d11260d0c11260c0b11260b0a11260a091126091126080706554056265624705625f82ac87001ca0055315034cece01fa02cec9315210c85980285003cb057601cb03ccccc91127800bd721d30730c87401cb027001cb071128f90001018100f8a92801aaf7b1011127016f01fecbffc9d0fa4030112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a1119111811191118111711181117111611171116111511161115111411151114111311141113111211131112017000541111111211111110111111100f11100f10ef10de10cd10bc10ab109a108910781067105610451034413000c6111a111d111a1119111c11191118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b107a09105810471036415001fc112311241123111d1123111d112111221121112011211120111f1120111f111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad01730024109c108b107a10591048103746145033451502f8db3c5726112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211110175017701eefa40fa40fa40d401d0fa40fa40fa40d430d0d72c01916d93fa4001e201d401d001fa00d205fa00f404fa00fa00d3295902f404d430d0f404f404d303d303f404d430d0f404f404f404d200d309d309d31fd307d200d200d31fd31ffa40d309d200d31fd4301123112611231123112511231123112411230176000c11171118111700181110111111100f11100f550ef8c41319');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initJettonWalletSharded_init_args({ $$type: 'JettonWalletSharded_init_args', owner, minter, balance, treasury })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const JettonWalletSharded_errors = {
    2: { message: "Stack underflow" },
    3: { message: "Stack overflow" },
    4: { message: "Integer overflow" },
    5: { message: "Integer out of expected range" },
    6: { message: "Invalid opcode" },
    7: { message: "Type check error" },
    8: { message: "Cell overflow" },
    9: { message: "Cell underflow" },
    10: { message: "Dictionary error" },
    11: { message: "'Unknown' error" },
    12: { message: "Fatal error" },
    13: { message: "Out of gas error" },
    14: { message: "Virtualization error" },
    32: { message: "Action list is invalid" },
    33: { message: "Action list is too long" },
    34: { message: "Action is invalid or not supported" },
    35: { message: "Invalid source address in outbound message" },
    36: { message: "Invalid destination address in outbound message" },
    37: { message: "Not enough Toncoin" },
    38: { message: "Not enough extra currencies" },
    39: { message: "Outbound message does not fit into a cell after rewriting" },
    40: { message: "Cannot process a message" },
    41: { message: "Library reference is null" },
    42: { message: "Library change action error" },
    43: { message: "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree" },
    50: { message: "Account state size exceeded limits" },
    128: { message: "Null reference exception" },
    129: { message: "Invalid serialization prefix" },
    130: { message: "Invalid incoming message" },
    131: { message: "Constraints error" },
    132: { message: "Access denied" },
    133: { message: "Contract stopped" },
    134: { message: "Invalid argument" },
    135: { message: "Code of a contract was not found" },
    136: { message: "Invalid standard address" },
    138: { message: "Not a basechain address" },
} as const

export const JettonWalletSharded_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
} as const

const JettonWalletSharded_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SignedBundle","header":null,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"signedData","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"JettonWalletSharded$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"ownerAfterRecovery","type":{"kind":"simple","type":"address","optional":false}},{"name":"minter","type":{"kind":"simple","type":"address","optional":false}},{"name":"treasuryAccount","type":{"kind":"simple","type":"address","optional":false}},{"name":"nominee","type":{"kind":"simple","type":"address","optional":false}},{"name":"invitor","type":{"kind":"simple","type":"address","optional":false}},{"name":"invitor0","type":{"kind":"simple","type":"address","optional":true}},{"name":"id","type":{"kind":"simple","type":"slice","optional":false}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"taxAsTxnFeePercent","type":{"kind":"simple","type":"int","optional":false,"format":6}},{"name":"turnover","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"debts","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"coins"}},{"name":"debt","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"insurance","type":{"kind":"simple","type":"Insurance","optional":false}},{"name":"invited","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"coins"}},{"name":"friends","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"coins"}},{"name":"closeFriendsAndVouched","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"closeFriendsCount","type":{"kind":"simple","type":"uint","optional":false,"format":4}},{"name":"recoveryVouchersCount","type":{"kind":"simple","type":"uint","optional":false,"format":4}},{"name":"pendingRequests","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"coins"}},{"name":"followers","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"coins"}},{"name":"followings","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"coins"}},{"name":"reports","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"reportReason","type":{"kind":"simple","type":"bool","optional":false}},{"name":"reporterCount","type":{"kind":"simple","type":"uint","optional":false,"format":10}},{"name":"disputerCount","type":{"kind":"simple","type":"uint","optional":false,"format":10}},{"name":"reportResolutionTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"connections","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"terminated","type":{"kind":"simple","type":"bool","optional":false}},{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"accountInitTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lastTxnTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lastMsgTo","type":{"kind":"simple","type":"address","optional":false}},{"name":"version","type":{"kind":"simple","type":"uint","optional":false,"format":10}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"lastRewardClaimTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"baseWalletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ParsedString","header":null,"fields":[{"name":"username","type":{"kind":"simple","type":"string","optional":false}},{"name":"lattitude","type":{"kind":"simple","type":"string","optional":false}},{"name":"longitude","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"IdInfo","header":null,"fields":[{"name":"username","type":{"kind":"simple","type":"string","optional":false}},{"name":"lattitude","type":{"kind":"simple","type":"string","optional":false}},{"name":"longitude","type":{"kind":"simple","type":"string","optional":false}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"AddId","header":73,"fields":[{"name":"username","type":{"kind":"simple","type":"string","optional":false}},{"name":"lattitude","type":{"kind":"simple","type":"string","optional":false}},{"name":"longitude","type":{"kind":"simple","type":"string","optional":false}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RemoveId","header":80,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Insurance","header":null,"fields":[{"name":"emi","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"startStop","type":{"kind":"simple","type":"uint","optional":false,"format":42}}]},
    {"name":"FriendsAndFollowings","header":null,"fields":[{"name":"friends","type":{"kind":"simple","type":"cell","optional":true}},{"name":"followings","type":{"kind":"simple","type":"cell","optional":true}},{"name":"followers","type":{"kind":"simple","type":"cell","optional":true}},{"name":"invited","type":{"kind":"simple","type":"cell","optional":true}},{"name":"pendingRequests","type":{"kind":"simple","type":"cell","optional":true}},{"name":"debts","type":{"kind":"simple","type":"cell","optional":true}},{"name":"reports","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"OtherStateConsts","header":null,"fields":[{"name":"reportReason","type":{"kind":"simple","type":"bool","optional":false}},{"name":"reporterCount","type":{"kind":"simple","type":"uint","optional":false,"format":10}},{"name":"disputerCount","type":{"kind":"simple","type":"uint","optional":false,"format":10}},{"name":"reportResolutionTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"connections","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"terminated","type":{"kind":"simple","type":"bool","optional":false}},{"name":"mbrpAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"closureWait","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"lastMsgTo","type":{"kind":"simple","type":"address","optional":false}},{"name":"insurance","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"InvitorNominee","header":null,"fields":[{"name":"invitor","type":{"kind":"simple","type":"address","optional":false}},{"name":"nominee","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jettonWalletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"minter","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"MaybeAddress","header":null,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"JettonNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonBurn","header":1499400124,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonBurnNotification","header":2078119902,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"ownerAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"includeAddress","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"walletAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"ownerAddress","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ProvideWalletBalance","header":2059982169,"fields":[{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"includeVerifyInfo","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"VerifyInfo","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"minter","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TakeWalletBalance","header":3396861378,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"verifyInfo","type":{"kind":"simple","type":"VerifyInfo","optional":true}}]},
    {"name":"Mint","header":1680571655,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"mintMessage","type":{"kind":"simple","type":"JettonTransferInternal","optional":false}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonTransferInternal","header":395134233,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"walletVersion","type":{"kind":"simple","type":"uint","optional":false,"format":10}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}},{"name":"forwardTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonExcesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ClaimTON","header":60010958,"fields":[{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RequestUpgradeCode","header":56,"fields":[{"name":"version","type":{"kind":"simple","type":"uint","optional":false,"format":10}}]},
    {"name":"UpgradeReqFromMainnet","header":71,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Upgrade","header":621336170,"fields":[{"name":"rootVersion","type":{"kind":"simple","type":"uint","optional":true,"format":10}},{"name":"walletVersion","type":{"kind":"simple","type":"uint","optional":true,"format":10}},{"name":"sender","type":{"kind":"simple","type":"address","optional":true}},{"name":"newRootData","type":{"kind":"simple","type":"cell","optional":true}},{"name":"newRootCode","type":{"kind":"simple","type":"cell","optional":true}},{"name":"newWalletData","type":{"kind":"simple","type":"cell","optional":true}},{"name":"newWalletCode","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ChangeOwner","header":3,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Invite","header":72,"fields":[{"name":"target","type":{"kind":"simple","type":"address","optional":false}},{"name":"id","type":{"kind":"simple","type":"IdInfo","optional":false}}]},
    {"name":"InviteInternal","header":1,"fields":[{"name":"version","type":{"kind":"simple","type":"uint","optional":false,"format":10}},{"name":"id","type":{"kind":"simple","type":"IdInfo","optional":true}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"invitor","type":{"kind":"simple","type":"address","optional":false}},{"name":"currentWalletCode","type":{"kind":"simple","type":"cell","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Follow","header":2,"fields":[{"name":"target","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"FollowInternal","header":23,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Unfollow","header":21,"fields":[{"name":"target","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"UnfollowInternal","header":5,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"FriendRequestInternal","header":6,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"ConfirmRequestInternal","header":7,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"ReportInternal","header":8,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"reason","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"DisputeInternal","header":9,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"ResolutionInternal","header":10,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Report","header":17,"fields":[{"name":"target","type":{"kind":"simple","type":"address","optional":false}},{"name":"reason","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"Dispute","header":18,"fields":[{"name":"target","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ProcessComplaint","header":19,"fields":[{"name":"target","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"AdminAction","header":20,"fields":[{"name":"action","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"JettonUpdateContent","header":4,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Mintable","header":37,"fields":[{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"UnfriendInternal","header":49,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"ReInviteInternal","header":50,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"UnInviteInternal","header":52,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"U","header":51,"fields":[{"name":"op","type":{"kind":"simple","type":"uint","optional":false,"format":6}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":true,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":true}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"AccCloseBurnInternal","header":53,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"EnquireInvitor","header":54,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TakeInvitor","header":55,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"invitor","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"AccountGenerated","header":64,"fields":[{"name":"deployer","type":{"kind":"simple","type":"address","optional":false}},{"name":"newAccount","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ApplyGrant","header":65,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"VoteProposal","header":66,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"proposer","type":{"kind":"simple","type":"address","optional":false}},{"name":"turnover","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CitizenAdded","header":67,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"newAccount","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"InviteApproval","header":68,"fields":[{"name":"approved","type":{"kind":"simple","type":"bool","optional":false}},{"name":"invitor","type":{"kind":"simple","type":"address","optional":false}},{"name":"invitee","type":{"kind":"simple","type":"address","optional":false}},{"name":"approver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeMetadataUri","header":3414567170,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"metadata","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"StopEngageMint","header":69,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MintNotify","header":70,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"IdGenTrack","header":81,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"invitor","type":{"kind":"simple","type":"address","optional":false}},{"name":"approver","type":{"kind":"simple","type":"address","optional":false}},{"name":"payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"InternalDeActivate","header":82,"fields":[{"name":"amt","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"invitor","type":{"kind":"simple","type":"address","optional":false}},{"name":"invitor0","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SliceBitsAndRefs","header":null,"fields":[{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ShardDeployParameters","header":null,"fields":[{"name":"deployParameters","type":{"kind":"simple","type":"DeployParameters","optional":false}},{"name":"shard","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"ShardMessageParameters","header":null,"fields":[{"name":"messageParameters","type":{"kind":"simple","type":"MessageParameters","optional":false}},{"name":"shard","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"Ids$Data","header":null,"fields":[{"name":"root","type":{"kind":"simple","type":"address","optional":false}},{"name":"treasuryAccount","type":{"kind":"simple","type":"address","optional":false}},{"name":"lat","type":{"kind":"simple","type":"string","optional":false}},{"name":"long","type":{"kind":"simple","type":"string","optional":false}},{"name":"users","type":{"kind":"dict","key":"address","value":"cell","valueFormat":"ref"}},{"name":"jettonWalletInitialCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonMinterState","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"adminAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonContent","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jettonWalletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonMinterSharded$Data","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"totalAccounts","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"treasurySurplus","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"treasuryDeficits","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"treasuryAccount","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonContent","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jettonWalletCode","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jettonWalletInitialCode","type":{"kind":"simple","type":"cell","optional":false}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"version","type":{"kind":"simple","type":"uint","optional":false,"format":10}},{"name":"walletVersion","type":{"kind":"simple","type":"uint","optional":false,"format":10}},{"name":"tosHash","type":{"kind":"simple","type":"string","optional":false}},{"name":"mbrpAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"publicWorks","type":{"kind":"dict","key":"address","value":"uint","valueFormat":10}},{"name":"votes","type":{"kind":"dict","key":"address","value":"uint","valueFormat":20}},{"name":"crowdFund","type":{"kind":"dict","key":"uint","keyFormat":10,"value":"uint","valueFormat":10}}]},
]

const JettonWalletSharded_opcodes = {
    "AddId": 73,
    "RemoveId": 80,
    "JettonNotification": 1935855772,
    "JettonBurn": 1499400124,
    "JettonBurnNotification": 2078119902,
    "ProvideWalletAddress": 745978227,
    "TakeWalletAddress": 3513996288,
    "ProvideWalletBalance": 2059982169,
    "TakeWalletBalance": 3396861378,
    "Mint": 1680571655,
    "JettonTransfer": 260734629,
    "JettonTransferInternal": 395134233,
    "JettonExcesses": 3576854235,
    "ClaimTON": 60010958,
    "RequestUpgradeCode": 56,
    "UpgradeReqFromMainnet": 71,
    "Upgrade": 621336170,
    "ChangeOwner": 3,
    "Invite": 72,
    "InviteInternal": 1,
    "Follow": 2,
    "FollowInternal": 23,
    "Unfollow": 21,
    "UnfollowInternal": 5,
    "FriendRequestInternal": 6,
    "ConfirmRequestInternal": 7,
    "ReportInternal": 8,
    "DisputeInternal": 9,
    "ResolutionInternal": 10,
    "Report": 17,
    "Dispute": 18,
    "ProcessComplaint": 19,
    "AdminAction": 20,
    "JettonUpdateContent": 4,
    "Mintable": 37,
    "UnfriendInternal": 49,
    "ReInviteInternal": 50,
    "UnInviteInternal": 52,
    "U": 51,
    "AccCloseBurnInternal": 53,
    "EnquireInvitor": 54,
    "TakeInvitor": 55,
    "AccountGenerated": 64,
    "ApplyGrant": 65,
    "VoteProposal": 66,
    "CitizenAdded": 67,
    "InviteApproval": 68,
    "ChangeMetadataUri": 3414567170,
    "StopEngageMint": 69,
    "MintNotify": 70,
    "IdGenTrack": 81,
    "InternalDeActivate": 82,
}

const JettonWalletSharded_getters: ABIGetter[] = [
    {"name":"get_wallet_data","methodId":97026,"arguments":[],"returnType":{"kind":"simple","type":"JettonWalletData","optional":false}},
    {"name":"state","methodId":77589,"arguments":[],"returnType":{"kind":"simple","type":"JettonWalletSharded$Data","optional":false}},
    {"name":"reportResolutionTime","methodId":127713,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getInvitorNominee","methodId":91960,"arguments":[],"returnType":{"kind":"simple","type":"InvitorNominee","optional":false}},
    {"name":"getFriendsAndFollowings","methodId":124425,"arguments":[],"returnType":{"kind":"simple","type":"FriendsAndFollowings","optional":false}},
    {"name":"otherConsts","methodId":118554,"arguments":[],"returnType":{"kind":"simple","type":"OtherStateConsts","optional":false}},
]

export const JettonWalletSharded_getterMapping: { [key: string]: string } = {
    'get_wallet_data': 'getGetWalletData',
    'state': 'getState',
    'reportResolutionTime': 'getReportResolutionTime',
    'getInvitorNominee': 'getGetInvitorNominee',
    'getFriendsAndFollowings': 'getGetFriendsAndFollowings',
    'otherConsts': 'getOtherConsts',
}

const JettonWalletSharded_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"JettonTransfer"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonTransferInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InviteInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InternalDeActivate"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InviteApproval"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UnInviteInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"FriendRequestInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ConfirmRequestInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UnfriendInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"FollowInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UnfollowInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ReportInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DisputeInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ResolutionInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AccCloseBurnInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ProvideWalletBalance"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonBurn"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimTON"}},
    {"receiver":"internal","message":{"kind":"text","text":"claim"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RequestUpgradeCode"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Upgrade"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpgradeReqFromMainnet"}},
    {"receiver":"internal","message":{"kind":"any"}},
    {"receiver":"internal","message":{"kind":"empty"}},
]

export const gasForBurn = 8000n;
export const gasForTransfer = 11050n;
export const minTonsForStorage = 10000000n;
export const Basechain = 0n;
export const walletStateInitCells = 300n;
export const walletStateInitBits = 250000n;
export const MBRP_AMOUNT = 1000000000000n;
export const CLOSURE_WAIT = 86400n;
export const INCORRECT_SENDER = 700n;
export const ACCOUNT_TERMINATED = 701n;
export const ACCOUNT_INACTIVE = 702n;
export const INSUFFICIENT_GAS_SENT = 703n;
export const RESERVED_INTERNAL = 704n;
export const NO_PENDING_REQUEST = 706n;
export const CANT_UNFOLLOW_REPORTED = 707n;
export const INSUFFICIENT_BALANCE = 709n;
export const ALREADY_REPORTED = 710n;
export const ACCOUNT_NOT_REPORTED = 711n;
export const NOT_FOLLOWING = 717n;
export const CONNECTION_EXISTS = 719n;
export const NOT_FRIEND = 720n;
export const NOT_INVITOR = 721n;
export const ALREADY_INVITED = 723n;
export const UNAUTHORIZED_BURN = 724n;
export const MINT_CLOSED = 730n;
export const WRONG_WORKCHAIN = 734n;
export const WAIT_MORE = 735n;
export const NOT_CLOSE_FRIEND = 736n;
export const ALREADY_VOUCHED = 737n;
export const PROVIDE_COORDINATES = 738n;
export const INVALID_FWD_PAYLOAD = 739n;
export const INVITE_FIRST = 740n;
export const MAX_CONNECTIONS = 250n;
export const prefixLength = 8n;

export class JettonWalletSharded implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = JettonWalletSharded_errors_backward;
    public static readonly opcodes = JettonWalletSharded_opcodes;
    
    static async init(owner: Address, minter: Address, balance: bigint, treasury: Address) {
        return await JettonWalletSharded_init(owner, minter, balance, treasury);
    }
    
    static async fromInit(owner: Address, minter: Address, balance: bigint, treasury: Address) {
        const __gen_init = await JettonWalletSharded_init(owner, minter, balance, treasury);
        const address = contractAddress(0, __gen_init);
        return new JettonWalletSharded(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new JettonWalletSharded(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  JettonWalletSharded_types,
        getters: JettonWalletSharded_getters,
        receivers: JettonWalletSharded_receivers,
        errors: JettonWalletSharded_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: JettonTransfer | JettonTransferInternal | InviteInternal | InternalDeActivate | InviteApproval | UnInviteInternal | FriendRequestInternal | ConfirmRequestInternal | UnfriendInternal | FollowInternal | UnfollowInternal | ReportInternal | DisputeInternal | ResolutionInternal | AccCloseBurnInternal | ProvideWalletBalance | JettonBurn | ClaimTON | "claim" | RequestUpgradeCode | Upgrade | UpgradeReqFromMainnet | Slice | null) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonTransfer') {
            body = beginCell().store(storeJettonTransfer(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonTransferInternal') {
            body = beginCell().store(storeJettonTransferInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InviteInternal') {
            body = beginCell().store(storeInviteInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalDeActivate') {
            body = beginCell().store(storeInternalDeActivate(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InviteApproval') {
            body = beginCell().store(storeInviteApproval(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UnInviteInternal') {
            body = beginCell().store(storeUnInviteInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'FriendRequestInternal') {
            body = beginCell().store(storeFriendRequestInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ConfirmRequestInternal') {
            body = beginCell().store(storeConfirmRequestInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UnfriendInternal') {
            body = beginCell().store(storeUnfriendInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'FollowInternal') {
            body = beginCell().store(storeFollowInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UnfollowInternal') {
            body = beginCell().store(storeUnfollowInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ReportInternal') {
            body = beginCell().store(storeReportInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DisputeInternal') {
            body = beginCell().store(storeDisputeInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ResolutionInternal') {
            body = beginCell().store(storeResolutionInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AccCloseBurnInternal') {
            body = beginCell().store(storeAccCloseBurnInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ProvideWalletBalance') {
            body = beginCell().store(storeProvideWalletBalance(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonBurn') {
            body = beginCell().store(storeJettonBurn(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClaimTON') {
            body = beginCell().store(storeClaimTON(message)).endCell();
        }
        if (message === "claim") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RequestUpgradeCode') {
            body = beginCell().store(storeRequestUpgradeCode(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Upgrade') {
            body = beginCell().store(storeUpgrade(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpgradeReqFromMainnet') {
            body = beginCell().store(storeUpgradeReqFromMainnet(message)).endCell();
        }
        if (message && typeof message === 'object' && message instanceof Slice) {
            body = message.asCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetWalletData(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('get_wallet_data', builder.build())).stack;
        const result = loadGetterTupleJettonWalletData(source);
        return result;
    }
    
    async getState(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('state', builder.build())).stack;
        const result = loadGetterTupleJettonWalletSharded$Data(source);
        return result;
    }
    
    async getReportResolutionTime(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('reportResolutionTime', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getGetInvitorNominee(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('getInvitorNominee', builder.build())).stack;
        const result = loadGetterTupleInvitorNominee(source);
        return result;
    }
    
    async getGetFriendsAndFollowings(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('getFriendsAndFollowings', builder.build())).stack;
        const result = loadGetterTupleFriendsAndFollowings(source);
        return result;
    }
    
    async getOtherConsts(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('otherConsts', builder.build())).stack;
        const result = loadGetterTupleOtherStateConsts(source);
        return result;
    }
    
}