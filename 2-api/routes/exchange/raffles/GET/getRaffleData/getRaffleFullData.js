'use strict';

const {
    utils: {
        aws: {
            dino: {
                searchDatabase,
            }
        },
        stringify,
        javascript: {
            getEnvNumberValue
        }
    },
    constants: {
        environment: {
            isProductionMode,
        },
        aws: {
            database: {
                tableNames: {
                    METADATA
                },
                secondaryIndex: {
                    typeCreationDateIndex,
                }
            }
        },
        metadata: {
            types: {
                raffle
            }
        }
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const searchLimit = isProductionMode ? getEnvNumberValue({

    key: 'EXCHANGE_ENDPOINT_RAFFLES_GET_GRD_SEARCH_LIMIT',
    min: 1,
    max: 2000000,
    shouldBeInteger: true,
    defaultValue: 2

}) : 2;


const f = Object.freeze;

const attributes = f({

    nameKeys: f({
     
        type: '#type',
        // key: '#key',
        // cryptoPot: '#cryptoPot',
        // creationDate: '#creationDate',
        // lotteryType: '#lotteryType',
        // ticketCryptoPrice: '#ticketCryptoPrice',
    }),

    nameValues: f({
     
        type: 'type',
        // key: 'key',
        // cryptoPot: 'cryptoPot',
        // creationDate: 'creationDate',
        // lotteryType: 'lotteryType',
        // ticketCryptoPrice: 'ticketCryptoPrice',
    }),

    valueKeys: f({

        type: ':type',
    }),

    valueValues: f({

        type: raffle,
    })
});


module.exports = Object.freeze( async ({

    lastKey,
    lastTime,

}) => {

    console.log(
        
        'running getRaffleFullData ' +
        `with the following values - ${ stringify({
            
            lastKey,
            lastTime,
        }) }`
    );

    // {
    //     "creationDate": 1602141854902,
    //     "cryptoPot": 0,
    //     "key": "raffle_1602141854902",
    //     "lotteryType": "twoNumber",
    //     "ticketCryptoPrice": 2,
    //     "type": "raffle"
    // }

    let thereAreMoreRafflesToGet = true;

    const rawRaffleData = [];

    let paginationValueToUse = {

        lastKey,
        lastTime
    };
    let iterationCount = 0;

    while( thereAreMoreRafflesToGet ) {

        iterationCount++;

        console.log(
            'getRaffleFullData - running search iteration with values: ' + 
            stringify({

                iterationCount,
                paginationValueToUse,
            })
        );

        const searchParams = {

            TableName: METADATA,
            IndexName: typeCreationDateIndex,
            ScanIndexForward: false,
            // ProjectionExpression: [
            //     attributes.nameKeys.creationDate,
            //     attributes.nameKeys.cryptoPot,
            //     attributes.nameKeys.key,
            //     attributes.nameKeys.lotteryType,
            //     attributes.nameKeys.ticketCryptoPrice,
            // ].join( ', ' ), // TODO:
            Limit: searchLimit,
            KeyConditionExpression: (
                `${ attributes.nameKeys.type } = ` +
                `${ attributes.valueKeys.type }`
            ),
            ExpressionAttributeNames: {
                [attributes.nameKeys.type]: attributes.nameValues.type,
                // [attributes.nameKeys.key]: attributes.nameValues.key,
                // [attributes.nameKeys.cryptoPot]: attributes.nameValues.cryptoPot,
                // [attributes.nameKeys.creationDate]: attributes.nameValues.creationDate,
                // [attributes.nameKeys.lotteryType]: attributes.nameValues.lotteryType,
                // [attributes.nameKeys.ticketCryptoPrice]: attributes.nameValues.ticketCryptoPrice,
            },
            ExpressionAttributeValues: {
                [attributes.valueKeys.type]: attributes.valueValues.type,
            },
            ExclusiveStartKey: (

                !!paginationValueToUse.lastKey &&
                !!paginationValueToUse.lastTime

            ) ? {
    
                key: paginationValueToUse.lastKey,
                creationDate: paginationValueToUse.lastTime,
                type: attributes.valueValues.type,
    
            } : undefined,
        };
    
        const {
            
            ultimateResults,
            paginationValue,
    
        } = await searchDatabase({
    
            searchParams,
        });
        
        const rawRaffleDataChunk = ultimateResults;

        rawRaffleData.push( ...rawRaffleDataChunk );

        if( !paginationValue ) {

            thereAreMoreRafflesToGet = false;
            
            if( rawRaffleData.length <= searchLimit ) {

                paginationValueToUse = {
                    
                    lastKey: null,
                    lastTime: null,
                };
            }
            else {

                rawRaffleData.length = searchLimit;
                
                const lastRawRaffleDatum = rawRaffleData[
                    
                    rawRaffleData.length - 1 
                ];

                paginationValueToUse = {

                    lastKey: lastRawRaffleDatum.key,
                    lastTime: lastRawRaffleDatum.creationDate,
                };
            }
        }
        else {
            
            if( rawRaffleData.length <= searchLimit ) {

                paginationValueToUse = {

                    lastKey: paginationValue.key,
                    lastTime: paginationValue.creationDate,
                };
            }
            else {

                thereAreMoreRafflesToGet = false;

                rawRaffleData.length = searchLimit;

                const lastRawRaffleDatum = rawRaffleData[
                    
                    rawRaffleData.length - 1 
                ];

                paginationValueToUse = {

                    lastKey: lastRawRaffleDatum.key,
                    lastTime: lastRawRaffleDatum.creationDate,
                };
            }
        }
    }

    const raffleFullData = {

        rawRaffleData,
        lastValues: (
            
            !!paginationValueToUse.lastKey &&
            !!paginationValueToUse.lastTime
            
        )? {

            lastKey: paginationValueToUse.lastKey,
            lastTime: paginationValueToUse.lastTime,
            
        } : {

            lastKey: null,
            lastTime: null,
        },
    };

    console.log(
        `getRaffleFullData, got ${ rawRaffleData.length } ` +
        'raffleDatas - ' +
        'Last values: ' +
        stringify( raffleFullData.lastValues ) +
        'getRaffleFullData executed successfully - ' +
        'returning raffleFullData'
    );

    return raffleFullData;
});