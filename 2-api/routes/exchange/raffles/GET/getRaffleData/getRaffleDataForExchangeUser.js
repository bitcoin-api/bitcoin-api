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
        metadata: {
            types: {
                raffle
            }
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
                secondaryIndices: {
                    exchangeUserIdCreationDateIndex,
                }
            }
        },
        raffles: {
            types: {
                putTicket,
                payout
            }
        }
    }

} = require( '@bitcoin-api/full-stack-exchange-private' );

const {
    crypto: {
        getCryptoAmountNumber
    }
} = require( '../../../../../exchangeUtils' );

const {
    raffle: {
        getChoiceTimeData
    }
} = require( '../../../../../enchantedUtils' );

const searchLimit = 1000;

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
     
        exchangeUserId: '#exchangeUserId',
        searchId: '#searchId',
        type: '#type',
        creationDate: '#creationDate',
    }),

    nameValues: f({
     
        exchangeUserId: 'exchangeUserId',
        searchId: 'searchId',
        type: 'type',
        creationDate: 'creationDate',
    }),

    valueKeys: f({

        exchangeUserId: ':exchangeUserId',
        searchId: ':searchId',
        type: ':type',
        startTime: ':startTime',
        endTime: ':endTime'
    }),

    valueValues: f({

        type: raffle,
    })
});


module.exports = Object.freeze( async ({

    raffleId,
    exchangeUserId,
    startTime = 1,
    endTime = Date.now(),

}) => {

    console.log(
        
        'running getRaffleDataForExchangeUser ' +
        `with the following values - ${ stringify({

            raffleId,
            exchangeUserId,
            startTime,
            endTime,
        }) }`
    );

    const rawRaffleDataForExchangeUser = {

        choiceToPutTicketData: {},
        winData: null
    };

    let paginationValueToUse = null;
    let iterationCount = 0;

    do {

        console.log(
	    	'getRaffleDataForExchangeUser - ' +
	        'running transactions search: ' +
	        stringify({

	            paginationValueToUse,
	            iterationCount,
	        })
        );
		
	    const searchParams = {
	        TableName: TRANSACTIONS,
	        IndexName: exchangeUserIdCreationDateIndex,
	        Limit: searchLimit,
			ScanIndexForward: true,
			// ProjectionExpression: [
            //     // attributes                
            // ].join( ', ' ), // TODO:
	        KeyConditionExpression: (
                `${ attributes.nameKeys.exchangeUserId } = ` +
                `${ attributes.valueKeys.exchangeUserId } and ` +
                `${ attributes.nameKeys.creationDate } between ` +
                `${ attributes.valueKeys.startTime } and ` +
                `${ attributes.valueKeys.endTime }`
	        ),
            FilterExpression: (
                `${ attributes.nameKeys.type } = ` +
                `${ attributes.valueKeys.type } and ` +
                `${ attributes.nameKeys.searchId } = ` +
                `${ attributes.valueKeys.searchId }`
            ),
	        ExpressionAttributeNames: {
                [attributes.nameKeys.exchangeUserId]: attributes.nameValues.exchangeUserId,
                [attributes.nameKeys.type]: attributes.nameValues.type,
                [attributes.nameKeys.searchId]: attributes.nameValues.searchId,
                [attributes.nameKeys.creationDate]: attributes.nameValues.creationDate,
            },
	        ExpressionAttributeValues: {
	            [attributes.valueKeys.exchangeUserId]: exchangeUserId,
	            [attributes.valueKeys.type]: attributes.valueValues.type,
	            [attributes.valueKeys.searchId]: raffleId,
	            [attributes.valueKeys.startTime]: startTime,
	            [attributes.valueKeys.endTime]: endTime,
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

            if( transaction.raffleType === putTicket ) {

                const existingPutTicketData = (
                    
                    rawRaffleDataForExchangeUser.choiceToPutTicketData[
                        transaction.choice
                    ]

                ) || {

                    amount: 0
                };

                const newAmount = getCryptoAmountNumber(
                    transaction.amount +
                    existingPutTicketData.amount
                );

                if( newAmount === 0 ) {

                    delete rawRaffleDataForExchangeUser
                            .choiceToPutTicketData[ transaction.choice ];
                }
                else {

                    rawRaffleDataForExchangeUser.choiceToPutTicketData[

                        transaction.choice
    
                    ] = {
                        
                        amount: newAmount,
                        lastCancelTime: getChoiceTimeData({

                            timestamp: transaction.creationDate

                        }).lastCancelTime,
                    };
                }
            }
            else if( transaction.raffleType === payout ) {

                if( !!rawRaffleDataForExchangeUser.winData ) {

                    throw new Error(
                        'getRaffleDataForExchangeUser error - ' +
                        `multiple payouts for raffle ${ raffleId }: ` +
                        JSON.stringify( transaction, null, 4 )
                    );
                }

                rawRaffleDataForExchangeUser.winData = {

                    hasWon: true,
                    amount: transaction.amount
                };
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

    const raffleDataForExchangeUser = {
        
        choices: Object.keys(
        
            rawRaffleDataForExchangeUser.choiceToPutTicketData

        ).map(

            choice => {

                const putTicketData = (
                    rawRaffleDataForExchangeUser
                        .choiceToPutTicketData[ choice ]
                );
                
                return {

                    choice,
                    amount: Math.abs( putTicketData.amount ),
                    lastCancelTime: putTicketData.lastCancelTime
                };
            }
        ),
        winData: rawRaffleDataForExchangeUser.winData || {

            hasWon: false,
            amount: 0
        }
    };

    console.log(
        'getRaffleDataForExchangeUser executed successfully, ' +
        `returning raffleDataForExchangeUser ${ stringify(
            raffleDataForExchangeUser
        ) }`
    );

    return raffleDataForExchangeUser;
});