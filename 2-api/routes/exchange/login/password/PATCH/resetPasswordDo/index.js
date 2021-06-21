'use strict';

const {
    utils: {
        // stringify,
        // },
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const validateAndGetValues = require( './validateAndGetValues' );
// const ensurePasswordResetCodeIsValid = require( './ensurePasswordResetCodeIsValid' );
const updateExchangeUser = require( './updateExchangeUser' );
const doLogin = require( '../../../../../../sacredElementals/crypto/doLogin' );


module.exports = Object.freeze( async ({

    ipAddress,
    passwordResetCode,
    rawNewPassword,
    rawGoogleCode,
    exchangeUserId,

}) => {

    console.log(
        
        'running resetPasswordDo with the following values:',
        stringify({

            ipAddress,
            rawGoogleCode: !!rawGoogleCode,
            rawNewPassword: !!rawNewPassword,
            passwordResetCode,
            exchangeUserId,
        })
    );

    const {
        
        newPassword,
        
    } = await validateAndGetValues({

        ipAddress,
        rawGoogleCode,
        rawNewPassword,
    });

    // await ensurePasswordResetCodeIsValid({

    //     passwordResetCode,
    //     exchangeUserId,
    // });

    const {
        
        email

    } = await updateExchangeUser({

        exchangeUserId,
        newPassword,
        passwordResetCode,
    });

    const {

        userId,
        loginToken,
        
    } = await doLogin({

        event: {
            headers: {
                email,
                password: newPassword,
            }
        },
        ipAddress,
    });

    const resetPasswordDoResults = {

        userId,
        loginToken,
    };

    console.log(
        'resetPasswordDo executed successfully: ' +
        stringify( resetPasswordDoResults )
    );

    return resetPasswordDoResults;
});