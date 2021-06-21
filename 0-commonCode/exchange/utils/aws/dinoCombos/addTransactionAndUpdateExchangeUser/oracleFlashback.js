'use strict';

const {
    utils: {
        stringify
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    transactions: {
        types,
        // bitcoinWithdrawTypes,
    },
    identityTransactions
} = require( '../../../../constants' );


module.exports = Object.freeze( ({

    theOracleOfDelphiDefi,
    transactionToAdd,
    exchangeUser,

}) => {

    console.log(
        '🐐☢️🤙🧿running oracleFlashback: ' +
        stringify({

            theOracleOfDelphiDefi,
            transactionToAdd,
        })
    );

    if( transactionToAdd.type === types.addBitcoin ) {
        
        const bitcoinData = (
            
            exchangeUser &&
            exchangeUser.moneyData &&
            exchangeUser.moneyData.bitcoin
        );

        const currentAddressAmount = bitcoinData.filter(

            ({ address }) => ( address === transactionToAdd.address )

        )[0].amount;

        const amountBasedOnAddBitcoinTransaction = theOracleOfDelphiDefi[ 
            types.addBitcoin
        ].addressToData[
            transactionToAdd.address
        ].amount;

        console.log(
            '🐐☢️🤙🧿 oracleFlashback: ' +
            'type is bitcoin add, inspecting eUser bitcoinData:' +
            stringify({
    
                ['🐸exchange user Bitcoin data']: bitcoinData,
                [`💰current amount for address "${ transactionToAdd.address }"`]: currentAddressAmount,
                ['📝Amount based on add BTC tx']: amountBasedOnAddBitcoinTransaction,
            })
        );

        if(
            currentAddressAmount ===
            amountBasedOnAddBitcoinTransaction
        ) {

            console.log(
                '🐐☢️🤙🧿oracleFlashback executed successfully: ' +
                'the current amount === add BTC transaction amount ' +
                'SHOULD NOT perform database writes❌😳'
            );

            return {

                shouldPerformDatabaseWrites: false
            };
        }
    }
    else if(
        (transactionToAdd.type === types.identity) &&
        (
            transactionToAdd.identityType !==
            identityTransactions.types.refresh
        )
    ) {

        console.log(
            '🐐☢️🤙🧿oracleFlashback executed successfully: ' +
            `should NOT perform database writes, it's an identity tx ` +
            `of identity type ${ transactionToAdd.identityType }`
        );

        return {

            shouldPerformDatabaseWrites: false
        };
    }

    console.log(
        '🐐☢️🤙🧿oracleFlashback executed successfully: ' +
        'should perform database writes✅😎'
    );

    return {

        shouldPerformDatabaseWrites: true
    };
});
