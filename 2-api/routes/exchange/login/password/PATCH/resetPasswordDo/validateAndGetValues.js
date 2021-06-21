'use strict';

const {
    utils: {
        stringify,
        // bitcoin: {
        //     formatting: { getAmountNumber },
        // }
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {

    validation: {
        getIfPasswordIsValid,
    }

} = require( '../../../../../../exchangeUtils' );

const {
    // errors: { ValidationError },
    business: {
        verifyGoogleCode,
    },
    constants: {
        google: {
            captcha
        }
    },
    throwStandardError
} = require( '../../../../../../utils' );

// const doWithdraw = require( './doWithdraw' );


module.exports = Object.freeze( async ({

    ipAddress,
    rawGoogleCode,
    rawNewPassword,

}) => {

    console.log(
        
        'running validateAndGetValues with the following values:',
        stringify({

            ipAddress,
            rawGoogleCode,
            rawNewPassword: !!rawNewPassword,
        })
    );

    await verifyGoogleCode({

        rawGoogleCode,
        ipAddress,
        expectedAction: captcha.actions.resetPasswordDo,
    });

    const newPasswordIsInvalid = !getIfPasswordIsValid({

        password: rawNewPassword
    });

    if( newPasswordIsInvalid ) {

        return throwStandardError({

            message: 'invalid password provided',
            bulltrue: true,
        });
    }

    const values = {

        newPassword: rawNewPassword
    };

    console.log(
        'validateAndGetValues executed successfully - returning values: ' +
        JSON.stringify( Object.keys( values ) )
    );

    return values;
});