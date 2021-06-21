'use strict';

const {
    transactions,
} = require( '../../../../../../constants' );

const getCryptoAmountNumber = require(
    
    '../../../../../crypto/getCryptoAmountNumber'
);

const {
    utils: {
        bitcoin: {
            formatting: { getAmountNumber }
        }    
    }
} = require( '@bitcoin-api/full-stack-api-private' );


module.exports = Object.freeze( ({

    theOracleOfDelphiDefi,

}) => {

    const {

        [transactions.types.bonus]: {
            totalBitcoinAmount,
            totalCryptoAmount,
        },

    } = theOracleOfDelphiDefi;

    const bonusData = {
        lastUpdated: Date.now(),
        bitcoin: {
            amount: getAmountNumber( totalBitcoinAmount ),
        },
        crypto: {
            amount: getCryptoAmountNumber( totalCryptoAmount ), 
        },
    };

    return bonusData;
});
