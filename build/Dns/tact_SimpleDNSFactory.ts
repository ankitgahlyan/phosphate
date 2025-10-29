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

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function loadTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function loadGetterTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function storeTupleDeploy(source: Deploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function loadTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function loadGetterTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function storeTupleDeployOk(source: DeployOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function loadTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function loadGetterTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function storeTupleFactoryDeploy(source: FactoryDeploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

export function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
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
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
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

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

export function loadTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

export function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

export function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

export function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type DNSResolveResult = {
    $$type: 'DNSResolveResult';
    prefix: bigint;
    record: Cell | null;
}

export function storeDNSResolveResult(src: DNSResolveResult) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.prefix, 257);
        if (src.record !== null && src.record !== undefined) { b_0.storeBit(true).storeRef(src.record); } else { b_0.storeBit(false); }
    };
}

export function loadDNSResolveResult(slice: Slice) {
    const sc_0 = slice;
    const _prefix = sc_0.loadIntBig(257);
    const _record = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'DNSResolveResult' as const, prefix: _prefix, record: _record };
}

export function loadTupleDNSResolveResult(source: TupleReader) {
    const _prefix = source.readBigNumber();
    const _record = source.readCellOpt();
    return { $$type: 'DNSResolveResult' as const, prefix: _prefix, record: _record };
}

export function loadGetterTupleDNSResolveResult(source: TupleReader) {
    const _prefix = source.readBigNumber();
    const _record = source.readCellOpt();
    return { $$type: 'DNSResolveResult' as const, prefix: _prefix, record: _record };
}

export function storeTupleDNSResolveResult(source: DNSResolveResult) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.prefix);
    builder.writeCell(source.record);
    return builder.build();
}

export function dictValueParserDNSResolveResult(): DictionaryValue<DNSResolveResult> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDNSResolveResult(src)).endCell());
        },
        parse: (src) => {
            return loadDNSResolveResult(src.loadRef().beginParse());
        }
    }
}

export type UpdateRecord = {
    $$type: 'UpdateRecord';
    domain: string;
    category: bigint;
    record: Cell | null;
}

export function storeUpdateRecord(src: UpdateRecord) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3532961574, 32);
        b_0.storeStringRefTail(src.domain);
        b_0.storeInt(src.category, 257);
        if (src.record !== null && src.record !== undefined) { b_0.storeBit(true).storeRef(src.record); } else { b_0.storeBit(false); }
    };
}

export function loadUpdateRecord(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3532961574) { throw Error('Invalid prefix'); }
    const _domain = sc_0.loadStringRefTail();
    const _category = sc_0.loadIntBig(257);
    const _record = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'UpdateRecord' as const, domain: _domain, category: _category, record: _record };
}

export function loadTupleUpdateRecord(source: TupleReader) {
    const _domain = source.readString();
    const _category = source.readBigNumber();
    const _record = source.readCellOpt();
    return { $$type: 'UpdateRecord' as const, domain: _domain, category: _category, record: _record };
}

export function loadGetterTupleUpdateRecord(source: TupleReader) {
    const _domain = source.readString();
    const _category = source.readBigNumber();
    const _record = source.readCellOpt();
    return { $$type: 'UpdateRecord' as const, domain: _domain, category: _category, record: _record };
}

export function storeTupleUpdateRecord(source: UpdateRecord) {
    const builder = new TupleBuilder();
    builder.writeString(source.domain);
    builder.writeNumber(source.category);
    builder.writeCell(source.record);
    return builder.build();
}

export function dictValueParserUpdateRecord(): DictionaryValue<UpdateRecord> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateRecord(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateRecord(src.loadRef().beginParse());
        }
    }
}

export type UpdateSubdomain = {
    $$type: 'UpdateSubdomain';
    domain: string;
    address: Address | null;
}

export function storeUpdateSubdomain(src: UpdateSubdomain) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3097454096, 32);
        b_0.storeStringRefTail(src.domain);
        b_0.storeAddress(src.address);
    };
}

export function loadUpdateSubdomain(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3097454096) { throw Error('Invalid prefix'); }
    const _domain = sc_0.loadStringRefTail();
    const _address = sc_0.loadMaybeAddress();
    return { $$type: 'UpdateSubdomain' as const, domain: _domain, address: _address };
}

export function loadTupleUpdateSubdomain(source: TupleReader) {
    const _domain = source.readString();
    const _address = source.readAddressOpt();
    return { $$type: 'UpdateSubdomain' as const, domain: _domain, address: _address };
}

export function loadGetterTupleUpdateSubdomain(source: TupleReader) {
    const _domain = source.readString();
    const _address = source.readAddressOpt();
    return { $$type: 'UpdateSubdomain' as const, domain: _domain, address: _address };
}

export function storeTupleUpdateSubdomain(source: UpdateSubdomain) {
    const builder = new TupleBuilder();
    builder.writeString(source.domain);
    builder.writeAddress(source.address);
    return builder.build();
}

export function dictValueParserUpdateSubdomain(): DictionaryValue<UpdateSubdomain> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateSubdomain(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateSubdomain(src.loadRef().beginParse());
        }
    }
}

export type EventPermissionsUpdated = {
    $$type: 'EventPermissionsUpdated';
    permissions: Permissions;
}

export function storeEventPermissionsUpdated(src: EventPermissionsUpdated) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1825938406, 32);
        b_0.store(storePermissions(src.permissions));
    };
}

export function loadEventPermissionsUpdated(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1825938406) { throw Error('Invalid prefix'); }
    const _permissions = loadPermissions(sc_0);
    return { $$type: 'EventPermissionsUpdated' as const, permissions: _permissions };
}

export function loadTupleEventPermissionsUpdated(source: TupleReader) {
    const _permissions = loadTuplePermissions(source);
    return { $$type: 'EventPermissionsUpdated' as const, permissions: _permissions };
}

export function loadGetterTupleEventPermissionsUpdated(source: TupleReader) {
    const _permissions = loadGetterTuplePermissions(source);
    return { $$type: 'EventPermissionsUpdated' as const, permissions: _permissions };
}

export function storeTupleEventPermissionsUpdated(source: EventPermissionsUpdated) {
    const builder = new TupleBuilder();
    builder.writeTuple(storeTuplePermissions(source.permissions));
    return builder.build();
}

export function dictValueParserEventPermissionsUpdated(): DictionaryValue<EventPermissionsUpdated> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEventPermissionsUpdated(src)).endCell());
        },
        parse: (src) => {
            return loadEventPermissionsUpdated(src.loadRef().beginParse());
        }
    }
}

export type EventRecordAdded = {
    $$type: 'EventRecordAdded';
    domain: string;
    category: bigint;
    record: Cell;
}

export function storeEventRecordAdded(src: EventRecordAdded) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2786974973, 32);
        b_0.storeStringRefTail(src.domain);
        b_0.storeInt(src.category, 257);
        b_0.storeRef(src.record);
    };
}

export function loadEventRecordAdded(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2786974973) { throw Error('Invalid prefix'); }
    const _domain = sc_0.loadStringRefTail();
    const _category = sc_0.loadIntBig(257);
    const _record = sc_0.loadRef();
    return { $$type: 'EventRecordAdded' as const, domain: _domain, category: _category, record: _record };
}

export function loadTupleEventRecordAdded(source: TupleReader) {
    const _domain = source.readString();
    const _category = source.readBigNumber();
    const _record = source.readCell();
    return { $$type: 'EventRecordAdded' as const, domain: _domain, category: _category, record: _record };
}

export function loadGetterTupleEventRecordAdded(source: TupleReader) {
    const _domain = source.readString();
    const _category = source.readBigNumber();
    const _record = source.readCell();
    return { $$type: 'EventRecordAdded' as const, domain: _domain, category: _category, record: _record };
}

export function storeTupleEventRecordAdded(source: EventRecordAdded) {
    const builder = new TupleBuilder();
    builder.writeString(source.domain);
    builder.writeNumber(source.category);
    builder.writeCell(source.record);
    return builder.build();
}

export function dictValueParserEventRecordAdded(): DictionaryValue<EventRecordAdded> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEventRecordAdded(src)).endCell());
        },
        parse: (src) => {
            return loadEventRecordAdded(src.loadRef().beginParse());
        }
    }
}

export type EventRecordUpdated = {
    $$type: 'EventRecordUpdated';
    domain: string;
    category: bigint;
    oldRecord: Cell;
    newRecord: Cell;
}

export function storeEventRecordUpdated(src: EventRecordUpdated) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4012750979, 32);
        b_0.storeStringRefTail(src.domain);
        b_0.storeInt(src.category, 257);
        b_0.storeRef(src.oldRecord);
        b_0.storeRef(src.newRecord);
    };
}

export function loadEventRecordUpdated(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4012750979) { throw Error('Invalid prefix'); }
    const _domain = sc_0.loadStringRefTail();
    const _category = sc_0.loadIntBig(257);
    const _oldRecord = sc_0.loadRef();
    const _newRecord = sc_0.loadRef();
    return { $$type: 'EventRecordUpdated' as const, domain: _domain, category: _category, oldRecord: _oldRecord, newRecord: _newRecord };
}

export function loadTupleEventRecordUpdated(source: TupleReader) {
    const _domain = source.readString();
    const _category = source.readBigNumber();
    const _oldRecord = source.readCell();
    const _newRecord = source.readCell();
    return { $$type: 'EventRecordUpdated' as const, domain: _domain, category: _category, oldRecord: _oldRecord, newRecord: _newRecord };
}

export function loadGetterTupleEventRecordUpdated(source: TupleReader) {
    const _domain = source.readString();
    const _category = source.readBigNumber();
    const _oldRecord = source.readCell();
    const _newRecord = source.readCell();
    return { $$type: 'EventRecordUpdated' as const, domain: _domain, category: _category, oldRecord: _oldRecord, newRecord: _newRecord };
}

export function storeTupleEventRecordUpdated(source: EventRecordUpdated) {
    const builder = new TupleBuilder();
    builder.writeString(source.domain);
    builder.writeNumber(source.category);
    builder.writeCell(source.oldRecord);
    builder.writeCell(source.newRecord);
    return builder.build();
}

export function dictValueParserEventRecordUpdated(): DictionaryValue<EventRecordUpdated> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEventRecordUpdated(src)).endCell());
        },
        parse: (src) => {
            return loadEventRecordUpdated(src.loadRef().beginParse());
        }
    }
}

export type EventRecordRemoved = {
    $$type: 'EventRecordRemoved';
    domain: string;
    category: bigint;
}

export function storeEventRecordRemoved(src: EventRecordRemoved) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4287927537, 32);
        b_0.storeStringRefTail(src.domain);
        b_0.storeInt(src.category, 257);
    };
}

export function loadEventRecordRemoved(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4287927537) { throw Error('Invalid prefix'); }
    const _domain = sc_0.loadStringRefTail();
    const _category = sc_0.loadIntBig(257);
    return { $$type: 'EventRecordRemoved' as const, domain: _domain, category: _category };
}

export function loadTupleEventRecordRemoved(source: TupleReader) {
    const _domain = source.readString();
    const _category = source.readBigNumber();
    return { $$type: 'EventRecordRemoved' as const, domain: _domain, category: _category };
}

export function loadGetterTupleEventRecordRemoved(source: TupleReader) {
    const _domain = source.readString();
    const _category = source.readBigNumber();
    return { $$type: 'EventRecordRemoved' as const, domain: _domain, category: _category };
}

export function storeTupleEventRecordRemoved(source: EventRecordRemoved) {
    const builder = new TupleBuilder();
    builder.writeString(source.domain);
    builder.writeNumber(source.category);
    return builder.build();
}

export function dictValueParserEventRecordRemoved(): DictionaryValue<EventRecordRemoved> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEventRecordRemoved(src)).endCell());
        },
        parse: (src) => {
            return loadEventRecordRemoved(src.loadRef().beginParse());
        }
    }
}

export type EventSubdomainAdded = {
    $$type: 'EventSubdomainAdded';
    domain: string;
    address: Address;
}

export function storeEventSubdomainAdded(src: EventSubdomainAdded) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4279974676, 32);
        b_0.storeStringRefTail(src.domain);
        b_0.storeAddress(src.address);
    };
}

export function loadEventSubdomainAdded(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4279974676) { throw Error('Invalid prefix'); }
    const _domain = sc_0.loadStringRefTail();
    const _address = sc_0.loadAddress();
    return { $$type: 'EventSubdomainAdded' as const, domain: _domain, address: _address };
}

export function loadTupleEventSubdomainAdded(source: TupleReader) {
    const _domain = source.readString();
    const _address = source.readAddress();
    return { $$type: 'EventSubdomainAdded' as const, domain: _domain, address: _address };
}

export function loadGetterTupleEventSubdomainAdded(source: TupleReader) {
    const _domain = source.readString();
    const _address = source.readAddress();
    return { $$type: 'EventSubdomainAdded' as const, domain: _domain, address: _address };
}

export function storeTupleEventSubdomainAdded(source: EventSubdomainAdded) {
    const builder = new TupleBuilder();
    builder.writeString(source.domain);
    builder.writeAddress(source.address);
    return builder.build();
}

export function dictValueParserEventSubdomainAdded(): DictionaryValue<EventSubdomainAdded> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEventSubdomainAdded(src)).endCell());
        },
        parse: (src) => {
            return loadEventSubdomainAdded(src.loadRef().beginParse());
        }
    }
}

export type EventSubdomainRemoved = {
    $$type: 'EventSubdomainRemoved';
    domain: string;
}

export function storeEventSubdomainRemoved(src: EventSubdomainRemoved) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3052516533, 32);
        b_0.storeStringRefTail(src.domain);
    };
}

export function loadEventSubdomainRemoved(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3052516533) { throw Error('Invalid prefix'); }
    const _domain = sc_0.loadStringRefTail();
    return { $$type: 'EventSubdomainRemoved' as const, domain: _domain };
}

export function loadTupleEventSubdomainRemoved(source: TupleReader) {
    const _domain = source.readString();
    return { $$type: 'EventSubdomainRemoved' as const, domain: _domain };
}

export function loadGetterTupleEventSubdomainRemoved(source: TupleReader) {
    const _domain = source.readString();
    return { $$type: 'EventSubdomainRemoved' as const, domain: _domain };
}

export function storeTupleEventSubdomainRemoved(source: EventSubdomainRemoved) {
    const builder = new TupleBuilder();
    builder.writeString(source.domain);
    return builder.build();
}

export function dictValueParserEventSubdomainRemoved(): DictionaryValue<EventSubdomainRemoved> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEventSubdomainRemoved(src)).endCell());
        },
        parse: (src) => {
            return loadEventSubdomainRemoved(src.loadRef().beginParse());
        }
    }
}

export type EventSubdomainUpdated = {
    $$type: 'EventSubdomainUpdated';
    domain: string;
    oldAddress: Address;
    newAddress: Address;
}

export function storeEventSubdomainUpdated(src: EventSubdomainUpdated) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2877063357, 32);
        b_0.storeStringRefTail(src.domain);
        b_0.storeAddress(src.oldAddress);
        b_0.storeAddress(src.newAddress);
    };
}

export function loadEventSubdomainUpdated(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2877063357) { throw Error('Invalid prefix'); }
    const _domain = sc_0.loadStringRefTail();
    const _oldAddress = sc_0.loadAddress();
    const _newAddress = sc_0.loadAddress();
    return { $$type: 'EventSubdomainUpdated' as const, domain: _domain, oldAddress: _oldAddress, newAddress: _newAddress };
}

export function loadTupleEventSubdomainUpdated(source: TupleReader) {
    const _domain = source.readString();
    const _oldAddress = source.readAddress();
    const _newAddress = source.readAddress();
    return { $$type: 'EventSubdomainUpdated' as const, domain: _domain, oldAddress: _oldAddress, newAddress: _newAddress };
}

export function loadGetterTupleEventSubdomainUpdated(source: TupleReader) {
    const _domain = source.readString();
    const _oldAddress = source.readAddress();
    const _newAddress = source.readAddress();
    return { $$type: 'EventSubdomainUpdated' as const, domain: _domain, oldAddress: _oldAddress, newAddress: _newAddress };
}

export function storeTupleEventSubdomainUpdated(source: EventSubdomainUpdated) {
    const builder = new TupleBuilder();
    builder.writeString(source.domain);
    builder.writeAddress(source.oldAddress);
    builder.writeAddress(source.newAddress);
    return builder.build();
}

export function dictValueParserEventSubdomainUpdated(): DictionaryValue<EventSubdomainUpdated> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEventSubdomainUpdated(src)).endCell());
        },
        parse: (src) => {
            return loadEventSubdomainUpdated(src.loadRef().beginParse());
        }
    }
}

export type DNSRecord = {
    $$type: 'DNSRecord';
    name: string;
    categories: Dictionary<bigint, Cell>;
}

export function storeDNSRecord(src: DNSRecord) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeDict(src.categories, Dictionary.Keys.BigUint(256), Dictionary.Values.Cell());
    };
}

export function loadDNSRecord(slice: Slice) {
    const sc_0 = slice;
    const _name = sc_0.loadStringRefTail();
    const _categories = Dictionary.load(Dictionary.Keys.BigUint(256), Dictionary.Values.Cell(), sc_0);
    return { $$type: 'DNSRecord' as const, name: _name, categories: _categories };
}

export function loadTupleDNSRecord(source: TupleReader) {
    const _name = source.readString();
    const _categories = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.Cell(), source.readCellOpt());
    return { $$type: 'DNSRecord' as const, name: _name, categories: _categories };
}

export function loadGetterTupleDNSRecord(source: TupleReader) {
    const _name = source.readString();
    const _categories = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.Cell(), source.readCellOpt());
    return { $$type: 'DNSRecord' as const, name: _name, categories: _categories };
}

export function storeTupleDNSRecord(source: DNSRecord) {
    const builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeCell(source.categories.size > 0 ? beginCell().storeDictDirect(source.categories, Dictionary.Keys.BigUint(256), Dictionary.Values.Cell()).endCell() : null);
    return builder.build();
}

export function dictValueParserDNSRecord(): DictionaryValue<DNSRecord> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDNSRecord(src)).endCell());
        },
        parse: (src) => {
            return loadDNSRecord(src.loadRef().beginParse());
        }
    }
}

export type Permissions = {
    $$type: 'Permissions';
    canAdd: boolean;
    canRemove: boolean;
    canReplace: boolean;
}

export function storePermissions(src: Permissions) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.canAdd);
        b_0.storeBit(src.canRemove);
        b_0.storeBit(src.canReplace);
    };
}

export function loadPermissions(slice: Slice) {
    const sc_0 = slice;
    const _canAdd = sc_0.loadBit();
    const _canRemove = sc_0.loadBit();
    const _canReplace = sc_0.loadBit();
    return { $$type: 'Permissions' as const, canAdd: _canAdd, canRemove: _canRemove, canReplace: _canReplace };
}

export function loadTuplePermissions(source: TupleReader) {
    const _canAdd = source.readBoolean();
    const _canRemove = source.readBoolean();
    const _canReplace = source.readBoolean();
    return { $$type: 'Permissions' as const, canAdd: _canAdd, canRemove: _canRemove, canReplace: _canReplace };
}

export function loadGetterTuplePermissions(source: TupleReader) {
    const _canAdd = source.readBoolean();
    const _canRemove = source.readBoolean();
    const _canReplace = source.readBoolean();
    return { $$type: 'Permissions' as const, canAdd: _canAdd, canRemove: _canRemove, canReplace: _canReplace };
}

export function storeTuplePermissions(source: Permissions) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.canAdd);
    builder.writeBoolean(source.canRemove);
    builder.writeBoolean(source.canReplace);
    return builder.build();
}

export function dictValueParserPermissions(): DictionaryValue<Permissions> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePermissions(src)).endCell());
        },
        parse: (src) => {
            return loadPermissions(src.loadRef().beginParse());
        }
    }
}

export type Dns$Data = {
    $$type: 'Dns$Data';
    owner: Address;
    permissions: Permissions;
    records: Dictionary<bigint, DNSRecord>;
    subdomains: Dictionary<bigint, Address>;
}

export function storeDns$Data(src: Dns$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.store(storePermissions(src.permissions));
        b_0.storeDict(src.records, Dictionary.Keys.BigUint(256), dictValueParserDNSRecord());
        b_0.storeDict(src.subdomains, Dictionary.Keys.BigUint(256), Dictionary.Values.Address());
    };
}

export function loadDns$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _permissions = loadPermissions(sc_0);
    const _records = Dictionary.load(Dictionary.Keys.BigUint(256), dictValueParserDNSRecord(), sc_0);
    const _subdomains = Dictionary.load(Dictionary.Keys.BigUint(256), Dictionary.Values.Address(), sc_0);
    return { $$type: 'Dns$Data' as const, owner: _owner, permissions: _permissions, records: _records, subdomains: _subdomains };
}

export function loadTupleDns$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _permissions = loadTuplePermissions(source);
    const _records = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), dictValueParserDNSRecord(), source.readCellOpt());
    const _subdomains = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.Address(), source.readCellOpt());
    return { $$type: 'Dns$Data' as const, owner: _owner, permissions: _permissions, records: _records, subdomains: _subdomains };
}

export function loadGetterTupleDns$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _permissions = loadGetterTuplePermissions(source);
    const _records = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), dictValueParserDNSRecord(), source.readCellOpt());
    const _subdomains = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.Address(), source.readCellOpt());
    return { $$type: 'Dns$Data' as const, owner: _owner, permissions: _permissions, records: _records, subdomains: _subdomains };
}

export function storeTupleDns$Data(source: Dns$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeTuple(storeTuplePermissions(source.permissions));
    builder.writeCell(source.records.size > 0 ? beginCell().storeDictDirect(source.records, Dictionary.Keys.BigUint(256), dictValueParserDNSRecord()).endCell() : null);
    builder.writeCell(source.subdomains.size > 0 ? beginCell().storeDictDirect(source.subdomains, Dictionary.Keys.BigUint(256), Dictionary.Values.Address()).endCell() : null);
    return builder.build();
}

export function dictValueParserDns$Data(): DictionaryValue<Dns$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDns$Data(src)).endCell());
        },
        parse: (src) => {
            return loadDns$Data(src.loadRef().beginParse());
        }
    }
}

export type SimpleDNSFactory$Data = {
    $$type: 'SimpleDNSFactory$Data';
    counter: bigint;
}

export function storeSimpleDNSFactory$Data(src: SimpleDNSFactory$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.counter, 64);
    };
}

export function loadSimpleDNSFactory$Data(slice: Slice) {
    const sc_0 = slice;
    const _counter = sc_0.loadUintBig(64);
    return { $$type: 'SimpleDNSFactory$Data' as const, counter: _counter };
}

export function loadTupleSimpleDNSFactory$Data(source: TupleReader) {
    const _counter = source.readBigNumber();
    return { $$type: 'SimpleDNSFactory$Data' as const, counter: _counter };
}

export function loadGetterTupleSimpleDNSFactory$Data(source: TupleReader) {
    const _counter = source.readBigNumber();
    return { $$type: 'SimpleDNSFactory$Data' as const, counter: _counter };
}

export function storeTupleSimpleDNSFactory$Data(source: SimpleDNSFactory$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.counter);
    return builder.build();
}

export function dictValueParserSimpleDNSFactory$Data(): DictionaryValue<SimpleDNSFactory$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSimpleDNSFactory$Data(src)).endCell());
        },
        parse: (src) => {
            return loadSimpleDNSFactory$Data(src.loadRef().beginParse());
        }
    }
}

 type SimpleDNSFactory_init_args = {
    $$type: 'SimpleDNSFactory_init_args';
}

function initSimpleDNSFactory_init_args(src: SimpleDNSFactory_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function SimpleDNSFactory_init() {
    const __code = Cell.fromHex('b5ee9c7241024101000fe70002eeff00208f6e30eda2edfb01d072d721d200d200fa4021103450666f04f86102f862ed44d0d2000194d33f0131923070e202915be020d749c21f8e8cd31f018210946a98b6bae302def90182f0c1c8ebe8e42f1458f2693e8bef345c9c08db8c56d2ca637be9b436ea1f68976fbae30230f2c082e1f2c80b010301ecd33f30c8018210aff90f5758cb1fcb3fc9f84270f8276f10f8416f24135f03a1821005f5e100b98e2a821005f5e10070fb0270500381008201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb008e20705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00e202001cc87f01ca000101cb3fc9ed54db3103fea4f84221db3c5c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0821005f5e10070fb027070810082f8425270c85982106d0ff13b5003cb1fcb3fcec95e234430121036445503c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae2f400043f40011e88c87001ca005a02ce810101cf00c90503e6ff008e88f4a413f4bcf2c80bed53208f5e30eda2edfb01d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e14fa40d200d200d200552003f404f4040645556c168e13fa40810101d7005902d101306d6d7f7f7f4034e207925f07e025d749c21fe30005f90120e1ed43d9061d35020162070a0105a0009d0801f6eda2edfb20d74ac300923070e020d74920a93802c300925b70e020c000925b7fe0ab02707f70038e4e03d30721c0008e133133c000945b70db31e0943070db31e070707f8e2f3320c02d21c22f22c13ab05210b122c26003c17b13b012b1b3955f0470db31e05204b0955f0370db31e07001a44033e212e430327009000801b3b0ba0201200b130201200c110201200d0f0171b7e8bda89a1a400031c29f481a401a401a400aa4007e809e8080c8aaad82d1c27f481020203ae00b205a20260dadafefefe8069c5b678d8c700e00065474320171b58d7da89a1a400031c29f481a401a401a400aa4007e809e8080c8aaad82d1c27f481020203ae00b205a20260dadafefefe8069c5b678d8c30100002200171b851ded44d0d200018e14fa40d200d200d200552003f404f4040645556c168e13fa40810101d7005902d101306d6d7f7f7f4034e2db3c6c6181200022502012014160171bbddbed44d0d200018e14fa40d200d200d200552003f404f4040645556c168e13fa40810101d7005902d101306d6d7f7f7f4034e2db3c6c618150002210175ba30ced44d0d200018e14fa40d200d200d200552003f404f4040645556c168e13fa40810101d7005902d101306d6d7f7f7f4034e25515db3c6c6281701507022d70b07973001d307310178df815e6123f04ef2f45570db3c08a050071067105610451034102318047421d7498e8701d7497058db3ce121db3c830721f901255959f40e6fa192306ddf206eb38e8c3331d74901206ef2d080db3ce05b21d74902f901011c191a1b010c20db3cd718301f0018c88200ba9301cb0f01cf16c90104db3c1c008e830754451359f40f6fa192306ddf206e92306d9cd0d401d001f404596c126f02e2206e925b6de0219931206ef2d0806f2231e1206ef2d0806f223183075859f40f6fa192306ddf045205d31f218210b89f6610bae302218210d294b726bae302218210946a98b6bae3022182106d0ff13bba1e232e2f04a631d401d001d72c01916d93fa4001e2315067db3c26db3c8158a8216eb3f2f420206ef2d080db3c8158a822206ef2d080d74958baf2f4206ef2d080f9012183072259f40e6fa192306ddf206eb392296e9170e23b241f200034709e01d30701c000209402a60802df12e631815e6121c300f2f404c68f4b303881540f24f2f4830758086d206e953059f45b30944133f416e205c8018210b5f1b4b558cb1f01c8cecdc9c88258c000000000000000000000000101cb67ccc970fb0088104610354430e0206e93296eb39170e2e302206eb393296eb39170e23c33212202a6308200abb926f2f483075119206e953059f45b30944133f416e207206ef2d08016c8598210ff1b3b145003cb1f01c8cecdcec9c88258c000000000000000000000000101cb67ccc970fb0088104610354430123c3303d28f5e8200abb925f2f412830754103a206e953059f45b30944133f416e201206ef2d08008206ef2d0804780c855208210ab7c80bd5004cb1f02c8ce12cdcecec9c88258c000000000000000000000000101cb67ccc970fb008810461035443012e05b3636f2c08655133c3334039831d401d001810101d700f404301056104610364678db3c26db3c8158a8216eb3f2f4206ef2d080f9012283072259f40f6fa192306ddf206e92306d9cd0d401d001f404596c126f02e2206eb33b242601b6eda2edfb20d749c00821d74ac000b08e1220d70b07c02e9a30c87001cb07c9d0db31e0de6dc87f7f707f8ae630313403935f036de002b3926f029131e2c8016f2259cf1793216eb39b016f22705003cb0701cf17e87032cb07c9d02500f026d749c0008e1b3025d74a20c001953005d430d09ac201955f066ddb31e005e20570de208e4f313204d30721c02d22c02e5cb124c22f25c13ab0b124c26025c17bb0b1b35382b0b1955f086ddb31e08e12325055b1955f046ddb31e0026f02c8707f7f9b3670027005cb0703054664e21045035024de20b30248e30ff2c0865522c87f01ca0055505056ce55205023ca00ca00ca00f400f400c9ed54db31272c0374206ef2d0806f222083072c59f40f6fa192306ddf206eb3922c6e9170e2e302206eb3932c6eb39170e2e3026e932b6eb39170e2e3025f0336363628292b02de303b81540f26f2f40a83072a6d206e953059f45b30944133f417e2830750bbc85901c8ce12cdf400c9102a206e953059f45b30944133f417e25056c8598210ff9494f15003cb1f01c8cecd810101cf00c9c88258c000000000000000000000000101cb67ccc970fb008810364540133c3302fe8200d92627f2f401830753cd206e953059f45b30944133f417e283075033c85901c8ce12cdf400c91513206e953059f45b30944133f417e202206ef2d08009206ef2d08010374890c855308210ef2db8835005cb1f03c8ce13cd810101cf00ccccc9c88258c000000000000000000000000101cb67ccc970fb0088103645403c2a01cc13f8427ff8276f10f8416f24135f03a1821005f5e100b98e2a821005f5e10070fb0270500381008201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb008e20705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00e23402ee8200abb928f2f4830753bc206e953059f45b30944133f417e2830759c85901c8ce12cdf400c9103412206e953059f45b30944133f417e208206ef2d0804670c855208210a61ddcfd5004cb1f02c8ce12cd810101cf00ccc9c88258c000000000000000000000000101cb67ccc970fb00881036454043303c3303fe30296eb38f798200abb926f2f4276d830753bc206e953059f45b30944133f417e2830759c85901c8ce12cdf400c9103412206e953059f45b30944133f417e208206ef2d0804670c855208210a61ddcfd5004cb1f02c8ce12cd810101cf00ccc9c88258c000000000000000000000000101cb67ccc970fb00881036454043303c332d000ae03036363601fc31d33f30c8018210aff90f5758cb1fcb3fc910461035443012f84270f8276f10f8416f24135f03a1821005f5e100b98e2a821005f5e10070fb0270500381008201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb008e20705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00e23403e08ec031d33ffa403001c8018210aff90f5758cb1fcb3fc910571046103510241023706ddb3cc87f01ca0055505056ce55205023ca00ca00ca00f400f400c9ed54db31e0018210819dbe99ba8f21d33ffa40305067db3c355156c8598210327b2b4a5003cb1fcb3fcec91035443012e005303b3301f6206e8e6230f8416f24135f03f8276f1001a1821005f5e100b98e2a821005f5e10070fb0202705881008201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00e0027058804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00e0f8416f24135f03f8276f1001a1821005f5e100b93101fe8e58821005f5e10070fb028100827022206ef2d0806f223003206ef2d0806f2231102544301056434315c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00e070804222206ef2d0806f223003206ef2d0806f22311046104544301036552212c8cf8580320058ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0001caf8427ff8276f10f8416f24135f03a1821005f5e100b98e2a821005f5e10070fb0270500381008201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb008e20705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00e234003ac87f01ca0055505056ce55205023ca00ca00ca00f400f400c9ed54db3104e282f0bc11327417bcdfc895e7a19b74fe433f6cfb94ccaa3ed4123aee1d790cde56a0bae3022082f0e1eefb71aeeaf14b43a62dac1f6280d8d53b58b7e1c1d34da3edf6be3e54db3abae3022082f07186c682243006c4affc62e682b3008c35ab2a1628526015a552122a9a2e34eebae3023638393a02ce3010355512db3c8163e124f2f470f842708100a088146d50436d5023c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00c87f01ca0055505056ce55205023ca00ca00ca00f400f400c9ed543b37002c00000000436f6e74726163742064657374726f79656403863010355512db3c8167465005f2f470547032c8552082106cd59be65004cb1f035023ca00ca00ca00c9c88258c000000000000000000000000101cb67ccc970fb0088153b3c3d03863010355512db3c8167465004f2f470547402c8552082106cd59be65004cb1f035023ca00ca00ca00c9c88258c000000000000000000000000101cb67ccc970fb0088143b3c3d03da82f08921f8407d29655e3eec273042707a113588d4c5f254ccf529408f7637154e49ba8fc210355512db3c8167465003f2f470547430c8552082106cd59be65004cb1f035023ca00ca00ca00c9c88258c000000000000000000000000101cb67ccc970fb008813e05f06f2c0823b3c3d0010f84226c705f2e084000c000000004f4b01caf8427ff8276f10f8416f24135f03a1821005f5e100b98e2a821005f5e10070fb0270500381008201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb008e20705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00e23e0036c87f01ca0055505056ce55205023ca00ca00ca00f400f400c9ed54001a58cf8680cf8480f400f400cf810020c901fb00c87f01ca000101cb3fc9ed5492d256bf');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initSimpleDNSFactory_init_args({ $$type: 'SimpleDNSFactory_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const SimpleDNSFactory_errors = {
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
    21519: { message: "Can't remove records" },
    22696: { message: "Invalid domain" },
    24161: { message: "Invalid DNS name" },
    25569: { message: "Can't destroy contract" },
    26438: { message: "Fuse already burned" },
    43961: { message: "Can't add records" },
    55590: { message: "Can't replace records" },
} as const

export const SimpleDNSFactory_errors_backward = {
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
    "Can't remove records": 21519,
    "Invalid domain": 22696,
    "Invalid DNS name": 24161,
    "Can't destroy contract": 25569,
    "Fuse already burned": 26438,
    "Can't add records": 43961,
    "Can't replace records": 55590,
} as const

const SimpleDNSFactory_types: ABIType[] = [
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
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DNSResolveResult","header":null,"fields":[{"name":"prefix","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"record","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"UpdateRecord","header":3532961574,"fields":[{"name":"domain","type":{"kind":"simple","type":"string","optional":false}},{"name":"category","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"record","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"UpdateSubdomain","header":3097454096,"fields":[{"name":"domain","type":{"kind":"simple","type":"string","optional":false}},{"name":"address","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"EventPermissionsUpdated","header":1825938406,"fields":[{"name":"permissions","type":{"kind":"simple","type":"Permissions","optional":false}}]},
    {"name":"EventRecordAdded","header":2786974973,"fields":[{"name":"domain","type":{"kind":"simple","type":"string","optional":false}},{"name":"category","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"record","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"EventRecordUpdated","header":4012750979,"fields":[{"name":"domain","type":{"kind":"simple","type":"string","optional":false}},{"name":"category","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"oldRecord","type":{"kind":"simple","type":"cell","optional":false}},{"name":"newRecord","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"EventRecordRemoved","header":4287927537,"fields":[{"name":"domain","type":{"kind":"simple","type":"string","optional":false}},{"name":"category","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"EventSubdomainAdded","header":4279974676,"fields":[{"name":"domain","type":{"kind":"simple","type":"string","optional":false}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"EventSubdomainRemoved","header":3052516533,"fields":[{"name":"domain","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"EventSubdomainUpdated","header":2877063357,"fields":[{"name":"domain","type":{"kind":"simple","type":"string","optional":false}},{"name":"oldAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"newAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DNSRecord","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"categories","type":{"kind":"dict","key":"uint","keyFormat":256,"value":"cell","valueFormat":"ref"}}]},
    {"name":"Permissions","header":null,"fields":[{"name":"canAdd","type":{"kind":"simple","type":"bool","optional":false}},{"name":"canRemove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"canReplace","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"Dns$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"permissions","type":{"kind":"simple","type":"Permissions","optional":false}},{"name":"records","type":{"kind":"dict","key":"uint","keyFormat":256,"value":"DNSRecord","valueFormat":"ref"}},{"name":"subdomains","type":{"kind":"dict","key":"uint","keyFormat":256,"value":"address"}}]},
    {"name":"SimpleDNSFactory$Data","header":null,"fields":[{"name":"counter","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
]

const SimpleDNSFactory_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "ChangeOwner": 2174598809,
    "ChangeOwnerOk": 846932810,
    "UpdateRecord": 3532961574,
    "UpdateSubdomain": 3097454096,
    "EventPermissionsUpdated": 1825938406,
    "EventRecordAdded": 2786974973,
    "EventRecordUpdated": 4012750979,
    "EventRecordRemoved": 4287927537,
    "EventSubdomainAdded": 4279974676,
    "EventSubdomainRemoved": 3052516533,
    "EventSubdomainUpdated": 2877063357,
}

const SimpleDNSFactory_getters: ABIGetter[] = [
]

export const SimpleDNSFactory_getterMapping: { [key: string]: string } = {
}

const SimpleDNSFactory_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]


export class SimpleDNSFactory implements Contract {
    
    public static readonly storageReserve = 100000000n;
    public static readonly errors = SimpleDNSFactory_errors_backward;
    public static readonly opcodes = SimpleDNSFactory_opcodes;
    
    static async init() {
        return await SimpleDNSFactory_init();
    }
    
    static async fromInit() {
        const __gen_init = await SimpleDNSFactory_init();
        const address = contractAddress(0, __gen_init);
        return new SimpleDNSFactory(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new SimpleDNSFactory(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  SimpleDNSFactory_types,
        getters: SimpleDNSFactory_getters,
        receivers: SimpleDNSFactory_receivers,
        errors: SimpleDNSFactory_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: "Deploy" | Deploy) {
        
        let body: Cell | null = null;
        if (message === "Deploy") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
}