#!/usr/bin/env node
'use strict';

const argv = require( 'yargs' ).argv;

const isProductionMode = argv.mode === 'production';

if( isProductionMode ) {

    require( 'dotenv' ).config({ path: `${ __dirname }/../productionCredentials/.env` });
}
else {

    require( 'dotenv' ).config({ path: `${ __dirname }/../stagingCredentials/.env` });
}

const {
    utils: {
        aws: {
            dino: {
                searchDatabase
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
                    TRANSACTIONS
                },
                secondaryIndices: {
                    exchangeUserIdCreationDateIndex,
                }
            }
        },
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

const fs = require( 'fs' );

const getTheOracleOfDelphiDefi = require( process.env.GET_THE_ORACLE_OF_DELPHI_DEFI_PATH );
const processTransactions = require( process.env.PROCESS_TRANSACTIONS_PATH );
const getBalanceData = require( process.env.GET_BALANCE_DATA_PATH );
const getNewMoneyData = require( process.env.GET_NEW_MONEY_DATA_PATH );


const writeDataToFile = Object.freeze( ({

    exchangeUserId,
    transactionsToWrite

}) => {

    const stream = fs.createWriteStream(
        
        `${ __dirname }/transactions.txt`,
        {
            flags: 'a'
        }
    );

    stream.write(
        `==--==--==--==--==--==--==--==--==--==--==--==--==\n` +
        `Transactions ${ exchangeUserId } - ${ (new Date()).toLocaleString() }\n` +
        `${ stringify( {
            ['number of transactions']: transactionsToWrite.length,
        } ) }\n` +
        `${ stringify( transactionsToWrite ) }\n` +
        `==--==--==--==--==--==--==--==--==--==--==--==--==\n`
    );

    stream.end();
});

let counter = 1;

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

const log = Object.freeze( ( ...args ) => {
    
    console.log( '🐸🦜getData - ', ...args );
});


const getData = async ({

    exchangeUserId,
    maxCounter,
    searchLimit
    
}) => {

    log( 'running get data' );

    const transactions = [];
    let paginationValue = null;

    do {

        log( `do getData count: ${ counter }` );

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
            ExclusiveStartKey: paginationValue || undefined,
        };
    
        const searchDatabaseResults = await searchDatabase({
    
            searchParams
        });

        transactions.push( ...searchDatabaseResults.ultimateResults );
        
        if( !!searchDatabaseResults.paginationValue ) {

            paginationValue = searchDatabaseResults.paginationValue;
        }
        else if( !!paginationValue ) {

            paginationValue = null;
        }

        counter++;

    } while (
        (counter < maxCounter) &&
        !!paginationValue
    );

    const theOracleOfDelphiDefi = getTheOracleOfDelphiDefi();

    processTransactions({

        transactions,
        theOracleOfDelphiDefi,
        withdrawIdToData: {},
        voteIdToData: {},
    });

    const balanceData = getBalanceData({

        exchangeUser: {

            moneyData: getNewMoneyData({

                exchangeUser: {},
                theOracleOfDelphiDefi
            })
        }
    });

    const userData = {
        
        'Balance Summary': balanceData.summary,
        'Total BTC Balance': (
            Math.round(
                (
                    balanceData.summary.bitcoin.totalAmount +
                    (balanceData.summary.crypto.totalAmount/1000)
                ) * 100000000 ) / 100000000
        ).toFixed(8),
        'Transaction Count': transactions.length
    };

    console.log(`
    
    
        MEGA LOG: ${ JSON.stringify( {

            theOracleOfDelphiDefi,
            userData

        }, null, 4 ) }
    
    
    `);
    
    const transactionsToWrite = transactions.filter( tx => {

        return (
            true// ||
            // (
            //     (tx.type === 'dream') &&
            //     !tx.happyDream
            // )
        );
    
    }).map( tx => {

        return Object.assign(

            {},
            tx,
            {
                creationDateTime: new Date( tx.creationDate ).toLocaleString(),
                // happyDream: tx.happyDream,
                amount: tx.amount,
            }
        );
    });

    // console.log(`
    
    
    //     MEGA LOG: ${ JSON.stringify( {

    //         t: transactionsToWrite.length

    //     }, null, 4 ) }
    
    
    // `);
    

    writeDataToFile({

        exchangeUserId,
        // transactionsToWrite: transactions
        transactionsToWrite
    });

    log( 'successfully executed' );
};


(async () => {

    const exchangeUserId = argv.e;
    const maxCounterString = argv.m || '100';
    const searchLimitString = argv.s || '10000';

    try {

        if( !exchangeUserId ) {

            throw new Error( `invalid exchangeUserId: ${ exchangeUserId }` );
        }
        
        await getData({

            exchangeUserId,
            maxCounter: Number( maxCounterString ),
            searchLimit: Number( searchLimitString ),
        });
    }
    catch( err ) {

        console.log(
            
            `error in getting data for exchange user ${ exchangeUserId }:`,
            err
        );
    }
})();
