'use strict';

const {

    getFormattedEvent,
    getResponse,
    handleError,
    beginningDragonProtection,
    stringify,
    validation: {
        getIfEmailIsValid
    },
    formatting: {
        getFormattedEmail
    },

    constants: {

        timeNumbers: {
            hour
        }
    }

} = require( '../../../../../utils' );

const initiatePasswordReset = require( './initiatePasswordReset' );


exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log(
            'running the exchange /login/password - POST function'
        );

        const event = getFormattedEvent({

            rawEvent,
        });

        const rawEmail = event.headers.email;

        if( !getIfEmailIsValid({ email: rawEmail }) ) {

            const invalidEmailError = new Error( 'invalid email provided' );
            invalidEmailError.statusCode = 400;
            invalidEmailError.bulltrue = true;
            throw invalidEmailError;
        }

        const email = getFormattedEmail({ rawEmail });

        const {
            
            ipAddress

        } = await beginningDragonProtection({

            queueName: 'exchangeLoginPasswordPost',
            
            event,

            megaCodeIsRequired: false,

            ipAddressMaxRate: 2,
            ipAddressTimeRange: hour,

            altruisticCode: email,

            altruisticCodeIsRequired: true,
            altruisticCodeMaxRate: 2,
            altruisticCodeTimeRange: hour,
        });

        
        const initiatePasswordResetResults = await initiatePasswordReset({

            event,
            email,
            ipAddress,
        });

        const responseData = Object.assign(
            {},
            initiatePasswordResetResults
        );

        console.log(
            
            'the exchange /login/password - ' +
            'POST function executed successfully: ' +
            stringify({ responseData })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            
            `error in exchange /login/password - POST function: ${ err }` );

        return handleError( err );
    }
});
