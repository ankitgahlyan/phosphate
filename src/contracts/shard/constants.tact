//  SPDX-License-Identifier: MIT
//  Copyright © 2025 TON Studio
//TODO:
// const gasForMint: Int = 11050; //anybody can mint(burn if minted) limitedAmount(not fixedAmount once) per id
const gasForBurn: Int = 8000;
const gasForTransfer: Int = 11050; // FIXME: CHANGE ON MAINNET
const minTonsForStorage: Int = ton("0.01"); // This should use https://github.com/tact-lang/tact/issues/2336 in the future
const Basechain: Int = 0;

// This is an approximate value. Real one must be less than this, and it is checked in tests.
const walletStateInitCells: Int = 300; // 30, 283
const walletStateInitBits: Int = 2_50_000; // 20_000, 2_19_987

const MBRP_AMOUNT: Int = ton("1000"); // NOTE: store as consts to upgrade with code now minter updates, any const update also updates version but should not
const CLOSURE_WAIT: Int = 86400; // 1 day

asm fun setCode(newCode: Cell) { SETCODE }

asm fun setData(newData: Cell) {c4 POP} // rarely used for wallet

const ZERO_ADDRESS: Address = address("EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c"); // TODO mainnet addr

// SYMANTIC TXN CODES
// const FOLLOW_AMOUNT: Int = 100000000000000000; // 1*10**17
// const REPORT_AMOUNT: Int = 200000000000000000; // 2*10**17
// const DISPUTE_AMOUNT: Int = 300000000000000000; // 3*10**17
// const PROCESS_AMOUNT: Int = 400000000000000000; // 4*10**17
// const CHANGE_NOMINEE_AMOUNT: Int = 500000000000000000; // 5*10**17

// ERROR_CODES
const INCORRECT_SENDER: Int = 700;
const ACCOUNT_TERMINATED: Int = 701;
const ACCOUNT_INACTIVE: Int = 702;
const INSUFFICIENT_GAS_SENT: Int = 703;
const RESERVED_INTERNAL: Int = 704;
const UPGRADE_WALLET: Int = 705;
const NO_PENDING_REQUEST: Int = 706;
const CANT_UNFOLLOW_REPORTED: Int = 707;

const INSUFFICIENT_BALANCE: Int = 709;
const ALREADY_REPORTED: Int = 710;
const ACCOUNT_NOT_REPORTED: Int = 711;
// const NOT_AUTHORIZED: Int = 712;
// const AMOUNT_EXCEEDS_MBRP: Int = 715;

const NOT_FOLLOWING: Int = 717;
//follower Cleared by confirmRequestInternal bounce? TODO:
const CONNECTION_EXISTS: Int = 719;
const NOT_FRIEND: Int = 720;
const NOT_INVITOR: Int = 721;
const ALREADY_INVITED: Int = 723;
const UNAUTHORIZED_BURN: Int = 724;
const MINT_CLOSED: Int = 730;

const WRONG_WORKCHAIN: Int = 734;
const WAIT_UNTIL_CLOSURE: Int = 735;
const NOT_CLOSE_FRIEND: Int = 736;
const ALREADY_VOUCHED: Int = 737;

// CONTRACT_CONSTS
// Declare a compile-time constant upper-bound for our map
const MAX_CONNECTIONS: Int = 250; // coz accClosing contract can send only approx 250 msg once
