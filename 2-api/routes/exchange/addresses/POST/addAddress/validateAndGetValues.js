'use strict';

const {
    utils: {
        stringify,
    },
} = require( '@bitcoin-api/full-stack-api-private' );

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

// const {
//     crypto: {
//         getCryptoAmountNumber
//     }
// } = require( '../../../../../exchangeUtils' );


module.exports = Object.freeze( async ({

    rawGoogleCode,
    ipAddress,

}) => {
    
    console.log(
        
        `running validateAndGetValues with values: ${ stringify({
            ipAddress,
            rawGoogleCode,
        }) }`
    );

    await verifyGoogleCode({

        rawGoogleCode,
        ipAddress,
        expectedAction: actions.addAddress,
    });

    const results = {};

    console.log(
        
        'validateAndGetValues executed successfully, ' +
        'here are the values: ' +
        stringify( results )
    );

    return results;
});
