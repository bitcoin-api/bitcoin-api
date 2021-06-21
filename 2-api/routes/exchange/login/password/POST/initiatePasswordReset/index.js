'use strict';

const {
    utils: {
        // stringify,
        // },
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    constants: {
        http: {
            headers
        }
    },
    throwStandardError,
} = require( '../../../../../../utils' );

const {
    aws: {
        dinoCombos: {
            emails: {
                ensureEmailIsNotBlocked
            }
        }
    },
    exchangeUsers: {
        getExchangeUserByEmail,
    }
} = require( '../../../../../../exchangeUtils' );

const validateAndGetValues = require( './validateAndGetValues' );
// const getPasswordResetCode = require( './getPasswordResetCode' );
const updateExchangeUser = require( './updateExchangeUser' );
const sendPasswordResetEmail = require( './sendPasswordResetEmail' );


module.exports = Object.freeze( async ({

    event,
    email,
    ipAddress,

}) => {

    const rawGoogleCode = event.headers[ headers.grecaptchaGoogleCode ];

    console.log(
        
        'running initiatePasswordReset with the following values:',
        stringify({

            rawGoogleCode: !!rawGoogleCode,
            ipAddress
        })
    );

    await validateAndGetValues({

        rawGoogleCode,
        ipAddress
    });

    await ensureEmailIsNotBlocked({

        email
    });

    const exchangeUser = await getExchangeUserByEmail({

        email,
    });

    if( !exchangeUser ) {

        return throwStandardError({

            logMessage: (
        
                '😲error in initiatePasswordReset ' +
                'user with email does not exist: ' +
                stringify({
        
                    email
                })
            ),
            message: `user with email "${ email }" does not exist`,
            statusCode: 404,
            bulltrue: true,
        });
    }

    const { exchangeUserId, displayEmail } = exchangeUser;

    // const passwordResetCode = getPasswordResetCode({
    //     exchangeUserId,
    // });

    const {
        
        passwordResetCode
        
    } = await updateExchangeUser({

        exchangeUserId,
        // passwordResetCode,
    });

    await sendPasswordResetEmail({

        email,
        displayEmail,
        passwordResetCode,
    });

    const initiatePasswordResetResults = {

        passwordResetHasBeenSuccessfullyInitialized: true,
    };

    console.log(
        'initiatePasswordReset executed successfully: ' +
        stringify( initiatePasswordResetResults )
    );

    return initiatePasswordResetResults;
});