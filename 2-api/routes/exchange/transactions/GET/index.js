'use strict';

const {

    getFormattedEvent,
    getResponse,
    handleError,
    stringify,
    constants: {
        timeNumbers: {
            minute
        }
    }

} = require( '../../../../utils' );

const {
    loginTokens: {
        mongolianBeginningDragonProtection
    },
} = require( '../../../../exchangeUtils' );

const getMoneyActionData = require( './getMoneyActionData' );


exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log(
            'running the exchange /transactions - GET function'
        );

        const event = getFormattedEvent({

            rawEvent,
            shouldGetQueryStringParametersFromEvent: true,
        });

        const {
            
            exchangeUserId,
            // ipAddress

        } = await mongolianBeginningDragonProtection({

            queueName: 'transactionsGET',
            event,
            megaCodeIsRequired: false,
            ipAddressMaxRate: 200,
            ipAddressTimeRange: minute,
        });

        const rawLastTransactionId = event.queryStringParameters.lastTransactionId;
        const rawLastTime = event.queryStringParameters.lastTime;
        const smallBatch = (event.queryStringParameters.smallBatch === 'true');

        const getTransactionsResults = await getMoneyActionData({

            exchangeUserId,
            rawLastTransactionId,
            rawLastTime,
            smallBatch,
        });

        const responseData = Object.assign(

            {},
            getTransactionsResults
        );

        console.log(
            
            'the exchange /transactions - GET - ' +
            'function executed successfully: ' +
            stringify( Object.keys( responseData ) )
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            'error in exchange /transactions - GET - ' +
            `function: ${ err }`
        );

        return handleError( err );
    }
});
