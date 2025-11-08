//  SPDX-License-Identifier: MIT
//  Copyright © 2025 TON Studio

import "./messages"; // FIXME: separate definitions
import "./constants";
import "./shard-utils";
import "./send";
import "../utils";
import "../../../contracts/ids";

// TODO: make network state features(tax, insurance etc) optionally on by default
// more credit on acc close
// just use tax-brackets for credit limit
contract JettonWalletSharded {
    // TODO: nest related stores like insurance
    //STOP incoming tokens txn after transferredTo nominee
    //id token: signed payload by master
    // CONTRACT_PERSISTENT_STORE
    // Identity & access control
    owner: Address;
    initialOwner: Address; // for address calculation after recovery
    ownerAfterRecovery: Address; // for social recovery
    minter: Address; //map for multiple peer contracts, treat as treasury + sudo(unbacked minting & force transfer like in governance), use dao address
    treasuryAccount: Address;
    nominee: Address = newAddress(0, 0x0);
    invitor: Address = newAddress(0, 0x0); //guarantor/offchain-contact responsible for kyc + education + proposal propagator,TODO: nominee is appointed for all invited after it's demise; inactive account if null(no ops allowed perhaps)
    invitor0: Address?; // to complain about invitor etc and getting inActivated by it
    id: Slice;
    // id: IdInfo = IdInfo { username: "", lattitude: "", longitude: "", address: newAddress(0, 0x0) };

    // Financial state
    balance: Int as coins; // TODO: as uint20 - 1billion, rest is wealth taxed to treasury, coz every fortunate(birth, marriage) & unfortunate(accidents,health,death) are covered by treasury credits
    taxAsTxnFeePercent: Int as int6 = 1; // FIXME: cascade upgrade propagation how?, separate such store as consts and versionCheck then peer upgrade
    turnover: Int as coins = 0; // for txnFee/taxes, votes in public works
    debts: map<Address, Int as coins>; //uint20>; //1,048,576, mbrp*maxConnections(friends+follower+following)
    debt: Int as coins = 0; // from accClosures(can't be bounced back), burn from invitor, invitor0 or all connections
    insurance: Insurance = Insurance { emi: 0, startStop: 0 };

    // Connections & relationship maps
    invited: map<Address, Int as coins>; // kyc friends, TODO: need counter/check?or default exitCode5isEnough
    // approved: map<Address, Int as uint32>; // mapped to time TODO
    friends: map<Address, Int as coins>;
    closeFriendsAndVouched: map<Address, Bool>; // for social recovery TODO: don't go beyond 16
    closeFriendsCount: Int as uint4 = 0; // 16
    recoveryVouchersCount: Int as uint4 = 0;
    pendingRequests: map<Address, Int as coins>;
    followers: map<Address, Int as coins>;
    followings: map<Address, Int as coins>;

    // Reporting & disputes
    reportInfo: ReportInfo = ReportInfo {};
    // {
    //     reports: emptyMap(),
    //     // reports: map<Address, Bool>; //TODO: consider reporter side data store then support and dispute there for less txns,tradeoff -> only one report at aTime
    //     reason: false, // true for genuineClosingOnDeath, false for fraud/duplicateIdsAccounts
    //     reporterCount: 0, //TODO: delegate2dao/admin handles out of range complaints
    //     disputerCount: 0, //1024
    //     reportResolutionTime: 0, //4,294,967,296
    // };

    // Connection counters & flags
    connections: Int as uint8 = 0; //256 coz of msg sending constraints in accClose
    terminated: Bool = false; // TODO: to stop incoming txn maybe or use other approach
    //bloacklist: map<Address, Int as uint8>;//blocklist+blacklist
    //adminOps
    // Dynamically adjustable configuration parameters
    active: Bool = false;
    accountInitTime: Int as uint32; // accountAge for trustScore, max age suspicious etc
    lastTxnTime: Int as uint32 = 0; // outgoing, for activity, insurance emi calculate

    //stores coz of chain/design constraints
    lastMsgTo: Address = newAddress(0, 0x0); //U..JKZ,k..HTW,0..CkT, for reversing bounced msg// TODO: use stack or circular buffer for multiMsg useCase

    // profession: Int as uint10 = 0; // not applicable

    version: Int as uint10 = 0;
    mintable: Bool = true; // false after 1 billion ids/accounts, use case: marketing, engagement rewards
    lastRewardClaimTime: Int as uint32 = 0;
    lastMonthlyAllowanceClaimTime: Int as uint32 = 0;
    // FIXME: one time grants vars e.g. marriage, childBirth, birthday etc

    // Persist original wallet code so getWalletInit can produce stable peer addresses across upgrades
    baseWalletCode: Cell; // store the original wallet code cell at deployment

    //======================================================INIT
    init(owner: Address, minter: Address, balance: Int as coins, treasury: Address) { //TODO: take coordinates
        self.owner = owner;
        self.initialOwner = owner;
        self.ownerAfterRecovery = owner;
        self.minter = minter;
        self.id = emptySlice();
        self.treasuryAccount = treasury;
        self.accountInitTime = now(); // FIXME pass as params(use internal receiver on init)
        self.balance = ton("1"); // for symantic txns
        self.baseWalletCode = myCode(); // on deploy of root
        if (owner != treasury) {
            self.follow(treasury, "followedOwner".asComment().asSlice());
        } // minterDeployerAddress
    }

    //====================================================RECEIVERS
    receive(msg: JettonTransfer) {
        let sender = sender(); //TODO: Check whole callChain if var is used? thrice?

        throwUnless(INCORRECT_SENDER, sender == self.owner);
        // throwUnless(ACCOUNT_TERMINATED, !self.terminated); // TODO: use inactive, need for bounced from debts
        throwUnless(ACCOUNT_INACTIVE, self.active || msg.amount < ton("1")); // whatIf transact with old/buggy baseCode, ultimate aim is spend tokens
        // throwUnless(ACCOUNT_INACTIVE, self.active || msg.amount == ton("0.101")); // for social recovery by new/inactive/uninvited self account
        forceBasechain(msg.destination);
        throwUnless(INVALID_FWD_PAYLOAD, msg.forwardPayload.bits() >= 1);

        // TODO: proper fees check on mainnet
        let ctx = context();
        throwUnless(INSUFFICIENT_GAS_SENT, ctx.value > ton("0.5"));
        // let fwdCount = 1 + sign(msg.forwardTonAmount); // msg.forwardTonAmount is coins, so it's positive TODO: other more than one forwards fee?
        // throwUnless(
        //     INSUFFICIENT_GAS_SENT,
        //     ctx.value >
        //     msg.forwardTonAmount +
        //     fwdCount * ctx.readForwardFee() +
        //     getForwardFee(walletStateInitCells, walletStateInitBits, false) + // TODO:
        //     (2 * getComputeFee(gasForTransfer, false) + minTonsForStorage),
        // );

        if (msg.amount >= ton("1")) {
            self.lastTxnTime = now(); // need in all receivers, not fooled by insignificant txn to track suspicious activity blah blah, for emi calculation
            if (msg.destination != sender) { // normal txn
                self.burn(msg.amount);
            } else { // for getting funding for public works
                self.applyGrant(sender, msg.amount);
                return;
            }
        } else { // semantic txn
            if (msg.amount == ton("0.1")) { //invite
                self.invite(msg.destination, msg.forwardPayload);
                return;
            } else if (msg.amount == ton("0.2")) { //send friend request
                self.friendRequest(msg.destination, 2 * MBRP_AMOUNT, msg.forwardPayload);
                return;
            } else if (msg.amount == ton("0.3")) { // confirm friend request
                self.confirmFRequest(msg.destination, msg);
                return;
            } else if (msg.amount == ton("0.4")) { // set nominee
                self.changeNominee(msg.destination);
                return; //maybe notify msg.destination
            } else if (msg.amount == ton("0.5")) { // follow
                self.follow(msg.destination, msg.forwardPayload); //TODO: location params from custom payload forwardPayload
                return;
            } else if (msg.amount == ton("0.6")) { // report tosViolate
                self.report(msg.amount, true, sender, msg.destination, msg.forwardPayload);
                return;
            } else if (msg.amount == ton("0.7")) { // report onDeath
                self.report(msg.amount, false, sender, msg.destination, msg.forwardPayload);
                return;
            } else if (msg.amount == ton("0.8")) { // dispute report
                self.dispute(msg.amount, sender, msg.destination, msg.forwardPayload);
                return;
            } else if (msg.amount == ton("0.9")) { // process report TODO: use tick tock fun
                self.reportResolution(msg.amount, msg.destination, msg.forwardPayload);
                return;
            } else if (msg.amount == ton("0.11")) { // clean requests to free contract storage
                self.clearAllRequests();
                return;
            } else if (msg.amount == ton("0.12")) { // unfollow
                self.unfollow(msg.destination, msg.forwardPayload);
                return;
            } else if (msg.amount == ton("0.13")) { // unInvite ??? need
                self.unInvite(msg.destination, msg);
                return; // centralised approach, use report tosViolate instead that'll freeze account instantly
            } else if (msg.amount == ton("0.14")) { // unFriend
                self.unfriend(msg.destination, msg);
                return;
            } else if (msg.amount == ton("0.15")) { // change invitor ??? need
                self.changeInvitor(msg.destination);
                return;
            } else if (msg.amount == ton("0.16")) { // veto social account recovery
                self.vetoRecovery(); // FIXME: not here coz this acc isn't accessible
                return;
            } else if (msg.amount == ton("0.17")) {
                self.claimGrants();
                return;
            } else if (msg.amount == ton("0.02")) { // forbidden. burn from reported's invitor in both cases (tosViolate or dead)
                throwUnless(RESERVED_INTERNAL, false);
            } else if (msg.amount == ton("0.98") || msg.amount == ton("0.101")) { // kind of burn
                self.burn(ton("100")); // social recovery FIXME not here maybe refunded later if genuine recovery/noWorries going to your account
            } else if (msg.amount == ton("0.99")) {
                self.closeFriendsAndVouched.set(msg.destination, false);
                self.closeFriendsCount += 1; // noNeed to increase connections as that is for msg sending constrains rather than storage & we don't send msg to closeFriends
                return;
            } else if (msg.amount == ton("0.102")) {
                let _ = self.closeFriendsAndVouched.del(msg.destination);
                return;
            } else if (msg.amount == ton("0.999")) {
                self.requestUpgrade(self.minter); // redundant when p2p
                return;
            } else if (msg.amount == ton("0.501")) {
                self.voteProposal(msg.destination);
                return;
            } else if (msg.amount == ton("0.401") || msg.amount == ton("0.402") || msg.amount == ton("0.404")) {
                self.insurance(msg.amount);
                return;
            } else if (msg.amount == ton("0.444")) {
                self.claimTon(); // redundant TODO
                return;
            } else if (msg.amount == ton("0.111")) { // engagement reward like pi network (10 tokens for 1 year later 1 token for lifetime)
                self.engagementReward();
                return;
            } else if (msg.amount == ton("0.112")) { // monthly allowance (10_000) for 5 years
                self.claimAllowance();
                return;
            } else if (msg.amount == ton("0.23") || msg.amount == ton("0.24")) {
                self.deActivate(msg.amount, msg.destination);
                return;
            }
            // no catch-all else return so other unhandled semantic txns are forwarded
        }

        DeployParameters {
            value: 0,
            mode: SendRemainingValue | SendBounceIfActionFail, // ok?
            body: JettonTransferInternal {
                queryId: msg.queryId,
                walletVersion: self.version,
                amount: msg.amount,
                sender, // : self.initialOwner,
                responseDestination: null,
                forwardTonAmount: 0,
                forwardPayload: msg.forwardPayload,
            }.toCell(),
            init: self.getWalletInit(msg.destination),
        }.toShard(msg.destination.getShard()).send();
    }

    receive(msg: JettonTransferInternal) {
        self.correctInternalSender(msg.sender);
        self.syncVersion(msg.walletVersion); // add to all internal receivers, upgrades even if further msg fails
        if (msg.amount >= ton("1")) {
            self.mintInternal(msg.amount);
        } else {
            if (msg.amount == ton("0.02")) { // reportInternal burn, yours invited is reported
                self.burnForce(msg.sender, MBRP_AMOUNT);
            } else if (msg.amount == ton("0.98")) { // try not to get from invitors below
                self.balance += ton("100"); // recovery topUp
            } else if (msg.amount == ton("0.101")) { // startRecovery
                self.startRecovery(msg.sender); // FIXME: update in circles or store jettonAddress instead of walletAddress
                self.mintInternal(ton("100"));
            } else if (msg.amount == ton("0.103")) { // validateRecovery
                self.validateRecovery(msg.sender);
            } else {
                return;
            } // invalid symantic op
        }

        notifyWallet(msg.sender, self.owner, msg.amount, msg.forwardPayload);
    }

    // receive("invite") { // can't pass other data
    //     let ctx = context();
    //     self.invite()
    // }

    inline fun invite(receiver: Address, forwardPayload: Slice) {
        throwUnless(MAX_CONNECTIONS, self.connections < MAX_CONNECTIONS);
        throwUnless(CONNECTION_EXISTS, !self.connected(receiver));

        DeployParameters {
            value: 0,
            mode: SendRemainingValue | SendBounceIfActionFail,
            body: InviteInternal {
                version: self.version,
                sender: self.owner,
                invitor: self.invitor,
                currentWalletCode: myCode(),
                forwardPayload,
            }.toCell(),
            init: self.getWalletInit(receiver),
        }.toShard(receiver.getShard()).send(); // FIXME: canBe? removed by adjusting init calculation
    }

    // receive(msg: Invite) {
    //     throwUnless(INCORRECT_SENDER, sender() == self.owner);
    //     // throwUnless(ACCOUNT_TERMINATED, !self.terminated); // TODO: use inactive, need for bounced from debts
    //     throwUnless(ACCOUNT_INACTIVE, self.active); // whatIf transact with old/buggy baseCode, ultimate aim is spend tokens
    //     // throwUnless(ACCOUNT_INACTIVE, self.active || msg.amount == ton("0.101")); // for social recovery by new/inactive/uninvited self account
    //     forceBasechain(msg.target);
    //     self.invite(msg.target, msg.id, emptySlice());
    // }

    receive(msg: InviteInternal) {
        self.correctInternalSender(msg.sender);
        throwUnless(ALREADY_INVITED, !self.active);
        // throwUnless(PROVIDE_COORDINATES, msg.forwardPayload != emptySlice() || msg.id != null);

        self.invitor = msg.sender;
        self.nominee = msg.sender;
        self.invitor0 = msg.invitor;
        self.id = msg.forwardPayload;

        if (msg.version > self.version) { // fresh invite
            self.version = msg.version;
            setCode(msg.currentWalletCode);
        } else if (msg.version < self.version) { // reInvite
            self.sendUpgrade(sender());
        }

        // let username = "";
        // let lattitude = "";
        // let longitude = "";
        // if (msg.id != null) {
        //     self.id = msg.id!!;
        //     username = msg.id!!.username;
        //     lattitude = msg.id!!.lattitude;
        //     longitude = msg.id!!.longitude;
        // }

        // let payload = msg.forwardPayload;
        // let owner = self.owner;

        // if (payload != emptySlice()) {
        //     if (payload.bits() > 0) {
        //         let op: Int = payload.loadUint(32);

        //         if (op == 0) {
        //             let comment: String = payload.asString();

        //             // Parse comment format: "username@lat,long"
        //             let parsed: ParsedString = parseComment(comment);
        //             username = parsed.username;
        //             lattitude = parsed.lattitude;
        //             longitude = parsed.longitude;

        //             self.id = IdInfo { username, lattitude, longitude, address: owner };
        //         }
        //     }
        // }

        // // FIXME: validate coordinates, -ve values max size
        // DeployParameters {
        //     value: ton("0.2"),
        //     mode: SendPayFwdFeesSeparately | SendBounceIfActionFail,
        //     body: AddId {
        //         username,
        //         lattitude,
        //         longitude,
        //         address: owner,
        //     }.toCell(),
        //     init: initOf Ids(lattitude, longitude, self.minter, self.baseWalletCode), // FIXME
        // }.send();

        // notify invitor0
        // notifyWallet(msg.invitor, MBRP_AMOUNT, msg.forwardPayload);
        MessageParameters {
            to: msg.invitor,
            value: ton("0.005"),
            mode: SendPayFwdFeesSeparately | SendIgnoreErrors,
            bounce: false,
            body: JettonNotification { // 0x7362d09c
                queryId: 0,
                amount: 0,
                sender: msg.sender,
                forwardPayload: msg.forwardPayload,
            }.toCell(),
        }.send();

        MessageParameters {
            to: self.minter,
            value: ton("0.01"),
            mode: SendPayFwdFeesSeparately | SendIgnoreErrors,
            bounce: false,
            body: IdGenTrack { // 0x51
                account: self.owner,
                invitor: msg.sender,
                approver: msg.invitor,
                payload: msg.forwardPayload, // beginCell().storeUint(queryId, 64).asSlice(),
            }.toCell(),
        }.send();
    }

    inline fun deActivate(amt: Int, dest: Address) {
        throwUnless(ACCOUNT_INACTIVE, self.active);
        MessageParameters {
            value: 0,
            mode: SendRemainingValue | SendBounceIfActionFail,
            to: self.getJettonWalletByOwner(dest),
            body: InternalDeActivate {
                // approved: amt == ton("0.23") ? true : false,
                amt,
                sender: self.owner,
                invitor: self.invitor,
                invitor0: self.invitor0!!,
            }.toCell(),
        }.send();
    }

    receive(msg: InternalDeActivate) { // activates or deacactivates acc by invitor0
        self.correctInternalSender(msg.sender);
        throwUnless(INVITE_FIRST, self.invitor0 != null && msg.sender == self.invitor0!!); // de+/activate accounts// for conflict of interest free invites need approvals
        let approved: Bool = (msg.amt == ton("0.23")) ? true : false;

        self.active = approved;
        if (approved) {
            self.mintInternal(MBRP_AMOUNT);
            self.connections += 1;
        } else {
            self.burnForce(self.invitor, MBRP_AMOUNT);
            self.connections -= 1;
        }
        self.lastMsgTo = self.invitor;
        notifyWallet(msg.sender, msg.invitor, msg.amt, self.id);
        notifyWallet(msg.sender, msg.invitor0, msg.amt, self.id);

        MessageParameters {
            value: ton("0.05"),
            mode: SendPayFwdFeesSeparately | SendBounceIfActionFail,
            to: self.getJettonWalletByOwner(self.invitor),
            body: InviteApproval {
                approved,
                invitor: self.invitor,
                invitee: self.owner,
                approver: msg.sender, // self.invitor0, need?
            }.toCell(),
        }.send();
    }

    bounced(msg: bounced<InviteApproval>) {
        self.active = !msg.approved;
        if (!msg.approved) {
            self.mintInternal(MBRP_AMOUNT);
            self.connections += 1;
        } else {
            self.burnForce(self.lastMsgTo, MBRP_AMOUNT);
            self.connections -= 1;
        }
    }

    receive(msg: InviteApproval) {
        self.correctInternalSender(msg.invitee); // msg.approver == self.invitor
        let amount = 2 * MBRP_AMOUNT;
        if (msg.approved) {
            self.invited.set(msg.invitee, amount);
            self.mintInternal(amount); // 2x
            self.connections += 1;
        } else { // FIXME: get amount from store when reversing connection
            let _ = self.invited.del(msg.invitee);
            self.burnForce(msg.invitee, amount);
            self.connections -= 1;
        }
        notifyWallet(msg.invitee, self.owner, amount, "invite success".asComment().asSlice()); // FIXME: onUnInvite
        self.notifyRoot(msg.approver, msg.approved, 3 * MBRP_AMOUNT);
        MessageParameters { // FIXME maybe notifs need to come from owners only
            to: msg.invitee,
            value: ton("0.01"),
            mode: SendPayFwdFeesSeparately | SendIgnoreErrors,
            bounce: false,
            body: JettonNotification { // 0x7362d09c -- Remind the invitee
                queryId: 0,
                amount: MBRP_AMOUNT, // msg.approved ? MBRP_AMOUNT : - MBRP_AMOUNT,
                sender: self.owner,
                forwardPayload: "invited approved".asComment().asSlice(),
            }.toCell(),
        }.send();
        MessageParameters {
            to: self.minter,
            value: ton("0.01"),
            mode: SendPayFwdFeesSeparately | SendIgnoreErrors,
            bounce: false,
            body: InviteApproval { // increase totalAccounts FIXME use InviteApproval
                approved: msg.approved,
                invitor: self.owner, // invitor
                invitee: msg.invitee, // invitee
                approver: msg.approver,
            }.toCell(),
        }.send();
    }

    inline fun unInvite(receiver: Address, msg: JettonTransfer) { // TODO: just use reports for control n inviter for whereabouts
        throwUnless(NOT_INVITOR, self.invited.del(receiver));
        let amount = self.invited.get(receiver)!!; // TODO: move line up?
        //self.burnForce(receiver, amount);
        self.burn(amount);

        MessageParameters {
            to: self.getJettonWalletByOwner(receiver),
            value: 0,
            mode: SendRemainingValue | SendBounceIfActionFail,
            body: UnInviteInternal {
                amount: amount / 2,
                sender: self.owner,
                forwardPayload: msg.forwardPayload,
            }.toCell(),

        }.send();

        self.lastMsgTo = receiver;
        self.connections -= 1;
    }

    bounced(msg: bounced<UnInviteInternal>) {
        let amount = 2 * msg.amount;
        self.invited.set(self.lastMsgTo, amount);
        //self.mintInternal(amount);
        self.balance += amount;
        self.connections += 1;
    }

    receive(msg: UnInviteInternal) {
        let forwardPayload = msg.forwardPayload;
        self.correctInternalSender(msg.sender);
        throwUnless(NOT_INVITOR, self.invitor == msg.sender); //redundant bothSide check for unBounced s

        notifyWallet(msg.sender, self.owner, msg.amount, forwardPayload);

        self.active = false;
        //maybe no burns if coz someone will reinvite eventually, don't mint THEN
        self.burnForce(msg.sender, msg.amount);
    }

    inline fun friendRequest(receiver: Address, amount: Int, payload: Slice) {
        throwUnless(MAX_CONNECTIONS, self.connections < MAX_CONNECTIONS);
        throwUnless(CONNECTION_EXISTS, !self.connected(receiver));

        //throwUnless(AMOUNT_EXCEEDS_MBRP, msg.amount <= MBRP_AMOUNT);//TODO:
        MessageParameters {
            to: self.getJettonWalletByOwner(receiver),
            value: 0,
            mode: SendRemainingValue | SendBounceIfActionFail,
            body: FriendRequestInternal {
                amount,
                sender: self.owner,
                forwardPayload: payload,
            }.toCell(),

        }.send();
    }

    receive(msg: FriendRequestInternal) {
        throwUnless(MAX_CONNECTIONS, self.connections < MAX_CONNECTIONS); // MAX_CONNECTIONS

        let forwardPayload = msg.forwardPayload;
        self.correctInternalSender(msg.sender);

        notifyWallet(msg.sender, self.owner, msg.amount, forwardPayload);

        self.pendingRequests.set(msg.sender, msg.amount);
    }

    inline fun confirmFRequest(receiver: Address, msg: JettonTransfer) {
        throwUnless(NO_PENDING_REQUEST, self.pendingRequests.exists(receiver));

        let amount = self.pendingRequests.get(receiver)!!;
        self.mintInternal(amount);

        self.friends.set(receiver, amount);

        MessageParameters {
            to: self.getJettonWalletByOwner(receiver),
            value: 0,
            mode: SendRemainingValue | SendBounceIfActionFail,
            body: ConfirmRequestInternal {
                amount,
                sender: self.owner,
                forwardPayload: msg.forwardPayload,
            }.toCell(),

        }.send();

        self.lastMsgTo = receiver;
        let _ = self.pendingRequests.del(receiver);
        self.connections += 1;
    }

    bounced(msg: bounced<ConfirmRequestInternal>) {
        let last = self.lastMsgTo;
        let _ = self.friends.del(last);
        //self.balance -= msg.amount;
        self.burnForce(last, msg.amount); //FIXME: whatIf was in followers?update otherSide following

        self.pendingRequests.set(last, msg.amount);
        self.connections -= 1;
    }

    receive(msg: ConfirmRequestInternal) {
        let forwardPayload = msg.forwardPayload;
        self.correctInternalSender(msg.sender);

        notifyWallet(msg.sender, self.owner, msg.amount, forwardPayload);
        // FIXME notify minter

        self.mintInternal(msg.amount);
        self.friends.set(msg.sender, msg.amount);
        self.connections += 1;
    }

    inline fun unfriend(receiver: Address, msg: JettonTransfer) {
        throwUnless(NOT_FRIEND, self.friends.exists(receiver));
        let amount = self.friends.get(receiver)!!;
        let _ = self.friends.del(receiver);
        self.burnForce(receiver, amount);

        MessageParameters {
            to: self.getJettonWalletByOwner(receiver),
            value: 0,
            mode: SendRemainingValue | SendBounceIfActionFail,
            body: UnfriendInternal {
                amount,
                sender: self.owner,
                forwardPayload: msg.forwardPayload,
            }.toCell(),

        }.send();

        self.lastMsgTo = receiver;
        self.connections -= 1;
    }

    bounced(msg: bounced<UnfriendInternal>) {
        let last = self.lastMsgTo;
        self.friends.set(last, msg.amount);
        //self.mintInternal(msg.amount);
        self.balance += msg.amount;
        self.connections += 1;
    }

    receive(msg: UnfriendInternal) {
        let forwardPayload = msg.forwardPayload;
        self.correctInternalSender(msg.sender);

        notifyWallet(msg.sender, self.owner, msg.amount, forwardPayload);

        let _ = self.friends.del(msg.sender);
        self.burnForce(msg.sender, msg.amount);
    }

    inline fun clearAllRequests() {
        if (!self.pendingRequests.isEmpty()) {
            self.pendingRequests = null; //emptyMap();
        }
        emit("clearedPendingRequests".asComment()); //TODO: handle events
    }

    inline fun follow(receiver: Address, forwardPayload: Slice) {
        throwUnless(MAX_CONNECTIONS, self.connections < MAX_CONNECTIONS);
        throwUnless(CONNECTION_EXISTS, !self.connected(receiver));

        // FIXME: follow self
        let amount = MBRP_AMOUNT;
        self.followings.set(receiver, amount);

        MessageParameters {
            to: self.getJettonWalletByOwner(receiver),
            value: 0,
            mode: SendRemainingValue | SendBounceIfActionFail,
            body: FollowInternal {
                amount,
                sender: self.owner,
                forwardPayload,
            }.toCell(),

        }.send();

        self.lastMsgTo = receiver;
        self.connections += 1;
    }

    bounced(msg: bounced<FollowInternal>) {
        let _ = self.followings.del(self.lastMsgTo);
        self.connections -= 1;
    }

    receive(msg: FollowInternal) {
        throwUnless(MAX_CONNECTIONS, self.connections < MAX_CONNECTIONS);
        let forwardPayload = msg.forwardPayload;
        self.correctInternalSender(msg.sender);

        notifyWallet(msg.sender, self.owner, msg.amount, forwardPayload);

        self.balance += MBRP_AMOUNT;

        self.followers.set(msg.sender, MBRP_AMOUNT);
        self.connections += 1;

        //TODO: tells follower's followers about this follow or invite and add to network
        //emitEvent(1, msg.sender, self.owner, msg.amount);
    }

    inline fun unfollow(receiver: Address, forwardPayload: Slice) {
        //throwUnless(NOT_FOLLOWING, self.followings.exists(receiver));
        throwUnless(NOT_FOLLOWING, self.followings.del(receiver)); //OPTIMISTIC

        let amount = MBRP_AMOUNT;
        MessageParameters {
            to: self.getJettonWalletByOwner(receiver),
            value: 0,
            mode: SendRemainingValue | SendBounceIfActionFail,
            body: UnfollowInternal {
                amount,
                sender: self.owner,
                forwardPayload,
            }.toCell(),

        }.send();

        self.lastMsgTo = receiver;
        self.connections -= 1;
    }

    bounced(msg: bounced<UnfollowInternal>) {
        self.followings.set(self.lastMsgTo, msg.amount);
        self.connections += 1;
    }

    receive(msg: UnfollowInternal) {
        let forwardPayload = msg.forwardPayload;
        self.correctInternalSender(msg.sender);

        notifyWallet(msg.sender, self.owner, msg.amount, forwardPayload);

        self.unfollowInternal(msg.sender, msg.amount);
    }

    inline fun unfollowInternal(sender: Address, amount: Int) {
        throwUnless(CANT_UNFOLLOW_REPORTED, self.reportInfo.reporterCount == 0); // can't unfollow reported

        let _ = self.followers.del(sender);

        if (self.connections > 0) {
            self.connections -= 1;
        }

        self.burnForce(sender, amount);
    }

    inline fun report(amount: Int, reason: Bool, sender: Address, receiver: Address, forwardPayload: Slice) {
        //require genuine reports (receiver exists, not self, someone who cares)
        self.burn(MBRP_AMOUNT);
        MessageParameters {
            to: self.getJettonWalletByOwner(receiver),
            value: 0,
            mode: SendRemainingValue | SendBounceIfActionFail,
            body: ReportInternal {
                amount,
                reason,
                sender,
                forwardPayload,
            }.toCell(),

        }.send();
        // inform peers TODO:
    }

    bounced(msg: bounced<ReportInternal>) { self.balance += MBRP_AMOUNT }

    receive(msg: ReportInternal) {
        self.correctInternalSender(msg.sender);
        //TODO: invitor auto disputes or noNeed (consider disputed implicitly)
        throwUnless(ACCOUNT_INACTIVE, self.active);
        throwUnless(ALREADY_REPORTED, !self.reportInfo.reports.exists(msg.sender)); // alreadyReported & democracy
        // one type report at a time only
        if (self.reportInfo.reporterCount > 0) { throwUnless(ALREADY_REPORTED_FOR_OTHER_REASON, self.reportInfo.reason == self.reportInfo.reason) }
        else {
            if (self.reportInfo.reason) { // default false
                self.reportInfo.reason = self.reportInfo.reason;
            }
        }
        self.reportInfo.reports.set(msg.sender, true); // true for reports, false for disputes
        self.reportInfo.reporterCount += 1;
        self.reportInfo.reportResolutionTime = now() + CLOSURE_WAIT; //TODO: INC time onlyIf this overtakes others(disputers)

        //if (reason && self.reportInfo.reports == null) {// burn from invitor once in case of tosViolate only?4Punish
        // if (self.reportInfo.reporterCount == 0) { // TODO burn/stake from invitor always?
        //     // confiscate on tosViolate
        //     // self.terminated = true;
        //     MessageParameters {
        //         to: self.getJettonWalletByOwner(self.invitor),
        //         value: ton("0.004"),
        //         // mode: SendBounceIfActionFails, // FIXME NEED SEParate msg
        //         body: JettonTransferInternal { //TODO if s=r then burn maybe, bounce? inThisApproach?/reuse
        //             queryId: 0,
        //             amount: ton("0.02"),
        //             walletVersion: self.version,
        //             sender: self.owner,
        //             responseDestination: msg.sender,
        //             forwardTonAmount: 0,
        //             forwardPayload: msg.forwardPayload,
        //         }.toCell(),
        //     }.send();
        // }

        notifyWallet(msg.sender, self.owner, msg.amount, msg.forwardPayload);
    }

    inline fun dispute(amount: Int, sender: Address, receiver: Address, forwardPayload: Slice) {
        //stake
        self.burn(MBRP_AMOUNT);

        MessageParameters {
            to: self.getJettonWalletByOwner(receiver),
            value: 0,
            mode: SendRemainingValue | SendBounceIfActionFail,
            body: DisputeInternal {
                amount,
                sender,
                forwardPayload,
            }.toCell(),

        }.send();
    }

    bounced(msg: bounced<DisputeInternal>) { self.balance += MBRP_AMOUNT }

    receive(msg: DisputeInternal) {
        self.correctInternalSender(msg.sender);
        throwUnless(ACCOUNT_NOT_REPORTED, self.reportInfo.reporterCount > 0);
        self.reportInfo.reports.set(msg.sender, false);
        self.reportInfo.disputerCount += 1;
        self.reportInfo.reportResolutionTime = now() + CLOSURE_WAIT;
        notifyWallet(msg.sender, self.owner, msg.amount, msg.forwardPayload);
    }

    inline fun reportResolution(amount: Int, receiver: Address, forwardPayload: Slice) {
        MessageParameters {
            to: self.getJettonWalletByOwner(receiver),
            value: 0,
            mode: SendRemainingValue | SendBounceIfActionFail,
            body: ResolutionInternal {
                amount,
                sender: self.owner,
                forwardPayload,
            }.toCell(),

        }.send();
    }

    receive(msg: ResolutionInternal) { // FIXME: 1.5x as insurance claim on genuine acc close
        self.correctInternalSender(msg.sender);
        // notifyWallet(msg.sender, self.owner, msg.amount, msg.forwardPayload);
        throwUnless(NO_PENDING_REQUEST, self.reportInfo.reportResolutionTime > 0); // TODO: need some binary (&) compare magic
        throwUnless(WAIT_MORE, now() >= self.reportInfo.reportResolutionTime);

        let reporters = self.reportInfo.reporterCount;
        let disputers = self.reportInfo.disputerCount;
        let reportWinCloseAcc = reporters > disputers; // invitor is considered as disputer byDefault

        // reward winners 2x mbrp(stake+reward), losers lose stake
        let losersCount: Int = 0;
        if (reportWinCloseAcc) {
            losersCount = disputers;
        } else {
            losersCount = reporters - 1;
        }
        let rewarded: Int = 0;

        // Distribute rewards: first `losersCount` winners get 2x, remaining winners get 1x.
        foreach (addr, reporter in self.reportInfo.reports) { //TODO: can send only around 250 msg(maybe keep count & send last msg to self to process remaining txns.)
            // determine if this entry is a winner
            if ((reporter && reportWinCloseAcc) || (!reporter && !reportWinCloseAcc)) {
                let reward: Int = 0;
                if (rewarded <= losersCount) { // FIXME
                    reward = 2 * MBRP_AMOUNT; // 2x mbrp
                    rewarded += 1;
                } else {
                    reward = MBRP_AMOUNT; // release stake (1x mbrp)
                }

                MessageParameters {
                    to: self.getJettonWalletByOwner(addr),
                    value: ton("0.001"),
                    mode: SendPayFwdFeesSeparately,
                    body: JettonTransferInternal {
                        queryId: 0,
                        amount: reward,
                        walletVersion: self.version,
                        sender: self.owner,
                        responseDestination: self.owner,
                        forwardTonAmount: 0,
                        forwardPayload: msg.forwardPayload,
                    }.toCell(),
                }.send();
            }
        }

        if (reportWinCloseAcc) {
            // burn minted mbrp from followers/followings/invited, 2x friends, 3x invitor

            foreach (addr, amount in self.followings) {
                MessageParameters {
                    to: self.getJettonWalletByOwner(addr),
                    value: ton("0.001"),
                    mode: SendPayFwdFeesSeparately,
                    body: AccCloseBurnInternal {
                        reason: self.reportInfo.reason,
                        amount,
                        sender: self.owner,
                        forwardPayload: msg.forwardPayload,
                    }.toCell(),
                }.send();
            }

            foreach (addr, amount in self.followers) {
                MessageParameters {
                    to: self.getJettonWalletByOwner(addr),
                    value: ton("0.001"),
                    mode: SendPayFwdFeesSeparately,
                    body: AccCloseBurnInternal {
                        reason: self.reportInfo.reason,
                        amount,
                        sender: self.owner,
                        forwardPayload: msg.forwardPayload,
                    }.toCell(),
                }.send();
            }

            foreach (addr, amount in self.friends) {
                MessageParameters {
                    to: self.getJettonWalletByOwner(addr),
                    value: ton("0.001"),
                    mode: SendPayFwdFeesSeparately,
                    body: AccCloseBurnInternal {
                        reason: self.reportInfo.reason,
                        amount: amount * 2, //2x mbrp
                        sender: self.owner,
                        forwardPayload: msg.forwardPayload,

                    }.toCell(),
                }.send();
            }

            foreach (addr, amount in self.invited) {
                MessageParameters {
                    to: self.getJettonWalletByOwner(addr),
                    value: ton("0.001"),
                    mode: SendPayFwdFeesSeparately,
                    body: AccCloseBurnInternal { //TODO: mark inactive
                        reason: self.reportInfo.reason,
                        amount: 3 * amount, //3x mbrp
                        sender: self.owner,
                        forwardPayload: msg.forwardPayload,

                    }.toCell(),
                }.send();
                // set their invitor null
            }
            // burn 3x from invitor
            MessageParameters {
                to: self.getJettonWalletByOwner(self.invitor),
                value: ton("0.001"),
                mode: SendPayFwdFeesSeparately,
                body: AccCloseBurnInternal { //TODO: mark inactive
                    reason: self.reportInfo.reason,
                    amount: 3 * MBRP_AMOUNT, //3x mbrp
                    sender: self.owner,
                    forwardPayload: msg.forwardPayload,

                }.toCell(),
            }.send();

            if (!self.reportInfo.reason) { // or release funds in any case
                // INSURANCE PAY
                let payback: Int = 0;
                if (self.insurance.emi > 0 && now() - self.accountInitTime < ton("1261.440")) { // only < 40years old are paid
                    let emi = self.insurance.emi;
                    payback = muldivc(8, (self.accountInitTime + self.insurance.startStop), 10) * emi;
                }

                // pay 2x as insurance backed by taxes
                payback += self.connections * MBRP_AMOUNT;
                MessageParameters {
                    to: self.getJettonWalletByOwner(self.nominee),
                    value: 0,
                    mode: SendPayFwdFeesSeparately,
                    body: JettonTransferInternal {
                        queryId: 0, //FIXME:
                        amount: self.balance + payback,
                        walletVersion: self.version,
                        sender: self.owner,
                        responseDestination: msg.sender,
                        forwardTonAmount: 0,
                        forwardPayload: msg.forwardPayload,
                    }.toCell(),
                }.send();

                // notify minter to update deficits
                self.notifyRoot(self.owner, false, payback);
            }
            // settle debts
            // inform minter about unaccouted debt

            foreach (addr, amount in self.debts) { // TODO only this may bounce
                MessageParameters {
                    to: self.getJettonWalletByOwner(addr),
                    value: ton("0.001"),
                    mode: SendPayFwdFeesSeparately,
                    body: AccCloseBurnInternal { //TODO: mark inactive
                        reason: self.reportInfo.reason,
                        amount,
                        sender: self.owner,
                        forwardPayload: msg.forwardPayload,

                    }.toCell(),
                }.send();
            }
            // OR set nominee as owner + new connectStakes/credits , stop incoming
            self.terminated = true;
        } else {
            // reset report-related state
            self.reportInfo = ReportInfo {};
        }
    }

    receive(msg: AccCloseBurnInternal) {
        try {
            self.burn(msg.amount);
        } catch (e) {
            self.debt += msg.amount;
        }
        let _ = self.followers.del(msg.sender);
        let _ = self.followings.del(msg.sender);
        let _ = self.invited.del(msg.sender);
        let _ = self.friends.del(msg.sender);

        if (msg.sender == self.invitor) {
            if (msg.reason) {
                // self.invitor = emptyAddress();
                self.active = false;
            }
        }
    }

    bounced(msg: bounced<AccCloseBurnInternal>) {
        //notify treasury or external if p2p wallet
    }

    receive(msg: ProvideWalletBalance) {
        throwUnless(ACCOUNT_TERMINATED, !self.terminated);
        let info: VerifyInfo? = null;
        if (msg.includeVerifyInfo) {
            info = VerifyInfo {
                minter: self.minter,
                owner: self.owner,
                code: myCode(),
            };
        }

        MessageParameters {
            body: TakeWalletBalance {
                balance: self.balance,
                verifyInfo: info,
            }.toCell(),
            to: msg.receiver,
            value: 0,
            mode: SendRemainingValue,
        }.send();
    }

    receive(msg: JettonBurn) {
        throwUnless(ACCOUNT_TERMINATED, !self.terminated);
        // we can skip forceBasechain here because with other checks in place it's not possible
        // to acquire jettons outside of basechain, so amount check is enough
        throwUnless(INCORRECT_SENDER, sender() == self.owner);

        self.balance -= msg.amount;
        throwUnless(INSUFFICIENT_BALANCE, self.balance >= 0);

        let ctx = context();
        let fwdFee: Int = ctx.readForwardFee();
        throwUnless(INSUFFICIENT_GAS_SENT, ctx.value > (fwdFee + 2 * getComputeFee(gasForBurn, false)));

        MessageParameters {
            to: self.minter,
            value: 0,
            mode: SendRemainingValue,
            bounce: true,
            body: JettonBurnNotification {
                queryId: msg.queryId,
                amount: msg.amount,
                sender: self.owner,
                responseDestination: msg.responseDestination,
            }.toCell(),
        }.send();
    }

    receive(msg: ClaimTON) {
        self.claimTon();
    }

    receive("claim") {
        self.claimTon();
    }

    inline fun claimTon() { // TODO use auto transfer instead
        throwUnless(INCORRECT_SENDER, sender() == self.owner);
        MessageParameters {
            to: self.owner,
            value: 0,
            // value: myBalance() - ton("1"), // TODO check if bal is lower than 1 ton
            mode: SendRemainingBalance | SendBounceIfActionFail,
        }.send();
    }

    bounced(msg: bounced<JettonTransferInternal>) {
        if (msg.amount >= ton("1")) { // avoid symantic bounces
            self.balance += msg.amount;
        }
        // cashback(self.owner); // need ?
    }

    bounced(msg: bounced<JettonBurnNotification>) {
        //TODO: send again?
        self.balance += msg.amount;
    }

    // bounced(rawMsg: Slice) {// fallback bounce handler
    //     let opcode = rawMsg.loadUint(32);
    //     if (opcode == TooBigToFit.opcode()) {
    //       // Now, you can obtain the truncated bits that did fit in the remaining
    //       // 224 bits of the bounced message.
    //       // Proceed with caution!
    //       let truncatedData = rawMsg.preloadUint(224);
    //     }
    // }
    //     message TooBigToFit {
    //     data: Int as uint225; // 1 bit is truncated, so the field could not be accessed directly
    // }

    // helpers
    // fun checks(sender: Address, receiver: Address) {
    //     throwUnless(INCORRECT_SENDER, sender == self.owner);// incorrect sender
    //     throwUnless(ACCOUNT_TERMINATED, !self.terminated);//rootCanRestoreJustInCase
    //     throwUnless(ACCOUNT_INACTIVE, self.invitor != null || self.owner == self.minterOwner);//TODO:
    //     forceBasechain(receiver);

    //     checkEitherForwardPayload(msg.forwardPayload);

    //     let ctx = context();
    //     let fwdCount = 1 + sign(msg.forwardTonAmount); // msg.forwardTonAmount is coins, so it's positive
    //     throwUnless(
    //         INSUFFICIENT_GAS_SENT,
    //         ctx.value >
    //         msg.forwardTonAmount +
    //         fwdCount * ctx.readForwardFee() +
    //         getForwardFee(walletStateInitCells, walletStateInitBits, false) +
    //         (2 * getComputeFee(gasForTransfer, false) + minTonsForStorage)
    //     );
    // }

    inline fun startRecovery(sender: Address) {
        self.ownerAfterRecovery = sender;
        // notify owner TODO
    }

    inline fun vetoRecovery() {
        self.ownerAfterRecovery = self.owner;
        // closeFriendsAndVouched state resets after recovery
    }

    inline fun validateRecovery(sender: Address) {
        throwUnless(NOT_CLOSE_FRIEND, self.closeFriendsAndVouched.exists(sender));
        throwUnless(ALREADY_VOUCHED, !self.closeFriendsAndVouched.get(sender)!!); // FIXME: misti error redundant compare with bool literal
        if (self.recoveryVouchersCount >= divc(self.closeFriendsCount, 2) && (now() - self.lastTxnTime) > CLOSURE_WAIT) { // FIXME: state may stuck
            self.owner = self.ownerAfterRecovery;
            self.recoveryVouchersCount = 0;
            // reimburse vouchers and reset vouch state
            foreach (friend, vouched in self.closeFriendsAndVouched) {
                if (vouched) {
                    self.closeFriendsAndVouched.set(friend, false);
                }
            }
        } else {
            self.closeFriendsAndVouched.set(sender, true);
            self.recoveryVouchersCount += 1;
        }
    }

    inline fun requestUpgrade(from: Address) {
        MessageParameters {
            to: from,
            value: ton("0.2"),
            bounce: false,
            mode: SendPayFwdFeesSeparately | SendBounceIfActionFail,
            body: RequestUpgradeCode {
                version: self.version, // noNeed 4 upgrade from peer
            }.toCell(),
        }.send();
    }

    receive(msg: RequestUpgradeCode) {
        self.sendUpgrade(sender());
    }

    inline fun sendUpgrade(to: Address) { // FIXME use BasechainAddress
        // noNeed to check version
        MessageParameters {
            to,
            mode: SendPayFwdFeesSeparately | SendIgnoreErrors,
            value: ton("0.2"),
            bounce: false,
            body: Upgrade {
                sender: self.owner,
                walletVersion: self.version,
                newWalletCode: myCode(),
            }.toCell(),
        }.send();
    }

    receive(msg: Upgrade) {
        self.correctInternalSender(msg.sender!!);

        if (self.version < msg.walletVersion!!) { // ignore if manually upgraded
            self.version = msg.walletVersion!!;
            setCode(msg.newWalletCode!!);

            foreach (invited, _ in self.invited) {
                self.sendUpgrade(self.getJettonWalletByOwner(invited));
            }
        }
    }

    receive(msg: UpgradeReqFromMainnet) { // or use getter at init of mainnet wallet
        // CI/CD/MIGRATION to mainnet TODO: call from new contract, use for partial state upgrades at init too, can be used only by frontends as deployers as chains are separate
        // self.sendUpgrade(sender());
        MessageParameters {
            to: msg.sender,
            mode: SendPayFwdFeesSeparately | SendIgnoreErrors,
            value: ton("0.2"),
            bounce: false,
            body: Upgrade { // TODO: need to send minter?
                sender: self.owner,
                walletVersion: self.version,
                newWalletData: self.toCell(),
                newWalletCode: myCode(),
            }.toCell(),
        }.send();
    }

    receive(msg: Slice) {}

    receive() {}

    inline fun voteProposal(proposer: Address) {
        MessageParameters {
            to: self.minter,
            mode: SendRemainingValue,
            value: 0,
            body: VoteProposal {
                sender: self.owner,
                proposer,
                turnover: self.turnover,
            }.toCell(),
        }.send();
        // reset turnover maybe TODO:
    }

    inline fun changeNominee(nominee: Address) {
        self.nominee = nominee;
    }

    inline fun insurance(amount: Int) {
        let existingEmi = self.insurance.emi;
        let newEmi = 0;
        if (amount == ton("0.401")) {
            self.insurance.emi = ton("100");
            newEmi = ton("100");
        } else if (amount == ton("0.402")) {
            self.insurance.emi = ton("500");
            newEmi = ton("500");
        } else if (amount == ton("0.404")) { // stop insurance
            self.insurance.emi = 0;
            return;
        }

        if (existingEmi > newEmi) { // decreasing amount resets time
            self.insurance.startStop = now();
        }
    }
    // inline fun adminAction(msg: JettonTransfer) {}

    // inline fun adminActionInternal(msg: JettonTransferInternal) {}

    // inline fun getterCall(body: AnyMessage) {
    //     MessageParameters {
    //         value: 0,
    //         to: sender(),
    //         bounce: false,
    //         body: body.toCell()
    //     }.send();
    // }

    inline fun _active(amount: Int) {
        // need active account or invite or activating/unfreezing or recovery topup action,
        throwUnless(ACCOUNT_INACTIVE, self.active || amount == ton("0.1") || amount == ton("0.23") || amount == ton("0.98"));
    }

    inline fun correctSender(sender: Address) {}

    inline fun correctInternalSender(sender: Address) {
        let wallet: StateInit = self.getWalletInit(sender);
        if (!(wallet.hasSameBasechainAddressWithoutShard(sender()))) {
            throwUnless(INCORRECT_SENDER, self.minter == sender());
            if (!self.active) {
                self.active = true;
                self.invitor = sender;
                self.invitor0 = sender;
                // self.balance += ton("3000");
                self.connections += 1; // for consistency otherwise noNeed
            }
        }
    }

    inline fun syncVersion(senderVersion: Int) {
        if (senderVersion == self.version) { // optimistic
            //continue;
        } else if (senderVersion > self.version) {
            self.requestUpgrade(sender());
        } else {
            self.sendUpgrade(sender());
        }
    }

    fun connected(receiver: Address): Bool {
        return (receiver == self.owner || self.invitor == receiver || self.friends.exists(receiver) || self.followings.exists(receiver) || self.invited.exists(receiver) || self.followers.exists(receiver)) ? true : false;
        //ACCOUNT EXISTS
    }

    inline fun notifyRoot(approver: Address, mint: Bool, amount: Int) {
        // reusing burnNotify for minting
        // || sender == self.minter in case minter mints > 0
        MessageParameters {
            to: self.minter,
            value: ton("0.1"),
            mode: SendPayFwdFeesSeparately | SendIgnoreErrors,
            bounce: false,
            body: JettonBurnNotification { //JettonMintBurnNotify maybe traitViolationOccursThen
                queryId: 0, // FIXME used to notify users & show correctly in explorers
                amount,
                sender: self.owner, // mint to or burn from FIXME: 724 , 9
                responseDestination: mint ? approver : null,
            }.toCell(),
        }.send();
    }

    fun _deductDebt(amount: Int): Int {
        let remaining: Int = amount;
        let unAccountedDebt = self.debt;
        let noDebts = self.debts.isEmpty();
        // nothing to do
        if (remaining <= 0 || (unAccountedDebt == 0 && noDebts)) {
            return remaining;
        }
        if (unAccountedDebt > 0) { // TODO: pay a portion and shift to transfer side also
            if (remaining >= unAccountedDebt) {
                remaining -= unAccountedDebt;
                self.debt = 0;
            } else {
                self.debt = unAccountedDebt - remaining;
                remaining = 0;
                return remaining;
            }
        }

        if (!noDebts) {
            // Pay debts in map order until remaining is exhausted
            foreach (from, debtVal in self.debts) {
                if (remaining <= 0) { // ==0
                    return remaining; // 0
                }

                let debt: Int = debtVal;
                let pay = 0;
                if (remaining >= debt) {
                    pay = debt;
                } else {
                    pay = remaining;
                }
                debt -= pay;
                remaining -= pay;

                if (debt == 0) {
                    let _ = self.debts.del(from);
                } else {
                    self.debts.set(from, debt);
                }

                // optional: emit an event for debt payment
                // emitEvent(2, self.owner, from, pay);
            }
        }

        return remaining;
    }

    fun mintInternal(amount: Int) {
        amount = self._deductDebt(amount);
        self.balance += amount;
    }

    fun burnForce(sender: Address, amount: Int) {
        if (amount <= 0) {
            return;
        }

        if (self.balance >= amount) {
            self.balance -= amount;
            return;
        }

        // Not enough balance — consume what is left and record remaining as debt to sender
        let shortfall: Int = amount - self.balance;
        self.balance = 0;

        let prevDebt: Int = 0; // TODO: need this? 
        if (self.debts.exists(sender)) {
            prevDebt = self.debts.get(sender)!!;
        }
        // TODO FEES?
        self.debts.set(sender, prevDebt + shortfall);
        self.turnover += amount; // eventually debt gets paid
    }

    inline fun burn(amount: Int) {
        let timeSinceLastTxn = now() - self.lastTxnTime;

        // if ((timeSinceLastTxn < 86400 || amount > ton("100")) ||&& !self.connected()) { // .1% fees levied on frequent and significant txns to balance bounced burns, insurance etc
        // let fee = amount / ton("1000"); // 0.1%
        let fee = divc(amount, ton("100")); // TODO: 1% payed by receiver
        amount += fee;
        // } // extra fixed fees for payment channels/contracts?
        if (self.insurance.emi > 0) {
            let emi = self.insurance.emi;
            let pay = muldivc(emi, timeSinceLastTxn, ton("2.628")); // time as ton
            amount += pay;
        }

        self.balance -= amount;
        throwUnless(INSUFFICIENT_BALANCE, self.balance >= 0);
        self.turnover += amount;
    }

    inline fun changeInvitor(new: Address) {
        // FIXME
        throwUnless(INCORRECT_SENDER, new != newAddress(0, 0x0)); // used zeroA just for misti
        throwUnless(ACCOUNT_INACTIVE, self.active);
    }

    inline fun applyGrant(sender: Address, amount: Int) {
        self.burn(muldivc(amount, 1, 100)); // stake 1% of demanded amount
        MessageParameters {
            value: 0,
            mode: SendRemainingValue,
            to: self.minter,
            body: ApplyGrant {
                sender,
                amount,
            }.toCell(),
        }.send();
    }

    inline fun engagementReward() {
        let now = now();
        throwUnless(WAIT_MORE, now > self.lastRewardClaimTime + 86400); // 1 day & accountInit < 1 years
        let amt = (now - self.accountInitTime < 31_536_000) ? ton("10") : ton("1");
        self.mintInternal(amt);
        self.lastRewardClaimTime = now;

        // update supply
        MessageParameters {
            to: self.minter,
            value: ton("0.01"),
            mode: SendPayFwdFeesSeparately | SendIgnoreErrors,
            bounce: false,
            body: MintNotify {
                amount: amt,
                sender: self.owner,
            }.toCell(),
        }.send();
    }

    inline fun claimAllowance() {
        let now = now();
        throwUnless(WAIT_MORE, (now > self.lastMonthlyAllowanceClaimTime + 2_592_000) && (now - self.accountInitTime < 217_728_000)); // 30 days & accountInit < 5 years
        self.mintInternal(ton("10000"));
        self.lastMonthlyAllowanceClaimTime = now;

        // update supply
        MessageParameters {
            to: self.minter,
            value: ton("0.01"),
            mode: SendPayFwdFeesSeparately | SendIgnoreErrors,
            bounce: false,
            body: MintNotify {
                amount: ton("10000"),
                sender: self.owner,
            }.toCell(),
        }.send();
    }

    inline fun claimGrants() {
        emit("claimed grant".asComment());
    }

    get fun get_wallet_data(): JettonWalletData { // tensor, JettonWalletData? for tuple
        // throwUnless(ACCOUNT_TERMINATED, !self.terminated);
        return JettonWalletData {
            balance: self.balance,
            owner: self.owner,
            minter: self.minter,
            code: myCode(), // or send baseCode?
        };
    }

    get fun state(): JettonWalletSharded {
        return self;
    }

    get fun reportResolutionTime(): Int { // manual query to know if it's time to send msg processReportResolution
        return self.reportInfo.reportResolutionTime;
    }

    get fun getInvitorNominee(): InvitorNominee {
        return InvitorNominee {
            invitor: self.invitor,
            nominee: self.nominee,
        };
    }

    get fun getFriendsAndFollowings(): FriendsAndFollowings {
        throwUnless(ACCOUNT_TERMINATED, !self.terminated);
        //throwUnless(NOT_AUTHORIZED, self.friends.exists(sender()) || self.followers.exists(sender()));// not authorized
        return FriendsAndFollowings {
            friends: self.friends.asCell(),
            followings: self.followings.asCell(),
            followers: self.followers.asCell(),
            invited: self.invited.asCell(),
            pendingRequests: self.pendingRequests.asCell(),
            debts: self.debts.asCell(),
            reports: self.reportInfo.reports.asCell(),
        };
    }

    get fun otherConsts(): OtherStateConsts {
        return OtherStateConsts {
            reportInfo: self.reportInfo,
            connections: self.connections,
            terminated: self.terminated,
            mbrpAmount: MBRP_AMOUNT,
            closureWait: CLOSURE_WAIT,
            active: self.active,
            lastMsgTo: self.lastMsgTo,
            insurance: self.insurance.toCell(),
        };
    }

    // inline fun getIdsInit(lattitude: String, longitude: String): StateInit {
    //     let idsInit: StateInit = initOf Ids(lattitude, longitude);
    //     return StateInit { code: self.baseIdsCode, data: idsInit.data };
    // }

    inline fun getWalletInit(address: Address): StateInit { // Use persisted baseWalletCode to compute stable StateInit for target wallets.
        let walletInit: StateInit = initOf JettonWalletSharded(address, self.minter, 0, self.treasuryAccount);
        return StateInit { code: self.baseWalletCode, data: walletInit.data };
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

    // inline fun getJettonBasechainWalletByOwner(jettonWalletOwner: Address): BasechainAddress {
    //     let init = self.getJettonWalletInit(jettonWalletOwner);

    //     let ownerShard = jettonWalletOwner.getShard();

    //     return BasechainAddress { hash: changeShard(init.hash(), ownerShard) };
    // }
}

inline fun readOpFromForward(sl: Slice): Int? {
    if (sl.bits() >= 32) {
        return sl.preloadUint(32);
    }

    if (sl.refs() > 0) {
        let s1: Slice = sl.preloadRef().beginParse();
        if (s1.bits() >= 32) {
            return s1.preloadUint(32);
        }
    }
    return null;
}

fun notifyWallet(sender: Address, to: Address, amount: Int, forwardPayload: Slice) {
    let myBal: Int = myBalance();
    MessageParameters {
        to,
        value: myBal > ton("10") ? myBal - ton("5") : ton("0.01"), // payload fees
        mode: SendPayFwdFeesSeparately | SendIgnoreErrors,
        bounce: false,
        body: JettonNotification { // 0x7362d09c
            queryId: 0,
            amount,
            sender,
            forwardPayload,
        }.toCell(),
    }.send();
}

// let maybeOp = self.readOpFromForward(msg.forwardPayload);
//     let isSwap: Bool = (maybeOp != null) && (
//         maybeOp!! == op_stonfi_swap
//         || maybeOp!! == op_stonfi_swap_ok
//         || maybeOp!! == op_dedust_swap
//         || maybeOp!! == op_dedust_swap1   
//         || maybeOp!! == op_dedust_swap3
//         || maybeOp!! == op_dedust_swap4
//         || maybeOp!! == op_dedust_swap5
//     );

//     self.balance -= msg.amount;
//     let inc: Int = muldivc(msg.amount, 75, 100);

// Parse comment string - format: "username@lat,long"
// inline fun parseComment(comment: String): ParsedString {
//     let username: String = "";
//     let latitude: String = "";
//     let longitude: String = "";

//     let atIndex: Int = findChar(comment, "@");

//     if (atIndex > 0) {
//         username = substring(comment, 0, atIndex);
//         let coords: String = substring(comment, atIndex + 1, length(comment));
//         let commaIndex: Int = findChar(coords, ",");

//         if (commaIndex > 0) {
//             lattitude = substring(coords, 0, commaIndex);
//             longitude = substring(coords, commaIndex + 1, length(coords));
//         }
//     }

//     return ParsedString {
//         username,
//         lattitude,
//         longitude,
//     };
// }

// // Find character position in string
// fun findChar(str: String, char: String): Int {
//     let i: Int = 0;
//     let len: Int = length(str);
//     while (i < len) {
//         if (substring(str, i, i + 1) == char) {
//             return i;
//         }
//         i += 1;
//     }
//     return -1;
// }

// // Get string length by converting to slice
// fun length(s: String): Int {
//     // Convert string to slice and count bits, then divide by 8 for byte length
//     let builder: Builder = beginCell();
//     builder.storeSlice(s.asSlice());
//     let slice: Slice = builder.asSlice();

//     // For ASCII strings, bits / 8 gives approximate length
//     // This is a workaround since Tact doesn't have native string length
//     return slice.bits() / 8;
// }

// // Extract substring using slice operations
// fun substring(s: String, start: Int, end: Int): String {
//     // Normalize bounds
//     let len: Int = length(s);
//     let st: Int = start < 0 ? 0 : start;
//     let ed: Int = end > len ? len : end;

//     if (st >= ed) {
//         return "";
//     }

//     // Convert string to slice
//     let slice: Slice = s.asSlice();

//     // Skip 'start' bytes
//     if (st > 0) {
//         let _ = slice.loadBits(st * 8);
//     }

//     // Load 'end - start' bytes
//     let bytesToLoad: Int = ed - st;
//     if (bytesToLoad > 0) {
//         let resultBuilder: Builder = beginCell();
//         resultBuilder.storeSlice(slice.loadBits(bytesToLoad * 8));
//         // resultBuilder.storeBits(slice.loadBits(bytesToLoad * 8));
//         return resultBuilder.asSlice().asString();
//     }

//     return "";
// }
