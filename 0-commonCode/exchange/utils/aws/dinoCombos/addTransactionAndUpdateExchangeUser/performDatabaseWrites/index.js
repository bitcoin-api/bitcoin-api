'use strict';

const {

    utils: {
        aws: {
            dino: {
                updateDatabaseEntry,
            }
        },
        stringify
    },

} = require( '@bitcoin-api/full-stack-api-private' );

const {
    aws: {
        database: {
            tableNames: {
                TRANSACTIONS
            },
        }
    },
    transactions: {
        types,
        // bitcoinWithdrawTypes,
    },
} = require( '../../../../../constants' );

// const getTransactionId = require( './getTransactionId' );
const getNewMoneyData = require( './getNewMoneyData' );
const updateExchangeUser = require( '../../updateExchangeUser' );


module.exports = Object.freeze( async ({

    exchangeUser,
    transactionToAdd,
    hallucinationInsights,

}) => {

    console.log(
        
        'running performDatabaseWrites with the following values: ' +
        stringify({
            exchangeUser,
            transactionToAdd,
            hallucinationInsights,
        })
    );

    const { 
        existingAtaueu: {
            oracleGhost: {
                theOracleOfDelphiDefi
            } 
        },
        transactionCount
    } = hallucinationInsights;

    const databaseWrites = [];

    const newMoneyData = getNewMoneyData({

        exchangeUser,
        theOracleOfDelphiDefi,
    });

    console.log( '📜performDatabaseWrites - updating user✅' );

    const existingAtaueu = {

        // 😎swaggy
        oracleGhost: hallucinationInsights.existingAtaueu.oracleGhost,
    };

    const isIdentityTransaction = ( transactionToAdd.type === types.identity );

    const transactionCountToUse = isIdentityTransaction ? (
        transactionCount - 1
    ) : transactionCount;

    databaseWrites.push(

        updateExchangeUser({
            
            newExchangeUser: Object.assign(

                {},
                exchangeUser,
                {
                    moneyData: newMoneyData,
                    existingAtaueu,
                    transactionCount: transactionCountToUse,
                }
            )
        })
    );

    if( isIdentityTransaction ) {

        console.log(
            '🌈performDatabaseWrites Special Case: ' +
            '⛔️NOT adding transaction, is identity transaction'
        );
    }
    else {

        console.log( '📜performDatabaseWrites - adding transaction✅' );
    
        databaseWrites.push(
    
            updateDatabaseEntry({
    
                tableName: TRANSACTIONS,
                entry: transactionToAdd,
            })
        );
    }

    await Promise.all( databaseWrites );

    console.log(
        
        '👑🐸performDatabaseWrites executed successfully'
    );
});
