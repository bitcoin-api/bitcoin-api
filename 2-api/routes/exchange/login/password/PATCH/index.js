'use strict';

const {

    getFormattedEvent,
    getResponse,
    handleError,
    beginningDragonProtection,
    stringify,
    constants: {
        http: {
            headers
        },
        timeNumbers: {
            hour
        }
    },
} = require( '../../../../../utils' );

const validateAndGetDecodedPasswordResetCode = require( './validateAndGetDecodedPasswordResetCode' );
const resetPasswordDo = require( './resetPasswordDo' );


exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log(
            'running the exchange /login/password - PATCH function'
        );

        const event = getFormattedEvent({

            rawEvent,
        });

        const passwordResetCode = event.headers[ headers.passwordResetCode ];

        const {

            exchangeUserId,

        } = validateAndGetDecodedPasswordResetCode({

            passwordResetCode,
        });

        const {

            ipAddress,

        } = await beginningDragonProtection({

            queueName: 'exchangeLoginPasswordPatch',
            
            event,

            megaCodeIsRequired: false,

            ipAddressMaxRate: 10,
            ipAddressTimeRange: hour,

            altruisticCode: exchangeUserId,

            altruisticCodeIsRequired: true,
            altruisticCodeMaxRate: 10,
            altruisticCodeTimeRange: hour,
        });

        const rawNewPassword = event.headers[ headers.newPassword ];
        const rawGoogleCode = event.headers[ headers.grecaptchaGoogleCode ];

        const resetPasswordDoResults = await resetPasswordDo({

            ipAddress,
            passwordResetCode,
            rawNewPassword,
            rawGoogleCode,
            exchangeUserId,
        });

        const responseData = Object.assign(
            {},
            resetPasswordDoResults
        );

        console.log(
            
            'the exchange /login/password - ' +
            'PATCH function executed successfully: ' +
            stringify({ responseData })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            
            `error in exchange /login/password - PATCH function: ${ err }` );

        return handleError( err );
    }
});
