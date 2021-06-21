#!/usr/bin/env node
'use strict';

const argv = require( 'yargs' ).argv;

const isProductionMode = argv.mode === 'production';

if( isProductionMode ) {

    require( 'dotenv' ).config({ path: `${ __dirname }/productionCredentials/.env` });
}
else {

    require( 'dotenv' ).config({ path: `${ __dirname }/stagingCredentials/.env` });
}


const {
    utils: {
        aws: {
            dino: {
                scanDatabase,
            }
        },
        stringify
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    // utils: {
    //     bitcoin: {
    //         formatting: {
    //             getAmountNumber
    //         }
    //     },
    // },
    constants: {
        aws: {
            database: {
                tableNames: {
                    EXCHANGE_USERS,
                    LOGIN_TOKENS
                }
            }
        }
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );


let noDoOp = true;
let doOperation = async () => {};
let doEndGameOperation = async () => {};
let tableName = null;
let filterExpression;
let expressionAttributeNames;
let expressionAttributeValues;

const selectedOperation = argv.o || argv.operation || 'writeStandardReport';

switch( selectedOperation ) {
    // case 'refreshExistingAtaeue': {
    //     doOperation = require( './operations/refreshExistingAtaeue' );
    //     doEndGameOperation = require( './endGameOperations/refreshExistingAtaeue' );
    //     tableName = EXCHANGE_USERS;
    //     noDoOp = false;
    //     break;
    // }
    case 'l':
    case 'loginTokens': {
        filterExpression = (
            '#lastUpdated >= :searchStart'
        );
        expressionAttributeNames = {
            '#lastUpdated': 'lastUpdated',
        };
        expressionAttributeValues = {
            ':searchStart': Date.now() - (1000 * 60 * 60 * 24),
        };
        doEndGameOperation = require( './endGameOperations/writeLoginTokensReport' );
        tableName = LOGIN_TOKENS;
        break;
    }
    case 'writeStandardReport':
    default: {
        doEndGameOperation = require( './endGameOperations/writeStandardReport' );
        tableName = EXCHANGE_USERS;
        break;
    }
}

const limit = Number( argv.limit ) || 1000;


const dbOperationOnAll = async ({

    doOperation,
    tableName,

}) => {

    console.log(
        'dbOperationOnAll: ' +
        stringify({
            selectedOperation
        })
    );

    let paginationValueToUse = null;
    let iterationCount = 0;
    let allItems = [];

    let doOperationCounter = 0;

    do {

        console.log(
            'dbOperationOnAll: ' +
            'doing iteration:',
            stringify({

                paginationValueToUse,
                iterationCount,
                'Total Item Count': allItems.length,
                doOperationCounter,
            })
        );

        const scanParams = {
            TableName: tableName, 
            ExclusiveStartKey: paginationValueToUse,
            Limit: limit,
            //     '<ExpressionAttributeNameVariable>': 'STRING_VALUE',
            //     /* '<ExpressionAttributeNameVariable>': ... */
            // },
            // },
            FilterExpression: filterExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            // IndexName: 'STRING_VALUE',
            // ProjectionExpression: 'STRING_VALUE',
            // ReturnConsumedCapacity: INDEXES | TOTAL | NONE,
            // Segment: 'NUMBER_VALUE',
            // Select: ALL_ATTRIBUTES | ALL_PROJECTED_ATTRIBUTES | SPECIFIC_ATTRIBUTES | COUNT,
            // TotalSegments: 'NUMBER_VALUE'
        };

        const {

            ultimateResults,
            paginationValue

        } = await scanDatabase({

            scanParams,
        });

        allItems.push( ...ultimateResults );

        if( !!argv.quickScanCheck ) {

            return console.log(
                'dbOperationOnAll: ' +
                `quick results: ${ stringify({

                    ultimateResults,
                    paginationValue,
                    
                    'Item Count': ultimateResults.length
                }) }`
            );
        }

        if( !noDoOp ) {

            for( const ultimateResult of ultimateResults ) {

                // if( counter >= 1 ) {

                //     console.log(`
                    
                    
                //         MEGA LOG: ${ JSON.stringify( {

                //             EARLY: 'FINISH'
                //         }, null, 4 ) }
                    
                    
                //     `);

                //     return;
                // }

                try {
                    
                    console.log(
                        'doing operation for ultimateResult:',
                        stringify( ultimateResult )
                    );
                
                    await doOperation({
    
                        ultimateResult,
                    });

                    console.log(
                        'operation successfully performed for ' +
                        `ultimate result ${ stringify( ultimateResult )}`
                    );
                }
                catch( err ) {
                    
                    console.log(
                        'error in performing operation for ' +
                        `ultimate result : ${ ultimateResult }`
                    );

                    throw err;
                }

                doOperationCounter++;
            }            
        }

        paginationValueToUse = paginationValue;

    } while( !!paginationValueToUse );

    await doEndGameOperation({

        allItems,
    });

    console.log(
        'dbOperationOnAll executed successfully: ' +
        stringify({
            'Total Item Count': allItems.length
        })
    );
};


(async () => {

    try {
        
        await dbOperationOnAll({

            doOperation,
            tableName
        });
    }
    catch( err ) {
        
        console.log( 'an error occurred in doOperationOnAll:', err );
    }
})();
