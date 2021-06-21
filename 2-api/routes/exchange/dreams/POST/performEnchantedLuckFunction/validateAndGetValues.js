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

    // enchantedModes,
    // enchantedModesToEnchantedData
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
        
        `running validateAndGetValues with values: ${ stringify({
            rawAmount,
            ipAddress,
            rawGoogleCode,
        }) }`
    );

    // if(
    //     !rawMode ||
    //     (typeof rawMode !== 'string') ||
    //     !enchantedModes[ rawMode ]
    // ) {

    //     const validationError = new Error(

    //         `invalid mode: ${ rawMode }`
    //     );
    //     validationError.bulltrue = true;
    //     validationError.statusCode = 400;
    //     throw validationError;
    // }
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
        expectedAction: actions.coinFlip,
    });

    const results = {

        // amount: enchantedModesToEnchantedData[ rawMode ].cryptoAmount,
        amount: getCryptoAmountNumber( rawAmount )
    };

    console.log(
        
        'validateAndGetValues executed successfully, ' +
        'here are the values: ' +
        stringify( results )
    );

    return results;
});
