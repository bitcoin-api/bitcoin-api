'use strict';

const {
    transactions,
} = require( '../../../../../../constants' );

const getCryptoAmountNumber = require(
    
    '../../../../../crypto/getCryptoAmountNumber'
);


module.exports = Object.freeze( ({

    theOracleOfDelphiDefi,

}) => {

    const {

        [transactions.types.raffle]: {
            totalCryptoAmount
        },

    } = theOracleOfDelphiDefi;

    const raffleData = {
        lastUpdated: Date.now(),
        crypto: {
            amount: getCryptoAmountNumber( totalCryptoAmount )    
        },
    };

    return raffleData;
});
