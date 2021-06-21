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
    }

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
     
        raffleType: '#raffleType',
        searchId: '#searchId',
        creationDate: '#creationDate',
        amount: '#amount',
    }),

    nameValues: f({
     
        raffleType: 'raffleType',
        searchId: 'searchId',
        creationDate: 'creationDate',
        amount: 'amount',
    }),

    valueKeys: f({

        raffleType: ':raffleType',
        searchId: ':searchId',
        currentHour: ':currentHour',
    }),
});

// TODO: use sacred elements
module.exports = Object.freeze( async ({

    raffleId,
    currentHour

}) => {

    console.log(
        
        'running getCryptoPotData with the following values: ' +
        stringify({
            raffleId,
            currentHour,
        })
    );

    let cryptoPot = 0;
    let paginationValueToUse = null;
    let iterationCount = 0;

	do {

	    console.log(
	    	'getCryptoPotData - ' +
	        'running transactions search: ' +
	        stringify({

                cryptoPot,
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
                attributes.nameKeys.amount
            ].join( ', ' ),
            KeyConditionExpression: ( 
                `${ attributes.nameKeys.searchId } = ${ attributes.valueKeys.searchId } and ` +
                `${ attributes.nameKeys.creationDate } <= ${ attributes.valueKeys.currentHour }`
            ),
            FilterExpression: (
                `${ attributes.nameKeys.raffleType } = ${ attributes.valueKeys.raffleType }`
            ),
            ExpressionAttributeNames: {
                [attributes.nameKeys.raffleType]: attributes.nameValues.raffleType,
                [attributes.nameKeys.searchId]: attributes.nameValues.searchId,
                [attributes.nameKeys.creationDate]: attributes.nameValues.creationDate,
                [attributes.nameKeys.amount]: attributes.nameValues.amount,
            },
            ExpressionAttributeValues: {
                [attributes.valueKeys.searchId]: raffleId,
                [attributes.valueKeys.raffleType]: putTicket,
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
        
        const transactions = ultimateResults;

        for( const transaction of transactions ) {

            cryptoPot += transaction.amount;
        }

		if( !!paginationValue ) {

			paginationValueToUse = paginationValue;
	    	iterationCount++;
	    }
	    else if( !!paginationValueToUse ) {

            paginationValueToUse = null;
        }

    } while( !!paginationValueToUse );

    const cryptoPotData = {

        cryptoPot: Math.abs( cryptoPot )
    };

    console.log(
        
        'getCryptoPotData executed successfully ' +
        'returning cryptoPotData: ' +
        stringify( cryptoPotData )
    );

    return cryptoPotData;
});
