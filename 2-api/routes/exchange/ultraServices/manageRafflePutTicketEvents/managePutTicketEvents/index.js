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
        aws: {
            database: {
                tableNames: {
                    METADATA
                },
                tableNameToKey,
                secondaryIndex: {
                    typeCreationDateIndex
                }
            }
        },
        metadata: {
            types: {
                rafflePutTicketEvent
            }
        }
    }

} = require( '@bitcoin-api/full-stack-api-private' );

const doManagePutTicketEvent = require( './doManagePutTicketEvent' );
const deleteRafflePutTicketEvent = require( './deleteRafflePutTicketEvent' );

const searchLimit = 1000;

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
     
        type: '#type',
    }),

    nameValues: f({
     
        type: 'type',
    }),

    valueKeys: f({

        type: ':type',
    }),
});


module.exports = Object.freeze( async () => {

    console.log( 'running managePutTicketEvents, YES🦖👑👑👑' );

    let paginationValueToUse = null;
    let iterationCount = 0;

	do {

	    console.log(
	    	'managePutTicketEvents - ' +
	        'running metadata search: ' +
	        stringify({

	            paginationValueToUse,
                iterationCount,
	        })
	    );
		
	    const searchParams = {
	        TableName: METADATA,
	        IndexName: typeCreationDateIndex,
	        Limit: searchLimit,
			ScanIndexForward: true,
            // ProjectionExpression: [
            //     attributes.nameKeys.amount,
            //     attributes.nameKeys.creationDate,
            //     attributes.nameKeys.action,
            // ].join( ', ' ), // TODO:
            KeyConditionExpression: (
                `${ attributes.nameKeys.type } = ${ attributes.valueKeys.type }`
            ),
            // FilterExpression: (
            //     `${ attributes.nameKeys.raffleId } = ${ attributes.valueKeys.raffleId } and ` +
            //     `${ attributes.nameKeys.raffleType } = ${ attributes.valueKeys.raffleType } and ` +
            //     `${ attributes.nameKeys.choice } = ${ attributes.valueKeys.choice }`
            // ),
            ExpressionAttributeNames: {
                [attributes.nameKeys.type]: attributes.nameValues.type,
            },
            ExpressionAttributeValues: {
                [attributes.valueKeys.type]: rafflePutTicketEvent,
            },
	        ExclusiveStartKey: paginationValueToUse || undefined,
	    };

	    const {

	        ultimateResults,
	        paginationValue

	    } = await searchDatabase({

	        searchParams
        });
        
        const rafflePutTicketEvents = ultimateResults;

        for( const putTicketEvent of rafflePutTicketEvents ) {

            await doManagePutTicketEvent({

                putTicketEvent,
            });

            await deleteRafflePutTicketEvent({

                rafflePutTicketEventId: putTicketEvent[
                    tableNameToKey[ METADATA ]
                ],
            });
        }

		if( !!paginationValue ) {

			paginationValueToUse = paginationValue;
	    	iterationCount++;
	    }
	    else if( !!paginationValueToUse ) {

            paginationValueToUse = null;
        }

    } while( !!paginationValueToUse );

    console.log( 'managePutTicketEvents executed successfully✅✅✅✅✅✅' );
});
