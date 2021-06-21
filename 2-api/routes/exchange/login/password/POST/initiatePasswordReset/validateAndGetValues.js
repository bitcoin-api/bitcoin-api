'use strict';

const {
    utils: {
        stringify,
        // bitcoin: {
        //     formatting: { getAmountNumber },
        // }
    }
} = require( '@bitcoin-api/full-stack-api-private' );

// const {

//     crypto: {
//         getCryptoAmountNumber
//     },

//     constants: {
//         exchanges
//     }

// } = require( '../../../../../../exchangeUtils' );

const {
    // errors: { ValidationError },
    business: {
        verifyGoogleCode,
    },
    constants: {
        google: {
            captcha
        }
    }
} = require( '../../../../../../utils' );

// const doWithdraw = require( './doWithdraw' );


module.exports = Object.freeze( async ({

    rawGoogleCode,
    ipAddress,

}) => {

    console.log(
        
        'running validateAndGetValues with the following values:',
        stringify({

            rawGoogleCode: !!rawGoogleCode,
            ipAddress,
        })
    );

    const values = {};

    await verifyGoogleCode({

        rawGoogleCode,
        ipAddress,
        expectedAction: captcha.actions.resetPasswordInitialization,
    });

    console.log(
        'validateAndGetValues executed successfully - returning values: ' +
        stringify( values )
    );

    return values;
});