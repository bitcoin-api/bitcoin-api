'use strict';

const {
    utils: {
        // stringify,
        // },
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

// const {
//     utils: {
//         aws: {
//             dinoCombos: {
//                 getExchangeUser,
//             }
//         }
//     },
// } = require( '@bitcoin-api/full-stack-exchange-private' );

const {

    throwStandardError,
    standardHash,

} = require( '../../../../../../../utils' );

const tessaDecrypt = require( '../../../../../../../sacredElementals/crypto/tessaDecrypt' );


module.exports = Object.freeze( ({

    passwordResetCode,
    exchangeUser,

}) => {

    const { exchangeUserId } = exchangeUser;

    console.log(
        
        'running ensurePasswordResetCodeIsValid with the following values:',
        stringify({

            passwordResetCode: passwordResetCode,
            exchangeUser: Object.keys( exchangeUser ),
        })
    );

    // if( !exchangeUser ) {

    //     return throwStandardError({

    //         logMessage: (
    //             'ensurePasswordResetCodeIsValid error - ' +
    //             'exchange user specified by exchange user id - ' +
    //             `"${ exchangeUserId }" does not exist`
    //         ),
    //         message: 'Invalid password reset link',
    //         bulltrue: true,
    //     });
    // }
    // else
    if( !exchangeUser.superPasswordResetCode ) {

        return throwStandardError({

            logMessage: (
                'ensurePasswordResetCodeIsValid error - ' +
                'exchange user specified by exchange user id - ' +
                `"${ exchangeUserId }" does not have a password reset code`
            ),
            message: 'Invalid password reset link',
            bulltrue: true,
        });
    }

    const hashedPasswordResetCodeOnUser = tessaDecrypt({

        text: exchangeUser.superPasswordResetCode
    });

    const hashedPasswordResetCodeFromRequest = standardHash(
        passwordResetCode
    );

    if(
        hashedPasswordResetCodeOnUser !==
        hashedPasswordResetCodeFromRequest
    ) {

        return throwStandardError({

            logMessage: (
                'ensurePasswordResetCodeIsValid error - ' +
                'password reset code from request does not match that ' +
                'of the exchange user'
            ),
            message: 'Invalid password reset link',
            bulltrue: true,
        });
    }

    console.log(
        'ensurePasswordResetCodeIsValid executed successfully'
    );
});