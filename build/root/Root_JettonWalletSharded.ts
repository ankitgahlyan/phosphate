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
    nominee: Address;
    invitor: Address;
    invitor0: Address | null;
    id: IdInfo;
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
        b_1.storeAddress(src.nominee);
        b_1.storeAddress(src.invitor);
        b_1.storeAddress(src.invitor0);
        const b_2 = new Builder();
        b_2.store(storeIdInfo(src.id));
        b_2.storeCoins(src.balance);
        b_2.storeInt(src.taxAsTxnFeePercent, 6);
        b_2.storeCoins(src.turnover);
        const b_3 = new Builder();
        b_3.storeDict(src.debts, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        b_3.storeCoins(src.debt);
        b_3.store(storeInsurance(src.insurance));
        b_3.storeDict(src.invited, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        b_3.storeDict(src.friends, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        const b_4 = new Builder();
        b_4.storeDict(src.closeFriendsAndVouched, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_4.storeUint(src.closeFriendsCount, 4);
        b_4.storeUint(src.recoveryVouchersCount, 4);
        b_4.storeDict(src.pendingRequests, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        b_4.storeDict(src.followers, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        const b_5 = new Builder();
        b_5.storeDict(src.followings, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        b_5.storeDict(src.reports, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_5.storeBit(src.reportReason);
        b_5.storeUint(src.reporterCount, 10);
        b_5.storeUint(src.disputerCount, 10);
        b_5.storeUint(src.reportResolutionTime, 32);
        b_5.storeUint(src.connections, 8);
        b_5.storeBit(src.terminated);
        b_5.storeBit(src.active);
        b_5.storeUint(src.accountInitTime, 32);
        b_5.storeUint(src.lastTxnTime, 32);
        b_5.storeAddress(src.lastMsgTo);
        b_5.storeUint(src.version, 10);
        b_5.storeBit(src.mintable);
        b_5.storeUint(src.lastRewardClaimTime, 32);
        b_5.storeRef(src.baseWalletCode);
        b_4.storeRef(b_5.endCell());
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
    const _nominee = sc_1.loadAddress();
    const _invitor = sc_1.loadAddress();
    const _invitor0 = sc_1.loadMaybeAddress();
    const sc_2 = sc_1.loadRef().beginParse();
    const _id = loadIdInfo(sc_2);
    const _balance = sc_2.loadCoins();
    const _taxAsTxnFeePercent = sc_2.loadIntBig(6);
    const _turnover = sc_2.loadCoins();
    const sc_3 = sc_2.loadRef().beginParse();
    const _debts = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_3);
    const _debt = sc_3.loadCoins();
    const _insurance = loadInsurance(sc_3);
    const _invited = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_3);
    const _friends = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_3);
    const sc_4 = sc_3.loadRef().beginParse();
    const _closeFriendsAndVouched = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_4);
    const _closeFriendsCount = sc_4.loadUintBig(4);
    const _recoveryVouchersCount = sc_4.loadUintBig(4);
    const _pendingRequests = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_4);
    const _followers = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_4);
    const sc_5 = sc_4.loadRef().beginParse();
    const _followings = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_5);
    const _reports = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_5);
    const _reportReason = sc_5.loadBit();
    const _reporterCount = sc_5.loadUintBig(10);
    const _disputerCount = sc_5.loadUintBig(10);
    const _reportResolutionTime = sc_5.loadUintBig(32);
    const _connections = sc_5.loadUintBig(8);
    const _terminated = sc_5.loadBit();
    const _active = sc_5.loadBit();
    const _accountInitTime = sc_5.loadUintBig(32);
    const _lastTxnTime = sc_5.loadUintBig(32);
    const _lastMsgTo = sc_5.loadAddress();
    const _version = sc_5.loadUintBig(10);
    const _mintable = sc_5.loadBit();
    const _lastRewardClaimTime = sc_5.loadUintBig(32);
    const _baseWalletCode = sc_5.loadRef();
    return { $$type: 'JettonWalletSharded$Data' as const, owner: _owner, ownerAfterRecovery: _ownerAfterRecovery, minter: _minter, nominee: _nominee, invitor: _invitor, invitor0: _invitor0, id: _id, balance: _balance, taxAsTxnFeePercent: _taxAsTxnFeePercent, turnover: _turnover, debts: _debts, debt: _debt, insurance: _insurance, invited: _invited, friends: _friends, closeFriendsAndVouched: _closeFriendsAndVouched, closeFriendsCount: _closeFriendsCount, recoveryVouchersCount: _recoveryVouchersCount, pendingRequests: _pendingRequests, followers: _followers, followings: _followings, reports: _reports, reportReason: _reportReason, reporterCount: _reporterCount, disputerCount: _disputerCount, reportResolutionTime: _reportResolutionTime, connections: _connections, terminated: _terminated, active: _active, accountInitTime: _accountInitTime, lastTxnTime: _lastTxnTime, lastMsgTo: _lastMsgTo, version: _version, mintable: _mintable, lastRewardClaimTime: _lastRewardClaimTime, baseWalletCode: _baseWalletCode };
}

export function loadTupleJettonWalletSharded$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _ownerAfterRecovery = source.readAddress();
    const _minter = source.readAddress();
    const _nominee = source.readAddress();
    const _invitor = source.readAddress();
    const _invitor0 = source.readAddressOpt();
    const _id = loadTupleIdInfo(source);
    const _balance = source.readBigNumber();
    const _taxAsTxnFeePercent = source.readBigNumber();
    const _turnover = source.readBigNumber();
    const _debts = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _debt = source.readBigNumber();
    const _insurance = loadTupleInsurance(source);
    const _invited = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    source = source.readTuple();
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
    source = source.readTuple();
    const _active = source.readBoolean();
    const _accountInitTime = source.readBigNumber();
    const _lastTxnTime = source.readBigNumber();
    const _lastMsgTo = source.readAddress();
    const _version = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _lastRewardClaimTime = source.readBigNumber();
    const _baseWalletCode = source.readCell();
    return { $$type: 'JettonWalletSharded$Data' as const, owner: _owner, ownerAfterRecovery: _ownerAfterRecovery, minter: _minter, nominee: _nominee, invitor: _invitor, invitor0: _invitor0, id: _id, balance: _balance, taxAsTxnFeePercent: _taxAsTxnFeePercent, turnover: _turnover, debts: _debts, debt: _debt, insurance: _insurance, invited: _invited, friends: _friends, closeFriendsAndVouched: _closeFriendsAndVouched, closeFriendsCount: _closeFriendsCount, recoveryVouchersCount: _recoveryVouchersCount, pendingRequests: _pendingRequests, followers: _followers, followings: _followings, reports: _reports, reportReason: _reportReason, reporterCount: _reporterCount, disputerCount: _disputerCount, reportResolutionTime: _reportResolutionTime, connections: _connections, terminated: _terminated, active: _active, accountInitTime: _accountInitTime, lastTxnTime: _lastTxnTime, lastMsgTo: _lastMsgTo, version: _version, mintable: _mintable, lastRewardClaimTime: _lastRewardClaimTime, baseWalletCode: _baseWalletCode };
}

export function loadGetterTupleJettonWalletSharded$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _ownerAfterRecovery = source.readAddress();
    const _minter = source.readAddress();
    const _nominee = source.readAddress();
    const _invitor = source.readAddress();
    const _invitor0 = source.readAddressOpt();
    const _id = loadGetterTupleIdInfo(source);
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
    return { $$type: 'JettonWalletSharded$Data' as const, owner: _owner, ownerAfterRecovery: _ownerAfterRecovery, minter: _minter, nominee: _nominee, invitor: _invitor, invitor0: _invitor0, id: _id, balance: _balance, taxAsTxnFeePercent: _taxAsTxnFeePercent, turnover: _turnover, debts: _debts, debt: _debt, insurance: _insurance, invited: _invited, friends: _friends, closeFriendsAndVouched: _closeFriendsAndVouched, closeFriendsCount: _closeFriendsCount, recoveryVouchersCount: _recoveryVouchersCount, pendingRequests: _pendingRequests, followers: _followers, followings: _followings, reports: _reports, reportReason: _reportReason, reporterCount: _reporterCount, disputerCount: _disputerCount, reportResolutionTime: _reportResolutionTime, connections: _connections, terminated: _terminated, active: _active, accountInitTime: _accountInitTime, lastTxnTime: _lastTxnTime, lastMsgTo: _lastMsgTo, version: _version, mintable: _mintable, lastRewardClaimTime: _lastRewardClaimTime, baseWalletCode: _baseWalletCode };
}

export function storeTupleJettonWalletSharded$Data(source: JettonWalletSharded$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.ownerAfterRecovery);
    builder.writeAddress(source.minter);
    builder.writeAddress(source.nominee);
    builder.writeAddress(source.invitor);
    builder.writeAddress(source.invitor0);
    builder.writeTuple(storeTupleIdInfo(source.id));
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
    lat: string;
    long: string;
    users: Dictionary<Address, Cell>;
    jettonWalletInitialCode: Cell;
}

export function storeIds$Data(src: Ids$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.root);
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
    const _lat = sc_0.loadStringRefTail();
    const _long = sc_0.loadStringRefTail();
    const sc_1 = sc_0.loadRef().beginParse();
    const _users = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Cell(), sc_1);
    const _jettonWalletInitialCode = sc_1.loadRef();
    return { $$type: 'Ids$Data' as const, root: _root, lat: _lat, long: _long, users: _users, jettonWalletInitialCode: _jettonWalletInitialCode };
}

export function loadTupleIds$Data(source: TupleReader) {
    const _root = source.readAddress();
    const _lat = source.readString();
    const _long = source.readString();
    const _users = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Cell(), source.readCellOpt());
    const _jettonWalletInitialCode = source.readCell();
    return { $$type: 'Ids$Data' as const, root: _root, lat: _lat, long: _long, users: _users, jettonWalletInitialCode: _jettonWalletInitialCode };
}

export function loadGetterTupleIds$Data(source: TupleReader) {
    const _root = source.readAddress();
    const _lat = source.readString();
    const _long = source.readString();
    const _users = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Cell(), source.readCellOpt());
    const _jettonWalletInitialCode = source.readCell();
    return { $$type: 'Ids$Data' as const, root: _root, lat: _lat, long: _long, users: _users, jettonWalletInitialCode: _jettonWalletInitialCode };
}

export function storeTupleIds$Data(source: Ids$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.root);
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
    return { $$type: 'JettonMinterSharded$Data' as const, totalSupply: _totalSupply, totalAccounts: _totalAccounts, treasurySurplus: _treasurySurplus, treasuryDeficits: _treasuryDeficits, owner: _owner, jettonContent: _jettonContent, jettonWalletCode: _jettonWalletCode, jettonWalletInitialCode: _jettonWalletInitialCode, mintable: _mintable, version: _version, walletVersion: _walletVersion, tosHash: _tosHash, mbrpAmount: _mbrpAmount, publicWorks: _publicWorks, votes: _votes, crowdFund: _crowdFund };
}

export function loadTupleJettonMinterSharded$Data(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _totalAccounts = source.readBigNumber();
    const _treasurySurplus = source.readBigNumber();
    const _treasuryDeficits = source.readBigNumber();
    const _owner = source.readAddress();
    const _jettonContent = source.readCell();
    const _jettonWalletCode = source.readCell();
    const _jettonWalletInitialCode = source.readCell();
    const _mintable = source.readBoolean();
    const _version = source.readBigNumber();
    const _walletVersion = source.readBigNumber();
    const _tosHash = source.readString();
    const _mbrpAmount = source.readBigNumber();
    const _publicWorks = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Uint(10), source.readCellOpt());
    source = source.readTuple();
    const _votes = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Uint(20), source.readCellOpt());
    const _crowdFund = Dictionary.loadDirect(Dictionary.Keys.Uint(10), Dictionary.Values.Uint(10), source.readCellOpt());
    return { $$type: 'JettonMinterSharded$Data' as const, totalSupply: _totalSupply, totalAccounts: _totalAccounts, treasurySurplus: _treasurySurplus, treasuryDeficits: _treasuryDeficits, owner: _owner, jettonContent: _jettonContent, jettonWalletCode: _jettonWalletCode, jettonWalletInitialCode: _jettonWalletInitialCode, mintable: _mintable, version: _version, walletVersion: _walletVersion, tosHash: _tosHash, mbrpAmount: _mbrpAmount, publicWorks: _publicWorks, votes: _votes, crowdFund: _crowdFund };
}

export function loadGetterTupleJettonMinterSharded$Data(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _totalAccounts = source.readBigNumber();
    const _treasurySurplus = source.readBigNumber();
    const _treasuryDeficits = source.readBigNumber();
    const _owner = source.readAddress();
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
    return { $$type: 'JettonMinterSharded$Data' as const, totalSupply: _totalSupply, totalAccounts: _totalAccounts, treasurySurplus: _treasurySurplus, treasuryDeficits: _treasuryDeficits, owner: _owner, jettonContent: _jettonContent, jettonWalletCode: _jettonWalletCode, jettonWalletInitialCode: _jettonWalletInitialCode, mintable: _mintable, version: _version, walletVersion: _walletVersion, tosHash: _tosHash, mbrpAmount: _mbrpAmount, publicWorks: _publicWorks, votes: _votes, crowdFund: _crowdFund };
}

export function storeTupleJettonMinterSharded$Data(source: JettonMinterSharded$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeNumber(source.totalAccounts);
    builder.writeNumber(source.treasurySurplus);
    builder.writeNumber(source.treasuryDeficits);
    builder.writeAddress(source.owner);
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
}

function initJettonWalletSharded_init_args(src: JettonWalletSharded_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.minter);
        b_0.storeCoins(src.balance);
    };
}

async function JettonWalletSharded_init(owner: Address, minter: Address, balance: bigint) {
    const __code = Cell.fromHex('b5ee9c724202017200010000999400000114ff00f4a413f4bcf2c80b000102016200020154047ed0eda2edfb01d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e8dfa40fa40fa00552003d158db3ce30d1129e302705628d74920c21f0160016e0003001f04cc11278020d7217021d749c21f9430d31f01de20c0448fcb303605d200013120b301e30f09c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54e020c034000400070152000901fc112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311110005015e1110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068517210571046451504038218e8d4a51000000600e820c101915b8e6a561f21be983101111e01a1111de0201120a17020561e81010b2559f40a6fa1318e1930561d81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111e0301111e01206e953059f4593098c801fa024133f441e201111c01111ea0111a111d111a111be209a501fc112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112111111131111000801ec1110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106807104610354430128218e8d4a510008ebdeda2edfb561a561c6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571c5cbe9c571b01111a01a1111970db31e1a170111b9131e2e301e2d801111e01a0111d09a400de02fe8efc30fa000131aa00111581010b245617206e953059f4593098c801fa024133f441e201111c011115a007a4112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c07111d07111a111c111a1119111b11191118111a1118e0000f000a045c20c0078e9b30fa0001315333111681010bf45930111501112801112956295629e020c031e30220c017e30220c005000b000e0010001201fc20c101915b8e6a561f21be983101111e01a1111de0201120a17020561e81010b2559f40a6fa1318e1930561d81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111e0301111e01206e953059f4593098c801fa024133f441e201111c01111ea0111a111d111a111be20211110281010b0201112a01000c01f81129206e953059f4593098c801fa024133f441e207a5112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115000d01e6111411161114111311151113111211141112111111131111111011121110071111070e11100e10df10ce10bd10ac109b108a095516c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015201fa30fa000131230111150181010b015616206e953059f4593098c801fa024133f441e201111c011114a007a4112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c07111d07111a111c111a1119111b11191118111a1118000f018e1117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a095516015101fa5b522e81010bf4593007a5112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113001101ce1112111411121111111311111110111211100f11110f0e11100e107f10ce10bd10ac109b108a095516c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed540152041ee30220c008e30220c009e30220c035001300150016001801fe30fa0001311e81010b5242206e953059f4593098c801fa024133f441e207a4112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116001401f21115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e107f10ce10bd10ac109b108a095516c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015201f630fa00d20059303101111c01a0112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111d111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113001e01fc30fa00013101111c01a0112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111d111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112001701d61111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035443012c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed5401520336e302208210178d4519bae30282107bdd97debae3025f0f5f0f5f0b0019001b001d01fe5b112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112111111131111001a01a01110111211100f11110f0e11100e10df551cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015201f830d33fd309fa0055206c312082103b9aca00be9701111c01a0111b9130e25625c8cf8508ce70cf0b6ec98042fb00112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b1119001c01841118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551c015101f4d33ffa00596c2101111c01a0112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111d111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113001e01e21112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035443012c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015204fce30021c00001c121b0e302c0008ea91127f90182f0535d44514554aee036c09a39063fe878ca30a50cb9b5f8f6f1ec24f13e3169e9bae302925727e2112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b0020014c014e01500444315628d70b1f2082100f8a7ea5bae302208210178d4519bae30220c001e30220c0440021009d00b600be03ec5b11278020d721d33ffa00fa40d72c01916d93fa4001e201f404fa00f84220562ec705f2e2bc2d917f982682103b9aca00b9e2f2e2be25fa4430f2d08a21d749c200f2e2e3f8416f24135f0382101dcd6500bcf2e2bf2682103b9aca00bee30f7080506d2205112c05270504112f0403113003112ec80022002b009902fe343a5bf823225629c705b3e3031127112a11271126112911261125112811251124112a11241123112911231122112811221121112a1121112011291120111f1128111f111e112a111e111d1129111d111c1128111c111b112a111b111a1129111a1119112811191118112a11181117112911171116112811161115112a11150023002a01f6323336112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114002402f81113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046103510241023db3cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db310025015201f020718064a9861128112a11281127112911271126112a11261125112911251124112a11241123112911231122112a11221121112911211120112a1120111f1129111f111e112a111e111d1129111d111c112a111c111b1129111b111a112a111a1119112911191118112a11181117112911171116112a1116002601c01115112911151114112a11141113112911131112112a11121111112911111110112a11100f11290f0e112a0e0d11290d0c112a0c0b11290b0a112a0a0911290908112a080711290706112a060511290504112a040311290302112a0201112901002701faf82327a1218218174876e800a90612a0561ac2009c561a5882109ca41900a986a09131e2111e561ea120c2fff2e2c501111c01111ea0111b70112a8040112ac85980415003cb1fce01fa02c902112a020111290156260140337fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112511271125112411261124002801f8112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0029000c0e11100e551d01b01114112911141113112811131112112a11121111112911111110112811100f112a0f0e11290e0d11280d0c112a0c0b11290b0a11280a09112a09081129080711280706112a06050411280403112a030201112b01112c562a0083044c26821005f5e100bae3022682100bebc200bae30226821011e1a300bae30226821017d78400ba002c0036003e004501fa145f046c22112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114002d02f81113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046103510241023db3cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31002e015201f42b8100fab9f2e0fa112711291127112611281126112511291125112411281124112311291123112211281122112111291121112011281120111f1129111f111e1128111e111d1129111d111c1128111c111b1129111b111a1128111a111911291119111811281118111711291117111611281116111511291115002f01bc1114112811141113112911131112112811121111112911111110112811100f11290f0e11280e0d11290d0c11280c0b11290b0a11280a09112909081128080711290706112806051129050411280403112903021128020111290111285629003001c4562421c705917f9c561681010b2259f40a6fa131e2917f9c561081010b2259f40a6fa131e2917f9c561781010b2259f40a6fa131e292307f9c81010b56120259f40a6fa131e2917f9170e2b3f2e2cf708050f82a2602562b02562802112e6d5530c8003101f45550715007cb1f15cb09c8246eb38e1d7f01ca0004206ef2d0806f24104703c8ce14cd01c8cecd02c8ce12cdce9634705004ca00e212cece12cc12cecdc9112711291127112611281126112511291125112411281124112311291123112211281122112111291121112011281120111f1129111f111e1128111e003201f8111d1129111d111c1128111c111b1129111b111a1128111a1119112911191118112811181117112911171116112811161115112911151114112811141113112911131112112811121111112911111110112811100f11290f0e11280e0d11290d0c11280c0b11290b0a11280a09112909081128080711290706112806003301b405112905041128040311290302112802011129011128562b562670f82ac87001ca0055215023cece01fa02c931521004112b0403112c0302112a02103410237f59112e800bd721d30730105610451034413001112e0155505505003401fac85a80285003cb057601cb03ccccc9c87101cb0113ca00830901cb0d22f90058018100f8a92801aaf7b101cbff58fa027301cb6accf400c901fb00112311271123112211261122112111251121112011241120111f1123111f111e1122111e111d1121111d111c1120111c111b111f111b111a111e111a1119111d1119003500921118111c11181117111b11171116111a11161115111911151114111811141113111711131112111611121111111511111110111411100f11130f0e11120e0d11110d0c11100c553b1201fa145f046c22112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114003702881113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035102410238219d1a94a200001db3c0038014b01f42c8100fab9f2e0fa1127112a11271126112911261125112811251124112a11241123112911231122112811221121112a1121112011291120111f1128111f111e112a111e111d1129111d111c1128111c111b112a111b111a1129111a1119112811191118112a11181117112911171116112811161115112a1115003901bc1114112911141113112811131112112a11121111112911111110112811100f112a0f0e11290e0d11280d0c112a0c0b11290b0a11280a09112a09081129080711280706112a06051129050411280403112a030211290201112801112a5629003a01fe562421c705917f9c561681010b2259f40a6fa131e2917f9c561081010b2259f40a6fa131e2917f9c561781010b2259f40a6fa131e292307f9c81010b56120259f40a6fa131e2917f9170e2b3f2e2cf112711281127112611271126112511261125112411251124112311241123112211231122112111221121112011211120003b02e8111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e1129db3c70112a56298050112dc80169003c01fc5520765004cb1f58fa02cecec91302112a0201112b0140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b1119003d00801118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e551d01fe30112c112e112c112b112d112b112a112c112a1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118003f029a1117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac2410ac109b108a10895560db3c0040014b01ee6c61561381010b2359f40a6fa131f2e2c2561381010b2359f40a6fa193fa003092306de2206ef2d0801127112a11271126112911261125112811251124112a11241123112911231122112811221121112a1121112011291120111f1128111f111e112a111e111d1129111d111c1128111c111b112a111b004101fc111a1129111a1119112811191118112a11181117112911171116112811161115112a11151114112911141113112811131112112a11121111112911111110112811100f112a0f0e11290e0d11280d0c112a0c0b11290b0a11280a09112a09081129080711280706112a06051129050411280403112a030211290201112801004203ee112a562a8ebdeda2edfb561a561c6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571c5cbe9c571b01111a01a1111970db31e1a170111b9131e2e301e2d801111e01a0111d111581010b562a562c206e953059f4593098c801fa024133f441e211155629db3c3570112b56288050112bc800de0169004301f85520775004cb1f58fa02cecec9103502112b020111290140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb005626011127010f81010bf4593006a4112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b004400c8111a111d111a1119111c11191118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f061111060d11100d10cf10be10ad109c108b107a0910581047103641050402fe8efc10575f07112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113e00046004701ea1112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610354430125725c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db310152044c2682101dcd6500bae30226821023c34600bae30226821029b92700bae3022682102faf0800ba0048004a004c005401fa145f046c22112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114004902f81113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046103510241023db3cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db310164015201fc112d112f112d112c112e112c112b112d112b112a112c112a1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b1119004b02c01118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1089078218e8d4a510007f274879103644554313db3c004e014b01fc112d112f112d112c112e112c112b112d112b112a112c112a1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b1119004d02c01118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1089078218e8d4a5100070274879103644554313db3c004e014b01f46c611127112c11271126112b11261125112a11251124112911241123112811231122112c11221121112b11211120112a1120111f1129111f111e1128111e111d112c111d111c112b111c111b112a111b111a1129111a1119112811191118112c11181117112b11171116112a1116111511291115111411281114004f01b01113112c11131112112b11121111112a11111110112911100f11280f0e112c0e0d112b0d0c112a0c0b11290b0a11280a09112c0908112b0807112a07061129060511280504112c0403112b0302112a02011129011128562a005001f4f82327a1218218174876e800a90612a0561ac2009c561a5882109ca41900a986a09131e2111e561ea120c2fff2e2c501111c01111ea0111b112711281127112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d005102fc111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e112bdb3c01112a01112970112d8050112dc85530785005cb1f5003fa02ca00cecec90311280302112b020169005201fc01112a0140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112311271123112211261122112111251121112011241120111f1123111f111e1122111e111d1121111d111c1120111c111b111f111b111a111e111a1119111d11191118111c11181117111b11171116111a1116111511191115111411181114005300601113111711131112111611121111111511111110111411100f11130f0e11120e0d11110d0c11100c10bf10ae109d5538043ce30226821035a4e900bae302268210068e7780bae30226821007270e00ba0055005d0063006601fc112d112f112d112c112e112c112b112d112b112a112c112a1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b1119005602bc1118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1089078218e8d4a510005415765044451503db3c0057014b01f46c611127112b11271126112a11261125112911251124112811241123112b11231122112a1122112111291121112011281120111f112b111f111e112a111e111d1129111d111c1128111c111b112b111b111a112a111a1119112911191118112811181117112b11171116112a1116111511291115111411281114005801b01113112b11131112112a11121111112911111110112811100f112b0f0e112a0e0d11290d0c11280c0b112b0b0a112a0a091129090811280807112b0706112a06051129050411280403112b0302112a02011129011128562a005901f4f82327a1218218174876e800a90612a0561ac2009c561a5882109ca41900a986a09131e2111e561ea120c2fff2e2c501111c01111ea0111b112711281127112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d005a02fc111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e1129db3c112a70112c8050112bc85520795004cb1f58fa02cecec903112a0302112b020111290140037f0169005b01fac8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a1117111611191116111511181115111411171114005c00761113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b107a106910581047103645330401fe30112c112e112c112b112d112b112a112c112a1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118005e029a1117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac2410ac109b108a10895560db3c005f014b01f6365f041128112a11281127112911271126112a11261125112911251124112a11241123112911231122112a11221121112911211120112a1120111f1129111f111e112a111e111d1129111d111c112a111c111b1129111b111a112a111a1119112911191118112a11181117112911171116112a1116111511291115006002f81114112a11141113112911131112112a11121111112911111110112a11100f11290f0e112a0e0d11290d0c112a0c0b11290b0a112a0a0911290908112a080711290706112a060511290504112a040311290302112a0201112901112adb3c7070112c562a8050112dc855207a5004cb1f58fa02cecec9443002112c020169006101fa01112b014343c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811160062005c1115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e551d01f45f08112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112006402f21111111311111110111211100f11110f0e11100e10df551c56116e936d5712df88c88258c000000000000000000000000101cb67ccc970fb00c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db3100650152003400000000636c656172656450656e64696e6752657175657374730442e30226821007bfa480bae30226821008583b00bae3026c223223821008f0d180ba0067006d0074007b01fe30112c112e112c112b112d112b112a112c112a1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118006802b01117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910788218e8d4a5100025106844741513db3c0069014b01f46c615220111381010bf459f2e2cd1127112a11271126112911261125112811251124112a11241123112911231122112811221121112a1121112011291120111f1128111f111e112a111e111d1129111d111c1128111c111b112a111b111a1129111a1119112811191118112a1118111711291117111611281116006a02f41115112a11151114112911141113112811131112112a11121111112911111110112811100f0e11290e0d11280d0c0b11290b0a11280a0908112908071128070605112905041128040302112902011128015629db3c3570112956288050112dc85520755004cb1f58fa02cecec910350211290201112b0140037f0169006b01fec8cf8580ca00cf8440ce01fa02806acf40f400c901fb0006a5112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a1117111611191116111511181115111411171114006c00741113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b107a0910581047103641501401fe30112c112e112c112b112d112b112a112c112a1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118006e029a1117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac2410ac109b108a10895560db3c006f014b01f26c615210111981010bf459f2e2d12081010b2359f40a6fa193fa003092306de2206ef2d0801127112a11271126112911261125112811251124112a11241123112911231122112811221121112a1121112011291120111f1128111f111e112a111e111d1129111d111c1128111c111b112a111b111a1129111a007001cc1119112811191118112a1118111711291117011116011115112a1115111411291114011113011112112a1112111111291111011110010f112a0f0e11290e1d0c112a0c0b11290b1a09112a09081129081706112a06051129051403112a0302112902112a562a007102fef82327a1218218174876e800a90612a0561ac2009c561a5882109ca41900a986a09131e2111e561ea120c2fff2e2c501111c01111ea0111b5629db3c35708050112cab0001562901112bc8552080345004cb1f58fa02cecec910350211290201112b0140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb0006a50169007201fc112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a1117111611191116111511181115111411171114111311161113111211151112111111141111111011131110007300440f11120f0e11110e0d11100d10cf10be10ad109c108b107a0910581047103641501401fe30112c112e112c112b112d112b112a112c112a1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11180075029a1117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac2410ac109b108a10895560db3c0076014b01f66c61561781010b2359f40a6fa131f2e2d0561781010b2359f40a6fa193fa003092306de2206ef2d0805220111981010bf459301127112a11271126112911261125112811251124112a11241123112911231122112811221121112a1121112011291120111f1128111f111e112a111e111d1129111d111c1128111c007701e2111b112a111b111a1129111a1119112811191118112a1118111711291117111611281116111511141129111411131128111311121111112911111110112811100f0e11290e0d11280d0c0b11290b0a11280a0908112908071128070605112905041128040302112902011128015629562b007802fc20c101915b8e6a561f21be983101111e01a1111de0201120a17020561e81010b2559f40a6fa1318e1930561d81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111e0301111e01206e953059f4593098c801fa024133f441e201111c01111ea0111a111d111a111be25629db3c3570112b562880500169007901fe112bc8552080315004cb1f58fa02cecec9103502112b020111290140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb0006a5112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c1119007a00b01118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b107a0910581047103641050402fe8efc10245f04112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113e0007c007d01c21112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610354430128d0860000000000000000000000000000000000000000000000000000000000000000004c705b3f2e2bc27f2e2be014b03fc23821009896800bae302238209312d00ba93f2c2c0e30e02112c0201112b0103112a03112904112804031127031126041125040311240311230411220403112103112004111f0403111e03111d04111c0403111b03111a04111904031118031117041116040311150311140411130403111203111104111004103f0e104d007e0080009801f45f05112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112007f01bc1111111311111110111211100f11110f0e11100e10df551c572656261126c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015203f82382103a699d00ba917f9823821006052340bae2e30f112c01112b011127112a1127112611291126112511281125112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b111800810084009701fc1127112a11271126112911261125112811251124112a11241123112911231122112811221121112a1121112011291120111f1128111f111e112a111e111d1129111d111c1128111c111b112a111b111a1129111a1119112811191118112a11181117112911171116112811161115112a1115111411291114111311281113008201ae1112112a11121111112911111110112811100f112a0f0e11290e0d11280d0c112a0c0b11290b0a11280a09112a09081129080711280706112a06051129050411280403112a030211290201112b01112c8218174876e80000830070f82327a1218218174876e800a90612a0561ac2009c561a5882109ca41900a986a09131e2111e561ea120c2fff2e2c501111c01111ea0111b044c2382103b023380bae30223821006146580bae3022382103b8b87c0bae3022382101ddca740ba008500870089008b01fa10245f040111130181010b017071216e955b59f4593098c801cf004133f441e21111a4112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911170086018c11161118111611151117111511141116111411131115111311111114111111131110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610354430014b01fe10245f0401111381010bf45930112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113008801dc11141111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610354403c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015201fc5f0511251127112511241126112456231126112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112008a01b41111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046103544030282100bebc20070801127c801803858cb1fcb09c94343c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00014b02fe8efc10245f04112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113e0008c008d01d21112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035443012804056297003561fc8552080425004cb1f12cece01fa02c95628503340137fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00014b04fc23821017e6c640ba917f9823821017f60880bae2917f9823821018148d00bae2e3022382101a76e700bae302238210069db9c0bae3022382100db58580ba942af2e2bede112c01112b0103112a030211290204112804031127030211260204112504031124030211230204112204031121030211200204111f0403111e03008e00910092009601f810345f04112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113008f01661112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035443012009001b48e57eda2edfb56197022821017e6c640ba9c303157198218174876e800208e2b22821017f60880ba9c303157198218746a528800208e1302821018148d00ba965b705719db31e0111a01e2e201111a01bc965717f8231117ded8014b01f45f05112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112013401f45f05112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112009302b41111111311111110111211100f11110f0e11100e10df551cdb3cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db310094015202f6f823f8232382015180a0bc9827a18209e13380b9923070e2f2e2df8212540be4008ebdeda2edfb561a561c6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571c5cbe9c571b01111a01a1111970db31e1a170111b9131e2e301e2d801111e01a0111d31f823820898968073708212540be400562bc800de009500565980465003cb1f01fa02cec956295530441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0001009c02111d0204111c0403111b0302111a0204111904031118030211170204111604031115030211140204111304031112030211110204111004103f102e104d103c102b104a1039102810471036102500a41117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b107a10691058104710361025001c103c0b104a10390810471036451501f655608210178d45195008cb1f16cb3f14cb0958fa02ce01206e9430cf84809201cee201fa02cec9112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a1119009a01f61118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a10891078106710561045103411284130562b562670f82ac87001ca0055215023cece01fa02c931521004112b0403112c0302112a02009b01fc103410237f59112e800bd721d30730105610451034413001112e0155505505c85a80285003cb057601cb03ccccc9c87101cb0113ca00830901cb0d22f90058018100f8a92801aaf7b101cbff58fa027301cb6accf400c901fb00112311271123112211261122112111251121112011241120111f1123111f111e1122111e009c01ce111d1121111d111c1120111c111b111f111b111a111e111a1119111d11191118111c11181117111b11171116111a11161115111911151114111811141113111711131112111611121111111511111110111411100f11130f0e11120e0d11110d0c11100c553b12014b01fc5b11278020d721d33f31d309fa00fa40d72c01916d93fa4001e230fa0031112711291127112611281126112511291125112411281124112311291123112211281122112111291121112011281120111f1129111f111e1128111e111d1129111d111c1128111c111b1129111b111a1128111a111911291119111811281118009e02fc1117112911171116112811161115112911151114112811141113112911131112112811121111112911111110112811100f11290f0e11280e0d11290d0c11280c0b11290b0a11280a091129090811280807112907061128060511290504112804031129030211280201112a01112b562adb3c1127112811271126112711260139009f01fc112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a111911181119111811171118111711161117111611151116111511141115111411131114111311121113111211111112111100a004fe1110111111100f11100f550e11295304ba91308eba24bc8e2ff84282100bebc20070801127c801803858cb1fcb09c94343c8cf8580ca00cf8440ce01fa02806acf40f400c901fb008e84f842db3ce2e2562882103b9aca00bee30f1127112a1127112611291126112511281125112411271124112311261123112211251122014200a100a200b5019256288ebdeda2edfb561a561c6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571c5cbe9c571b01111a01a1111970db31e1a170111b9131e2e301e2d801111e01a0111d00de024856288209312d00ba8e98562882103a699d00ba9a111d8218174876e800a0e30e111de30d00a300b403de5628821006052340ba8ed2562957278218174876e8008ebdeda2edfb561a561c6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571c5cbe9c571b01111a01a1111970db31e1a170111b9131e2e301e2d801111e01a0111d8f0d562882100623a7c0bae3035629e2111d00de00a400b202f8572a56216eb39c5621206ef2d080562901c7059170e2e30257275727112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a111711161119111611151118111500a500b101f67f112882100e4e1c00ba93705728de112611291126112511281125112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a111711161119111611151118111500a602e01114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf552bdb3cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db3100a7015203f6395388e30f56221125112711251124112611241123112711231122112611227080505629112411231129112311221121112911211120111f1129111f111e111d1129111d111c111b1129111b111a111911291119111811171129111711161115112911151114111311291113111211111129111111100f11290f0e00a800ab00ae01fc112711291127112611281126112511291125112411281124112311291123112211281122112111291121112011281120111f1129111f111e1128111e111d1129111d111c1128111c111b1129111b111a1128111a11191129111911181128111811171129111711161128111611151129111511141128111411131129111300a901961112112811121111112911111110112811100f11290f0e11280e0d11290d0c11280c0b11290b0a11280a09112909081128080706112806050411280403021128020111288218e8d4a5100000aa01948ebdeda2edfb561a561c6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571c5cbe9c571b01111a01a1111970db31e1a170111b9131e2e301e2d801111e01a0111d3408a400de01fe1127112911271126112811261125112911251124112811248218e8d4a51000562a11251124112a112411231122112a112211211120112a1120111f111e112a111e111d111c112a111c111b111a112a111a11191118112a111811171116112a111611151114112a111411131112112a111211111110112a11100f0e112a0e0d00ac01480c112a0c0b0a112a0a102908112a08102706112a06102504112a04102302112a02112b0100ad00ea20c101915b8e6a561f21be983101111e01a1111de0201120a17020561e81010b2559f40a6fa1318e1930561d81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111e0301111e01206e953059f4593098c801fa024133f441e201111c01111ea0111a111d111a111be23408a502f80d11290d0c0b11290b104a09112909104807112907104610350201112901112adb3c01112c01562401562901112dc8553080445005cb1f13ca00cececec9031129030211280201112a0140337fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112311271123112211261122112111251121112011241120016900af01fc111f1123111f111e1122111e111d1121111d111c1120111c111b111f111b111a111e111a1119111d11191118111c11181117111b11171116111a11161115111911151114111811141113111711131112111611121111111511111110111411100f11130f0e11120e0d11110d0c11100c10bf10ae109d108c107b106a105900b0001210481037461440050301dc1114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf552bc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015201ee561581010b2259f40a6fa131f2e2e0561581010b22714133f40a6fa19401d70030925b6de2206ef2d080b3f2e2e1561472a906561401be99f82327a182015180bc9170e28e290111150181010b017f71216e955b59f4593098c801cf004133f441e21112a401112701111211141112e30d01112701111200b300ca3057125726562470561481010b7159f4826fa520965023d7003058966c216d326d01e2908e3d8e1d111581010b56167071216e955b59f4593098c801cf004133f441e21115de81010b561602714133f4746fa520965023d7003058966c216d326d01e2e85b00f656298218e8d4a5100020c101915b8e6a561f21be983101111e01a1111de0201120a17020561e81010b2559f40a6fa1318e1930561d81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111e0301111e01206e953059f4593098c801fa024133f441e201111c01111ea0111a111d111a111be201f8112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf552b012701fa5b11278020d721d309d430d0d200018e12d401d001d401d001d401d001fa4055305f04defa40fa40d41127112a11271126112911261125112811251124112a11241123112911231122112811221121112a1121112011291120111f1128111f111e112a111e111d1129111d111c1128111c111b112a111b111a1129111a00b702fc1119112811191118112a11181117112911171116112811161115112a11151114112911141113112811131112112a11121111112911111110112811100f112a0f0e11290e0d11280d0c112a0c0b11290b0a11280a09112a09081129080711280706112a06051129050411280403112a030211290201112b01112c562adb3c013900b802fe57225722572224b3f2e2d3562756285628562824bc9533112afb048e92572b112722b9e30011261129112601112601e282084c4b4073707020562d5630c8553082107362d09c5005cb1f13cb3f01fa02cecec9562b5530441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb008208989680737056280302112c0200b900bc01fcf842112611281126112511271125112411261124011124011123112a1123112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a111811171119111711161118111611151117111511141116111411131115111311121114111211111113111100ba02f81110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035102403112a0301112a01db3c1122112911221122112711221124112611241122112511221122112311220211220201112101112001111f01111e01111d01111c01111b01111a011119011118011117011116011115011114014200bb001c01111301111201111101111055d101fe01112b01112ec8553080515005cb1f13cecececec956240403112c0302112a02112901441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112211271122112111261121112011251120112111241121112011231120111c1121111c111b1120111b111a111f111a1119111e11191118111d11181117111c111700bd01881116111b11161115111a11151114111911141113111811131112111711121111111611111110111511100f11140f0e11130e0d11120d0c11110c0b11100b10af55495503014b02fe8efd5b11278020d721d200fa4031fa40fa4030112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a11191128111911181128111811171128111711161128111600bf00cc04e21115112811151114112811141113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a091128090811280807112807061128060511280504112804031128030211280201112901112a5629db3c8219d1a94a20005629e30f013900c000c200c401f6111781010b562b5619206e953059f4593098c801fa024133f441e2112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a11191128111911181128111800c101c2111711281117111611151114111311121111111055e056288ebdeda2edfb561a561c6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571c5cbe9c571b01111a01a1111970db31e1a170111b9131e2e301e2d801111e01a0111d09a400de01fe562a01111881010bf45930112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a111911281119111811281118111711281117111611151114111311121111111000c300f455e0562a562920c101915b8e6a561f21be983101111e01a1111de0201120a17020561e81010b2559f40a6fa1318e1930561d81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111e0301111e01206e953059f4593098c801fa024133f441e201111c01111ea0111a111d111a111be209a502f488d0112811291128112711281127112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a111911181119111811171118111711161117111611151116111500c500c6002400000000696e766974652073756363657373017a1114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd1b1c109a1089107810671056104510341023562b5900c701c4f8276f102082112a05f200bc9782103b9aca00a196308208989680e273707045135064c8553082107362d09c5005cb1f13cb3f01fa02cecec9562b4344441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00562a5629821aba7def300000c802fe821005f5e10073707005926d36df4430562d5006c8553082107bdd97de5005cb1f13cb3f01fa02ce01206e9430cf84809201cee2c956295044441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0082089896807370708218e8d4a5100088d0562d01c8553082107362d09c5005cb1f13cb3f01fa02cecec9562d00c900ca002800000000696e766974656420617070726f76656401fc5530441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00820898968011297370562a0201112d01112ec8553080445005cb1f13ca00cececec956260403112a0302112c02112b01441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0011241127112411231126112311221125112211211124112100cb01ec112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf552b014b0426e020c034e30220c006e30220c007e30220c03100cd00d300d900e101fa5b11278020d721fa00fa40112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a11191128111911181128111811171128111711161128111611151128111500ce02f61114112811141113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a091128090811280807112807061128060511280504112804031128030211280201112901112a5629db3c5623562ac705f2e2d1112711281127112611271126112511261125013900cf01fc112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a111911181119111811171118111711161117111611151116111511141115111411131114111311121113111211111112111111101111111000d001f80f11100f550e56295110112cf8276f102082112a05f200bc9782103b9aca00a196308208989680e273707045135064c8553082107362d09c5005cb1f13cb3f01fa02cecec9562b4344441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb003711261128112611251127112511241126112411231125112300d101fc112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce00d2012e10bd10ac109b108a10797009106810571046103544301200e701fe5b11278020d721fa00fa402a8100fab9f2e0fa112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a11191128111911181128111811171128111711161128111600d402fc1115112811151114112811141113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a091128090811280807112807061128060511280504112804031128030211280201112901112a5629db3c112711281127112611271126112511261125112411251124013900d501fc112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e00d601fa56295110112cf8276f102082112a05f200bc9782103b9aca00a196308208989680e273707045135064c8553082107362d09c5005cb1f13cb3f01fa02cecec9562b4344441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb000211110281010b0201112901112a206e953059f4593098c801fa024133f441e200d701fc112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a111811171119111711161118111611151117111511141116111411131115111311121114111211111113111100d801ca11101112111011110e11100e10df10ce10bd10ac109b108a10791068105710461035440302c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015201fa5b11278020d721fa00fa40112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a11191128111911181128111811171128111711161128111611151128111500da02fc1114112811141113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a091128090811280807112807061128060511280504112804031128030211280201112901112a5629db3c112711281127112611271126112511261125112411251124112311241123013900db01fc112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e56295110112c00dc01b2f8276f102082112a05f200bc9782103b9aca00a196308208989680e273707045135064c8553082107362d09c5005cb1f13cb3f01fa02cecec9562b4344441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00562900dd02f68ebdeda2edfb561a561c6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571c5cbe9c571b01111a01a1111970db31e1a170111b9131e2e301e2d801111e01a0111d0211150281010b0201112901112a206e953059f4593098c801fa024133f441e207a411251127112511241126112411231125112300de00df00ee561b81010bf4826fa5209502fa00305895316d326d01e2908e5b22c101935bdb31e05320be91209122e266a15033a1228e1e01111d0181010b01561e5004206e953059f4593098c801fa024133f441e29a3220111d81010bf45930e281010b21111e59f4746fa5209502fa00305895316d326d01e2e85b01fc112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114071115071112111411121111111311111110111211100f11110f0e11100e10df10ce10bd00e0019610ac109b108a0910685515c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015202fe8efd5b11278020d721fa00fa40112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a11191128111911181128111811171128111711161128111611151128111500e200e802fc1114112811141113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a091128090811280807112807061128060511280504112804031128030211280201112901112a5629db3c112711281127112611271126112511261125112411251124112311241123013900e301fc112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e56295110112c00e401f4f8276f102082112a05f200bc9782103b9aca00a196308208989680e273707045135064c8553082107362d09c5005cb1f13cb3f01fa02cecec9562b4344441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00562801111681010bf4593011271129112711261128112611251127112511241126112400e501fc112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a111811171119111711161118111611171114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df00e6012e10ce10bd10ac109b108a1079106810571046103544301200e701e420c101915b8e6a561f21be983101111e01a1111de0201120a17020561e81010b2559f40a6fa1318e1930561d81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111e0301111e01206e953059f4593098c801fa024133f441e201111c01111ea0111a111d111a111be2014b0426e020c017e30220c005e30220c008e30220c00900e900ef00f600fd01fe5b11278020d721fa00fa402a8100fab9f2e0fa112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a11191128111911181128111811171128111711161128111600ea02fc1115112811151114112811141113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a091128090811280807112807061128060511280504112804031128030211280201112901112a5629db3c112711291127112611281126112511271125112411261124013900eb01f8112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f00ec01f60e11100e551d21112bf8276f102082112a05f200bc9782103b9aca00a196308208989680e273707045135064c8553082107362d09c5005cb1f13cb3f01fa02cecec9562b4344441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00111d8218e8d4a51000a00111100181010b0111298218e8d4a5100000ed01f4206e953059f4593098c801fa024133f441e208a4112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111b111c111b111a111b111a1119111a111911181119111811171118111711161117111611151116111500ee01e01114111511141113111411131112111311121111111211111110111111100811100810ef10de10cd10bc10ab090a5507c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015201fa5b11278020d721fa00fa40112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a11191128111911181128111811171128111711161128111611151128111500f002fc1114112811141113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a091128090811280807112807061128060511280504112804031128030211280201112901112a5629db3c112711281127112611271126112511261125112411251124112311241123013900f101fc112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e56295110112c00f201f6f8276f102082112a05f200bc9782103b9aca00a196308208989680e273707045135064c8553082107362d09c5005cb1f13cb3f01fa02cecec9562b4344441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0011271129112711261128112611251127112511241126112411231125112311221124112200f302f4112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551cdb3c00f4014b01342ec000f2e2c35210111381010bf459302bc200930ba50bde111200f500e420c101915b8e6a561f21be983101111e01a1111de0201120a17020561e81010b2559f40a6fa1318e1930561d81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111e0301111e01206e953059f4593098c801fa024133f441e201111c01111ea0111a111d111a111be201f45b11278020d721fa00d200fa40201127112a11271126112911261125112811251124112a11241123112911231122112811221121112a1121112011291120111f1128111f111e112a111e111d1129111d111c1128111c111b112a111b111a1129111a1119112811191118112a111811171129111711161128111600f702fa1115112a11151114112911141113112811131112112a11121111112911111110112811100f112a0f0e11290e0d11280d0c112a0c0b11290b0a11280a09112a09081129080711280706112a06051129050411280403112a030211290201112b01112c5629db3c3a5629953c0b11280b925729e225f2e2be2c81010b5629013900f802f659f40a6fa131b3f2e2c60c81010b56287f71216e955b59f4593098c801cf004133f441e20aa4f82382015180a02192572ae30e1125112a1125112411291124112311281123112211271122112111261121112011251120111f1124111f111e1123111e111d1122111d111c1121111c111b1120111b111a111f111a00f900fc01fc371125112611251124112511241123112411231122112311227f56221124112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a111911181119111811171118111711161117111611151116111511141115111411131114111300fa02f81112111311121111111211111110111111100f11100f5e2c102d10bc108b191a107810671056104510341023112a02db3c82083d0900708209312d005410222802562d02562f0211321045c855608210178d45195008cb1f16cb3f14cb0958fa02ce01206e9430cf84809201cee201fa02cec91201112c017050237f016900fb00a4c8cf8580ca00cf8440ce01fa02806acf40f400c901fb000911290911281126112511241123112211211120111f111e111d111c111b111a11191118111711161115111411131112111111100f0e0d55900c0b01c81119111e11191118111d11181117111c11171116111b11161115111a11151114111911141113111811131112111711121111111611111110111511100f11140f0e11130e0d11120d0a11110a0b11100b0f109e10bd107c106b105a104910384760451402012702fe8efd5b11278020d721fa00fa40112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a11191128111911181128111811171128111711161128111611151128111500fe010002c41114112811141113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a091128090811280807112807061128060511280504112804031128030211280201112901112a5629db3c5629013900ff01f63b2cc200f2e2c71e81010b500b7071216e955b59f4593098c801cf004133f441e20aa4f82382015180a050ba1e1127112a1127112611291126112511281125112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b0126043ae020c00ae30220c035e3022082107ac8d559bae302208210595f07bcba01010128012c012f01fc5b11278020d721fa00fa4020112711291127112611281126112511291125112411281124112311291123112211281122112111291121112011281120111f1129111f111e1128111e111d1129111d111c1128111c111b1129111b111a1128111a111911291119111811281118111711291117111611281116111511291115010202f41114112811141113112911131112112811121111112911111110112811100f11290f0e11280e0d11290d0c11280c0b11290b0a11280a091129090811280807112907061128060511290504112804031129030211280201112a01112b5628db3c562901562901112c1129112a11291128112911281127112811270139010301fc112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a1119111811191118111711181117111611171116111511161115111411151114111311141113111211131112010402f81111111211111110111111100f11100f10ef10de10cd10bc10ab109a10891078106710561045103403112c03db3c1127112a1127112611291126112511281125112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b0105012604f6322cc200f2e2c2f8232dbef2e2df547ede21bc209132923101e270561381010b7159f4826fa520965023d7003058966c216d326d01e2908eb12091249170e292307f97b39223b39170e2e2e30081010b561502714133f4746fa520965023d7003058966c216d326d01e2e85f04e30f1125112711251124112611240106010a0123012401fa5312b9998219d1a94a200002a4988218e8d4a5100002e21127112e11271126112d11261125112c11251124112b11241123112a11231122112911221121112811211120112e1120111f112d111f111e112c111e111d112b111d111c112a111c111b1129111b111a1128111a1119112e11191118112d11181117112c1117010702fe1116112b11161115112a11151114112911141113112811131112112e11121111112d11111110112c11100f112b0f0e112a0e0d11290d0c11280c0b112e0b0a112d0a09112c0908112b0807112a07061129060511280504112e0403112d0302112c0201112b01112a562bdb3c7071545101011131015280562d01562e0156310169010801f41045c855608210178d45195008cb1f16cb3f14cb0958fa02ce01206e9430cf84809201cee201fa02cec9413001112f0140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb001126112d11261125112c11251124112b11241123112a1123112211291122112111281121112011271120111f1126111f010900fa111e1125111e111d1124111d111c1123111c111b1122111b111a1121111a1119112011191118111f11181117111e11171116111d11161115111c11151114111b11141113111a11131112111911121111111811111110111711100f11160f0e11150e0d11140d0c11130c0b11120b0a11110a09111009108f107e55661604d2561181010bf4826fa5209502fa00305895316d326d01e2908ae85b561281010bf4826fa5209502fa00305895316d326d01e2908ae85b561781010bf4826fa5209502fa00305895316d326d01e2908ae85b561881010bf4826fa5209502fa00305895316d326d01e290010b010f0112011501fc1127112b11271126112a11261125112911251124112811241123112b11231122112a1122112111291121112011281120111f112b111f111e112a111e111d1129111d111c1128111c111b112b111b111a112a111a1119112911191118112811181117112b11171116112a11161115112911151114112811141113112b1113010c02e81112112a11121111112911111110112811100f112b0f0e112a0e0d11290d0c11280c0b112b0b0a112a0a091129090811280807112b0706112a06051129050411280403112b0302112a020111290111285629db3c7071112b562a562fc8552080355004cb1f58fa02cecec9413001112b0140037f0169010d01fec8cf8580ca00cf8440ce01fa02806acf40f400c901fb0081010b2f02112a59f4746fa5209502fa00305895316d326d01e21128112c11281127112b11271126112a1126112511291125112411281124112311271123112211261122112111251121112011241120111f1123111f111e1122111e111d1121111d111c1120111c010e00d4111b111f111b111a111e111a1119111d11191118111c11181117111b11171116111a11161115111911151114111811141113111711131112111611121111111511111110111411100f11130f0e11120e0d11110d0c11100c10bf10ae109d108c107b106a10591048103701fc1127112b11271126112a11261125112911251124112811241123112b11231122112a1122112111291121112011281120111f112b111f111e112a111e111d1129111d111c1128111c111b112b111b111a112a111a1119112911191118112811181117112b11171116112a11161115112911151114112811141113112b1113011002e81112112a11121111112911111110112811100f112b0f0e112a0e0d11290d0c11280c0b112b0b0a112a0a091129090811280807112b0706112a06051129050411280403112b0302112a020111290111285629db3c7071112b562a562fc8552080355004cb1f58fa02cecec9413001112b0140037f0169011101f4c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0081010b561002112a59f4746fa5209502fa00305895316d326d01e21128112c11281127112b11271126112a1126112511291125112411281124112311271123112211261122112111251121112011241120111f1123111f111e1122111e111d1121111d011901fc1127112b11271126112a11261125112911251124112811241123112b11231122112a1122112111291121112011281120111f112b111f111e112a111e111d1129111d111c1128111c111b112b111b111a112a111a1119112911191118112811181117112b11171116112a11161115112911151114112811141113112b1113011302ec1112112a11121111112911111110112811100f112b0f0e112a0e0d11290d0c11280c0b112b0b0a112a0a091129090811280807112b0706112a06051129050411280403112b0302112a020111290111285629db3c7071112baa00562a562fc8552080355004cb1f58fa02cecec9413001112b0140037f0169011401f4c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0081010b561502112a59f4746fa5209502fa00305895316d326d01e21128112c11281127112b11271126112a1126112511291125112411281124112311271123112211261122112111251121112011241120111f1123111f111e1122111e111d1121111d011902fc8ae85b1127112911271126112811261125112911251124112811245629112411231129112311221121112911211120111f1129111f111e111d1129111d111c111b1129111b111a111911291119111811171129111711161115112911151114111311291113111211111129111111100f11290f0e0d11290d0c0b11290b0a0116011a01fc1127112b11271126112a11261125112911251124112811241123112b11231122112a1122112111291121112011281120111f112b111f111e112a111e111d1129111d111c1128111c111b112b111b111a112a111a1119112911191118112811181117112b11171116112a11161115112911151114112811141113112b1113011702ec1112112a11121111112911111110112811100f112b0f0e112a0e0d11290d0c11280c0b112b0b0a112a0a091129090811280807112b0706112a06051129050411280403112b0302112a020111290111285629db3c7071112ba703562a562fc8552080355004cb1f58fa02cecec9413001112b0140037f0169011801f4c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0081010b561602112a59f4746fa5209502fa00305895316d326d01e21128112c11281127112b11271126112a1126112511291125112411281124112311271123112211261122112111251121112011241120111f1123111f111e1122111e111d1121111d011900e0111c1120111c111b111f111b111a111e111a1119111d11191118111c11181117111b11171116111a11161115111911151114111811141113111711131112111611121111111511111110111411100f11130f0e11120e0d11110d0c11100c10bf10ae109d108c107b106a10591048103703ee091129090807112907060511290504031129030201112901112adb3c7071821aba7def3000562b562ec8552080355004cb1f58fa02cecec940037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb002d925728e30e561981010bf4826fa5209502fa00305895316d326d01e2908ae85b3757277f0169011b011f02fe705619c2009cf82328a1821925b3aee000b99170e29d3056187828561aa07aa98601a8de1127112811271126112811261125112811255628112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e01129db3c7071215621562da05381562e0156310156331045c80169011c01fc55608210178d45195008cb1f16cb3f14cb0958fa02ce01206e9430cf84809201cee201fa02cec940037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00707370228b021302112d0201112ec8553082107bdd97de5005cb1f13cb3f01fa02ce01206e9430cf84809201cee2c95627431402112c02112b01441359011d01fac8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a1119111811191118111711181117111611171116111511161115011e00481114111511141113111411131112111311121111111211111110111111100f11100f550e01fc112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a111911281119111811281118111711281117111611281116111511281115111411281114111311281113012002e81112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a09112809081128080711280706112806051128050411280403112803021128020111280111295628db3c7071112c562a562ec8552080355004cb1f58fa02cecec9413001112c0140037f0169012101f4c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0081010b561a02112959f4746fa5209502fa00305895316d326d01e2112811291128112711281127112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d012200d4111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a10891078106710561045103400f65b3a3a3a3a3a6d7053000b11260b091125090b11240b091123090b11220b091121090b11200b09111f090b111e0b09111d090b111c0b09111b090b111a0b091119090b11180b091117090b11160b091115090b11140b091113090b11120b091111090b11100b109f10be109d10bc103b704a9b103806504407050301f8112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f012500380e11100e10df10ce10bd10ac109b108a10790810571046103544301201a4111a111d111a1119111c11191118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf552b012701aef8276f102082112a05f200bc9782103b9aca00a196308208989680e273707045135064c8553082107362d09c5005cb1f13cb3f01fa02cecec9562b4344441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00014b02fe5b11278020d721fa003056265626562656265626562656265626562656265626562656265626562656265626562656265626562656265626562656265626562656265626562656265626562656265626562656265626564d564f5628ed41ed43ed44ed45ed47965b01111a01a0ed67ed65ed64ed63ed6180297fed118aed410129012b01fc112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112012a00ce1111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035443012f82327a1218218174876e800a90612a0561ac2009c561a5882109ca41900a986a09131e2111e561ea120c2fff2e2c501111c01111ea0111b1119018eedf101f2ff1119c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015201f45b11278020d721fa40d2003028b3f2e2bd6d019c30f82a562501562801126f03de561d01c8598210ca77fdc25003cb1f01fa02216eb38e117f01ca0001206ef2d0806f235023cececc947032ca00e2c90170804043137fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112511271125112411261124012d01f8112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f012e01900e11100e10df551cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db3101520430e30220820b93b1cebae30220c038e3022082102508d66aba013001330135013701fe5b11278020d721d33ffa00d72c01916d93fa4001e23129b3f2e2bdf8425629c705f2e2bc111e21a120c2fff2e2c5f8416f2443305230fa40fa0071d721fa00fa00306c6170f83a811f4070f836aa00a0bcf2e2bf7080405043562a7f1122c8553082107bdd97de5005cb1f13cb3f01fa02ce01206e9430cf84809201cee2c9013101f85627044313112001441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117013201ec1116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015201f65b5727112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112013401841111111311111110111211100f11110f0e11100e10df551cf8425628c705f2e2bc5627708100906d40037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00014b01fa5b5727f842112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113013602ea1112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035443012db3cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31014201520210e30220c047e302010138014703fc5b11278020d721d2000193d30931ded2000192d309926d01e2d72c01916d93fa4001e201f40431f40431d430d0f40431f4043001206ef2d0800211290201112a01db3c5628206ef2d0805240b99457285728e30d112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f0139013d014601f0112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a111911281119111811281118111711281117111611281116111511281115111411281114013a01f81113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a09112809112808070655405628562670f82ac87001ca0055215023cece01fa02c9315210f842fa443159c85980285003cb057601cb03ccccc9f900206ef2d0808100f8a928018100f8a928ba013b01fc9257288e2af842562601c705f2e2bc279257288e1937572157217f562608a4061127060811220806112106508806e2e2112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a013c00841119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e016e331127206ef2d0801128206ef2d080fb04561481010bf4826fa5209502fa00305895316d326d01e231908ae83011261127112601112601013e01f4562656265626562656265626562656265626562656265626562656265626562656265626562656265626562656265626562656265626562656265626562656265626562656265626564c5626564d56291127114e11271126114d11261125114c11251124114b11241123114a1123112211491122112111481121013f01fc112011471120111f1146111f111e1145111e111d1144111d111c1143111c111b1142111b111a1141111a1119114011191118113f11181117113e11171116113d11161115113c11151114113b11141113113a11131112113911121111113811111110113711100f11360f0e11350e0d11340d0c11330c0b11320b0a11310a014002f80911300908112f0807112e0706112d0605112c0504112b04031150030211290201114f01112a5628db3c57105f0f57105f0f6c81112711281127112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c0169014102f4111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a108910781067105610450411290410230211290201112901db3c81010b561702112a0142014401cc7382100bebc20070f82a562c52926d6d50046d50036d01c8556082102508d66a5008cb1f266eb3977f01ca0016cb099636705006ca00e2246eb3977f01ca0014cb099634705004ca00e258206e9430cf84809201cee2f400f40001c8f40012f400cdc90350440143002ec8cf8580ca00cf8440ce01fa02806acf40f400c901fb0001fc59f4746fa5209502fa00305895316d326d01e2310411290402112802021127020211260202112502021124020211230202112202021121020211200202111f0202111e0202111d0202111c0202111b0202111a0202111902021118020211170202111602021115020211140202111302021112020211110202111002102f01450030102e102d102c102b102a102910281027102610251024102301c8111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e551d014b01fe5b11278020d721fa40307382100bebc20070c87101cb00562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a014802aa01562a01562a01562a01565101565301112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9f82a562b5448306d046d5a6d59c80152014901fa556082102508d66a5008cb1f266eb3977f01ca0016cb099636705006ca00e2246eb3977f01ca0014cb099634705004ca00e258206e9430cf84809201cee2f400f40001c8f40012f400cdc9035044c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112511271125112411261124112311251123112211241122014a01f0112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551c014b0180c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015201f6305727112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112014d01ac1111111311111110111211100f11110f0e11100e10df551cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015201fc112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112111111131111014f01f81110111211100f11110f0e11100e10df551cf8425628c705f2e2bc5627708100906d40037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db310152019c111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551c0151017cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015201f6011127011128ce01112501ce01112301ce1121c8ce01112001ce01111e206e9430cf84809201cee2c80403111d0302111c0201111b01111a03c8ce14cd01c8cecd02c8ce12cdce011115fa0201111301ca05011111fa020fc8f400500efa0240cb59fa02cb2918f40016f40004c8f40013cb03cb03f40012f400020153006cc8f40013f40013ca0013cb0914cb0914cb1f14cb0714ca0016ca0014cb1f15cb1f15ce16cb0916ca0016cb1f16cc14cd12cdcd12cdcd0201200155015b0201200156015803fbbaf15ed44d0d200018e8dfa40fa40fa00552003d158db3ce30d5627562756275627562756275627562756275627562756275627562756275627562756275627562756275627562756275627562756275627562756275627562756275627562756275627562756275627572857285728572857285728572857285728572880160016e015700785728572857285728572857285728572857285728572857285728572857285728572857285728572857285728572857285728572857285728572857280201580159015a0257b1ce3b513434800063a37e903e903e80154800f45636cf38c35588d58955c495c417c3d5c495c417c3db18a00160016e0259b2c0bb513434800063a37e903e903e80154800f45636cf38c37e0a958780558a40558a005b311b311b311b11200160016e020158015c015d029db5e35da89a1a400031d1bf481f481f400aa4007a2b1b679c61b0431d1a94a20010402a300ac34ac3590b2b3f405965392ac2006ac2006ac2006ac2006ac2006ac2006ac20a5c4d976d976d976d8f700160016e020120015e015f0265b1827b513434800063a37e903e903e80154800f45636cf38c34a2cfcb8af558555841584958655855587d5851b39db39db31e00160016e0249b0b87b513434800063a37e903e903e80154800f45636cf38c34a95c417c3d5c417c3db20600160016e01f6308d08600000000000000000000000000000000000000000000000000000000000000000048d08600000000000000000000000000000000000000000000000000000000000000000046d8b088b088b088d086000000000000000000000000000000000000000000000000000000000000000000471706d5471116d016102fa6d6d53556d6d6d6d70547555207070228d0860000000000000000000000000000000000000000000000000000000000000000004217f215623f82382103b9aca00f82a8d086001e4521f9c35ef744241bd040d6fb018621203ff3c6d88669dade0739882c958b488d0051129050511280505112705051126050511250501620163002200000000666f6c6c6f7765644f776e657201cc051124050511230505112205051121050511200503111f0305111e0503111d0305111c0503111b0305111a0503111903051118050311170305111605031115030511140503111303051112050311110305111005103f105e103d105c103b105a5e535e23db3c016401f42b8100fab9f2e0fa112711291127112611281126112511291125112411281124112311291123112211281122112111291121112011281120111f1129111f111e1128111e111d1129111d111c1128111c111b1129111b111a1128111a111911291119111811281118111711291117111611281116111511291115016501bc1114112811141113112911131112112811121111112911111110112811100f11290f0e11280e0d11290d0c11280c0b11290b0a11280a09112909081128080711290706112806051129050411280403112903021128020111290111285629016601fa562421c705917f9c561681010b2259f40a6fa131e2917f9c561081010b2259f40a6fa131e2917f9c561781010b2259f40a6fa131e292307f9c81010b56120259f40a6fa131e2917f9170e2b3f2e2cf8218e8d4a51000111081010b562b5612206e953059f4593098c801fa024133f441e2112711281127112611281126016701fc112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a111911281119111811281118111711281117111611281116111511281115111411281114111311281113111211281112111111281111016802f611101128111055e0562adb3c3570112956288050112cc8552080175004cb1f58fa02cecec910350211290201112a0140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb0006a4112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d0169016d01f0112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a111911281119111811281118111711281117111611281116111511281115111411281114016a01f41113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a09112809112808070655405628562670f82ac87001ca0055215023cece01fa02c9315210c85980285003cb057601cb03ccccc91129800bd721d30730c87401cb027001cb07112af90001016b01f4018100f8a92801aaf7b1011129cbffc9d0fa4030112711281127112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a1119111811191118111711181117016c00901116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a108910781067105610451034413000e0111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b107a0910581047103645440202f8db3c5728112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a1119111811191118111711181117111611171116111511161115111411151114111311141113016f017101f2fa40fa40fa40d401d0fa40fa40d72c01916d93fa4001e201d430d0d401d001d401d001d401d001fa40553004fa00d205fa00d430d0f404fa00fa00d3295902f404f404d430d0f404d303d303f404f404d430d0f404f404d200d309d309d31fd307d200d200d31fd31ffa40d309d200d31fd43011251128112501700048112511271125112511261125112011211120111f1120111f111e111f111e11171118111700301112111311121111111211111110111111100f11100f550e49c9795f');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initJettonWalletSharded_init_args({ $$type: 'JettonWalletSharded_init_args', owner, minter, balance })(builder);
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
    {"name":"JettonWalletSharded$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"ownerAfterRecovery","type":{"kind":"simple","type":"address","optional":false}},{"name":"minter","type":{"kind":"simple","type":"address","optional":false}},{"name":"nominee","type":{"kind":"simple","type":"address","optional":false}},{"name":"invitor","type":{"kind":"simple","type":"address","optional":false}},{"name":"invitor0","type":{"kind":"simple","type":"address","optional":true}},{"name":"id","type":{"kind":"simple","type":"IdInfo","optional":false}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"taxAsTxnFeePercent","type":{"kind":"simple","type":"int","optional":false,"format":6}},{"name":"turnover","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"debts","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"coins"}},{"name":"debt","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"insurance","type":{"kind":"simple","type":"Insurance","optional":false}},{"name":"invited","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"coins"}},{"name":"friends","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"coins"}},{"name":"closeFriendsAndVouched","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"closeFriendsCount","type":{"kind":"simple","type":"uint","optional":false,"format":4}},{"name":"recoveryVouchersCount","type":{"kind":"simple","type":"uint","optional":false,"format":4}},{"name":"pendingRequests","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"coins"}},{"name":"followers","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"coins"}},{"name":"followings","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"coins"}},{"name":"reports","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"reportReason","type":{"kind":"simple","type":"bool","optional":false}},{"name":"reporterCount","type":{"kind":"simple","type":"uint","optional":false,"format":10}},{"name":"disputerCount","type":{"kind":"simple","type":"uint","optional":false,"format":10}},{"name":"reportResolutionTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"connections","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"terminated","type":{"kind":"simple","type":"bool","optional":false}},{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"accountInitTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lastTxnTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lastMsgTo","type":{"kind":"simple","type":"address","optional":false}},{"name":"version","type":{"kind":"simple","type":"uint","optional":false,"format":10}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"lastRewardClaimTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"baseWalletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
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
    {"name":"SliceBitsAndRefs","header":null,"fields":[{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ShardDeployParameters","header":null,"fields":[{"name":"deployParameters","type":{"kind":"simple","type":"DeployParameters","optional":false}},{"name":"shard","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"ShardMessageParameters","header":null,"fields":[{"name":"messageParameters","type":{"kind":"simple","type":"MessageParameters","optional":false}},{"name":"shard","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"Ids$Data","header":null,"fields":[{"name":"root","type":{"kind":"simple","type":"address","optional":false}},{"name":"lat","type":{"kind":"simple","type":"string","optional":false}},{"name":"long","type":{"kind":"simple","type":"string","optional":false}},{"name":"users","type":{"kind":"dict","key":"address","value":"cell","valueFormat":"ref"}},{"name":"jettonWalletInitialCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonMinterState","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"adminAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonContent","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jettonWalletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonMinterSharded$Data","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"totalAccounts","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"treasurySurplus","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"treasuryDeficits","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonContent","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jettonWalletCode","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jettonWalletInitialCode","type":{"kind":"simple","type":"cell","optional":false}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"version","type":{"kind":"simple","type":"uint","optional":false,"format":10}},{"name":"walletVersion","type":{"kind":"simple","type":"uint","optional":false,"format":10}},{"name":"tosHash","type":{"kind":"simple","type":"string","optional":false}},{"name":"mbrpAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"publicWorks","type":{"kind":"dict","key":"address","value":"uint","valueFormat":10}},{"name":"votes","type":{"kind":"dict","key":"address","value":"uint","valueFormat":20}},{"name":"crowdFund","type":{"kind":"dict","key":"uint","keyFormat":10,"value":"uint","valueFormat":10}}]},
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
export const MAX_CONNECTIONS = 250n;
export const prefixLength = 8n;

export class JettonWalletSharded implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = JettonWalletSharded_errors_backward;
    public static readonly opcodes = JettonWalletSharded_opcodes;
    
    static async init(owner: Address, minter: Address, balance: bigint) {
        return await JettonWalletSharded_init(owner, minter, balance);
    }
    
    static async fromInit(owner: Address, minter: Address, balance: bigint) {
        const __gen_init = await JettonWalletSharded_init(owner, minter, balance);
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: JettonTransfer | JettonTransferInternal | InviteInternal | InviteApproval | UnInviteInternal | FriendRequestInternal | ConfirmRequestInternal | UnfriendInternal | FollowInternal | UnfollowInternal | ReportInternal | DisputeInternal | ResolutionInternal | AccCloseBurnInternal | ProvideWalletBalance | JettonBurn | ClaimTON | "claim" | RequestUpgradeCode | Upgrade | UpgradeReqFromMainnet | Slice | null) {
        
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