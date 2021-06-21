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
    validation: {
        getIfEmailIsValid
    },
    formatting: {
        getFormattedEmail,
    },
    business: {
        verifyGoogleCode
    }
} = require( '../../../../../utils' );

const {
    validation: {
        getIfPasswordIsValid
    }
} = require( '../../../../../exchangeUtils' );


module.exports = Object.freeze( async ({

    rawEmail,
    rawPassword,
    rawVerifyEmailCode,
    rawGoogleCode,
    ipAddress
    
}) => {

    console.log(
        `running validateAndGetValues
            with the following values - ${ stringify({
                email: rawEmail,
                password: rawPassword,
                verifyEmailCode: rawVerifyEmailCode,
                googleCode: rawGoogleCode,
                ipAddress
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

    const verifyEmailCodeIsInvalid = (

        !rawVerifyEmailCode ||
        (
            !rawVerifyEmailCode ||
            (typeof rawVerifyEmailCode !== 'string') ||
            (rawVerifyEmailCode.length < 5) ||
            (rawVerifyEmailCode.length > 169)
        )
    );

    if( verifyEmailCodeIsInvalid ) {

        const err = new Error( 'invalid email code provided' );
        err.bulltrue = true;
        err.statusCode = 400;
        throw err;
    }

    await verifyGoogleCode({

        rawGoogleCode,
        ipAddress,
        expectedAction: actions.verifyUser
    });

    const validValues = {

        email: getFormattedEmail({
            
            rawEmail
        }),
        password: rawPassword,
        verifyEmailCode: rawVerifyEmailCode
    };

    console.log(
        
        'validateAndGetValues executed successfully - got values ' +
        stringify( validValues )
    );

    return validValues;
});
