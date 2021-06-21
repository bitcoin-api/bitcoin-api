'use strict';

const {
    exchanges: {
        rates: {
            cryptoOverBTC
        }
    }
} = require( '../constants' );

const { 
	utils: {
		bitcoin: {
			formatting: { getAmountNumber }
		},	
	},
} = require( '@bitcoin-api/full-stack-api-private' );


module.exports = Object.freeze( ({

    amountInCrypto
    
}) => {

    const amountInBTC = getAmountNumber( amountInCrypto / cryptoOverBTC );

    return amountInBTC;
});
