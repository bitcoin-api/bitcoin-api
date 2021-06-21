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
    constants: {
        environment: {
            isProductionMode
        }
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const {

    constants: {
        aws: {
            database: {
                tableNames: {
                    TRANSACTIONS
                },
                // tableNameToKey,
                secondaryIndices: {
                    searchIdCreationDateIndex
                }
            }
        },
        raffles: {
            types: {
                putTicket
            },
            actions: {
                buy,
                // cancel
            }
        }
    }

} = require( '@bitcoin-api/full-stack-exchange-private' );


const searchLimit = 1000;

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
     
        searchId: '#searchId',
        raffleType: '#raffleType',
        choice: '#choice',
        creationDate: '#creationDate',
    }),

    nameValues: f({
        
        raffleType: 'raffleType',
        searchId: 'searchId',
        choice: 'choice',
        creationDate: 'creationDate',
    }),

    valueKeys: f({

        raffleType: ':raffleType',
        searchId: ':searchId',
        choice: ':choice',
        currentHour: ':currentHour',
    }),
});


module.exports = Object.freeze( async ({

    raffleId,
    choice,
    currentHour,

}) => {

    console.log(
        
        'running getWinnerExchangeUserIds, YES🦖👑👑👑 - ' +
        'using the following values: ' +
        stringify({
            raffleId,
            choice,
            currentHour,
        })
    );

    const exchangeUserIdToWinData = {};

    let paginationValueToUse = null;
    let iterationCount = 0;

	do {

	    console.log(
	    	'getWinnerExchangeUserIds - ' +
	        'running transactions search: ' +
	        stringify({

                exchangeUserIdToWinData,
	            paginationValueToUse,
                iterationCount,
	        })
	    );
		
	    const searchParams = {
	        TableName: TRANSACTIONS,
	        IndexName: searchIdCreationDateIndex,
	        Limit: searchLimit,
			ScanIndexForward: true,
            // ProjectionExpression: [
            //     attributes.nameKeys.amount,
            //     attributes.nameKeys.creationDate,
            //     attributes.nameKeys.action,
            // ].join( ', ' ), // TODO:
            KeyConditionExpression: (
                `${ attributes.nameKeys.searchId } = ${ attributes.valueKeys.searchId } and ` +
                `${ attributes.nameKeys.creationDate } <= ${ attributes.valueKeys.currentHour }`
            ),
            FilterExpression: (
                `${ attributes.nameKeys.raffleType } = ${ attributes.valueKeys.raffleType } and ` +
                `${ attributes.nameKeys.choice } = ${ attributes.valueKeys.choice }`
            ),
            ExpressionAttributeNames: {
                [attributes.nameKeys.searchId]: attributes.nameValues.searchId,
                [attributes.nameKeys.raffleType]: attributes.nameValues.raffleType,
                [attributes.nameKeys.choice]: attributes.nameValues.choice,
                [attributes.nameKeys.creationDate]: attributes.nameValues.creationDate,
            },
            ExpressionAttributeValues: {
                [attributes.valueKeys.searchId]: raffleId,
                [attributes.valueKeys.raffleType]: putTicket,
                [attributes.valueKeys.choice]: choice,
                [attributes.valueKeys.currentHour]: isProductionMode ? currentHour : Date.now(),
                // [attributes.valueKeys.currentHour]: Date.now(),
            },
	        ExclusiveStartKey: paginationValueToUse || undefined,
	    };

	    const {

	        ultimateResults,
	        paginationValue

	    } = await searchDatabase({

	        searchParams
        });
        
        const raffleTransactions = ultimateResults;

        for( const transaction of raffleTransactions ) {

            if( transaction.action === buy ) {

                exchangeUserIdToWinData[ transaction.exchangeUserId ] = true;
            }
            else {

                delete exchangeUserIdToWinData[ transaction.exchangeUserId ];
            }
        }

		if( !!paginationValue ) {

			paginationValueToUse = paginationValue;
	    	iterationCount++;
	    }
	    else if( !!paginationValueToUse ) {

            paginationValueToUse = null;
        }

    } while( !!paginationValueToUse );

    const winnerExchangeUserIds = Object.keys( exchangeUserIdToWinData );

    console.log(
        'getWinnerExchangeUserIds executed successfully✅✅✅✅✅✅ - ' +
        'here are the winnerExchangeUserIds: ' +
        stringify( winnerExchangeUserIds )        
    );

    return winnerExchangeUserIds;
});
