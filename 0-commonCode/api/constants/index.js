'use strict';

const staging = 'staging';
const production = 'production';

const validBitcoinApiEnvs = Object.freeze([

    staging,
    production
]);

const bitcoinApiEnv = process.env.BITCOIN_API_ENV;

if( !validBitcoinApiEnvs.includes( bitcoinApiEnv ) ) {

    throw new Error(
        `invalid process.env.BITCOIN_API_ENV: ${ bitcoinApiEnv }`
    );
}

const isProductionMode = (bitcoinApiEnv === production);

console.log(
    
    `intializing constants in production mode: ${ isProductionMode }\n` +
    `location: ${ __dirname }`
);

const tableNames = isProductionMode ? Object.freeze({

    users: 'bitcoin_api_users',
    addresses: 'bitcoin_api_addresses',
    metadata: 'bitcoin_api_metadata',
    withdraws: 'bitcoin_api_withdraws',
    balances: 'bitcoin_api_balances',

}) : Object.freeze({

    users: 'bitcoin_api_users_staging',
    addresses: 'bitcoin_api_addresses_staging',
    metadata: 'bitcoin_api_metadata_staging',
    withdraws: 'bitcoin_api_withdraws_staging',
    balances: 'bitcoin_api_balances_staging',
});

const f = Object.freeze;


module.exports = f({
    aws: {
        database: {
            tableNames: {
                USERS: tableNames.users,
                ADDRESSES: tableNames.addresses,
                METADATA: tableNames.metadata,
                WITHDRAWS: tableNames.withdraws,
                BALANCES: tableNames.balances,
            },
            tableNameToKey: {
                [tableNames.users]: 'userId',
                [tableNames.addresses]: 'userId',
                [tableNames.metadata]: 'key',
                [tableNames.withdraws]: 'userId',
                [tableNames.balances]: 'userId',
            },
            tableNameToSortKey: {
                [tableNames.addresses]: 'address',
                [tableNames.withdraws]: 'ultraKey',
            },
            metadataPartitionKeyValues: {
                feeData: 'fee',
                onAndOffSwitch: 'onAndOffSwitch',
            },
            addressesTable: {
                unusedAddressUserId: 'babebabe-babe-4bae-babe-babebabebabe',
                secondaryIndexNames: {
                    addressIndex: 'address-index',
                }
            },
            secondaryIndex: {
                depositsIndex: 'userId-timeReceived-index',
                stateCreationDateIndex: 'state-creationDate-index',
                typeCreationDateIndex: 'type-creationDate-index',
            }
        },
        storage: {
            classicalS3Storage: 'classicalS3Storage'
        }
    },

    MEGA_SEPARATOR: '__THE_SEPARATOR__',
    users: {
        USER_ID_LENGTH: 32,
        databasePropertyNames: {
            balanceTypeToBalanceIdToBalanceData: (
                'balanceTypeToBalanceIdToBalanceData'
            ),
        },
        balanceTypes: {
            bitcoinNodeIn: 'bitcoinNodeIn',
            normalWithdraw: 'normalWithdraw',
        },
    },

    withdraws: {
        states: {
            complete: 'complete',
            pending: 'pending',
            failed: 'failed',
            realDealing: 'realDealing',
            verifying: 'verifying',
            verifyingToFail: 'verifyingToFail',
            manualFail: 'manualFail',
            waiting: 'waiting'
        },

        limits: {
            minimumWithdrawAmount: 0.00004,
            maximumWithdrawAmount: 69,
        },
        
        nullAmount: 'nullAmount',
    },

    balances: {

        states: {

            normal: 'normal',
            transformation: 'transformation'
        }
    },

    normalWithdraws: {
        normalWithdrawsIds: {
            api: 'api'
        },
    },

    megaServerIdToMegaServerData: f({

        computer_server_1: f({

            url: 'https://computer_server.ngrok.io',
        }),

        // computer_server_2: f({

        //     url: 'https://sex.ngrok.io',
        // }),
    }),

    errorCodes: {
        operationTimeOutError: (
            'ERRORCODESOTOE2eb456e22bed4f67778288888990edaa'
        ),
    },

    computerServerServiceNames: {

        monkeyPaw: 'monkeyPaw',
        juiceCamel: 'juiceCamel',
        refreshingDrank: 'refreshingDrank',
    },

    redis: {
        streamIds: {
            q: 'q', // legacy
            Q: 'Q',
            ipAddressRateLimiterQueueId: 'ipAddressRateLimiterQueueId',
            advancedCodeRateLimiterQueueId: 'advancedCodeRateLimiterQueueId',
            bankStatusQueueId: 'bankStatusQueueId',
            websiteIpAddressDatav1: 'websiteIpAddressDatav1',
            zarbonDeploy: 'zarbonDeploy',
            altruisticCodeRateLimiterQueueId: 'altruisticCodeRateLimiterQueueId',
        },
        listIds: {
            unusedAddressData: 'unusedAddressData'
        },
        keys: {
            cacheOnAndOffStatus: 'cacheOnAndOffStatus'
        }
    },

    deploy: {
        eventNames: {
            leaf: {
                tigerCommand: 'tigerCommand'
            },
            tiger: {
                tigerEnlightenment: 'tigerEnlightenment'
            }
        }
    },

    environment: {
        bitcoinApiEnv,
        isProductionMode
    },

    metadata: {
        types: {
            raffle: 'raffle',
            raffleDraw: 'raffleDraw',
            rafflePutTicketEvent: 'rafflePutTicketEvent',
        }
    },
});