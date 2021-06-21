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
    },
} = require( '../../../../../exchangeUtils' );

const {
    constants: {
        http: {
            headers: {
                grecaptchaGoogleCode
            }
        }
    }

} = require( '../../../../../utils' );

const validateAndGetValues = require( './validateAndGetValues' );
const ensureUserDoesNotExist = require( './ensureUserDoesNotExist' );
const addNewUserToDatabase = require( './addNewUserToDatabase' );
const sendVerificationCodeEmail = require( './sendVerificationCodeEmail' );


module.exports = Object.freeze( async ({

    event,
    ipAddress
    
}) => {

    // const rawEmail = event.body.email;
    // const rawPassword = event.body.password;
    // const rawGoogleCode = event.body.googleCode;

    const rawEmail = event.headers.email;
    const rawPassword = event.headers.password;
    const rawGoogleCode = event.headers[ grecaptchaGoogleCode ];

    console.log(
        
        `running addNewUser with the following values - ${ stringify({

            email: rawEmail,
            password: rawPassword,
            googleCode: rawGoogleCode,
        }) }`
    );

    const {

        email,
        displayEmail,
        password,
        isHumanScore,
        isHumanTime,

    } = await validateAndGetValues({

        rawEmail,
        rawPassword,
        rawGoogleCode,
        ipAddress,
    });

    await ensureEmailIsNotBlocked({

        email,
    });

    await ensureUserDoesNotExist({

        email
    });

    const {
        
        exchangeUserId,
        emailMessageId,
        verifyEmailCode,

    } = await sendVerificationCodeEmail({

        email: displayEmail,
        // verifyEmailCode,
        isProbablyCrypto: event.isProbablyCrypto,
    });

    await addNewUserToDatabase({

        email,
        displayEmail,
        password,
        ipAddress,
        exchangeUserId,
        emailMessageId,
        verifyEmailCode,
        isHumanScore,
        isHumanTime,
    });

    const addNewUserResponse = {};
    // Object.assign(
    //     {},
    //     {}
    // );

    console.log(
        
        'addNewUser executed successfully - ' +
        `returning values: ${ stringify( addNewUserResponse ) }`
    );

    return addNewUserResponse;
});
