'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    aws: {
        dinoCombos: {
            emails: {
                ensureEmailIsNotBlocked,
            }
        }
    }
} = require( '../../../../../exchangeUtils' );

const {
    constants: {
        http: {
            headers
        },
        // google: {
        //     captcha
        // }
    }
} = require( '../../../../../utils' );


const validateAndGetValues = require( './validateAndGetValues' );
const ensureVerificationRequestIsValid = require( './ensureVerificationRequestIsValid' );
const verifyUserEmail = require( './verifyUserEmail' );
const doLogin = require( '../../../../../sacredElementals/crypto/doLogin' );


module.exports = Object.freeze( async ({

    event,
    ipAddress
    
}) => {

    const rawEmail = event.headers.email;
    const rawPassword = event.headers.password;
    const rawVerifyEmailCode = event.headers[ headers.verifyEmailCode ];
    const rawGoogleCode = event.headers[ headers.grecaptchaGoogleCode ];

    console.log(
        
        `running verifyUser with the following values - ${ stringify({

            rawEmail,
            rawPassword,
            rawVerifyEmailCode,
            rawGoogleCode
        }) }`
    );

    const {

        email,
        password,
        verifyEmailCode

    } = await validateAndGetValues({

        rawEmail,
        rawPassword,
        rawVerifyEmailCode,
        rawGoogleCode,
        ipAddress
    });

    await ensureEmailIsNotBlocked({

        email,
    });

    const {
        
        exchangeUserId,

    } = await ensureVerificationRequestIsValid({

        email,
        password,
        verifyEmailCode
    });

    await verifyUserEmail({

        email,
        password,
        verifyEmailCode,
        ipAddress,
        exchangeUserId
    });

    console.log( '🦩verify user - performing login' );

    const doLoginResults = await doLogin({

        event,
        ipAddress,
    });

    console.log( '🦩verify user - login performed successfully' );

    const verifyUserResponse = Object.assign(
        {},
        doLoginResults
    );

    console.log(
        
        'verifyUser executed successfully - ' +
        `returning values: ${ stringify( verifyUserResponse ) }`
    );

    return verifyUserResponse;
});
