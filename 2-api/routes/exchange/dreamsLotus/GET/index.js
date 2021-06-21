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
        // http: {
        //     headers
        // },
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

const getDreamsLotusJackpotData = require( './getDreamsLotusJackpotData' );


exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log( 'running the exchange /dreams-lotus - GET function' );

        const event = getFormattedEvent({

            rawEvent,
            // shouldGetBodyFromEvent: true,
        });

        // const exchangeUserId = event.body.userId;
        
        const {
            
            exchangeUserId,
            ipAddress

        } = await mongolianBeginningDragonProtection({

            // exchangeUserId,
            queueName: 'dreamsLotusGET',
            event,
            megaCodeIsRequired: false,
            // ipAddressMaxRate: 6,
            ipAddressMaxRate: 3600,
            ipAddressTimeRange: hour,

            // altruisticCode: event.headers[ headers.loginToken ], 
            // altruisticCode: `dragonDreams${ event.headers[ headers.userId ] }`, 
            // altruisticCodeIsRequired: true,
            // altruisticCodeMaxRate: 1000,
            // altruisticCodeTimeRange: hour,
        });

        const jackpotData = await getDreamsLotusJackpotData({

            exchangeUserId,
            event,
            ipAddress,
        });

        const responseData = Object.assign(
            {},
            jackpotData
        );

        console.log(
            
            'the exchange /dreams-lotus - ' +
            'GET function executed successfully: ' +
            stringify({ responseData })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            'error in exchange /dreams-lotus ' +
            `- GET function: ${ err }`
        );

        return handleError( err );
    }
});