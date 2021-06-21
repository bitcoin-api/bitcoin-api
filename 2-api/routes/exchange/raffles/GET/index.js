'use strict';

const {

    getFormattedEvent,
    getResponse,
    handleError,
    stringify,

} = require( '../../../../utils' );

const {
    loginTokens: {
        mongolianBeginningDragonProtection
    },
} = require( '../../../../exchangeUtils' );

const getRaffleData = require( './getRaffleData' );


exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log( 'running the exchange /raffles - GET function' );

        const event = getFormattedEvent({

            rawEvent,
            shouldGetQueryStringParametersFromEvent: true,
            // shouldGetBodyFromEvent: false,
        });

        const {
            
            exchangeUserId,
            // ipAddress

        } = await mongolianBeginningDragonProtection({

            // exchangeUserId,
            queueName: 'exchangeRafflesGet',
            event,
            megaCodeIsRequired: false,
            ipAddressMaxRate: 20,
            ipAddressTimeRange: 60000,
        });

        const rawLastKey = event.queryStringParameters.lastKey;
        const rawLastTime = event.queryStringParameters.lastTime;

        const {
            
            raffleData,
            lastValues,
            ownSpecialId
            
        } = await getRaffleData({

            exchangeUserId,
            rawLastKey,
            rawLastTime,
        });

        // const responseData = Object.assign(

        //     {},
        //     raffleData
        // );

        const responseData = {

            raffleData,
            lastValues,
            ownSpecialId,
        };

        console.log(
            
            'the exchange /raffles - ' +
            'GET function executed successfully: ' +
            stringify({ responseData: Object.keys( responseData ) })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            'error in exchange /raffles ' +
            `- GET function: ${ err }`
        );

        return handleError( err );
    }
});