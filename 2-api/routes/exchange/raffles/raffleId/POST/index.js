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

const putTicketTransaction = require( './putTicketTransaction' );

// move to /raffleTickets/raffleId/POST
exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log(
            'running the exchange /raffles/:raffleId - POST function'
        );

        const event = getFormattedEvent({

            rawEvent,
            shouldGetBodyFromEvent: true,
            shouldGetPathParametersFromEvent: true,
        });

        const rawRaffleId = event.pathParameters.raffleId;

        const {
            
            exchangeUserId,
            ipAddress,

        } = await mongolianBeginningDragonProtection({

            // exchangeUserId,
            queueName: 'exchangeRafflesRaffleIdPOST',
            event,
            megaCodeIsRequired: false,
            ipAddressMaxRate: 20,
            ipAddressTimeRange: 60000,
        });

        const raffleData = await putTicketTransaction({

            exchangeUserId,
            event,
            rawRaffleId,
            ipAddress,
        });

        const responseData = Object.assign(

            {},
            raffleData
        );

        console.log(
            
            'the exchange /raffles/:raffleId - POST - ' +
            'function executed successfully: ' +
            stringify({ responseData })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            'error in exchange /raffles/:raffleId - POST - ' +
            `function: ${ err }`
        );

        return handleError( err );
    }
});