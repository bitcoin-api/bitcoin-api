'use strict';

const {
    utils: {
        aws: {
            dino: {
                searchDatabase
            }
        },
        stringify,
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    TRANSACTIONS
                },
                secondaryIndices: {
                    exchangeUserIdCreationDateIndex,
                }
            }
        },
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

const smallBatchSearchLimit = 3;
const searchLimit = 20;

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
        exchangeUserId: '#exchangeUserId',
    }),

    nameValues: f({
        exchangeUserId: 'exchangeUserId',
    }),

    valueKeys: f({
        exchangeUserId: ':exchangeUserId',
    }),
});


module.exports = Object.freeze( async ({

    exchangeUserId,
    lastTime,
    lastTransactionId,
    smallBatch,

}) => {

    const searchLimitToUse = smallBatch ? smallBatchSearchLimit : searchLimit;

    console.log(

        'running getData with the following values: ' +
        stringify({

            exchangeUserId,
            lastTime,
            lastTransactionId,
            smallBatch,
            searchLimitToUse
        })
    );

    const transactions = [];
    let thereIsMoreDataToGet = true;

    let lastTimeToUse = lastTime;
    let lastTransactionIdToUse = lastTransactionId;
    let iterationCount = 0;

    while( thereIsMoreDataToGet ) {

        iterationCount++;

        console.log( 

            'getData - running search iteration with values: ' + 
            stringify({

                iterationCount,
                lastTimeToUse,
                lastTransactionIdToUse,
                ['number of transactions retrieved']: transactions.length
            })
        );

        const searchParams = {
            TableName: TRANSACTIONS,
            IndexName: exchangeUserIdCreationDateIndex,
            Limit: searchLimitToUse,
            ScanIndexForward: false,
            // ProjectionExpression: [
            //     attributes.nameKeys.amount,
            //     attributes.nameKeys.creationDate,
            //     attributes.nameKeys.action,
            // ].join( ', ' ), // TODO:
            KeyConditionExpression: (
                `${ attributes.nameKeys.exchangeUserId } = ${ attributes.valueKeys.exchangeUserId }`
            ),
            // FilterExpression: (
                // `${ attributes.nameKeys.raffleId } = ${ attributes.valueKeys.raffleId }`// +
                // `${ attributes.nameKeys.raffleType } = ${ attributes.valueKeys.raffleType } and ` +
                // `${ attributes.nameKeys.choice } = ${ attributes.valueKeys.choice }`
            // ),
            ExpressionAttributeNames: {
                [attributes.nameKeys.exchangeUserId]: attributes.nameValues.exchangeUserId,
            },
            ExpressionAttributeValues: {
                [attributes.valueKeys.exchangeUserId]: exchangeUserId,
            },
            ExclusiveStartKey: (!!lastTimeToUse && !!lastTransactionIdToUse) ? {
                
                transactionId: lastTransactionIdToUse,
                creationDate: lastTimeToUse,
                exchangeUserId,
    
            } : undefined,
        };
    
        const {
    
            ultimateResults,
            paginationValue
    
        } = await searchDatabase({
    
            searchParams
        });

        const batchOfTransactions = ultimateResults;

        transactions.push( ...batchOfTransactions );

        // IMPLEMENTED_OPTIMIZATION: if small batch and is small batch length
        if( smallBatch && (transactions.length === searchLimitToUse) ) {

            thereIsMoreDataToGet = false;

            const lastIndex = transactions.length - 1;

            lastTimeToUse = transactions[ lastIndex ].creationDate;
            lastTransactionIdToUse = transactions[ lastIndex ].transactionId;
        }
        else if( !paginationValue ) {

            thereIsMoreDataToGet = false;
            
            if( transactions.length <= searchLimitToUse ) {

                lastTimeToUse = null;
                lastTransactionIdToUse = null;
            }
            else {

                transactions.length = searchLimitToUse;

                const lastIndex = transactions.length - 1;

                lastTimeToUse = transactions[ lastIndex ].creationDate;
                lastTransactionIdToUse = transactions[ lastIndex ].transactionId;
            }
        }
        else {
            
            if( transactions.length <= searchLimitToUse ) {

                lastTimeToUse = paginationValue.creationDate;
                lastTransactionIdToUse = paginationValue.transactionId;
            }
            else {

                thereIsMoreDataToGet = false;

                transactions.length = searchLimitToUse;

                const lastIndex = transactions.length - 1;

                lastTimeToUse = transactions[ lastIndex ].creationDate;
                lastTransactionIdToUse = transactions[ lastIndex ].transactionId;
            }
        }
    }

    const data = {

        transactions
    };

    if( !!lastTimeToUse && !!lastTransactionIdToUse ) {

        Object.assign(

            data,
            {
                lastTransactionId: lastTransactionIdToUse,
                lastTime: lastTimeToUse,
            }
        );
    }
    else {

        Object.assign(

            data,
            {
                lastTransactionId: null,
                lastTime: null,
            }
        );
    }

    console.log(
        'getData executed successfully - ' +
        `got ${ data.transactions.length } transactions - ` +
        `the search limit is: ${ searchLimitToUse }`
    );

    return data;
});
