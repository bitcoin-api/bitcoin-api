'use strict';

const {

    getFormattedEvent,
    getResponse,
    handleError,
    stringify,
    constants: {
        timeNumbers: {
            hour,
        },
    },
    javascript: {
        ensureEnvValuesAreTruthful
    }

} = require( '../../../../utils' );

const {

    loginTokens: {
        mongolianBeginningDragonProtection
    },
    constants: {
        headers: {
            grecaptchaGoogleCode
        }
    }

} = require( '../../../../exchangeUtils' );

const addAddress = require( './addAddress' );


ensureEnvValuesAreTruthful({
    envKeys: [
        'EXCHANGE_TOKEN_USER_ID',
        'EXCHANGE_XOOVO_ENCRYPTION_ID',
        'EXCHANGE_XOOVO_ENCRYPTION_PASSWORD',
        'EXCHANGE_GRECAPTCHA_SECRET_KEY',
        // 'EXCHANGE_GRECAPTCHA_BYPASS_HEADER_KEY_VALUE',  
    ]
});


exports.handler = Object.freeze( async rawEvent => {

    try {

        console.log( 'running the exchange /addresses - POST function' );

        const event = getFormattedEvent({

            rawEvent,
            // shouldGetBodyFromEvent: false,
        });

        const {
            
            ipAddress,
            exchangeUserId,

        } = await mongolianBeginningDragonProtection({

            queueName: 'exchangeAddressesPost',
            
            event,

            megaCodeIsRequired: false,

            ipAddressMaxRate: 5,
            ipAddressTimeRange: hour,
        });

        const rawGoogleCode = event.headers[ grecaptchaGoogleCode ];

        const addAddressResults = await addAddress({

            exchangeUserId,
            rawGoogleCode,
            ipAddress,
        });

        const responseData = Object.assign(
            {},
            addAddressResults
        );

        console.log(
            
            'the exchange /addresses - ' +
            'POST function executed successfully: ' +
            stringify({ responseData })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            'error in exchange /addresses - ' +
            `POST function: ${ err }`
        );

        return handleError( err );
    }
});