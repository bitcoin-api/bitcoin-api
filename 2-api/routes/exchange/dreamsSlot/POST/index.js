'use strict';

const {

    getFormattedEvent,
    getResponse,
    handleError,
    stringify,
    // javascript: {
    //     getHashedValue
    // },
    constants: {
        http: {
            headers
        },
        timeNumbers: {
            hour
        }
    }

} = require( '../../../../utils' );

const {
    loginTokens: {
        mongolianBeginningDragonProtection
    },
} = require( '../../../../exchangeUtils' );

const performEnchantedLuckFunction = require( './performEnchantedLuckFunction' );


exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log( 'running the exchange /dreamsSlot - POST function' );

        const event = getFormattedEvent({

            rawEvent,
            shouldGetBodyFromEvent: true,
        });

        // const exchangeUserId = event.body.userId;
        
        const {
            
            exchangeUserId,
            ipAddress

        } = await mongolianBeginningDragonProtection({

            // exchangeUserId,
            queueName: 'dreamsSlotPOST',
            event,
            megaCodeIsRequired: false,
            // ipAddressMaxRate: 6,
            ipAddressMaxRate: 500,
            ipAddressTimeRange: hour,

            // altruisticCode: event.headers[ headers.loginToken ], 
            // altruisticCode: `dragonDreams${ event.headers[ headers.userId ] }`, 
            // altruisticCodeIsRequired: true,
            // altruisticCodeMaxRate: 1000,
            // altruisticCodeTimeRange: hour,

            altruisticCode: `dreamsSlot-${ event.headers[ headers.userId ] }`, 
            altruisticCodeIsRequired: true,
            altruisticCodeMaxRate: 500,
            altruisticCodeTimeRange: hour,
        });

        const enchantedLuck = await performEnchantedLuckFunction({

            exchangeUserId,
            event,
            ipAddress,
        });

        const responseData = Object.assign(
            {},
            enchantedLuck
        );

        console.log(
            
            'the exchange /dreamsSlot - ' +
            'POST function executed successfully: ' +
            stringify({ responseData })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            'error in exchange /dreamsSlot ' +
            `- POST function: ${ err }`
        );

        return handleError( err );
    }
});