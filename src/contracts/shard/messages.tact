struct ParsedString {
    username: String;
    lattitude: String;
    longitude: String;
}

struct IdInfo {
    username: String;
    lattitude: String;
    longitude: String;
    address: Address;
}

message(0x49) AddId {
    username: String;
    lattitude: String;
    longitude: String;
    address: Address;
}

message(0x50) RemoveId {
    address: Address;
}

struct Insurance {
    emi: Int as coins;
    startStop: Int as uint42; // FIXME: enough for time
}

struct FriendsAndFollowings {
    friends: Cell?; //map<Address, Int as uint12>;
    followings: Cell?; //map<Address, Int as uint12>;
    //TODO: remove maybe
    followers: Cell?; //map<Address, Int as uint12>;
    invited: Cell?; //map<Address, Int as uint12>;
    pendingRequests: Cell?; //map<Address, Int as uint12>;
    debts: Cell?; //map<Address, Int as uint20>;
    reports: Cell?; //map<Address, Bool>;
}

struct OtherStateConsts {
    reportReason: Bool;
    reporterCount: Int as uint10;
    disputerCount: Int as uint10;
    reportResolutionTime: Int as uint32;
    connections: Int as uint8;
    terminated: Bool;
    mbrpAmount: Int as coins;
    closureWait: Int as uint32;
    active: Bool;
    lastMsgTo: Address;
    insurance: Cell;
}

struct InvitorNominee {
    invitor: Address;
    nominee: Address;
}

struct JettonData {
    totalSupply: Int as coins;
    mintable: Bool;
    owner: Address;
    content: Cell;
    jettonWalletCode: Cell;
}

struct JettonWalletData {
    balance: Int as coins; //TODO: map of different jettons
    owner: Address;
    minter: Address; // TODO: array of different minters(maybe wallet gen isInTrouble coz of this)
    code: Cell;
}

struct MaybeAddress {
    address: Address?;
}

// -----------------------------------------------------------------------------
// Notifications / Standard Jetton messages
// These messages are used for notifications, burns, transfers and standard
// Jetton flow. Opcodes are kept explicit for interop with TEPs and reference
// implementations.
// -----------------------------------------------------------------------------

// Optimized action messages with op codes
message(0x7362d09c) JettonNotification {
    queryId: Int as uint64;
    amount: Int as coins;
    sender: Address;
    forwardPayload: Slice as remaining;
}

message(0x595f07bc) JettonBurn {
    queryId: Int as uint64;
    amount: Int as coins;
    responseDestination: Address?;
    customPayload: Cell?;
}

message(0x7bdd97de) JettonBurnNotification {
    queryId: Int as uint64;
    amount: Int as coins;
    sender: Address;
    responseDestination: Address?;
}

// -----------------------------------------------------------------------------
// Wallet discovery / balance related messages
// ProvideWalletAddress / ProvideWalletBalance / TakeWalletBalance etc.
// -----------------------------------------------------------------------------

message(0x2c76b973) ProvideWalletAddress {
    queryId: Int as uint64;
    ownerAddress: Address;
    includeAddress: Bool;
}

message(0xd1735400) TakeWalletAddress {
    queryId: Int as uint64;
    walletAddress: Address;
    ownerAddress: Cell?; //It is Maybe ^Address, encoded as Cell for simplicity
}

message(0x7ac8d559) ProvideWalletBalance {
    receiver: Address;
    includeVerifyInfo: Bool;
}

struct VerifyInfo {
    owner: Address;
    minter: Address;
    code: Cell;
}

// verify_info$_ owner:MsgAddress minter:MsgAddress code:^Cell = VerifyInfo
// take_wallet_balance#ca77fdc2 balance:Coins verify_info:(Maybe VerifyInfo) = InternalMsgBody
message(0xca77fdc2) TakeWalletBalance {
    balance: Int as coins;
    verifyInfo: VerifyInfo?;
}

// -----------------------------------------------------------------------------
// Minting / Transfer messages
// Clarified that mint performs an atomic next-step forward (master_msg), see spec.
// -----------------------------------------------------------------------------

message(0x642b7d07) Mint {
    queryId: Int as uint64;
    receiver: Address;
    mintMessage: JettonTransferInternal;
}

message(0xf8a7ea5) JettonTransfer {
    queryId: Int as uint64;
    amount: Int as coins;
    destination: Address;
    responseDestination: Address?;
    customPayload: Cell?;
    forwardTonAmount: Int as coins;
    forwardPayload: Slice as remaining;
}

message(0x178d4519) JettonTransferInternal {
    queryId: Int as uint64;
    walletVersion: Int as uint10;
    amount: Int as coins;
    sender: Address;
    responseDestination: Address?;
    forwardTonAmount: Int as coins;
    forwardPayload: Slice as remaining;
}

message(0xd53276db) JettonExcesses {
    queryId: Int as uint64;
}

// claim_ton#0393b1ce receiver:MsgAddress = InternalMsgBody
message(0x0393b1ce) ClaimTON {
    receiver: Address;
}

// -----------------------------------------------------------------------------
// Upgrade lifecycle messages
// Keep upgrade-related messages grouped; Upgrade message includes optional
// new code/data for root and wallet. Delayed upgrade flows should be handled by
// traits (see docs).
// -----------------------------------------------------------------------------

message(0x38) RequestUpgradeCode {
    version: Int as uint10;
}

message(0x47) UpgradeReqFromMainnet {
    sender: Address;
}

message(0x2508d66a) Upgrade {
    rootVersion: Int? as uint10 = null;
    walletVersion: Int? as uint10 = null;
    sender: Address? = null;
    newRootData: Cell? = null;
    newRootCode: Cell? = null;
    newWalletData: Cell? = null;
    newWalletCode: Cell? = null;
}

// -----------------------------------------------------------------------------
// Internal actions / system messages
// These messages are used for internal contract actions, system-level messages,
// and administrative tasks.
// -----------------------------------------------------------------------------

message(3) ChangeOwner {
    queryId: Int as uint64;
    newOwner: Address;
}

message(0x48) Invite {
    target: Address;
    id: IdInfo;
}

message(1) InviteInternal {
    version: Int as uint10;
    id: IdInfo?;
    sender: Address;
    invitor: Address;
    currentWalletCode: Cell;
    forwardPayload: Slice as remaining;
}

message(2) Follow {
    target: Address;
    amount: Int as coins;
}

message(0x17) FollowInternal {
    amount: Int as coins;
    sender: Address;
    forwardPayload: Slice as remaining;
}

message(0x15) Unfollow {
    target: Address;
    amount: Int as uint16;
}

message(5) UnfollowInternal {
    amount: Int as coins;
    sender: Address;
    forwardPayload: Slice as remaining;
}

message(6) FriendRequestInternal {
    amount: Int as coins;
    sender: Address;
    forwardPayload: Slice as remaining;
}

message(7) ConfirmRequestInternal {
    amount: Int as coins;
    sender: Address;
    forwardPayload: Slice as remaining;
}
message(8) ReportInternal {
    amount: Int as coins;
    reason: Bool;
    sender: Address;
    forwardPayload: Slice as remaining;
}
message(9) DisputeInternal {
    amount: Int as coins;
    sender: Address;
    forwardPayload: Slice as remaining;
}
message(10) ResolutionInternal {
    amount: Int as coins;
    sender: Address;
    forwardPayload: Slice as remaining;
}

message(0x11) Report {
    target: Address;
    reason: Bool; //true for closure, false for fraud/duplicateAccount
}

message(0x12) Dispute {
    target: Address;
}

message(0x13) ProcessComplaint {
    target: Address;
}

message(0x14) AdminAction {
    action: Int as uint8;
    value: Int as coins;
}

// Event with optimized data packing
// message(0x16) NetworkEvent {
//     eventType: Int as uint8;
//     from: Address;
//     to: Address;
//     amount: Int as coins;
// }

message(4) JettonUpdateContent {
    queryId: Int as uint64;
    content: Cell;
}

message(0x25) Mintable {
    mintable: Bool;
}
message(0x31) UnfriendInternal {
    amount: Int as coins;
    sender: Address;
    forwardPayload: Slice as remaining;
}
message(0x32) ReInviteInternal {
    amount: Int as coins;
    sender: Address;
    forwardPayload: Slice as remaining;
}
message(0x34) UnInviteInternal {
    amount: Int as coins;
    sender: Address;
    forwardPayload: Slice as remaining;
}
message(0x33) U {
    op: Int as uint6;
    amount: Int? as coins;
    sender: Address?;
    receiver: Address?;
    forwardPayload: Slice as remaining;
}
message(0x35) AccCloseBurnInternal {
    amount: Int as coins;
    sender: Address;
    forwardPayload: Slice as remaining;
}

message(0x36) EnquireInvitor {
    sender: Address;
}
message(0x37) TakeInvitor {
    sender: Address;
    invitor: Address;
}

message(0x40) AccountGenerated {
    deployer: Address;
    newAccount: Address;
}

message(0x41) ApplyGrant {
    sender: Address;
    amount: Int as coins;
}
message(0x42) VoteProposal {
    sender: Address;
    proposer: Address;
    turnover: Int as coins;
}
message(0x43) CitizenAdded {
    sender: Address;
    newAccount: Address;
}

message(0x44) InviteApproval {
    approved: Bool; // = true;// need default? 
    invitor: Address;
    invitee: Address;
    approver: Address;
}

message(0xcb862902) ChangeMetadataUri {
    queryId: Int as uint64;
    metadata: Slice as remaining;
}

message(0x45) StopEngageMint {
    sender: Address;
}

message(0x46) MintNotify {
    amount: Int as coins;
    sender: Address;
}

message(0x51) IdGenTrack {
    account: Address;
    invitor: Address;
    approver: Address;
    payload: Slice as remaining;
}

message(0x52) InternalDeActivate {
    amt: Int as coins;
    sender: Address;
    invitor: Address;
    invitor0: Address;
}

// 48 invite
// 49 idInfo
// 50 RemoveId
