'use strict';

const {
    utils: {
        aws: {
            dino: {
                searchDatabase,
            },
        },
        stringify
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    constants: {
        raffles: {
            actions: {
                buy,
            }
        } 
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    TRANSACTIONS,
                },
                secondaryIndices: {
                    exchangeUserIdCreationDateIndex,
                }
            }
        },
        raffles: {
            types: {
                putTicket,
            }
        }
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

const searchLimit = 1000;

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
     
        amount: '#amount',
        creationDate: '#creationDate',
        exchangeUserId: '#exchangeUserId',
        searchId: '#searchId',
        raffleType: '#raffleType',
        choice: '#choice',
        action: '#action',
    }),

    nameValues: f({
     
        amount: 'amount',
        creationDate: 'creationDate',
        exchangeUserId: 'exchangeUserId',
        searchId: 'searchId',
        raffleType: 'raffleType',
        choice: 'choice',
        action: 'action'
    }),

    valueKeys: f({

        exchangeUserId: ':exchangeUserId',
        searchId: ':searchId',
        raffleType: ':raffleType',
        choice: ':choice',
    }),
});


module.exports = Object.freeze( async ({

    raffleId,
    choice,
    exchangeUserId,
    
}) => {

    console.log(
        
        `running getCurrentChoiceData with the following values - ${
            
            stringify({

                raffleId,
                choice,
                exchangeUserId,
            })
        }`
    );

    let currentChoiceAmount = 0;

    let paginationValueToUse = null;
    let iterationCount = 0;

    const currentChoiceData = {

        currentAmountForChoice: null,
        mostRecentBuyTransactionCreationDate: null,
    };

	do {

	    console.log(
	    	'getCurrentChoiceData - ' +
	        'running transactions search: ' +
	        stringify({

                currentChoiceAmount,
	            paginationValueToUse,
                iterationCount,
	        })
	    );
		
	    const searchParams = {
	        TableName: TRANSACTIONS,
	        IndexName: exchangeUserIdCreationDateIndex,
	        Limit: searchLimit,
			ScanIndexForward: true,
            ProjectionExpression: [
                attributes.nameKeys.amount,
                attributes.nameKeys.creationDate,
                attributes.nameKeys.action,
            ].join( ', ' ),
	        KeyConditionExpression: (
	            `${ attributes.nameKeys.exchangeUserId } = ${ attributes.valueKeys.exchangeUserId }`
	        ),
            FilterExpression: (
                `${ attributes.nameKeys.searchId } = ${ attributes.valueKeys.searchId } and ` +
                `${ attributes.nameKeys.raffleType } = ${ attributes.valueKeys.raffleType } and ` +
                `${ attributes.nameKeys.choice } = ${ attributes.valueKeys.choice }`
            ),
	        ExpressionAttributeNames: {
                [attributes.nameKeys.creationDate]: attributes.nameValues.creationDate,
                [attributes.nameKeys.amount]: attributes.nameValues.amount,
                [attributes.nameKeys.exchangeUserId]: attributes.nameValues.exchangeUserId,
                [attributes.nameKeys.searchId]: attributes.nameValues.searchId,
                [attributes.nameKeys.raffleType]: attributes.nameValues.raffleType,
                [attributes.nameKeys.choice]: attributes.nameValues.choice,
                [attributes.nameKeys.action]: attributes.nameValues.action,
            },
	        ExpressionAttributeValues: {
	            [attributes.valueKeys.exchangeUserId]: exchangeUserId,
	            [attributes.valueKeys.searchId]: raffleId,
	            [attributes.valueKeys.raffleType]: putTicket,
	            [attributes.valueKeys.choice]: choice,
	        },
	        ExclusiveStartKey: paginationValueToUse || undefined,
	    };

	    const {

	        ultimateResults,
	        paginationValue

	    } = await searchDatabase({

	        searchParams
        });
        
        const retrievedTransactions = ultimateResults;

        for( const transaction of retrievedTransactions ) {

            currentChoiceAmount += transaction.amount;
        }

		if( !!paginationValue ) {

			paginationValueToUse = paginationValue;
	    	iterationCount++;
	    }
	    else if( !!paginationValueToUse ) {

            paginationValueToUse = null;
        }

        if(
            !paginationValueToUse &&
            (retrievedTransactions.length > 0) &&
            (
                retrievedTransactions[
                    retrievedTransactions.length - 1
                ].action === buy
            )
         ) {
            
            currentChoiceData.mostRecentBuyTransactionCreationDate = (

                retrievedTransactions[
                    retrievedTransactions.length - 1
                ].creationDate
            );
        }

    } while( !!paginationValueToUse );
    
    currentChoiceData.currentAmountForChoice = currentChoiceAmount;

    console.log(
        
        `getCurrentChoiceData executed successfully
            returning current choice data - ${
            
            stringify( currentChoiceData )
        }`
    );

    return currentChoiceData;
});