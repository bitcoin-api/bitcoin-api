'use strict';

const {
    transactions,
    // alien,
} = require( '../../../../../../constants' );


module.exports = Object.freeze( ({

    theOracleOfDelphiDefi,

}) => {

    const setAlienBalanceData = theOracleOfDelphiDefi[
        transactions.types.setAlienBalance
    ];

    const alienBalanceData = {
        lastUpdated: Date.now(),
        crypto: {},
    };

    Object.keys( setAlienBalanceData ).forEach( currency => {

        alienBalanceData.crypto[ currency ] = {

            amount: setAlienBalanceData[ currency ].totalCryptoAmount
        };
    });

    return alienBalanceData;
});
