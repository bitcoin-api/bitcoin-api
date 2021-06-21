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
} = require( '@bitcoin-api/full-stack-api-private' );

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
		}
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

const quickSearchLimit = 100;
const normalSearchLimit = 1000;

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
     
        exchangeUserId: '#exchangeUserId',
        voteId: '#voteId',
        choice: '#choice',
        amount: '#amount',
        creationDate: '#creationDate',
        voteType: '#voteType',
        eventSeriesId: '#eventSeriesId',
    }),

    nameValues: f({
     
        exchangeUserId: 'exchangeUserId',
        voteId: 'voteId',
        choice: 'choice',
        amount: 'amount',
        creationDate: 'creationDate',
        voteType: 'voteType',
        eventSeriesId: 'eventSeriesId',
    }),

    valueKeys: f({

        exchangeUserId: ':exchangeUserId',
        voteIdToConsider: ':voteIdToConsider',
    }),
});


const getSearchParamsComponents = Object.freeze( ({

	shouldGetEventSeriesId,

}) => {

	const projectionExpressionKeys = [
		
		attributes.nameKeys.choice,
		attributes.nameKeys.amount,
		attributes.nameKeys.creationDate,
		attributes.nameKeys.voteType,
	];

	const expressionAttributeNames = {
		
		[attributes.nameKeys.exchangeUserId]: attributes.nameValues.exchangeUserId,
		[attributes.nameKeys.voteId]: attributes.nameValues.voteId,
		[attributes.nameKeys.choice]: attributes.nameValues.choice,
		[attributes.nameKeys.amount]: attributes.nameValues.amount,
		[attributes.nameKeys.creationDate]: attributes.nameValues.creationDate,
		[attributes.nameKeys.voteType]: attributes.nameValues.voteType,
	};

	if( shouldGetEventSeriesId ) {
		
		projectionExpressionKeys.push( attributes.nameKeys.eventSeriesId );
		expressionAttributeNames[ attributes.nameKeys.eventSeriesId ] = attributes.nameValues.eventSeriesId;
	}

	const projectionExpression = projectionExpressionKeys.join( ', ' );

	return {
		
		projectionExpression,
		expressionAttributeNames
	};
});


module.exports = Object.freeze( async ({

    exchangeUserId,
	voteId,
	shouldGetEventSeriesId = false,

}) => {

	console.log(

		'running getMostRecentVoteTransaction with ' +
		'the following values: ' +
		stringify({

			exchangeUserId,
			voteId,
		})
	);

	const {

		projectionExpression,
		expressionAttributeNames,

	} = getSearchParamsComponents({

		shouldGetEventSeriesId
	});

	let iterationCount = 0;
	let paginationValueToUse = null;
	
	do {

	    console.log(
	    	'getMostRecentVoteTransaction - ' +
	        'running transactions search: ' +
	        stringify({

	            paginationValueToUse,
	            iterationCount,
	        })
	    );
		
		const searchLimit = (
			iterationCount > 0
		) ? normalSearchLimit : quickSearchLimit;

		/*
			{
				"amount": -0.3,
				"choice": "mayweather",
				"creationDate": 1600611891313,
				"eventSeriesId": "test_event_series_id_2",
				"exchangeUserId": "exchange_user_8266676140114f7190b0f41c48cbc767",
				"lastUpdated": 1600611891701,
				"transactionId": "transaction_46fc428cad324dc6a9cb9c73f0bd8428_1600611891700",
				"type": "vote",
				"voteId": "mmaFight",
				"voteType": "doVote"
			}
		*/

	    const searchParams = {
	        TableName: TRANSACTIONS,
	        IndexName: exchangeUserIdCreationDateIndex,
	        Limit: searchLimit,
			ScanIndexForward: false,
			ProjectionExpression: projectionExpression,
	        KeyConditionExpression: (
	            `${ attributes.nameKeys.exchangeUserId } = ${ attributes.valueKeys.exchangeUserId }`
	        ),
            FilterExpression: (
                `${ attributes.nameKeys.voteId } = ${ attributes.valueKeys.voteIdToConsider }`
            ),
	        ExpressionAttributeNames: expressionAttributeNames,
	        ExpressionAttributeValues: {
	            [attributes.valueKeys.exchangeUserId]: exchangeUserId,
	            [attributes.valueKeys.voteIdToConsider]: voteId,
	        },
	        ExclusiveStartKey: paginationValueToUse || undefined,
	    };

	    const {

	        ultimateResults,
	        paginationValue

	    } = await searchDatabase({

	        searchParams
	    });

	    if( ultimateResults.length > 0 ) {

			const mostRecentTransaction = ultimateResults[0];

			console.log(
				'getMostRecentVoteTransaction ' +
				'executed successfully, got the most recent transaction: ' +
				stringify( mostRecentTransaction )
			);

			return mostRecentTransaction;
	    }

		if( !!paginationValue ) {

			paginationValueToUse = paginationValue;
	    	iterationCount++;
	    }
	    else if( !!paginationValueToUse ) {

			paginationValueToUse = null;
	    }

	} while( !!paginationValueToUse );

	console.log(
    	'getMostRecentVoteTransaction ' +
        'executed successfully no vote transaction found, ' +
        'returning null'
    );

	return null;
});
