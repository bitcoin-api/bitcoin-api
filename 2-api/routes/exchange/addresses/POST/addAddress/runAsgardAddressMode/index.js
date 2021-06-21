'use strict';

const {
    utils: {
        aws: {
            dino: {
                updateDatabaseEntry,
            }
        },
        doOperationInQueue,
        stringify,
        redis: {
            doRedisFunction,
            doRedisRequest,
        },
        javascript: {
            getQueueId,
            jsonEncoder: {
                decodeJson
            }
        },
    },
    constants: {
        redis: {
            listIds,
        },
        aws: {
            database: {
                tableNames: {
                    ADDRESSES,
                }
            }
        }
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    utils:{
        aws: {
            dino: {
                getExchangeDatabaseEntry
            } 
        }
    },
    constants: {
        aws: {
            database: {
                tableNames: {
                    EXCHANGE_USERS,
                }
            }
        }
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

const { throwStandardError } = require( '../../../../../../utils' );

const ensureNoExistingAddress = require( './ensureNoExistingAddress' );

// const {
//     auth: {
//         authorizeUser
//     },
// } = require( '../../../../utils' );

module.exports = Object.freeze( async ({

    exchangeUserId,

}) => {
    
    console.log(
        
        'running 🏰runAsgardAddressMode🏰 ' +
        `with the following values: ${ stringify({

            exchangeUserId,
        }) }`
    );

    await ensureNoExistingAddress({

        exchangeUserId,
    });

    await doOperationInQueue({
        
        queueId: getQueueId({ type: EXCHANGE_USERS, id: exchangeUserId }),
        
        doOperation: async () => {

            const exchangeUser = await getExchangeDatabaseEntry({
        
                tableName: EXCHANGE_USERS,
                value: exchangeUserId,
            });
        
            if( !exchangeUser ) {
                // safeguard
                throw new Error(
                    '🏰runAsgardAddressMode🏰 error - ' +
                    'exchange user with id ' +
                    `"${ exchangeUserId }" does not exist`
                );
            }

            await ensureNoExistingAddress({

                exchangeUserId,
                exchangeUser,
            });

            const rawUnusedAddressData = await doRedisFunction({

                performFunction: async ({

                    redisClient
            
                }) => {

                    const rawUnusedAddressData = await doRedisRequest({

                        client: redisClient,
                        command: 'rpop',
                        redisArguments: [
                            listIds.unusedAddressData
                        ],
                    });

                    return rawUnusedAddressData;
                },

                functionName: 'getting fresh address',
            });

            if( !rawUnusedAddressData ) {

                return throwStandardError({

                    logMessage: (

                        '🏰runAsgardAddressMode🏰 NO-OP - ' +
                        'no fresh addresses available'
                    ),
                    message: (
                        'Standard Error: No fresh addresses ' +
                        'are currently available. ' +
                        'Please try again later. ' +
                        'Thank you for your patience and understanding.'
                    ),
                    statusCode: 400,
                    bulltrue: true,
                });
            }

            const unusedAddressData = decodeJson( rawUnusedAddressData );

            const newMoneyData = Object.assign(

                {},
                exchangeUser.moneyData || {}
            );

            if( !newMoneyData.bitcoin ) {

                newMoneyData.bitcoin = [];
            }

            const newBitcoinMoneyDatum = {

                amount: 0,
                address: unusedAddressData.address,
                creationDate: Date.now(),
            };

            newMoneyData.bitcoin.push( newBitcoinMoneyDatum );

            const newExchangeUser = Object.assign(

                {},
                exchangeUser,
                {
                    moneyData: newMoneyData
                }
            );

            const updates = [];

            const updateExchangeUser = updateDatabaseEntry({

                tableName: EXCHANGE_USERS,
                entry: newExchangeUser,
            });

            updates.push( updateExchangeUser );

            const newAddressDatum = Object.assign(
                {},
                unusedAddressData,
                {
                    userId: process.env.EXCHANGE_TOKEN_USER_ID,
                    conversionDate: Date.now(),
                    isExchangeAddress: true,
                    exchangeUserId,
                }
            );
    
            const createAddressDatabaseEntry = updateDatabaseEntry({
    
                tableName: ADDRESSES,
                entry: newAddressDatum,
            });

            updates.push( createAddressDatabaseEntry );

            await Promise.all( updates );
        }
    });

    console.log(
        
        '🏰runAsgardAddressMode🏰 executed successfully'
    );
});
