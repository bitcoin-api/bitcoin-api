'use strict';

const {
    utils: {
        aws: {
            dino: {
                searchDatabase,
            }
        },
        stringify,
    },
    constants: {
        aws: {
            database: {
                tableNames: { ADDRESSES },
            }
        }
    }
} = require( '@bitcoin-api/full-stack-api-private' );


const updateAlienBalanceDatum = require( './updateAlienAddressDatum' );

const searchLimit = 1000;

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

const alien = 'alien';


module.exports = Object.freeze( async () => {

    console.log(
        
        'running updateAlienBalanceData ' +
        `with the following values - ${ stringify({}) }`
    );

    let paginationValueToUse = null;
    let iterationCount = 0;

    do {

        console.log(
	    	'updateAlienBalanceData - ' +
	        'running address search: ' +
	        stringify({

	            paginationValueToUse,
	            iterationCount,
	        })
        );
		
	    const searchParams = {
	        TableName: ADDRESSES,
	        // IndexName: addressIndex,
	        Limit: searchLimit,
			// ScanIndexForward: true,
			// ProjectionExpression: [
            //     // attributes                
            // ].join( ', ' ), // TODO:
	        KeyConditionExpression: (
                `${ attributes.nameKeys.exchangeUserId } = ` +
                `${ attributes.valueKeys.exchangeUserId }`
	        ),
            // FilterExpression: (),
	        ExpressionAttributeNames: {
                [attributes.nameKeys.exchangeUserId]: attributes.nameValues.exchangeUserId,
            },
	        ExpressionAttributeValues: {
	            [attributes.valueKeys.exchangeUserId]: alien,
	        },
	        ExclusiveStartKey: paginationValueToUse || undefined,
	    };

	    const {

	        ultimateResults,
	        paginationValue

	    } = await searchDatabase({

	        searchParams
        });

        const alienAddressData = ultimateResults;

        for( const alienAddressDatum of alienAddressData ) {

            await updateAlienBalanceDatum( alienAddressDatum );
        }

		if( !!paginationValue ) {

			paginationValueToUse = paginationValue;
            iterationCount++;
	    }
	    else if( !!paginationValueToUse ) {

			paginationValueToUse = null;
        }

    } while( !!paginationValueToUse );
});
