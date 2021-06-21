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

const doVote = require( './doVote' );


exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log( 'running the exchange /votes - POST function' );

        const event = getFormattedEvent({

            rawEvent,
            shouldGetBodyFromEvent: true,
            shouldGetPathParametersFromEvent: true,
        });

        const rawVoteId = event.pathParameters.voteId;

        // const exchangeUserId = event.body.userId;
        
        const {
            
            exchangeUserId,
            ipAddress

        } = await mongolianBeginningDragonProtection({

            // exchangeUserId,
            queueName: 'exchangeVotesPOST',
            event,
            megaCodeIsRequired: false,
            ipAddressMaxRate: 10,
            ipAddressTimeRange: 60000,
        });

        const doVoteResponse = await doVote({

            exchangeUserId,
            rawVoteId,
            event,
            ipAddress,
        });

        const responseData = Object.assign(

            {},
            doVoteResponse
        );

        console.log(
            
            'the exchange /votes - ' +
            'POST function executed successfully: ' +
            stringify({ responseData })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            'error in exchange /votes ' +
            `- POST function: ${ err }`
        );

        return handleError( err );
    }
});