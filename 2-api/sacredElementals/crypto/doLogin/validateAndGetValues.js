'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    constants: {
        google: {
            captcha: {
                actions
            }
        }
    },
    formatting: {
        getFormattedEmail
    },
    validation: {
        getIfEmailIsValid
    },
    business: {
        verifyGoogleCode
    }
} = require( '../../../utils' );

const {
    validation: {
        getIfPasswordIsValid
    }
} = require( '../../../exchangeUtils' );



module.exports = Object.freeze( async ({

    rawEmail,
    rawPassword,
    needGoogleCode,
    rawGoogleCode,
    ipAddress,
    
}) => {

    console.log(
        `running validateAndGetValues
            with the following values - ${ stringify({
                email: rawEmail,
                password: rawPassword,
                needGoogleCode,
                googleCode: rawGoogleCode,
                ipAddress,
            })
        }`
    );

    const emailIsInvalid = !getIfEmailIsValid({
        
        email: rawEmail,
    });
    
    if( emailIsInvalid ) {

        const err = new Error( 'invalid email provided' );
        err.bulltrue = true;
        err.statusCode = 400;
        throw err;
    }

    const passwordIsInvalid = !getIfPasswordIsValid({

        password: rawPassword
    });
    
    if( passwordIsInvalid ) {

        const err = new Error( 'invalid password provided' );
        err.bulltrue = true;
        err.statusCode = 400;
        throw err;
    }

    if( needGoogleCode ) {

        await verifyGoogleCode({

            rawGoogleCode,
            ipAddress,
            expectedAction: actions.login
        });
    }

    const validValues = {

        email: getFormattedEmail({

            rawEmail,
        }),
        password: rawPassword
    };

    console.log(
        
        'validateAndGetValues executed successfully - got values ' +
        stringify( validValues )
    );

    return validValues;
});
