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

const getRaffleDrawsData = require( './getRaffleTicketsData' );


exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log(
            'running the exchange /raffle-tickets/:raffleId - GET function'
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

            queueName: 'exchangeRaffleTicketsRaffleIdGET',
            event,
            megaCodeIsRequired: false,
            ipAddressMaxRate: 20,
            ipAddressTimeRange: 60000,
        });

        const rawRaffleId = event.pathParameters.raffleId;
        const rawTime = event.queryStringParameters.time;
        const rawPowerId = event.queryStringParameters.powerId;
        const rawSpecialId = event.queryStringParameters.specialId;

        const raffleDrawData = await getRaffleDrawsData({

            rawRaffleId,
            rawTime,
            rawPowerId,
            rawSpecialId,
        });

        const responseData = Object.assign(

            {},
            raffleDrawData
        );

        console.log(
            
            'the exchange /raffle-tickets/:raffleId - GET - ' +
            'function executed successfully: ' +
            stringify( Object.keys( responseData ) )
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            'error in exchange /raffle-tickets/:raffleId - GET - ' +
            `function: ${ err }`
        );

        return handleError( err );
    }
});
