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
    // constants: {
    //     aws: {
    //         database: {
    //             secondaryIndex: {
    //                 typeCreationDateIndex
    //             },
    //         }
    //     },
    // }

} = require( '@bitcoin-api/full-stack-api-private' );

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    TRANSACTIONS
                },
                secondaryIndices: {
                    searchIdCreationDateIndex                    
                }
            }
        },
        // transactions: {
        //     types: {
        //         raffle
        //     }
        // },
        raffles: {
            types: {
                putTicket
            }
        }
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

const searchLimit = 1000;


const f = Object.freeze;

const attributes = f({

    nameKeys: f({
     
        // raffleId: '#raffleId',
        raffleType: '#raffleType',
        searchId: '#searchId',
        amount: '#amount',
    }),

    nameValues: f({
     
        // raffleId: 'raffleId',
        raffleType: 'raffleType',
        searchId: 'searchId',
        amount: 'amount',
    }),

    valueKeys: f({

        // raffleId: ':raffleId',
        raffleType: ':raffleType',
        searchId: ':searchId',
    }),
});


module.exports = Object.freeze( async ({

    putTicketEvent

}) => {

    console.log(
        
        'running getCurrentRafflePotAmountData with the following values: ' +
        stringify({
            putTicketEvent
        })
    );

    let currentRafflePotAmount = 0;
    let paginationValueToUse = null;
    let iterationCount = 0;

	do {

	    console.log(
	    	'getCurrentRafflePotAmountData - ' +
	        'running transactions search: ' +
	        stringify({

                currentRafflePotAmount,
	            paginationValueToUse,
                iterationCount,
	        })
	    );
		
	    const searchParams = {
	        TableName: TRANSACTIONS,
	        IndexName: searchIdCreationDateIndex,
	        Limit: searchLimit,
			ScanIndexForward: true,
            ProjectionExpression: [
                attributes.nameKeys.amount,
            //     attributes.nameKeys.creationDate,
            //     attributes.nameKeys.action,
            ].join( ', ' ), // TODO:
            KeyConditionExpression: (
                `${ attributes.nameKeys.searchId } = ${ attributes.valueKeys.searchId }`
            ),
            FilterExpression: (
                // `${ attributes.nameKeys.raffleId } = ${ attributes.valueKeys.raffleId } and ` +
                `${ attributes.nameKeys.raffleType } = ${ attributes.valueKeys.raffleType }`
            ),
            ExpressionAttributeNames: {
                [attributes.nameKeys.raffleType]: attributes.nameValues.raffleType,
                [attributes.nameKeys.searchId]: attributes.nameValues.searchId,
                [attributes.nameKeys.amount]: attributes.nameValues.amount,
                // [attributes.nameKeys.raffleId]: attributes.nameValues.raffleId,
            },
            ExpressionAttributeValues: {
                [attributes.valueKeys.searchId]: putTicketEvent.raffleId,
                [attributes.valueKeys.raffleType]: putTicket,
                // [attributes.valueKeys.raffleId]: command.raffleId,
            },
	        ExclusiveStartKey: paginationValueToUse || undefined,
	    };

	    const {

	        ultimateResults,
	        paginationValue

	    } = await searchDatabase({

	        searchParams
        });
        
        const rafflePutTicketTransactions = ultimateResults;

        for( const transaction of rafflePutTicketTransactions ) {

            currentRafflePotAmount += transaction.amount;
        }

		if( !!paginationValue ) {

			paginationValueToUse = paginationValue;
	    	iterationCount++;
	    }
	    else if( !!paginationValueToUse ) {

            paginationValueToUse = null;
        }

    } while( !!paginationValueToUse );

    const currentRafflePotAmountData = {

        currentRafflePotAmount: Math.abs( currentRafflePotAmount )
    };

    console.log(
        
        'getCurrentRafflePotAmountData executed successfully ' +
        'returning currentRafflePotAmountData: ' +
        stringify( currentRafflePotAmountData )
    );

    return currentRafflePotAmountData;
});
