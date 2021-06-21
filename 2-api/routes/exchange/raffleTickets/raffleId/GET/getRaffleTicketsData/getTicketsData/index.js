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
        // aws: {
        //     database: {
        //         tableNames: {
        //             METADATA
        //         },
        //         tableNameToKey,
        //         secondaryIndex: {
        //             typeCreationDateIndex
        //         }
        //     }
        // },
        // metadata: {
        //     types: {
        //         raffleDraw
        //     }
        // },
        environment: {
            isProductionMode
        },
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
        raffles: {
            types: {
                putTicket
            }
        }
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

const {
    constants,
    exchangeUsers: {
        getHiddenGhostId
    }

    // javascript: {
    //     getHashedValue
    // }
} = require( '../../../../../../../exchangeUtils' );

// const {
//     javascript: {
//         getHashedValue
//     }
// } = require( '../../../../../../../utils' );

const getEncryptedPseudoSpecialId = require( './getEncryptedPseudoSpecialId' );


// const getEncryptedExchangeUserId = require(

//     '../../../../../../sacredElementals/crypto/getEncryptedExchangeUserId'
// );

// const searchLimit = isProductionMode ? 5000 : 100;
const searchLimit = isProductionMode ? 5000 : 3;

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
        searchId: '#searchId',
        raffleType: '#raffleType',
    }),

    nameValues: f({
        searchId: 'searchId',
        raffleType: 'raffleType',
    }),

    valueKeys: f({
        searchId: ':searchId',
        raffleType: ':raffleType',
    }),
});

// const key = tableNameToKey[ METADATA ];


module.exports = Object.freeze( async ({

    raffleId,
    time,
    transactionId,
    specialId,

}) => {

    console.log(

        'running getTicketsData with the following values: ' +
        stringify({

            raffleId,
            time,
            transactionId,
            specialId,
        })
    );
    
    // TODO: filter raffleType putTicket
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
            `${ attributes.nameKeys.searchId } = ${ attributes.valueKeys.searchId }`
        ),
        FilterExpression: (
            `${ attributes.nameKeys.raffleType } = ${ attributes.valueKeys.raffleType }`
        ),
        ExpressionAttributeNames: {
            [attributes.nameKeys.searchId]: attributes.nameValues.searchId,
            [attributes.nameKeys.raffleType]: attributes.nameValues.raffleType,
        },
        ExpressionAttributeValues: {
            [attributes.valueKeys.searchId]: raffleId,
            [attributes.valueKeys.raffleType]: putTicket,
        },
        ExclusiveStartKey: (!!time && !!specialId && !!transactionId) ? {
            
            creationDate: time,
            exchangeUserId: specialId,
            transactionId,
            searchId: raffleId

        } : undefined,
    };

    const {

        ultimateResults,
        paginationValue

    } = await searchDatabase({

        searchParams
    });

    const tickets = ultimateResults.map( ({
        
        choice,
        action,
        creationDate,
        exchangeUserId,

    }) => {

        const specialId = getHiddenGhostId({

            exchangeUserId,
        });

        return {

            choice,
            time: creationDate,
            specialId,
            action,
        };
    });

    const pageInfo = !!paginationValue ? {
        
        time: paginationValue.creationDate,
        powerId: paginationValue.transactionId.substring(
            constants.transactions.transactionId.prefix.length
        ),
        specialId: getEncryptedPseudoSpecialId({
            
            exchangeUserId: paginationValue.exchangeUserId,
        }),

    } : null;

    const ticketsData = {

        tickets,
        pageInfo,
    };

    console.log(
        'getTicketsData executed successfully - got ' +
        `${ ultimateResults.length } draws - ` +
        `the search limit is: ${ searchLimit }`
    );

    return ticketsData;
});
