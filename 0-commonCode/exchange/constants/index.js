'use strict';

const {
    constants: {
        environment: {
            isProductionMode
        }
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const f = Object.freeze;

const tableNames = isProductionMode ? f({

    exchangeUsers: 'bitcoin_api_exchangeUsers',
    loginTokens: 'bitcoin_api_loginTokens',
    transactions: 'bitcoin_api_transactions',
    exchangeEmailDeliveryResults: 'bitcoin_api_exchangeEmailDeliveryResults',

}) : f({

    exchangeUsers: 'bitcoin_api_exchangeUsers_staging',
    loginTokens: 'bitcoin_api_loginTokens_staging',
    transactions: 'bitcoin_api_transactions_staging',
    exchangeEmailDeliveryResults: 'bitcoin_api_exchangeEmailDeliveryResults_staging',
});

// const rawVotesData = {
//     usaelection: {
//         choices: [ 'trump', 'biden' ]
//     }
// };

// const votes = {

//     ids: { /* usaelection: 'usaelection', */ },
//     choices: {  usaelection: [ 'trump', 'biden' ],  },
// };

// const voteIds = Object.keys( rawVotesData );

// for( const voteId of voteIds ) {

//     votes.ids[ voteId ] = voteId;
//     votes.choices[ voteId ] = rawVotesData[ voteId ].choices;
// }

// votes.voteIds = voteIds;


module.exports = f({
    aws: {
        database: {
            tableNames: {
                EXCHANGE_USERS: tableNames.exchangeUsers,
                LOGIN_TOKENS: tableNames.loginTokens,
                TRANSACTIONS: tableNames.transactions,
                EXCHANGE_EMAIL_DELIVERY_RESULTS: tableNames.exchangeEmailDeliveryResults,
            },
            tableNameToKey: {
                [tableNames.exchangeUsers]: 'exchangeUserId',
                [tableNames.loginTokens]: 'exchangeUserId',
                [tableNames.transactions]: 'exchangeUserId',
                [tableNames.exchangeEmailDeliveryResults]: 'email',
            },
            tableNameToSortKey: {
                [tableNames.loginTokens]: 'expiryTime',
                [tableNames.transactions]: 'transactionId',
                [tableNames.exchangeEmailDeliveryResults]: 'creationDate',
            },
            secondaryIndices: {
                emailIndex: 'email-index',
                exchangeUserIdCreationDateIndex: 'exchangeUserId-creationDate-index',
                searchIdCreationDateIndex: 'searchId-creationDate-index',
            },
            metadataKeys: {
                dreamLotus: 'dreamLotus'
            },
            searchIds: {
                dreamLotus: 'dreamLotus'
            },
        },
    },

    alien: {

        currencies: {

            busd: {
                key: 'busd',
            },

            m: {
                key: 'm',
            },
        },
    },

    transactions: {
        types: {
            identity: 'identity',
            addBitcoin: 'addBitcoin',
            withdrawBitcoin: 'withdrawBitcoin',
            exchange: 'exchange',
            dream: 'dream',
            vote: 'vote',
            raffle: 'raffle',
            bonus: 'bonus',
            setAlienBalance: 'setAlienBalance',
        },

        bitcoinWithdrawTypes: {

            start: 'start',
            failed: 'failed',
            success: 'success',
        },

        transactionId: {

            prefix: 'transaction_',
            minLength: 3,
            maxLength: 120,
        },
    },

    exchangeUsers: {

        exchangeUserId: {

            prefix: 'exchange_user_',
            minLength: 3,
            maxLength: 100,
        },
    },

    withdraws: {

        states: {
            no_withdraws_are_currently_being_processed: 'no_withdraws_are_currently_being_processed',
            withdraw_is_being_processed: 'withdraw_is_being_processed',
        }
    },

    exchanges: {
        bounds: {
            crypto: {
                max: 69000,
                min: 0.00001,
            },
            bitcoin: {
                max: 69,
                min: 0.00000001,
            }
        },

        rates: {

            cryptoOverBTC: 1000,
        },

        types: {

            btcToCrypto: 'btcToCrypto',
            cryptoToBTC: 'cryptoToBTC'
        }
    },

    identityTransactions: {
        types: {
            pure: 'pure',
            recalculate: 'recalculate',
            refresh: 'refresh',
        }
    },

    dreams: {
        types: {
            coin: 'coin',
            lotus: 'lotus',
            slot: 'slot',
        }
    },

    votes: {
        types: {
            doVote: 'doVote',
            payout: 'payout',
        }
    },
    
    raffles: {
        types: {
            putTicket: 'putTicket',
            payout: 'payout',
        },

        actions: {

            buy: 'buy',
            buyUpdate: 'buyUpdate',
            cancel: 'cancel'
        }
    },

    queues: {
        queueBaseIds: {
            lotusDreamsJackpotWin: 'lotusDreamsJackpotWin',
        }
    }
});