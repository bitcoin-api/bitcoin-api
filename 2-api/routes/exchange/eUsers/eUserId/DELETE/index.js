'use strict';

const {

    getFormattedEvent,
    getResponse,
    handleError,
    // beginningDragonProtection,
    stringify,

} = require( '../../../../../utils' );

const {
    loginTokens: {
        mongolianBeginningDragonProtection
    }
} = require( '../../../../../exchangeUtils' );

const deleteUser = require( './deleteUser' );


exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log(
            'running the exchange /users/exchangeUserId - DELETE function'
        );

        const event = getFormattedEvent({

            rawEvent,
            shouldGetBodyFromEvent: false,
            shouldGetPathParametersFromEvent: true,
        });

        const pathExchangeUserId = event.pathParameters.exchangeUserId;

        const {
            
            exchangeUserId,
            ipAddress,
            loginTokens,

        } = await mongolianBeginningDragonProtection({

            queueName: 'exchangeDeleteUser',
            event,
            ipAddressMaxRate: 20,
            ipAddressTimeRange: 60000,
            shouldGetFullLoginTokenInfo: true,
            shouldOnlyGetInitialTokens: false,
        });

        if( exchangeUserId !== pathExchangeUserId ) {

            const error = new Error( 'invalid userId' );
            error.bulltrue = true;
            error.statusCode = 400;
            throw error;
        }
        else if(
            event.headers[ 'delete-key' ] !== 'THIS_IS_THE_SUPER_SECRET_DELETE_KEY_9282see-9829829we-32893-923982323'
        ) {

            const error = new Error( 'API endpoint disabled' );
            error.bulltrue = true;
            error.statusCode = 400;
            throw error;
        }

        const deleteUserResults = await deleteUser({

            exchangeUserId,
            ipAddress,
            loginTokens,
        });

        const responseData = Object.assign(
            {},
            deleteUserResults
        );

        console.log(
            
            'the exchange /users/exchangeUserId ' +
            '- DELETE function executed successfully: ' +
            stringify({ responseData })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            
            'error in exchange /users/exchangeUserId ' +
            `- DELETE function: ${ err }`
        );

        return handleError( err );
    }
});