'use strict';

const {
    utils: {
        doOperationInQueue,
        javascript: {
            getQueueId
        },
        stringify,
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    aws: {
        database: {
            tableNames: {
                EXCHANGE_USERS
            }
        }
    },
    // transactions,
    // identityTransactions
    // votes,
} = require( '../../../../constants' );

const getIfShouldSearchDb = require( './getIfShouldSearchDb' );
const ensureExchangeUserExistsAndGet = require( './ensureExchangeUserExistsAndGet' );
const validateValues = require( './validateValues' );
const getTransactionId = require( './getTransactionId' );
const getTheOracleOfDelphiDefi = require( '../../../exchangeUsers/getTheOracleOfDelphiDefi' );
const oracleHallucination = require( './oracleHallucination' );
const oracleFlashback = require( './oracleFlashback' );
const performDatabaseWrites = require( './performDatabaseWrites' );


const addTransactionAndUpdateExchangeUserCore = Object.freeze( async ({

    exchangeUserId,
    type,
    data
    
}) => {

    const exchangeUser = await ensureExchangeUserExistsAndGet({
        exchangeUserId
    });

    validateValues({

        exchangeUser,
        type,
        data,
    });

    const transactionToAdd = Object.assign(
        {
            exchangeUserId,
            type,
            creationDate: Date.now(),
            transactionId: getTransactionId(),
        },
        data
    );

    console.log(
        `🎩🐱transactionToAdd: ${ stringify( transactionToAdd ) }`
    );

    const hallucinationArgs = {

        exchangeUserId,
        transactionToAdd,
    };
    
    const searchDb = getIfShouldSearchDb({ type, data });

    if( searchDb ) {

        hallucinationArgs.searchDb = true;
        hallucinationArgs.theOracleOfDelphiDefi = getTheOracleOfDelphiDefi();
        hallucinationArgs.withdrawIdToData = {};
        hallucinationArgs.transactionCount = 0;
    }
    else {

        hallucinationArgs.searchDb = false;
        const {
            existingAtaueu: {
                oracleGhost: {
                    theOracleOfDelphiDefi,
                    withdrawIdToData
                }
            },
            transactionCount,
        } = exchangeUser;
        hallucinationArgs.theOracleOfDelphiDefi = theOracleOfDelphiDefi;
        hallucinationArgs.withdrawIdToData = withdrawIdToData;
        hallucinationArgs.transactionCount = transactionCount;
    }

    console.log(
        `Hallucination arg keys: ${
            JSON.stringify( Object.keys( hallucinationArgs ) )
        }`
    );

    const hallucinationInsights = (
        await oracleHallucination( hallucinationArgs )
    );

    const {
        
        shouldPerformDatabaseWrites,
        
    } = oracleFlashback({

        theOracleOfDelphiDefi: (
            hallucinationInsights
                .existingAtaueu
                .oracleGhost
                .theOracleOfDelphiDefi
        ),
        transactionToAdd,
        exchangeUser
    });

    if( shouldPerformDatabaseWrites ) {

        console.log( '🐲adding transactions and updating exchange user' );

        await performDatabaseWrites({

            exchangeUser,
            transactionToAdd,
            hallucinationInsights,
        });
    }
    else {

        console.log(
            '🔥🔥🐸 NOT adding transactions and NOT updating exchange user'
        );
    }
});


module.exports = Object.freeze( async ({

    exchangeUserId,
    type,
    data,
    noLocka = false

}) => {

    console.log(
        
        'running addTransactionAndUpdateExchangeUser ' +
        `with the following values: ${ stringify({

            exchangeUserId,
            type,
            data,
            noLocka,
        }) }`
    );

    const coreFunctionArgs = {

        exchangeUserId,
        type,
        data
    };

    if( noLocka ) {

        await addTransactionAndUpdateExchangeUserCore( coreFunctionArgs );
    }
    else {

        await doOperationInQueue({
        
            queueId: getQueueId({
                
                type: EXCHANGE_USERS,
                id: exchangeUserId
            }),
            
            doOperation: async () => {
                    
                await addTransactionAndUpdateExchangeUserCore(
                    coreFunctionArgs
                );
            }
        });
    }

    console.log(
        'addTransactionAndUpdateExchangeUser successfully executed'
    );
});