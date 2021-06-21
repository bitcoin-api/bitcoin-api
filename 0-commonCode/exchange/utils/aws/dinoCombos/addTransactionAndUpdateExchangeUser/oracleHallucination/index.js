'use strict';

const {
    utils: {
        aws: {
            dino: {
                searchDatabase,
            }
        },
        stringify,
        javascript: {
            getEnvNumberValue
        }
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const constants = require( '../../../../../constants' );

const {
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
} = constants;

const processTransactions = require( './processTransactions' );

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

const searchLimit = getEnvNumberValue({

    key: 'ORACLE_HALLUCINATION_SEARCH_LIMIT',
    min: 1,
    max: 2000000,
    shouldBeInteger: true,
    defaultValue: 5000
});


const oracleHallucination = Object.freeze( async ({

    exchangeUserId,
    theOracleOfDelphiDefi,
    withdrawIdToData = {}, 
    voteIdToData = {}, 
    // transactionToAdd = null,
    transactionToAdd,

    paginationValueToUse = null,  // will be null on first time always
    iterationCount = 0, // will be 0 on first time always

    transactionCount = 0,

    searchDb,

}) => {

    console.log(
        '🐐☢️⏫⏫⏫running oracleHallucination: ' +
        stringify({

            exchangeUserId,
            theOracleOfDelphiDefi,
            withdrawIdToData,
            voteIdToData,
            transactionToAdd,
            paginationValueToUse,
            iterationCount,
            transactionCount,
            searchDb,
        })
    );
    
    if( searchDb ) {

        const searchParams = {
            TableName: TRANSACTIONS,
            IndexName: exchangeUserIdCreationDateIndex,
            Limit: searchLimit,
            ScanIndexForward: true,
            KeyConditionExpression: (
                `${ attributes.nameKeys.exchangeUserId } = ${ attributes.valueKeys.exchangeUserId }`
            ),
            ExpressionAttributeNames: {
                [attributes.nameKeys.exchangeUserId]: attributes.nameValues.exchangeUserId,
            },
            ExpressionAttributeValues: {
                [attributes.valueKeys.exchangeUserId]: exchangeUserId,
            },
            ExclusiveStartKey: paginationValueToUse || undefined,
        };
    
        const {
    
            ultimateResults,
            paginationValue
    
        } = await searchDatabase({
    
            searchParams
        });

        const transactions = ultimateResults.slice();

        transactionCount += transactions.length;
    
        processTransactions({
    
            transactions,
            theOracleOfDelphiDefi,
            withdrawIdToData,
            voteIdToData,
        });

        paginationValueToUse = paginationValue;
    }

    if( !paginationValueToUse ) {

        transactionCount++;

        processTransactions({

            transactions: [
                transactionToAdd
            ],
            theOracleOfDelphiDefi,
            withdrawIdToData,
            voteIdToData,
        });

        const hallucinationInsights = {

            transactionCount,
            existingAtaueu: {
                oracleGhost: {
                    theOracleOfDelphiDefi,
                    withdrawIdToData,
                },
            },
        }; // what do you see 👀......

        console.log(
            '🐐☢️⏫⏫⏫oracleHallucination executed successfully - ' + 
            `${ stringify({ hallucinationInsights })}`
        );

        return hallucinationInsights;
    }

    return await oracleHallucination({

        exchangeUserId,
        theOracleOfDelphiDefi,
        withdrawIdToData,
        voteIdToData,
        transactionToAdd,
        paginationValueToUse,
        iterationCount: iterationCount + 1,
        transactionCount,
        searchDb,
    });
});


module.exports = oracleHallucination;
