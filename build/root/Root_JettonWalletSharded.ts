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
    initialOwner: Address;
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
    reportInfo: ReportInfo;
    connections: bigint;
    terminated: boolean;
    active: boolean;
    accountInitTime: bigint;
    lastTxnTime: bigint;
    lastMsgTo: Address;
    version: bigint;
    mintable: boolean;
    lastRewardClaimTime: bigint;
    lastMonthlyAllowanceClaimTime: bigint;
    baseWalletCode: Cell;
}

export function storeJettonWalletSharded$Data(src: JettonWalletSharded$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.initialOwner);
        b_0.storeAddress(src.ownerAfterRecovery);
        const b_1 = new Builder();
        b_1.storeAddress(src.minter);
        b_1.storeAddress(src.treasuryAccount);
        b_1.storeAddress(src.nominee);
        const b_2 = new Builder();
        b_2.storeAddress(src.invitor);
        b_2.storeAddress(src.invitor0);
        b_2.storeRef(src.id.asCell());
        b_2.storeCoins(src.balance);
        b_2.storeInt(src.taxAsTxnFeePercent, 6);
        b_2.storeCoins(src.turnover);
        b_2.storeDict(src.debts, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        b_2.storeCoins(src.debt);
        const b_3 = new Builder();
        b_3.store(storeInsurance(src.insurance));
        b_3.storeDict(src.invited, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        b_3.storeDict(src.friends, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        b_3.storeDict(src.closeFriendsAndVouched, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_3.storeUint(src.closeFriendsCount, 4);
        b_3.storeUint(src.recoveryVouchersCount, 4);
        const b_4 = new Builder();
        b_4.storeDict(src.pendingRequests, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        b_4.storeDict(src.followers, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        b_4.storeDict(src.followings, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        const b_5 = new Builder();
        b_5.store(storeReportInfo(src.reportInfo));
        b_5.storeUint(src.connections, 8);
        b_5.storeBit(src.terminated);
        b_5.storeBit(src.active);
        b_5.storeUint(src.accountInitTime, 32);
        b_5.storeUint(src.lastTxnTime, 32);
        b_5.storeAddress(src.lastMsgTo);
        b_5.storeUint(src.version, 10);
        b_5.storeBit(src.mintable);
        b_5.storeUint(src.lastRewardClaimTime, 32);
        b_5.storeUint(src.lastMonthlyAllowanceClaimTime, 32);
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
    const _initialOwner = sc_0.loadAddress();
    const _ownerAfterRecovery = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _minter = sc_1.loadAddress();
    const _treasuryAccount = sc_1.loadAddress();
    const _nominee = sc_1.loadAddress();
    const sc_2 = sc_1.loadRef().beginParse();
    const _invitor = sc_2.loadAddress();
    const _invitor0 = sc_2.loadMaybeAddress();
    const _id = sc_2.loadRef().asSlice();
    const _balance = sc_2.loadCoins();
    const _taxAsTxnFeePercent = sc_2.loadIntBig(6);
    const _turnover = sc_2.loadCoins();
    const _debts = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_2);
    const _debt = sc_2.loadCoins();
    const sc_3 = sc_2.loadRef().beginParse();
    const _insurance = loadInsurance(sc_3);
    const _invited = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_3);
    const _friends = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_3);
    const _closeFriendsAndVouched = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_3);
    const _closeFriendsCount = sc_3.loadUintBig(4);
    const _recoveryVouchersCount = sc_3.loadUintBig(4);
    const sc_4 = sc_3.loadRef().beginParse();
    const _pendingRequests = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_4);
    const _followers = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_4);
    const _followings = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_4);
    const sc_5 = sc_4.loadRef().beginParse();
    const _reportInfo = loadReportInfo(sc_5);
    const _connections = sc_5.loadUintBig(8);
    const _terminated = sc_5.loadBit();
    const _active = sc_5.loadBit();
    const _accountInitTime = sc_5.loadUintBig(32);
    const _lastTxnTime = sc_5.loadUintBig(32);
    const _lastMsgTo = sc_5.loadAddress();
    const _version = sc_5.loadUintBig(10);
    const _mintable = sc_5.loadBit();
    const _lastRewardClaimTime = sc_5.loadUintBig(32);
    const _lastMonthlyAllowanceClaimTime = sc_5.loadUintBig(32);
    const _baseWalletCode = sc_5.loadRef();
    return { $$type: 'JettonWalletSharded$Data' as const, owner: _owner, initialOwner: _initialOwner, ownerAfterRecovery: _ownerAfterRecovery, minter: _minter, treasuryAccount: _treasuryAccount, nominee: _nominee, invitor: _invitor, invitor0: _invitor0, id: _id, balance: _balance, taxAsTxnFeePercent: _taxAsTxnFeePercent, turnover: _turnover, debts: _debts, debt: _debt, insurance: _insurance, invited: _invited, friends: _friends, closeFriendsAndVouched: _closeFriendsAndVouched, closeFriendsCount: _closeFriendsCount, recoveryVouchersCount: _recoveryVouchersCount, pendingRequests: _pendingRequests, followers: _followers, followings: _followings, reportInfo: _reportInfo, connections: _connections, terminated: _terminated, active: _active, accountInitTime: _accountInitTime, lastTxnTime: _lastTxnTime, lastMsgTo: _lastMsgTo, version: _version, mintable: _mintable, lastRewardClaimTime: _lastRewardClaimTime, lastMonthlyAllowanceClaimTime: _lastMonthlyAllowanceClaimTime, baseWalletCode: _baseWalletCode };
}

export function loadTupleJettonWalletSharded$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _initialOwner = source.readAddress();
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
    source = source.readTuple();
    const _insurance = loadTupleInsurance(source);
    const _invited = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _friends = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _closeFriendsAndVouched = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    const _closeFriendsCount = source.readBigNumber();
    const _recoveryVouchersCount = source.readBigNumber();
    const _pendingRequests = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _followers = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _followings = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _reportInfo = loadTupleReportInfo(source);
    const _connections = source.readBigNumber();
    const _terminated = source.readBoolean();
    const _active = source.readBoolean();
    const _accountInitTime = source.readBigNumber();
    source = source.readTuple();
    const _lastTxnTime = source.readBigNumber();
    const _lastMsgTo = source.readAddress();
    const _version = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _lastRewardClaimTime = source.readBigNumber();
    const _lastMonthlyAllowanceClaimTime = source.readBigNumber();
    const _baseWalletCode = source.readCell();
    return { $$type: 'JettonWalletSharded$Data' as const, owner: _owner, initialOwner: _initialOwner, ownerAfterRecovery: _ownerAfterRecovery, minter: _minter, treasuryAccount: _treasuryAccount, nominee: _nominee, invitor: _invitor, invitor0: _invitor0, id: _id, balance: _balance, taxAsTxnFeePercent: _taxAsTxnFeePercent, turnover: _turnover, debts: _debts, debt: _debt, insurance: _insurance, invited: _invited, friends: _friends, closeFriendsAndVouched: _closeFriendsAndVouched, closeFriendsCount: _closeFriendsCount, recoveryVouchersCount: _recoveryVouchersCount, pendingRequests: _pendingRequests, followers: _followers, followings: _followings, reportInfo: _reportInfo, connections: _connections, terminated: _terminated, active: _active, accountInitTime: _accountInitTime, lastTxnTime: _lastTxnTime, lastMsgTo: _lastMsgTo, version: _version, mintable: _mintable, lastRewardClaimTime: _lastRewardClaimTime, lastMonthlyAllowanceClaimTime: _lastMonthlyAllowanceClaimTime, baseWalletCode: _baseWalletCode };
}

export function loadGetterTupleJettonWalletSharded$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _initialOwner = source.readAddress();
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
    const _reportInfo = loadGetterTupleReportInfo(source);
    const _connections = source.readBigNumber();
    const _terminated = source.readBoolean();
    const _active = source.readBoolean();
    const _accountInitTime = source.readBigNumber();
    const _lastTxnTime = source.readBigNumber();
    const _lastMsgTo = source.readAddress();
    const _version = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _lastRewardClaimTime = source.readBigNumber();
    const _lastMonthlyAllowanceClaimTime = source.readBigNumber();
    const _baseWalletCode = source.readCell();
    return { $$type: 'JettonWalletSharded$Data' as const, owner: _owner, initialOwner: _initialOwner, ownerAfterRecovery: _ownerAfterRecovery, minter: _minter, treasuryAccount: _treasuryAccount, nominee: _nominee, invitor: _invitor, invitor0: _invitor0, id: _id, balance: _balance, taxAsTxnFeePercent: _taxAsTxnFeePercent, turnover: _turnover, debts: _debts, debt: _debt, insurance: _insurance, invited: _invited, friends: _friends, closeFriendsAndVouched: _closeFriendsAndVouched, closeFriendsCount: _closeFriendsCount, recoveryVouchersCount: _recoveryVouchersCount, pendingRequests: _pendingRequests, followers: _followers, followings: _followings, reportInfo: _reportInfo, connections: _connections, terminated: _terminated, active: _active, accountInitTime: _accountInitTime, lastTxnTime: _lastTxnTime, lastMsgTo: _lastMsgTo, version: _version, mintable: _mintable, lastRewardClaimTime: _lastRewardClaimTime, lastMonthlyAllowanceClaimTime: _lastMonthlyAllowanceClaimTime, baseWalletCode: _baseWalletCode };
}

export function storeTupleJettonWalletSharded$Data(source: JettonWalletSharded$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.initialOwner);
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
    builder.writeTuple(storeTupleReportInfo(source.reportInfo));
    builder.writeNumber(source.connections);
    builder.writeBoolean(source.terminated);
    builder.writeBoolean(source.active);
    builder.writeNumber(source.accountInitTime);
    builder.writeNumber(source.lastTxnTime);
    builder.writeAddress(source.lastMsgTo);
    builder.writeNumber(source.version);
    builder.writeBoolean(source.mintable);
    builder.writeNumber(source.lastRewardClaimTime);
    builder.writeNumber(source.lastMonthlyAllowanceClaimTime);
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

export type ReportInfo = {
    $$type: 'ReportInfo';
    reports: Dictionary<Address, boolean>;
    reason: boolean;
    reporterCount: bigint;
    disputerCount: bigint;
    reportResolutionTime: bigint;
}

export function storeReportInfo(src: ReportInfo) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeDict(src.reports, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_0.storeBit(src.reason);
        b_0.storeUint(src.reporterCount, 10);
        b_0.storeUint(src.disputerCount, 10);
        b_0.storeUint(src.reportResolutionTime, 32);
    };
}

export function loadReportInfo(slice: Slice) {
    const sc_0 = slice;
    const _reports = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_0);
    const _reason = sc_0.loadBit();
    const _reporterCount = sc_0.loadUintBig(10);
    const _disputerCount = sc_0.loadUintBig(10);
    const _reportResolutionTime = sc_0.loadUintBig(32);
    return { $$type: 'ReportInfo' as const, reports: _reports, reason: _reason, reporterCount: _reporterCount, disputerCount: _disputerCount, reportResolutionTime: _reportResolutionTime };
}

export function loadTupleReportInfo(source: TupleReader) {
    const _reports = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    const _reason = source.readBoolean();
    const _reporterCount = source.readBigNumber();
    const _disputerCount = source.readBigNumber();
    const _reportResolutionTime = source.readBigNumber();
    return { $$type: 'ReportInfo' as const, reports: _reports, reason: _reason, reporterCount: _reporterCount, disputerCount: _disputerCount, reportResolutionTime: _reportResolutionTime };
}

export function loadGetterTupleReportInfo(source: TupleReader) {
    const _reports = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    const _reason = source.readBoolean();
    const _reporterCount = source.readBigNumber();
    const _disputerCount = source.readBigNumber();
    const _reportResolutionTime = source.readBigNumber();
    return { $$type: 'ReportInfo' as const, reports: _reports, reason: _reason, reporterCount: _reporterCount, disputerCount: _disputerCount, reportResolutionTime: _reportResolutionTime };
}

export function storeTupleReportInfo(source: ReportInfo) {
    const builder = new TupleBuilder();
    builder.writeCell(source.reports.size > 0 ? beginCell().storeDictDirect(source.reports, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeBoolean(source.reason);
    builder.writeNumber(source.reporterCount);
    builder.writeNumber(source.disputerCount);
    builder.writeNumber(source.reportResolutionTime);
    return builder.build();
}

export function dictValueParserReportInfo(): DictionaryValue<ReportInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportInfo(src)).endCell());
        },
        parse: (src) => {
            return loadReportInfo(src.loadRef().beginParse());
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
    reportInfo: ReportInfo;
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
        b_0.store(storeReportInfo(src.reportInfo));
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
    const _reportInfo = loadReportInfo(sc_0);
    const _connections = sc_0.loadUintBig(8);
    const _terminated = sc_0.loadBit();
    const _mbrpAmount = sc_0.loadCoins();
    const _closureWait = sc_0.loadUintBig(32);
    const _active = sc_0.loadBit();
    const _lastMsgTo = sc_0.loadAddress();
    const _insurance = sc_0.loadRef();
    return { $$type: 'OtherStateConsts' as const, reportInfo: _reportInfo, connections: _connections, terminated: _terminated, mbrpAmount: _mbrpAmount, closureWait: _closureWait, active: _active, lastMsgTo: _lastMsgTo, insurance: _insurance };
}

export function loadTupleOtherStateConsts(source: TupleReader) {
    const _reportInfo = loadTupleReportInfo(source);
    const _connections = source.readBigNumber();
    const _terminated = source.readBoolean();
    const _mbrpAmount = source.readBigNumber();
    const _closureWait = source.readBigNumber();
    const _active = source.readBoolean();
    const _lastMsgTo = source.readAddress();
    const _insurance = source.readCell();
    return { $$type: 'OtherStateConsts' as const, reportInfo: _reportInfo, connections: _connections, terminated: _terminated, mbrpAmount: _mbrpAmount, closureWait: _closureWait, active: _active, lastMsgTo: _lastMsgTo, insurance: _insurance };
}

export function loadGetterTupleOtherStateConsts(source: TupleReader) {
    const _reportInfo = loadGetterTupleReportInfo(source);
    const _connections = source.readBigNumber();
    const _terminated = source.readBoolean();
    const _mbrpAmount = source.readBigNumber();
    const _closureWait = source.readBigNumber();
    const _active = source.readBoolean();
    const _lastMsgTo = source.readAddress();
    const _insurance = source.readCell();
    return { $$type: 'OtherStateConsts' as const, reportInfo: _reportInfo, connections: _connections, terminated: _terminated, mbrpAmount: _mbrpAmount, closureWait: _closureWait, active: _active, lastMsgTo: _lastMsgTo, insurance: _insurance };
}

export function storeTupleOtherStateConsts(source: OtherStateConsts) {
    const builder = new TupleBuilder();
    builder.writeTuple(storeTupleReportInfo(source.reportInfo));
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
    reason: boolean;
    amount: bigint;
    sender: Address;
    forwardPayload: Slice;
}

export function storeAccCloseBurnInternal(src: AccCloseBurnInternal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(53, 32);
        b_0.storeBit(src.reason);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadAccCloseBurnInternal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 53) { throw Error('Invalid prefix'); }
    const _reason = sc_0.loadBit();
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'AccCloseBurnInternal' as const, reason: _reason, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadTupleAccCloseBurnInternal(source: TupleReader) {
    const _reason = source.readBoolean();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'AccCloseBurnInternal' as const, reason: _reason, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadGetterTupleAccCloseBurnInternal(source: TupleReader) {
    const _reason = source.readBoolean();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'AccCloseBurnInternal' as const, reason: _reason, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function storeTupleAccCloseBurnInternal(source: AccCloseBurnInternal) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.reason);
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
    const __code = Cell.fromHex('b5ee9c7242020182000100009f7400000114ff00f4a413f4bcf2c80b0001020162000201600484d0eda2edfb01d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e90fa40fa40fa00fa40553004d15502db3ce30d1129e302705628d74920c21f016c017e0003001e04cc11278020d7217021d749c21f9430d31f01de20c0448fcb303706d200013120b301e30f0ac87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54e020c03400040007015e000901fc112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311110005015c1110111211100f11110f0e11100e10df10ce10bd10ac109b108a107951831068105706103541048218e8d4a51000000600e820c101915b8e6a562021be983101111f01a1111ee0201121a17020561f81010b2559f40a6fa1318e1930561e81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111f0301111f01206e953059f4593098c801fa024133f441e201111d01111fa0111b111e111b111ce20aa501fc112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112111111131111000801ea1110111211100f11110f0e11100e10df10ce10bd10ac109b108a10790810571046103544038218e8d4a510008ebdeda2edfb561b561d6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571d5cbe9c571c01111b01a1111a70db31e1a170111c9131e2e301e2d801111f01a0111e0aa400f402fe8efc30fa000131aa00111681010b255618206e953059f4593098c801fa024133f441e201111d011116a008a4112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d08111e08111b111d111b111a111c111a1119111b11191118111a1118e0000f000a045c20c0078e9b30fa0001315344111781010bf45930111601112801112956295629e020c031e30220c017e30220c005000b000e0010001201fc20c101915b8e6a562021be983101111f01a1111ee0201121a17020561f81010b2559f40a6fa1318e1930561e81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111f0301111f01206e953059f4593098c801fa024133f441e201111d01111fa0111b111e111b111ce20211120281010b0201112a01000c01f81129206e953059f4593098c801fa024133f441e208a5112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115000d01e2111411161114111311151113111211141112111111131111081112080f11110f0e11100e10df10ce10bd10ac109b0a10795516c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015e01fa30fa000131240111160181010b015617206e953059f4593098c801fa024133f441e201111d011115a008a4112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d08111e08111b111d111b111a111c111a1119111b11191118111a1118000f018e1117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b0a10795516015d01fa5b523f81010bf4593008a5112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113001101ce1112111411121111111311111110111211100f11110f0811100810df10ce10bd10ac109b0a10795516c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015e041ee30220c008e30220c009e30220c035001300150015001701fe30fa0001311f81010b5252206e953059f4593098c801fa024133f441e208a4112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116001401f21115111711151114111611141113111511131112111411121111111311111110111211100f11110f0811100810df10ce10bd10ac109b0a10795516c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015e01fe5b111c8218e8d4a51000a0112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111e111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112001601d41111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610354403c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015e0336e302208210178d4519bae30282107bdd97debae3025f0f5f0f5f0b0018001a001c01fe5b112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112111111131111001901a01110111211100f11110f0e11100e10df551cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015e01fc30d33fd309fa0055206c312082103b9aca00be9701111d01a0111c9130e2112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116001b01dc1115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015e01f4d33ffa00596c2101111d01a0112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111e111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113001d01e01112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610354403c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015e04fce30021c00001c121b0e302c0008ea91127f90182f0535d44514554aee036c09a39063fe878ca30a50cb9b5f8f6f1ec24f13e3169e9bae302925727e2112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b001f0158015a015c0444315628d70b1f2082100f8a7ea5bae302208210178d4519bae30220c001e30220c052002000b200c000c903ec5b11278020d721d33ffa00fa40d72c01916d93fa4001e201f404fa00f84220562ec705f2e2bc2e917f982682103b9aca00b9e2f2e2be25fa4430f2d08a21d749c200f2e2e3f8416f24135f0382101dcd6500bcf2e2bf2682103b9aca00bee30f7080506d2205112c05280504112f04031130031131c80021002b00ad02f86c22325321c705b3e3031127112a11271126112911261125112811251124112a11241123112911231122112811221121112a1121112011291120111f1128111f111e112a111e111d1129111d111c1128111c111b112a111b111a1129111a1119112811191118112a11181117112911171116112811161115112a11150022002901f6303132112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114002302f81113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046103510241023db3cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db310024015e01f020718064a9861128112a11281127112911271126112a11261125112911251124112a11241123112911231122112a11221121112911211120112a1120111f1129111f111e112a111e111d1129111d111c112a111c111b1129111b111a112a111a1119112911191118112a11181117112911171116112a1116002501c01115112911151114112a11141113112911131112112a11121111112911111110112a11100f11290f0e112a0e0d11290d0c112a0c0b11290b0a112a0a0911290908112a080711290706112a060511290504112a040311290302112a0201112901002601faf82328a1218218174876e800a90612a0561bc2009c561b5882109ca41900a986a09131e2111f561fa120c2fff2e2c501111d01111fa0111c70112a8040112ac85980415003cb1fce01fa02c902112a020111290156250140337fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112511271125112411261124002701f8112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0028000c0e11100e551d01bc1114112911141113112811131112112a11121111112911111110112811100f112a0f0e11290e0d11280d0c112a0c0b11290b0a11280a09112a09081129080711280706112a06051129050411280403112a030211290201112b01112c562a002a0076f82328a1218218174876e800a90612a0561bc2009c561b5882109ca41900a986a09131e2111f561fa120c2fff2e2c501111d01111fa0111c36f823044c26821005f5e100bae3022682100bebc200bae30226821011e1a300bae30226821017d78400ba002c0036003e004501fa145f046c22112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114002d02f81113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046103510241023db3cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31002e015e01f42c8100fab9f2e0fa112711291127112611281126112511291125112411281124112311291123112211281122112111291121112011281120111f1129111f111e1128111e111d1129111d111c1128111c111b1129111b111a1128111a111911291119111811281118111711291117111611281116111511291115002f01bc1114112811141113112911131112112811121111112911111110112811100f11290f0e11280e0d11290d0c11280c0b11290b0a11280a09112909081128080711290706112806051129050411280403112903021128020111290111285629003001d6205629c705917f95562221c705e2917f9c561781010b2259f40a6fa131e2917f9c561181010b2259f40a6fa131e2917f9c561881010b2259f40a6fa131e292307f9c81010b56130259f40a6fa131e2917f9170e2b3f2e2cf708050f82a2702562b02562602112e6d5530c8003101f45550715007cb1f15cb09c8246eb38e1d7f01ca0004206ef2d0806f24104703c8ce14cd01c8cecd02c8ce12cdce9634705004ca00e212cece12cc12cecdc9112711291127112611281126112511291125112411281124112311291123112211281122112111291121112011281120111f1129111f111e1128111e003201f8111d1129111d111c1128111c111b1129111b111a1128111a1119112911191118112811181117112911171116112811161115112911151114112811141113112911131112112811121111112911111110112811100f11290f0e11280e0d11290d0c11280c0b11290b0a11280a09112909081128080711290706112806003301ba05112905041128040311290302112802011129011128562b5625705626f82ac87001ca0055315034cece01fa02cec931521004112b0403112c0302112a02103410237f59112e800bd721d30730105610451034413001112e0155505505003401fac85a80285003cb057601cb03ccccc9c87101cb0113ca00830901cb0d22f90058018100f8a92801aaf7b101cbff58fa027301cb6accf400c901fb00112311271123112211261122112111251121112011241120111f1123111f111e1122111e111d1121111d111c1120111c111b111f111b111a111e111a1119111d1119003500921118111c11181117111b11171116111a11161115111911151114111811141113111711131112111611121111111511111110111411100f11130f0e11120e0d11110d0c11100c553b1201fa145f046c22112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114003702881113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035102410238219d1a94a200001db3c0038015701f42d8100fab9f2e0fa1127112a11271126112911261125112811251124112a11241123112911231122112811221121112a1121112011291120111f1128111f111e112a111e111d1129111d111c1128111c111b112a111b111a1129111a1119112811191118112a11181117112911171116112811161115112a1115003901bc1114112911141113112811131112112a11121111112911111110112811100f112a0f0e11290e0d11280d0c112a0c0b11290b0a11280a09112a09081129080711280706112a06051129050411280403112a030211290201112801112a5629003a01f8205629c705917f95562221c705e2917f9c561781010b2259f40a6fa131e2917f9c561181010b2259f40a6fa131e2917f9c561881010b2259f40a6fa131e292307f9c81010b56130259f40a6fa131e2917f9170e2b3f2e2cf112711281127112611271126112511261125112411251124112311241123112211231122003b02fe112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e1129db3c70112a56298050112d0177003c01fec85520765004cb1f58fa02cecec91302112a0201112b0140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b1119003d00801118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e551d01fe30112c112e112c112b112d112b112a112c112a1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118003f029a1117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac2410ac109b108a10895560db3c0040015701ee6c61561481010b2359f40a6fa131f2e2c2561481010b2359f40a6fa193fa003092306de2206ef2d0801127112a11271126112911261125112811251124112a11241123112911231122112811221121112a1121112011291120111f1128111f111e112a111e111d1129111d111c1128111c111b112a111b004101fc111a1129111a1119112811191118112a11181117112911171116112811161115112a11151114112911141113112811131112112a11121111112911111110112811100f112a0f0e11290e0d11280d0c112a0c0b11290b0a11280a09112a09081129080711280706112a06051129050411280403112a030211290201112801004203ee112a562a8ebdeda2edfb561b561d6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571d5cbe9c571c01111b01a1111a70db31e1a170111c9131e2e301e2d801111f01a0111e111681010b562a562c206e953059f4593098c801fa024133f441e211165629db3c3670112b56288050112bc800f40177004301fa5520775004cb1f58fa02cecec9103602112b020111290140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00562601112701111081010bf4593007a4112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b004400c8111a111d111a1119111c11191118111b11181117111a1117111611191116111511181115111411171114111311161113111211151112111111141111111011131110071112070e11110e0d11100d10cf10be10ad109c108b0a106910581047103610351402fe8efc10575f07112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113e00046004701ea1112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610354430125723c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015e044c2682101dcd6500bae30226821023c34600bae30226821029b92700bae3022682102faf0800ba0048004a004c005401fa145f046c22112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114004902f81113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046103510241023db3cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db310172015e01f634365b1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116004b02921115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046104510237f5023db3c004e015701f634365b1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116004d02921115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610451023705023db3c004e015701f01127112c11271126112b11261125112a11251124112911241123112811231122112c11221121112b11211120112a1120111f1129111f111e1128111e111d112c111d111c112b111c111b112a111b111a1129111a1119112811191118112c11181117112b11171116112a1116111511291115111411281114004f01ba1113112c11131112112b11121111112a11111110112911100f11280f0e112c0e0d112b0d0c112a0c0b11290b0a11280a09112c0908112b0807112a07061129060511280504112c0403112b0302112a020111290111288218e8d4a51000005001f4f82328a1218218174876e800a90612a0561bc2009c561b5882109ca41900a986a09131e2111f561fa120c2fff2e2c501111d01111fa0111c112711281127112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d005102fc111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e1129db3c01112c01112b70112b8050112bc85530785005cb1f5003fa02ca00cecec903112a03021129020177005201fc0111280140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112311271123112211261122112111251121112011241120111f1123111f111e1122111e111d1121111d111c1120111c111b111f111b111a111e111a1119111d11191118111c11181117111b11171116111a1116111511191115111411181114005300581113111711131112111611121111111511111110111411100f11130f0e11120e0d11110d0c11100c10bf553a02fe8efb34365b1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116e0260055005c028c1115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610454013db3c0056015701f01127112b11271126112a11261125112911251124112811241123112b11231122112a1122112111291121112011281120111f112b111f111e112a111e111d1129111d111c1128111c111b112b111b111a112a111a1119112911191118112811181117112b11171116112a1116111511291115111411281114005701ba1113112b11131112112a11121111112911111110112811100f112b0f0e112a0e0d11290d0c11280c0b112b0b0a112a0a091129090811280807112b0706112a06051129050411280403112b0302112a020111290111288218e8d4a51000005801f4f82328a1218218174876e800a90612a0561bc2009c561b5882109ca41900a986a09131e2111f561fa120c2fff2e2c501111d01111fa0111c112711281127112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d005902fc111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e1129db3c112b70112b8050112bc85520795004cb1f58fa02cecec903112b0302112a020111290140037f0177005a01fac8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a1117111611191116111511181115111411171114005b004c1113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d552c044a821035a4e900bae302268210068e7780bae30226821007270e00bae30226821007bfa480ba005d00630066006c01f8145f04331128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115005e03fe1114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035103458db3cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54005f015e00c801f01128112a11281127112911271126112a11261125112911251124112a11241123112911231122112a11221121112911211120112a1120111f1129111f111e112a111e111d1129111d111c112a111c111b1129111b111a112a111a1119112911191118112a11181117112911171116112a1116111511291115006002fc1114112a11141113112911131112112a11121111112911111110112a11100f11290f0e112a0e0d11290d0c112a0c0b11290b0a112a0a0911290908112a080711290706112a060511290504112a040311290302112a02112901db3c70112b56298050112cc855207a5004cb1f58fa02cecec91302112b0201112a0140037f0177006101fac8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115006200541114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551c01f45f08112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112006402f21111111311111110111211100f11110f0e11100e10df551c56126e936d5713df88c88258c000000000000000000000000101cb67ccc970fb00c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db310065015e003400000000636c656172656450656e64696e67526571756573747301fa145f046c22112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114006702f81113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046103510241023db3cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db310068015e01f05210111381010bf459f2e2cd112611291126112511281125112411271124112311291123112211281122112111271121112011291120111f1128111f111e1127111e111d1129111d111c1128111c111b1127111b111a1129111a111911281119111811271118111711291117111611281116111511271115006902fa1114112911141113112811131112112711121111112911111110112811100f0e11290e0d11280d0c0b11290b0a11280a0908112908071128070605112905041128040302112902011128018218e8d4a51000112a5629db3c3670112b56288050112bc85520755004cb1f58fa02cecec9103602112b020111290140037f0177006a01fec8cf8580ca00cf8440ce01fa02806acf40f400c901fb0007a5112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a1117111611191116111511181115111411171114006b00721113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b0a106910581047103614130442e30226821008583b00bae3026c223223821008f0d180bae30223821009896800ba006d0074007b007d01fe30112c112e112c112b112d112b112a112c112a1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118006e029a1117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac2410ac109b108a10895560db3c006f015701f26c615210111a81010bf459f2e2d12081010b2359f40a6fa193fa003092306de2206ef2d0801127112a11271126112911261125112811251124112a11241123112911231122112811221121112a1121112011291120111f1128111f111e112a111e111d1129111d111c1128111c111b112a111b111a1129111a007001ce1119112811191118112a1118011117011116112811161115112a1115011114011113112811131112112a1112011111011110112811100f112a0f1e0d11280d0c112a0c1b0a11280a09112a09180711280706112a06150411280403112a031201112801112a562a007102fef82328a1218218174876e800a90612a0561bc2009c561b5882109ca41900a986a09131e2111f561fa120c2fff2e2c501111d01111fa0111c5628db3c36708050112cab0001562901112cc8552080345004cb1f58fa02cecec9103602112a0201112b0140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb0007a50177007201fc112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a1117111611191116111511181115111411171114111311161113111211151112111111141111111011131110007300460f11120f0e11110e0d11100d10cf10be10ad109c108b0a10691058104710365055040301fe30112c112e112c112b112d112b112a112c112a1129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11180075029a1117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac2410ac109b108a10895560db3c0076015701f66c61561881010b2359f40a6fa131f2e2d0561881010b2359f40a6fa193fa003092306de2206ef2d0805220111a81010bf459301127112a11271126112911261125112811251124112a11241123112911231122112811221121112a1121112011291120111f1128111f111e112a111e111d1129111d111c1128111c007701de111b112a111b111a1129111a1119112811191118112a111811171129111711161115112a111511141129111411131112112a111211111129111111100f112a0f0e11290e0d0c112a0c0b11290b0a09112a09081129080706112a06051129050403112a030211290201112a56295629007802fc20c101915b8e6a562021be983101111f01a1111ee0201121a17020561f81010b2559f40a6fa1318e1930561e81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111f0301111f01206e953059f4593098c801fa024133f441e201111d01111fa0111b111e111b111ce25629db3c36701129562880500177007901fe112dc8552080315004cb1f58fa02cecec910360211290201112b0140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb0007a5112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c1119007a00b01118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b0a106910581047103650040301f810245f04112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113007c01c21112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610354430128d0860000000000000000000000000000000000000000000000000000000000000000004c705b3f2e2bc28f2e2be015702fc8efa5f05112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112e023007e007f01bc1111111311111110111211100f11110f0e11100e10df551c572556261125c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015e03f882100a21fe80bae302238209312d00ba93f2c2c0e30e112c01112b0103112a030211290204112804031127030211260204112504031124030211230204112204031121030211200204111f0403111e0302111d0204111c0403111b0302111a02041119040311180302111702041116040311150302111402041113040080008300ac01f45f05112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112008102e21111111311111110111211100f11110f0e11100e10df551c88c88258c000000000000000000000000101cb67ccc970fb00c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db310082015e002200000000636c61696d6564206772616e7403f82382103a699d00ba917f9823821006052340bae2e30f112c01112b011127112a1127112611291126112511281125112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11180084008700ab01fc1127112a11271126112911261125112811251124112a11241123112911231122112811221121112a1121112011291120111f1128111f111e112a111e111d1129111d111c1128111c111b112a111b111a1129111a1119112811191118112a11181117112911171116112811161115112a1115111411291114111311281113008501ae1112112a11121111112911111110112811100f112a0f0e11290e0d11280d0c112a0c0b11290b0a11280a09112a09081129080711280706112a06051129050411280403112a030211290201112b01112c8218174876e80000860070f82328a1218218174876e800a90612a0561bc2009c561b5882109ca41900a986a09131e2111f561fa120c2fff2e2c501111d01111fa0111c044c2382103b023380bae30223821006146580bae3022382103b8b87c0bae3022382101ddca740ba0088008a008c008e01fa10245f040111140181010b017071216e955b59f4593098c801cf004133f441e21112a4112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911170089018e11161118111611151117111511141116111411121115111211141111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035440302015701f610245f0401111481010bf45930112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141115008b01e61112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035443012c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015e01fc5f0511251127112511241126112411231125112356221125112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112008d018a1111111311111110111211100f11110f0e11100e10df551c82100bebc20070801128c801803858cb1fcb09c94343c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00015702fe8efc10245f04112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113e0008f009001d21112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610354430128040562970035620c8552080425004cb1f12cece01fa02c95627503340137fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb000157047c23821017e6c640ba917f9823821017f60880bae2917f9823821018148d00bae2e3022382101a76e700bae302238210069db9c0bae30223821006acfc00ba009100940095009c01f810345f04112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113009201661112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035443012009301b48e57eda2edfb561a7022821017e6c640ba9c3031571a8218174876e800208e2b22821017f60880ba9c3031571a8218746a528800208e1302821018148d00ba965b70571adb31e0111b01e2e201111b01bc965718f8231118ded8015701f45f05112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112014001f45f05112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112009602b41111111311111110111211100f11110f0e11100e10df551cdb3cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db310097015e01f4f8232382015180a05210bcf2e2df5308a18209e13380b9968212540be4009682103b9aca00e2112711291127112611281126112511291125112411281124112311291123112211281122112111291121112011281120111f1129111f111e1128111e111d1129111d111c1128111c111b1129111b111a1128111a009801f81119112911191118112811181117112911171116112811161115112911151114112811141113112911131112112811121111112911111110112811100f11290f0e11280e0d11290d0c11280c0b11290b0a11280a09112909081128080711290706112806051129050411280403112903021128020111290111285628009902d28ebdeda2edfb561b561d6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571d5cbe9c571c01111b01a1111a70db31e1a170111c9131e2e301e2d801111f01a0111e3282089896807370112a5629c85980465003cb1f01fa02cec9562604112b0144135900f4009a01fac8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115009b007e1114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046103544301202fc8efa5f05112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112e023009d00a302b41111111311111110111211100f11110f0e11100e10df551cdb3cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31009e015e01eef823228208278d00a05210bc9a5308a182100cfa4400b99170e2f2e2df112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a111911281119009f01c21118112811181117112811171116112811161115112811151114112811141113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a0911280911280807065540822009184e72a00000a002da8ebdeda2edfb561b561d6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571d5cbe9c571c01111b01a1111a70db31e1a170111c9131e2e301e2d801111f01a0111e3182089896807370822009184e72a000562ac85980465003cb1f01fa02cec95627553044135900f400a101fac8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a111911181119111811171118111711161117111600a200841115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a108910781067105610451034413002fe82100db58580ba917f982382100e4e1c00bae2e302112c01112b0103112a030211290204112804031127030211260204112504031124030211230204112204031121030211200204111f0403111e0302111d0204111c0403111b0302111a02041119040311180302111702041116040311150302111402041113040311120300a400aa01f45b32112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a111811171119111711161118111611151117111511141116111400a502f81113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046103510244300db3cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db3100a6015e01ec2af2e2be112611291126112511281125112411271124112311291123112211281122112111271121112011291120111f1128111f111e1127111e111d1129111d111c1128111c111b1127111b111a1129111a11191128111911181127111811171129111711161128111611151127111511141129111400a702e21113112811131112112711121111112911111110112811100f11270f0e11290e0d11280d0c11270c0b11290b0a11280a091127090811290807112807061127060511290504112804031127030211290201112801112770112a80501129db3c5621206ef2d08001112b01562901562401c8017700a801fc553080525005cb1f5003fa02cececec903112b030211290201112a0140337fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c111900a900b41118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b107a106910581047103645135042003c0211110204111004103f102e104d103c102b104a1039102810471036102500a41117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b107a106910581047103610250042031112030211110204111004103f102e104d103c102b104a10391028104745160301f655608210178d45195008cb1f16cb3f14cb0958fa02ce01206e9430cf84809201cee201fa02cec9112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a111900ae01f81118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a10891078106706112b0610451034112b550256285625705626f82ac87001ca0055315034cece01fa02cec931521004112b0403112c0300af01f802112d02103410237f59112b800bd721d30730105610451034413001112b0155505505c85a80285003cb057601cb03ccccc9c87101cb0113ca00830901cb0d22f90058018100f8a92801aaf7b101cbff58fa027301cb6accf400c901fb00112311271123112211261122112111251121112011241120111f1123111f00b001fc111e1122111e111d1121111d111c1120111c111b111f111b111a111e111a1119111d11191118111c11181117111b11171116111a11161115111911151114111811141113111711131112111611121111111511111110111411100f11130f0e11120e0d11110d0c11100c10bf10ae109d108c107b106a105910481037461400b101844553c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015e01fc5b11278020d721d33f31d309fa00fa40d72c01916d93fa4001e230fa0031112711291127112611281126112511291125112411281124112311291123112211281122112111291121112011281120111f1129111f111e1128111e111d1129111d111c1128111c111b1129111b111a1128111a11191129111911181128111800b302fc1117112911171116112811161115112911151114112811141113112911131112112811121111112911111110112811100f11290f0e11280e0d11290d0c11280c0b11290b0a11280a091129090811280807112907061128060511290504112804031129030211280201112a01112b562adb3c112711281127112611271126014500b401fc112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a111911181119111811171118111711161117111611151116111511141115111411131114111311121113111211111112111100b504d01110111111100f11100f550e11295305ba91308eba25bc8e2ff84282100bebc20070801128c801803858cb1fcb09c94343c8cf8580ca00cf8440ce01fa02806acf40f400c901fb008e84f842db3ce2e2562882103b9aca00bee30f0211290256270201112901112b014e00b600b700be019256288ebdeda2edfb561b561d6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571d5cbe9c571c01111b01a1111a70db31e1a170111c9131e2e301e2d801111f01a0111e00f4024856288209312d00ba8e98562882103a699d00ba9a111e8218174876e800a0e30e111ee30d00b800bd03de5628821006052340ba8ed2562957268218174876e8008ebdeda2edfb561b561d6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571d5cbe9c571c01111b01a1111a70db31e1a170111c9131e2e301e2d801111f01a0111e8f0d562882100623a7c0bae3035629e2111e00f400b900bb01fc572857285728112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a111711161119111611151118111511141117111411131116111311121115111211111114111100ba01a81110111311100f11120f0e11110e0d11100d552cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015e01ee561681010b2259f40a6fa131f2e2e0561681010b22714133f40a6fa19401d70030925b6de2206ef2d080b3f2e2e1561572a906561501be99f82328a182015180bc9170e28e290111160181010b017f71216e955b59f4593098c801cf004133f441e21113a401112701111311151113e30d01112701111300bc00ca3057135726562370561581010b7159f4826fa520965023d7003058966c216d326d01e2908e3d8e1d111681010b56177071216e955b59f4593098c801cf004133f441e21116de81010b561702714133f4746fa520965023d7003058966c216d326d01e2e85b00f656298218e8d4a5100020c101915b8e6a562021be983101111f01a1111ee0201121a17020561f81010b2559f40a6fa1318e1930561e81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111f0301111f01206e953059f4593098c801fa024133f441e201111d01111fa0111b111e111b111ce201fef8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e00bf01ee111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b107a1069105810471036453304015701fa5b11278020d721d309d430d0d200018e12d401d001d401d001d401d001fa4055305f04defa40fa40d41127112a11271126112911261125112811251124112a11241123112911231122112811221121112a1121112011291120111f1128111f111e112a111e111d1129111d111c1128111c111b112a111b111a1129111a00c102fc1119112811191118112a11181117112911171116112811161115112a11151114112911141113112811131112112a11121111112911111110112811100f112a0f0e11290e0d11280d0c112a0c0b11290b0a11280a09112a09081129080711280706112a06051129050411280403112a030211290201112b01112c562adb3c014500c202fe571f571f571f571f24b3f2e2d3562656275627562b562825bc9534112afb048e92572b112723b9e30011261129112602112602e282084c4b4073707020562d5630c8553082107362d09c5005cb1f13cb3f01fa02cecec9562b5530441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb008208989680737056280300c300c601f4f8421126112811261125112711251124112611241123112511231122112411220111230102112202011121011120112a1120111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a111811171119111711161118111611151117111511141116111411131115111311121114111200c402fe1111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610351403112a0302112a02db3c111f1129111f111f1127111f112011261120111f1125111f112011241120111f1123111f112011221120111f1121111f0311200302111f0201111e01111d01111c01111b01111a011119014e00c50054011118011117011116011115011114011113011112011111011110010f0d0b0950e750c550a31816444001fa02112c0201112b01112ec8553080515005cb1f13cecececec956230403112c0302112a02112901441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112211271122112111261121112011251120111f1124111f111e1123111e1120112211201120112111201119111e11191118111d11181117111c111700c702fc1116111b11161115111a11151114111911141113111811131112111711121111111611111110111511100f11140f0e11130e0d11120d0c11110c0b11100b554ac87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015e00c80004db3102fe8efc5b11278020d721fa00fa40fa40fa4030112711291127112611281126112511291125112411281124112311291123112211281122112111291121112011281120111f1129111f111e1128111e111d1129111d111c1128111c111b1129111b111a1128111a111911291119111811281118111711291117111611281116e000ca00d602fc1115112911151114112811141113112911131112112811121111112911111110112811100f11290f0e11280e0d11290d0c11280c0b11290b0a11280a091129090811280807112907061128060511290504112804031129030211280201112a01112b5628db3c38561f6eb39c561f206ef2d080562801c7059170e2f2e2e4014500cb03fc562882100db58580ba917f9170e253008ee81127112811271126112811261125112811251124112811241123112811231122112811228218e8d4a5100056291123112211211120111f111e111d111c111b111a11191118111711161115111411131112111111100f0e0d0c4a1b10291028401706050403112a01e30d562000cc00cd00d000ea20c101915b8e6a562021be983101111f01a1111ee0201121a17020561f81010b2559f40a6fa1318e1930561e81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111f0301111f01206e953059f4593098c801fa024133f441e201111d01111fa0111b111e111b111ce23509a501fc112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a11191128111911181128111811171128111711161128111611151128111511141128111411131128111300ce01721112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a09112809557011288218e8d4a5100000cf01948ebdeda2edfb561b561d6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571d5cbe9c571c01111b01a1111a70db31e1a170111c9131e2e301e2d801111f01a0111e3509a400f401cc56295628562c5622f8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00562901112c562b562100d101c0f8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0056280201112c01112a561f00d201fcf8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112411251124112311241123112211231122112111221121112011211120111f1120111f820afaf08000d301fc801156201122112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc0b112c0b109a00d402fc10891078106706112b061045103403112a0302112b0201112a01112cdb3c01112c01562201562901112bc8553080445005cb1f13ca00cececec903112a03021129020111280140337fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112311271123112211261122112111251121112011241120111f1123111f017700d501dc111e1122111e111d1121111d111c1120111c111b111f111b111a111e111a1119111d11191118111c11181117111b11171116111a11161115111911151114111811141113111711131112111611121111111511111110111411100f11130f0e11120e0d11110d0c11100c10bf553a0157042420c044e30220c034e30220c006e30220c00700d700e500ea00ef01fa5b11278020d721d200fa4031fa40fa4030112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a11191128111911181128111811171128111711161128111600d804e21115112811151114112811141113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a091128090811280807112807061128060511280504112804031128030211280201112901112a5629db3c8219d1a94a20005629e30f014500d900db00dd01fe111881010b562b561a206e953059f4593098c801fa024133f441e2112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a1119112811191118112811181117111600da01b211151114111311121111111055e056288ebdeda2edfb561b561d6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571d5cbe9c571c01111b01a1111a70db31e1a170111c9131e2e301e2d801111f01a0111e0aa400f401fe562a01111981010bf45930112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a1119112811191118112811181117111611151114111311121111111055e0562a00dc00ec562920c101915b8e6a562021be983101111f01a1111ee0201121a17020561f81010b2559f40a6fa1318e1930561e81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111f0301111f01206e953059f4593098c801fa024133f441e201111d01111fa0111b111e111b111ce20aa502fe88d0562b0256290201112b01f8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0011261127112611251126112511241125112411231124112311221123112200de00df002400000000696e76697465207375636365737301fc112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab5508562a00e002e25629821aba7def3000821005f5e10073707005926d36df4430562d5006c8553082107bdd97de5005cb1f13cb3f01fa02ce01206e9430cf84809201cee2c956285044441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0082089896807370708218e8d4a5100088d0562d01c800e100e2002800000000696e766974656420617070726f76656401fa553082107362d09c5005cb1f13cb3f01fa02cecec9562d5530441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00820898968011297370562a0201112d01112ec8553080445005cb1f13ca00cececec956250403112a0302112c02112b01441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0000e301fc112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a111711161119111611151118111511141117111411131116111311121115111211111114111111101113111000e401a00f11120f0e11110e0d11100d10cf552bc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015e01fa5b11278020d721fa00fa40112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a11191128111911181128111811171128111711161128111611151128111500e602ea1114112811141113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a091128090811280807112807061128060511280504112804031128030211280201112901112a5629db3c3856205629c705f2e2d1562801562701562901112c014500e701fef8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112511281125112411271124112311261123112211251122112111241121112011231120111f1122111f00e801fc111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b107a700a1069105810471036450400e901e8401320c101915b8e6a562021be983101111f01a1111ee0201121a17020561f81010b2559f40a6fa1318e1930561e81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111f0301111f01206e953059f4593098c801fa024133f441e201111d01111fa0111b111e111b111ce2015701fe5b11278020d721fa00fa402b8100fab9f2e0fa112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a11191128111911181128111811171128111711161128111600eb02e21115112811151114112811141113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a091128090811280807112807061128060511280504112804031128030211280201112901112a5629db3c562901562801562a01112d014500ec01f6f8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb000211110281010b02011129011128206e953059f4593098c801fa024133f441e211241127112400ed01fc112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a111711161119111611151118111511141117111411131116111311121115111211111114111111101113111011120e11110e00ee01b60d11100d10cf10be10ad109c108b107a1069105810471036454012c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015e02fe8efd5b11278020d721fa00fa40112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a11191128111911181128111811171128111711161128111611151128111500f000f702d61114112811141113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a091128090811280807112807061128060511280504112804031128030211280201112901112a5629db3c562901562801562a01112d014500f101fef8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0011261127112611251126112511241125112411231124112311221123112211211122112111201121112000f201d4111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e1129562900f302f68ebdeda2edfb561b561d6e22c101917f9821c00091209170e2e2915b8ea021c2008e16571d5cbe9c571c01111b01a1111a70db31e1a170111c9131e2e301e2d801111f01a0111e0211160281010b0201112901112a206e953059f4593098c801fa024133f441e208a411251127112511241126112411231125112300f400f500ee561c81010bf4826fa5209502fa00305895316d326d01e2908e5b22c101935bdb31e05320be91209122e266a15033a1228e1e01111e0181010b01561f5004206e953059f4593098c801fa024133f441e29a3220111e81010bf45930e281010b21111f59f4746fa5209502fa00305895316d326d01e2e85b01fc112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115081116081113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd00f6018e10ac109b0a5517c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015e0426e020c031e30220c017e30220c005e30220c00800f800fd0102010801fa5b11278020d721fa00fa40112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a11191128111911181128111811171128111711161128111611151128111500f902d61114112811141113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a091128090811280807112807061128060511280504112804031128030211280201112901112a5629db3c562901562801562a01112d014500fa01fcf8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00562801111681010bf4593011261129112611251128112511241127112411231126112311221125112200fb01fc112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a111711161119111611181114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b00fc01fc107a1069105810471036454020c101915b8e6a562021be983101111f01a1111ee0201121a17020561f81010b2559f40a6fa1318e1930561e81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111f0301111f01206e953059f4593098c801fa024133f441e201111d01111fa0111b111e111b111ce2015701fe5b11278020d721fa00fa402b8100fab9f2e0fa112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a11191128111911181128111811171128111711161128111600fe02e41115112811151114112811141113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a091128090811280807112807061128060511280504112804031128030211280201112901112a5629db3c56290256280201112a01112c014500ff01fef8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00111c8218e8d4a51000a01f81010b0111288218e8d4a51000206e953059f4593098c801fa024133f441e2010001f407a4112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111d111e111d111a111d111a1119111c11191118111b11181117111a1117111611191116111511181115111411171114111311161113111211151112111111141111010101d21110111311100f11120f071111070d11100d10cf10be10ad109c108b0a106910581047103645404300c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015e01fa5b11278020d721fa00fa40112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a111911281119111811281118111711281117111611281116111511281115010302d61114112811141113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a091128090811280807112807061128060511280504112804031128030211280201112901112a5629db3c562901562801562a01112d0145010401fef8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112611291126112511281125112411271124112311261123112211251122112111241121112011231120010502e4111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf552bdb3c0106015701342fc000f2e2c35210111481010bf459302cc200930ca50cde1113010700e420c101915b8e6a562021be983101111f01a1111ee0201121a17020561f81010b2559f40a6fa1318e1930561e81010b2459f40a6fa193fa003092306de2206ef2d080de81010b03a003111f0301111f01206e953059f4593098c801fa024133f441e201111d01111fa0111b111e111b111ce202fc8efa5b11278020d721fa00d20031fa40112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a111911281119111811281118111711281117111611281116e0200109010d02fc1115112811151114112811141113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a091128090811280807112807061128060511280504112804031128030211280201112901112a5629db3c3b27f2e2be2e81010b562a59f40a6fa131b3f2e2c62cc2000145010a01769653ddbaf2e2e5922d30e20e81010b56297f71216e955b59f4593098c801cf004133f441e20ca4f82382015180a00211290256270201112901112b010b01fef8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e010c01d4111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10af10be10ad5e2955270157042cc009e30220c00ae30220c035e3022082107ac8d559ba010e01130134013801fa5b11278020d721fa00fa40112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a111911281119111811281118111711281117111611281116111511281115010f02de1114112811141113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a091128090811280807112807061128060511280504112804031128030211280201112901112a5629db3c3b2cc200f2e2c70e81010b562970710145011001fa216e955b59f4593098c801cf004133f441e20ba4f82382015180a00211290256270201112901112bf8276f10208212540be400bc9782112a05f200a196308208989680e273707045135074c8553082107362d09c5005cb1f13cb3f01fa02cecec91314441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00011101fc112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a1117111611191116111511181115111411171114111311161113111211151112111111141111111011131110011201ac0f11120f0e11110e0d11100d109f10be10ad5e295527c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015e04f45b11278020d721fa0031fa400111280111295628db3c2bc200f2e2c2f8232cbef2e2df547dcd21bc209132933101a5e270561281010b7159f4826fa520965023d7003058966c216d326d01e2908ae85f048e1f3b3b3b3b3b572357236d707053000b11270b09112609104d103c4ba9447301e30d112511271125014501140119013201622091249170e292307f97b39223b39170e2e2e30081010b561402714133f4746fa520965023d7003058966c216d326d01e2011501fa5312bb998219d1a94a200002a4988218e8d4a5100002e21127112c11271126112b11261125112a11251124112911241123112811231122112c11221121112b11211120112a1120111f1129111f111e1128111e111d112c111d111c112b111c111b112a111b111a1129111a1119112811191118112c11181117112b1117011602fe1116112a11161115112911151114112811141113112c11131112112b11121111112a11111110112911100f11280f0e112c0e0d112b0d0c112a0c0b11290b0a11280a09112c0908112b0807112a07061129060511280504112c0403112b0302112a020111290111285629db3c82080f424071706601112f015290562d01562e0177011701fa0156361045c855608210178d45195008cb1f16cb3f14cb0958fa02ce01206e9430cf84809201cee201fa02cec9413001112d0140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb001126112b11261125112a1125112411291124112311281123112211271122112111261121112011251120111f1124111f011800e6111e1123111e111d1122111d111c1121111c111b1120111b111a111f111a1119111e11191118111d11181117111c11171116111b11161115111a11151114111911141113111811131112111711121111111611111110111511100f11140f0e11130e0d11120d0c11110c0b11100b10af55491404d2561081010bf4826fa5209502fa00305895316d326d01e2908ae85b561181010bf4826fa5209502fa00305895316d326d01e2908ae85b561681010bf4826fa5209502fa00305895316d326d01e2908ae85b561781010bf4826fa5209502fa00305895316d326d01e290011a011d0120012301fc112711291127112611281126112511291125112411281124112311291123112211281122112111291121112011281120111f1129111f111e1128111e111d1129111d111c1128111c111b1129111b111a1128111a111911291119111811281118111711291117111611281116111511291115111411281114111311291113011b02fa1112112811121111112911111110112811100f11290f0e11280e0d11290d0c11280c0b11290b0a11280a09112909081128080711290706112806051129050411280403112903021128020111290111285629db3c82080f4240561071112c562b5630c8553080355005cb1f13ca0001fa02cecec9413001112b0140037f0177011c01f4c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0081010b561002112a59f4746fa5209502fa00305895316d326d01e21128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d012701fc112711291127112611281126112511291125112411281124112311291123112211281122112111291121112011281120111f1129111f111e1128111e111d1129111d111c1128111c111b1129111b111a1128111a111911291119111811281118111711291117111611281116111511291115111411281114111311291113011e02fa1112112811121111112911111110112811100f11290f0e11280e0d11290d0c11280c0b11290b0a11280a09112909081128080711290706112806051129050411280403112903021128020111290111285629db3c82080f4240561071112c562b5630c8553080355005cb1f13ca0001fa02cecec9413001112b0140037f0177011f01f4c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0081010b561102112a59f4746fa5209502fa00305895316d326d01e21128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d012701fc112711291127112611281126112511291125112411281124112311291123112211281122112111291121112011281120111f1129111f111e1128111e111d1129111d111c1128111c111b1129111b111a1128111a111911291119111811281118111711291117111611281116111511291115111411281114111311291113012102fa1112112811121111112911111110112811100f11290f0e11280e0d11290d0c11280c0b11290b0a11280a09112909081128080711290706112806051129050411280403112903021128020111290111285629db3c82080f424071112baa00561101562b5630c8553080355005cb1f13ca0001fa02cecec9413001112b010177012201fa40037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb0081010b561602112a59f4746fa5209502fa00305895316d326d01e21128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d012704c88ae85b5621db3c82080f4240715611821aba7def3000562c562fc8553080355005cb1f13ca0001fa02cecec940037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb002e925728e30e561a81010bf4826fa5209502fa00305895316d326d01e290012401770128012d01fc112711291127112611281126112511291125112411281124112311291123112211281122112111291121112011281120111f1129111f111e1128111e111d1129111d111c1128111c111b1129111b111a1128111a111911291119111811281118111711291117111611281116111511291115111411281114111311291113012502fa1112112811121111112911111110112811100f11290f0e11280e0d11290d0c11280c0b11290b0a11280a09112909081128080711290706112806051129050411280403112903021128020111290111285629db3c82080f424071112ba703561101562b5630c8553080355005cb1f13ca0001fa02cecec9413001112b010177012601fa40037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb0081010b561702112a59f4746fa5209502fa00305895316d326d01e21128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d012700d8111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046103502fe70561ac2009cf82329a1821925b3aee000b99170e29d3056197829561ba07aa98601a8de2b8218e8d4a51000a8a011271128112711261128112611251128112511241128112411231128112356281123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e01129db3c7071210177012901f45622562da05410222a02562e020111310156321045c855608210178d45195008cb1f16cb3f14cb0958fa02ce01206e9430cf84809201cee201fa02cec9413001112c0140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00705627112a112711291127112611281126112511271125112411261124012a01f8112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f012b01fe0e11100e10df10ce10bd10ac109b108a107910681057104610354413821005f5e10073707005926d36df4430562d5006c8553082107bdd97de5005cb1f13cb3f01fa02ce01206e9430cf84809201cee2c956285044441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0011271126112511241123112211211120012c0044111f111e111d111c111b111a111911181117111611151114111311121111111055e0010e8ae85b3857277f012e01fc112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a111911281119111811281118111711281117111611281116111511281115111411281114111311281113012f02fa1112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a09112809081128080711280706112806051128050411280403112803021128020111280111295628db3c82080f4240561071112d562b562fc8553080355005cb1f13ca0001fa02cecec9413001112c0140037f0177013001f4c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0081010b561b02112959f4746fa5209502fa00305895316d326d01e2112811291128112711281127112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d013100d4111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a10891078106710561045103401fc112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112111111131111111011121110013301b20f11110f0e11100e10df10ce10bd10ac109b108a0910685515c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015e01fc5b11278020d721d200fa00fa403056285628562856285628562856285628562856285628562856285628562856285628562856285628562856285628562856285628562856285628562856285628562856285628562856285628564f5651562a562a562aed41ed43ed44ed45ed47955b111d01a0ed67ed65ed64ed63ed61013502be802b7fed118aed41edf101f2ff561c01111481010bf45930561c01111381010bf45930561c01111a81010bf45930561c01111981010bf45930111c5623c70594927039de9130e21111111a11111116111711161111111611111110111111100136015701f602112902112a01f82328a1218218174876e800a90612a0561bc2009c561b5882109ca41900a986a09131e2111f561fa120c2fff2e2c501111d01111fa0111c112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e013700bc111d111f111d111c111e111c111b111d111b111b111c111b1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e551d02fc8efa5b11278020d721fa40d2003029b3f2e2bd6d019c30f82a562401562801126f03de561e01c8598210ca77fdc25003cb1f01fa02216eb38e117f01ca0001206ef2d0806f235023cececc947032ca00e2c90170804043137fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112511271125112411261124e0200139013b01f8112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f013a01900e11100e10df551cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015e043e8210595f07bcbae30220820b93b1cebae30220c038e3022082102508d66aba013c013f0141014301fe5b11278020d721d33ffa00d72c01916d93fa4001e2312ab3f2e2bdf8425629c705f2e2bc111f21a120c2fff2e2c5f8416f2443305230fa40fa0071d721fa00fa00306c6170f83a811f4070f836aa00a0bcf2e2bf7080405043562a7f1123c8553082107bdd97de5005cb1f13cb3f01fa02ce01206e9430cf84809201cee2c9013d01f85626044313112101441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117013e01ec1116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015e01f65b5727112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112014001841111111311111110111211100f11110f0e11100e10df551cf8425628c705f2e2bc5627708100906d40037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00015701fa5b5727f842112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113014202ea1112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035443012db3cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31014e015e0210e30220c047e302010144015303fc5b11278020d721d2000193d30931ded2000192d309926d01e2d72c01916d93fa4001e201f40431f40431d430d0f40431f4043001206ef2d0800211290201112a01db3c5628206ef2d0805250b99457285728e30d112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f01450149015201f0112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a111911281119111811281118111711281117111611281116111511281115111411281114014601fe1113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a091128091128080706554056285625705626f82ac87001ca0055315034cece01fa02cec9315210f842fa443159c85980285003cb057601cb03ccccc9f900206ef2d0808100f8a928018100f8a928ba014701fc9257288e2af842562501c705f2e2bc289257288e1938571f571f7f562609a4071127070911200907111f07509907e2e2112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a014800841119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e016e341127206ef2d0801128206ef2d080fb04561581010bf4826fa5209502fa00305895316d326d01e231908ae83011261127112602112602014a01f456265626562656265626562656265626562656265626562656265626562656265626562656265626562656265626562656265626562656265626562656265626562656265626564b56265626564d562a1127114e11271126114d11261125114c11251124114b11241123114a1123112211491122112111481121014b01fc112011471120111f1146111f111e1145111e111d1144111d111c1143111c111b1142111b111a1141111a1119114011191118113f11181117113e11171116113d11161115113c11151114113b11141113113a11131112113911121111113811111110113711100f11360f0e11350e0d11340d0c11330c0b11320b0a11310a014c02f80911300908112f0807112e0706112d0605112c050411500403112a030211290201114f01112b5628db3c57105f0f57105f0f6c81112711281127112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c0177014d02f4111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a108910781067105605112905103410230211290201112901db3c81010b561802112a014e015001cc7382100bebc20070f82a562c52a26d6d50046d50036d01c8556082102508d66a5008cb1f266eb3977f01ca0016cb099636705006ca00e2246eb3977f01ca0014cb099634705004ca00e258206e9430cf84809201cee2f400f40001c8f40012f400cdc9035044014f002ec8cf8580ca00cf8440ce01fa02806acf40f400c901fb0001fc59f4746fa5209502fa00305895316d326d01e2310511290502112802021127020211260202112502021124020211230202112202021121020211200202111f0202111e0202111d0202111c0202111b0202111a0202111902021118020211170202111602021115020211140202111302021112020211110202111002102f01510030102e102d102c102b102a102910281027102610251024102301c8111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e551d015701fe5b11278020d721fa40307382100bebc20070c87101cb00562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a01562a015402aa01562a01562a01562a01565101565301112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9f82a562b5449306d046d5a6d59c8015e015501fa556082102508d66a5008cb1f266eb3977f01ca0016cb099636705006ca00e2246eb3977f01ca0014cb099634705004ca00e258206e9430cf84809201cee2f400f40001c8f40012f400cdc9035044c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00112511271125112411261124112311251123112211241122015601f0112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551c01570180c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015e01f6305727112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112015901ac1111111311111110111211100f11110f0e11100e10df551cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015e01fc112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112111111131111015b01f81110111211100f11110f0e11100e10df551cf8425628c705f2e2bc5627708100906d40037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31015e019c111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551c015d017cc87f01ca00112811271126112511241123112211211120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54015e01f6011127011128ce01112501ce01112301ce1121c8ce01112001ce01111e01ce111cc8ce01111b206e9430cf84809201cee21119c8ce01111901cd011117fa0201111501ca05011113fa0201111101f400500ffa02c840ed59fa02cb291af40018f40016f40014cb0312cb0301c8f40012f40012f400c80510344078015f006a5045f40012ca00cb09cb09cb1f14cb0714ca0014ca0014cb1f14cb1f15ce15cb0916ca0016cb1f16cb1f16cc12cd13cd13cd12cdcd020120016101670201200162016403f9baf15ed44d0d200018e90fa40fa40fa00fa40553004d15502db3ce30d5627562756275627562756275627562756275627562756275627562756275627562756275627562756275627562756275627562756275627562756275627562756275627562756275627562756275627572857285728572857285728572857288016c017e016300805728572857285728572857285728572857285728572857285728572857285728572857285728572857285728572857285728572857285728572857285728572802015801650166025db1ce3b513434800063a43e903e903e803e90154c01345540b6cf38c355885588d5c495c417c3d5c495c417c3db18a0016c017e025fb2c0bb513434800063a43e903e903e803e90154c01345540b6cf38c37e0a9587c0558a405589c05b311b311b311b1120016c017e0201580168016902afb5e35da89a1a400031d21f481f481f401f480aa6009a2aa05b679c61b0431d1a94a20010402a300ac36ac3790b2b3f405965392ac2406ac2406ac2406ac2406ac2406ac2406ac24aa40ac2402ac2002d998d998d998d8990016c017e020120016a016b026bb1827b513434800063a43e903e903e803e90154c01345540b6cf38c34a6cfcb8af558595845584d5869585958815855b39db39db31e0016c017e024fb0b87b513434800063a43e903e903e803e90154c01345540b6cf38c34ad5c417c3d5c417c3db2060016c017e02f4318d08600000000000000000000000000000000000000000000000000000000000000000048d08600000000000000000000000000000000000000000000000000000000000000000046d71706d5471116d6d6d53556d6d6d6d705475552870702289217f53115621562256238b085623f82382103b9aca00f82a016d016e00438000000000000000000000000000000000000000000000000000000000000000001002fc11295627c705b3925726e30d051127050411260403112503041124040111230104112204011121010411200402111f0203111e0301111d0104111c0402111b0203111a0301111901041118040211170203111603011115010411140402111302031112030111110104111004102f103e1d104c102b103a19104846171035016f017d02fc88d00711290706112806051127050611260603112503061124060311230306112206041121040111200103111f0306111e0604111d0401111c0103111b0306111a0604111904011118010311170306111606041115040111140103111303061112060411110401111001103f106e104d1c103b106a10291048171036103501700171002200000000666f6c6c6f7765644f776e657202fa414013db3c1127112411261124111e1125111e112211241122112111231121112011221120111d1121111d111c1120111c111b111f111b111a111e111a1119111d11191118111c11181117111b11171116111a11161115111911151114111811141113111711131112111611121111111511111110111411100f11130f0172017c01f42c8100fab9f2e0fa112711291127112611281126112511291125112411281124112311291123112211281122112111291121112011281120111f1129111f111e1128111e111d1129111d111c1128111c111b1129111b111a1128111a111911291119111811281118111711291117111611281116111511291115017301bc1114112811141113112911131112112811121111112911111110112811100f11290f0e11280e0d11290d0c11280c0b11290b0a11280a09112909081128080711290706112806051129050411280403112903021128020111290111285629017401f4205629c705917f95562221c705e2917f9c561781010b2259f40a6fa131e2917f9c561181010b2259f40a6fa131e2917f9c561881010b2259f40a6fa131e292307f9c81010b56130259f40a6fa131e2917f9170e2b3f2e2cf8218e8d4a51000111181010b562b5613206e953059f4593098c801fa024133f441e2017501fc112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a111911281119111811281118111711281117111611281116111511281115111411281114111311281113017602fa111211281112111111281111111055e0562adb3c3670112956288050112cc8552080175004cb1f58fa02cecec910360211290201112a0140037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb0007a4112411271124112311261123112211251122112111241121112011231120111f1122111f111e1121111e0177017b01f0112711281127112611281126112511281125112411281124112311281123112211281122112111281121112011281120111f1128111f111e1128111e111d1128111d111c1128111c111b1128111b111a1128111a111911281119111811281118111711281117111611281116111511281115111411281114017801fa1113112811131112112811121111112811111110112811100f11280f0e11280e0d11280d0c11280c0b11280b0a11280a091128091128080706554056285625705626f82ac87001ca0055315034cece01fa02cec9315210c85980285003cb057601cb03ccccc91129800bd721d30730c87401cb027001cb07112af90001017901f4018100f8a92801aaf7b1011129cbffc9d0fa4030112711281127112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a1119111811191118111711181117017a00901116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a108910781067105610451034413000f0111d1120111d111c111f111c111b111e111b111a111d111a1119111c11191118111b11181117111a11171116111911161115111811151114111711141113111611131112111511121111111411111110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b0a1069105810471036103550040300460e11120e0d11110d0c11100c10bf10ae109d108c106b105a1049103847150350444616000640040302f8db3c5728112611271126112511261125112411251124112311241123112211231122112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a1119111811191118111711181117111611171116111511161115111411151114111311141113017f018101f6fa40fa40fa40d401d0fa40fa40fa40d430d0fa40d72c01916d93fa4001e201d401d001fa00d205fa00f404fa00d430d0fa00d3295902f404f404f404d303d303d430d0f404f404f404d430d0f404d200d309d309d31f554005d307d200d200d31fd31ffa40d309d200d31fd31fd4301125112811251125112711250180002811251126112511181119111810ef10de10cd10bc00301112111311121111111211111110111111100f11100f550e0808b485');
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
    {"name":"JettonWalletSharded$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"initialOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"ownerAfterRecovery","type":{"kind":"simple","type":"address","optional":false}},{"name":"minter","type":{"kind":"simple","type":"address","optional":false}},{"name":"treasuryAccount","type":{"kind":"simple","type":"address","optional":false}},{"name":"nominee","type":{"kind":"simple","type":"address","optional":false}},{"name":"invitor","type":{"kind":"simple","type":"address","optional":false}},{"name":"invitor0","type":{"kind":"simple","type":"address","optional":true}},{"name":"id","type":{"kind":"simple","type":"slice","optional":false}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"taxAsTxnFeePercent","type":{"kind":"simple","type":"int","optional":false,"format":6}},{"name":"turnover","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"debts","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"coins"}},{"name":"debt","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"insurance","type":{"kind":"simple","type":"Insurance","optional":false}},{"name":"invited","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"coins"}},{"name":"friends","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"coins"}},{"name":"closeFriendsAndVouched","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"closeFriendsCount","type":{"kind":"simple","type":"uint","optional":false,"format":4}},{"name":"recoveryVouchersCount","type":{"kind":"simple","type":"uint","optional":false,"format":4}},{"name":"pendingRequests","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"coins"}},{"name":"followers","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"coins"}},{"name":"followings","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"coins"}},{"name":"reportInfo","type":{"kind":"simple","type":"ReportInfo","optional":false}},{"name":"connections","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"terminated","type":{"kind":"simple","type":"bool","optional":false}},{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"accountInitTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lastTxnTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lastMsgTo","type":{"kind":"simple","type":"address","optional":false}},{"name":"version","type":{"kind":"simple","type":"uint","optional":false,"format":10}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"lastRewardClaimTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lastMonthlyAllowanceClaimTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"baseWalletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ParsedString","header":null,"fields":[{"name":"username","type":{"kind":"simple","type":"string","optional":false}},{"name":"lattitude","type":{"kind":"simple","type":"string","optional":false}},{"name":"longitude","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"IdInfo","header":null,"fields":[{"name":"username","type":{"kind":"simple","type":"string","optional":false}},{"name":"lattitude","type":{"kind":"simple","type":"string","optional":false}},{"name":"longitude","type":{"kind":"simple","type":"string","optional":false}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ReportInfo","header":null,"fields":[{"name":"reports","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"reason","type":{"kind":"simple","type":"bool","optional":false}},{"name":"reporterCount","type":{"kind":"simple","type":"uint","optional":false,"format":10}},{"name":"disputerCount","type":{"kind":"simple","type":"uint","optional":false,"format":10}},{"name":"reportResolutionTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"AddId","header":73,"fields":[{"name":"username","type":{"kind":"simple","type":"string","optional":false}},{"name":"lattitude","type":{"kind":"simple","type":"string","optional":false}},{"name":"longitude","type":{"kind":"simple","type":"string","optional":false}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RemoveId","header":80,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Insurance","header":null,"fields":[{"name":"emi","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"startStop","type":{"kind":"simple","type":"uint","optional":false,"format":42}}]},
    {"name":"FriendsAndFollowings","header":null,"fields":[{"name":"friends","type":{"kind":"simple","type":"cell","optional":true}},{"name":"followings","type":{"kind":"simple","type":"cell","optional":true}},{"name":"followers","type":{"kind":"simple","type":"cell","optional":true}},{"name":"invited","type":{"kind":"simple","type":"cell","optional":true}},{"name":"pendingRequests","type":{"kind":"simple","type":"cell","optional":true}},{"name":"debts","type":{"kind":"simple","type":"cell","optional":true}},{"name":"reports","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"OtherStateConsts","header":null,"fields":[{"name":"reportInfo","type":{"kind":"simple","type":"ReportInfo","optional":false}},{"name":"connections","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"terminated","type":{"kind":"simple","type":"bool","optional":false}},{"name":"mbrpAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"closureWait","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"lastMsgTo","type":{"kind":"simple","type":"address","optional":false}},{"name":"insurance","type":{"kind":"simple","type":"cell","optional":false}}]},
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
    {"name":"AccCloseBurnInternal","header":53,"fields":[{"name":"reason","type":{"kind":"simple","type":"bool","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
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
export const ALREADY_REPORTED_FOR_OTHER_REASON = 741n;
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