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
    }
} = require( '../../../../../exchangeUtils' );

const getVote = require( './getVote' );


exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log(
            'running the exchange /votes/:voteId - GET function'
        );

        const event = getFormattedEvent({

            rawEvent,
            shouldGetBodyFromEvent: false,
            shouldGetPathParametersFromEvent: true,
        });

        const rawVoteId = event.pathParameters.voteId;

        const {
            
            exchangeUserId

        } = await mongolianBeginningDragonProtection({

            queueName: 'exchangeVotesVoteIdGET',
            event,
            ipAddressMaxRate: 20,
            ipAddressTimeRange: 60000,
        });

        const getVoteResults = await getVote({

            // event,
            exchangeUserId,
            rawVoteId,
        });

        const responseData = Object.assign(
            {},
            getVoteResults
        );

        console.log(
            
            'the exchange /votes/:voteId ' +
            '- GET function executed successfully: ' +
            stringify({ responseData })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            
            'error in exchange /votes/:voteId ' +
            `- GET function: ${ err }`
        );

        return handleError( err );
    }
});