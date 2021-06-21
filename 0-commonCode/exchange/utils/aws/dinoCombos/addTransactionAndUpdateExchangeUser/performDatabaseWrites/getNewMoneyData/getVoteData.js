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

        [transactions.types.vote]: {
            totalCryptoAmount
        },

    } = theOracleOfDelphiDefi;

    const voteData = {
        lastUpdated: Date.now(),
        crypto: {
            amount: getCryptoAmountNumber( totalCryptoAmount )    
        },
    };

    return voteData;
});
