'use strict';

// const {
//     utils: {
//         stringify,
//     },
// } = require( '@bitcoin-api/full-stack-api-private' );

const {
    transactions,
    alien,
} = require( '../../constants' );


module.exports = Object.freeze( () => { 

    const theOracleOfDelphiDefi = {

        [transactions.types.addBitcoin]: {

            addressToData: {},
        },

        [transactions.types.withdrawBitcoin]: {
            
            totalAmount: 0,
        },

        [transactions.types.exchange]: {

            totalBitcoinAmount: 0,
            totalCryptoAmount: 0,
        },

        [transactions.types.dream]: {

            totalCryptoAmount: 0,
        },

        [transactions.types.vote]: {

            totalCryptoAmount: 0,
        },

        [transactions.types.raffle]: {

            totalCryptoAmount: 0,
        },

        [transactions.types.bonus]: {

            totalCryptoAmount: 0,
            totalBitcoinAmount: 0,
        },

        [transactions.types.setAlienBalance]: {

            [alien.currencies.busd.key]: {

                totalCryptoAmount: '0',
            },

            [alien.currencies.m.key]: {

                totalCryptoAmount: '0',
            },
        },
    };

    return theOracleOfDelphiDefi;
});
