'use strict';

const {

    getFormattedEvent,
    getResponse,
    handleError,
    stringify,

} = require( '../../../../../utils' );

const {
    loginTokens: {
        mongolianBeginningDragonProtection
    },
} = require( '../../../../../exchangeUtils' );

const getRaffleDrawsData = require( './getRaffleDrawsData' );


exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log(
            'running the exchange /raffle-draws/:raffleId - GET function'
        );

        const event = getFormattedEvent({

            rawEvent,
            shouldGetPathParametersFromEvent: true,
            shouldGetQueryStringParametersFromEvent: true,
        });

        // const {
            
        //     exchangeUserId,
        //     // ipAddress

        // } =
        await mongolianBeginningDragonProtection({

            queueName: 'exchangeRaffleDrawsRaffleIdGET',
            event,
            megaCodeIsRequired: false,
            ipAddressMaxRate: 20,
            ipAddressTimeRange: 60000,
        });

        const rawRaffleId = event.pathParameters.raffleId;
        const rawLastTime = event.queryStringParameters.lastTime;
        const rawLastKey = event.queryStringParameters.lastKey;
        const rawStartTime = event.queryStringParameters.startTime;
        const rawEndTime = event.queryStringParameters.endTime;

        const raffleDrawData = await getRaffleDrawsData({

            // exchangeUserId,
            rawRaffleId,
            rawLastTime,
            rawLastKey,
            rawStartTime,
            rawEndTime,
        });

        const responseData = Object.assign(

            {},
            raffleDrawData
        );

        console.log(
            
            'the exchange /raffle-draws/:raffleId - GET - ' +
            'function executed successfully: ' +
            stringify( Object.keys( responseData ) )
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            'error in exchange /raffle-draws/:raffleId - GET - ' +
            `function: ${ err }`
        );

        return handleError( err );
    }
});
