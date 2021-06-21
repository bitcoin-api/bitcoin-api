'use strict';


const MONEY_ACTIONS = {

    types: {
        regal: {
            addressAmountUpdate: 'bitcoinAddressAmountUpdate',
            exchange: {
                btcToCrypto: 'exchangeBtcToCrypto',
                cryptoToBTC: 'exchangeCryptoToBTC',
            },
            withdraw: {
                start: 'withdrawStart',
                success: 'withdrawSuccess',
                failed: 'withdrawFailed',
            },
        },
        game: {
            talismanFlip: 'talismanFlip',
            slot: 'slot',
            lotus: {
                pickPetal: 'lotusPickPetal',
                unpickPetal: 'lotusUnpickPetal',
                flowerPotPayout: 'lotusFlowerPotPayout',
            },
        },
    }
};


const transactions = {

    addBitcoin: {
        "address": "3DythSzb7uFMtW5tcNoNXc9L7X1MgATBYj",
        "amount": 0.0093,
        "creationDate": 1604768290517,
        "exchangeUserId": "exchange_user_dd458c14943d4af3875c037e760d6e34",
        "lastUpdated": 1604768290549,
        "transactionId": "transaction_bf85041743474c56831fb09e2c0cae9c_1604768290549",
        "type": "addBitcoin"
    },

    withdraws: {

        start: {
            "address": "1P5EJXuvag6RygC4nfe7n4fick8PzwKm7Z",
            "amount": 0.0005,
            "bitcoinWithdrawType": "start",
            "creationDate": 1614658351279,
            "exchangeUserId": "exchange_user_3fc87acac3c84240b788af5ee78e930b",
            "fee": 0.00011687,
            "feeIncludedInAmount": false,
            "lastUpdated": 1614658351558,
            "transactionId": "transaction_42903594df2548738f95ea2cece2c8e5_1614658351558",
            "type": "withdrawBitcoin",
            "withdrawId": "f733556a-bd45-468f-9bf8-c96c615537a8"
          },

          success: {
            "address": "1P5EJXuvag6RygC4nfe7n4fick8PzwKm7Z",
            "amount": 0.0005,
            "bitcoinWithdrawType": "success",
            "creationDate": 1614658354930,
            "exchangeUserId": "exchange_user_3fc87acac3c84240b788af5ee78e930b",
            "fee": 0.00001682,
            "lastUpdated": 1614658354958,
            "transactionId": "transaction_6bf9be69e87d4c608fcda6ac3c014cb3_1614658354958",
            "type": "withdrawBitcoin",
            "withdrawId": "f733556a-bd45-468f-9bf8-c96c615537a8"
        }
    },

    exchange: {
        btcToCrypto: {
            "amountInBTCNeeded": 0.00001,
            "amountInCryptoWanted": 0.01,
            "creationDate": 1605495474189,
            "exchangeType": "btcToCrypto",
            "exchangeUserId": "exchange_user_3fc87acac3c84240b788af5ee78e930b",
            "lastUpdated": 1605495474529,
            "transactionId": "transaction_045900dcac1748b2bec522458895f6ea_1605495474528",
            "type": "exchange"
        },
        cryptoToBTC: {
            "amountInBitcoinWanted": 0.001,
            "amountInCryptoNeeded": 1,
            "creationDate": 1611920097918,
            "exchangeType": "cryptoToBTC",
            "exchangeUserId": "exchange_user_3fc87acac3c84240b788af5ee78e930b",
            "lastUpdated": 1611920098238,
            "transactionId": "transaction_05f3b698ec714c3b8ace96c97b32a502_1611920098237",
            "type": "exchange"
        },
    },

    game: {
        dream: {
            coin: {
                "amount": 0.1,
                "creationDate": 1602595964030,
                "dreamType": "coin",
                "exchangeUserId": "exchange_user_3fc87acac3c84240b788af5ee78e930b",
                "happyDream": true,
                "lastUpdated": 1602595964109,
                "transactionId": "transaction_22f504f8204d4d69803f626cca5cffc6_1602595964109",
                "type": "dream"
            },

            coinLose: {
                "amount": 0.1,
                "creationDate": 1602595964030,
                "dreamType": "coin",
                "exchangeUserId": "exchange_user_3fc87acac3c84240b788af5ee78e930b",
                "happyDream": true,
                "lastUpdated": 1602595964109,
                "transactionId": "transaction_22f504f8204d4d69803f626cca5cffc6_1602595964109",
                "type": "dream"
            },
        },

        dreamSlot: {

            slotWin: {
                "amount": 0.0007,
                "creationDate": 1621721764176,
                "dreamType": "slot",
                "exchangeUserId": "exchange_user_1c5f8ad1162e463d84bdeee485e1de36",
                "happyDream": true,
                "hasTied": false,
                "lastUpdated": 1621721764179 + 7200000,
                "resultValues": {
                    "slotNumbers": [ 2, 2, 2 ]
                },
                "transactionId": "transaction_725cs9294a4584916be57da68173d4f3_1621721764176",
                "type": "dream"
            },

            slotTie: {
                "amount": 0,
                "creationDate": 1621721764176,
                "dreamType": "slot",
                "exchangeUserId": "exchange_user_1c5f8ad1162e463d84bdeee485e1de36",
                "happyDream": false,
                "hasTied": true,
                "lastUpdated": 1621721764179 + 3600000,
                "resultValues": {
                    "slotNumbers": [ 1, 2, 3 ]
                },
                "transactionId": "transaction_725c929e4a4584916bef7da68173d4f3_1621721764176",
                "type": "dream"
            },

            slotLose: {
                "amount": -0.0001,
                "creationDate": 1621721764176,
                "dreamType": "slot",
                "exchangeUserId": "exchange_user_1c5f8ad1162e463d84bdeee485e1de36",
                "happyDream": false,
                "hasTied": false,
                "lastUpdated": 1621721764179,
                "resultValues": {
                    "slotNumbers": [ 3, 3, 2 ]
                },
                "transactionId": "transaction_725c9d294a458491bef57da68173d4f3_1621721764176",
                "type": "dream"
            },
        },

        raffle: {
            buyTicket: {
                "action": "buy",
                "amount": -0.1,
                "choice": "5-26",
                "creationDate": 1606662344982,
                "exchangeUserId": "exchange_user_dd458c14943d4af3875c037e760d6e34",
                "lastUpdated": 1606662345081,
                "raffleType": "putTicket",
                "searchId": "raffle_b7b31b2f-6d5e-4f16-a504-481429a26454_1606546881055",
                "transactionId": "transaction_3d5c357982fc4b39b98ce0d9179a2ac1_1606662345081",
                "type": "raffle"
            },
              
            cancelTicket: {
                "action": "cancel",
                "amount": 0.1,
                "choice": "4-9",
                "creationDate": 1606662211541,
                "exchangeUserId": "exchange_user_dd458c14943d4af3875c037e760d6e34",
                "lastUpdated": 1606662211700,
                "raffleType": "putTicket",
                "searchId": "raffle_b7b31b2f-6d5e-4f16-a504-481429a26454_1606546881055",
                "transactionId": "transaction_8811e90ea35744d281a7b87cc80d17f1_1606662211700",
                "type": "raffle"
            },

            payout: {
                "amount": 0.582,
                "creationDate": 1606546880630,
                "exchangeUserId": "exchange_user_3fc87acac3c84240b788af5ee78e930b",
                "lastUpdated": 1606546880875,
                "raffleDrawId": "raffle_draw_f0501686-febc-43ef-a46a-620416ae34d2_1606546880135",
                "raffleType": "payout",
                "searchId": "raffle_6000d566-ad67-43e1-8755-57eceb086bdc_1604035560000",
                "transactionId": "transaction_cbb11874045d4e979cc034da789d773e_1606546880874",
                "type": "raffle"
            }
        }
    },
};


const firstBatchOfMoneyActions = [

    {
        type: MONEY_ACTIONS.types.game.slot,
        amount: transactions.game.dreamSlot.slotWin.amount,
        time: transactions.game.dreamSlot.slotWin.creationDate,
        happyDream: transactions.game.dreamSlot.slotWin.happyDream,
        hasTied: transactions.game.dreamSlot.slotWin.hasTied,
        resultValues: transactions.game.dreamSlot.slotWin.resultValues,
        transactionId: transactions.game.dreamSlot.slotWin.transactionId,
    },

    {
        type: MONEY_ACTIONS.types.game.slot,
        amount: transactions.game.dreamSlot.slotLose.amount,
        time: transactions.game.dreamSlot.slotLose.creationDate,
        happyDream: transactions.game.dreamSlot.slotLose.happyDream,
        hasTied: transactions.game.dreamSlot.slotLose.hasTied,
        resultValues: transactions.game.dreamSlot.slotLose.resultValues,
        transactionId: transactions.game.dreamSlot.slotLose.transactionId,
    },

    {
        type: MONEY_ACTIONS.types.game.slot,
        amount: transactions.game.dreamSlot.slotTie.amount,
        time: transactions.game.dreamSlot.slotTie.creationDate,
        happyDream: transactions.game.dreamSlot.slotTie.happyDream,
        hasTied: transactions.game.dreamSlot.slotTie.hasTied,
        resultValues: transactions.game.dreamSlot.slotTie.resultValues,
        transactionId: transactions.game.dreamSlot.slotTie.transactionId,
    },
];

const secondBatchOfMoneyActions = [

    {
        type: MONEY_ACTIONS.types.regal.addressAmountUpdate,
        address: transactions.addBitcoin.address,
        amount: transactions.addBitcoin.amount,
        time: transactions.addBitcoin.creationDate,
        transactionId: transactions.addBitcoin.transactionId,
    },

    {
        type: MONEY_ACTIONS.types.regal.withdraw.start,
        amount: transactions.withdraws.start.amount,
        address: transactions.withdraws.start.address,
        time: transactions.withdraws.start.creationDate,
        fee: transactions.withdraws.start.fee,
        feeIncludedInAmount: transactions.withdraws.start.feeIncludedInAmount,
        transactionId: transactions.withdraws.start.transactionId,
    },

    {
        type: MONEY_ACTIONS.types.regal.withdraw.success,
        amount: transactions.withdraws.success.amount,
        address: transactions.withdraws.success.address,
        time: transactions.withdraws.success.creationDate,
        fee: transactions.withdraws.success.fee,
        // feeIncludedInAmount: transactions.withdraws.success.feeIncludedInAmount,
        transactionId: transactions.withdraws.success.transactionId,
    },

    {
        type: MONEY_ACTIONS.types.regal.exchange.btcToCrypto,
        exchangeType: transactions.exchange.btcToCrypto.exchangeType,
        amountInBTCNeeded: 0.0069,
        amountInCryptoWanted: 6.9,
        time: transactions.exchange.btcToCrypto.creationDate + 6000000,
        transactionId: transactions.exchange.btcToCrypto.transactionId + '69',
    },

    {
        type: MONEY_ACTIONS.types.regal.exchange.btcToCrypto,
        exchangeType: transactions.exchange.btcToCrypto.exchangeType,
        amountInBTCNeeded: 0.0042,
        amountInCryptoWanted: 4.2,
        time: transactions.exchange.btcToCrypto.creationDate + 42000000,
        transactionId: transactions.exchange.btcToCrypto.transactionId + '420',
    },

    {
        type: MONEY_ACTIONS.types.regal.exchange.btcToCrypto,
        exchangeType: transactions.exchange.btcToCrypto.exchangeType,
        amountInBTCNeeded: 0.00888,
        amountInCryptoWanted: 8.88,
        time: transactions.exchange.btcToCrypto.creationDate + 888000000,
        transactionId: transactions.exchange.btcToCrypto.transactionId + '888',
    },


    {
        type: MONEY_ACTIONS.types.regal.withdraw.failed,
        amount: transactions.withdraws.success.amount,
        address: transactions.withdraws.success.address,
        time: transactions.withdraws.success.creationDate,
        fee: transactions.withdraws.success.fee,
        // feeIncludedInAmount: transactions.withdraws.success.feeIncludedInAmount,
        transactionId: transactions.withdraws.success.transactionId,
    },

    {
        type: MONEY_ACTIONS.types.regal.exchange.btcToCrypto,
        exchangeType: transactions.exchange.btcToCrypto.exchangeType,
        amountInBTCNeeded: transactions.exchange.btcToCrypto.amountInBTCNeeded,
        amountInCryptoWanted: transactions.exchange.btcToCrypto.amountInCryptoWanted,
        time: transactions.exchange.btcToCrypto.creationDate,
        transactionId: transactions.exchange.btcToCrypto.transactionId,
    },

    {
        type: MONEY_ACTIONS.types.regal.exchange.cryptoToBTC,
        exchangeType: transactions.exchange.cryptoToBTC.exchangeType,
        amountInCryptoNeeded: transactions.exchange.cryptoToBTC.amountInCryptoNeeded,
        amountInBitcoinWanted: transactions.exchange.cryptoToBTC.amountInBitcoinWanted,
        time: transactions.exchange.cryptoToBTC.creationDate,
        transactionId: transactions.exchange.cryptoToBTC.transactionId,
    },

    {
        type: MONEY_ACTIONS.types.game.talismanFlip,
        amount: transactions.game.dream.coin.amount,
        time: transactions.game.dream.coin.creationDate,
        transactionId: transactions.game.dream.coin.transactionId,
    },

    {
        type: MONEY_ACTIONS.types.game.talismanFlip,
        amount: -transactions.game.dream.coinLose.amount,
        time: transactions.game.dream.coinLose.creationDate,
        transactionId: transactions.game.dream.coinLose.transactionId,
    },
    
    {
        type: MONEY_ACTIONS.types.game.lotus.pickPetal,
        amount: transactions.game.raffle.buyTicket.amount,
        choice: transactions.game.raffle.buyTicket.choice,
        time: transactions.game.raffle.buyTicket.creationDate,
        lotusSeasonId: transactions.game.raffle.buyTicket.searchId,
        transactionId: transactions.game.raffle.buyTicket.transactionId,
    },

    {
        type: MONEY_ACTIONS.types.game.lotus.unpickPetal,
        amount: transactions.game.raffle.cancelTicket.amount,
        choice: transactions.game.raffle.cancelTicket.choice,
        time: transactions.game.raffle.cancelTicket.creationDate,
        lotusSeasonId: transactions.game.raffle.cancelTicket.searchId,
        transactionId: transactions.game.raffle.cancelTicket.transactionId,
    },

    {
        type: MONEY_ACTIONS.types.game.lotus.flowerPotPayout,
        amount: transactions.game.raffle.payout.amount,
        time: transactions.game.raffle.payout.creationDate,
        lotusSeasonId: transactions.game.raffle.payout.searchId,
        petalDrawId: transactions.game.raffle.payout.raffleDrawId,
        transactionId: transactions.game.raffle.payout.transactionId,
    }
];

module.exports = Object.freeze({

    firstBatchOfMoneyActions,
    // firstBatchOfMoneyActions: [],
    secondBatchOfMoneyActions,
    // secondBatchOfMoneyActions: [],
});