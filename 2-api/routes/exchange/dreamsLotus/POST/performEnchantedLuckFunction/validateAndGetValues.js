'use strict';

const {
    utils: {
        stringify,
    },
} = require( '@bitcoin-api/full-stack-api-private' );

// const {
    // constants: {
        // exchanges: {
        //     bounds
        // }
    // },
// } = require( '@bitcoin-api/full-stack-exchange-private' );

const {

    minAmount,
    maxAmount

} = require( './localConstants' );

const {
    crypto: {
        getCryptoAmountNumber
    }
} = require( '../../../../../exchangeUtils' );

const {
    constants: {
        google: {
            captcha: {
                actions
            }
        }
    },
    business: {
        verifyGoogleCode
    }
} = require( '../../../../../utils' );


module.exports = Object.freeze( async ({

    rawAmount,
    ipAddress,
    rawGoogleCode,

}) => {
    
    console.log(
        
        `running validateAndGetValues 🌸Lotus with values: ${ stringify({
            rawAmount,
            ipAddress,
            rawGoogleCode,
        }) }`
    );

    if(
        !rawAmount ||
        (typeof rawAmount !== 'number') ||
        (rawAmount < minAmount) ||
        (rawAmount > maxAmount)
    ) {

        const validationError = new Error(

            `invalid amount: ${ rawAmount }`
        );
        validationError.bulltrue = true;
        validationError.statusCode = 400;
        throw validationError;
    }

    await verifyGoogleCode({

        rawGoogleCode,
        ipAddress,
        expectedAction: actions.lotusCoinFlip,
    });

    const results = {

        amount: getCryptoAmountNumber( rawAmount )
    };

    console.log(
        
        'validateAndGetValues 🌸Lotus executed successfully, ' +
        'here are the values: ' +
        stringify( results )
    );

    return results;
});
