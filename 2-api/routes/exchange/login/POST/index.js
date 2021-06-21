'use strict';

const {

    getFormattedEvent,
    getResponse,
    handleError,
    beginningDragonProtection,
    stringify,

} = require( '../../../../utils' );

const doLogin = require( '../../../../sacredElementals/crypto/doLogin' );


exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log( 'running the exchange /login - POST function' );

        const event = getFormattedEvent({

            rawEvent,
            // shouldGetBodyFromEvent: false,
        });

        const {
            
            ipAddress

        } = await beginningDragonProtection({

            queueName: 'exchangeLogin',
            
            event,

            megaCodeIsRequired: false,

            ipAddressMaxRate: 5,
            ipAddressTimeRange: 60000,
        });

        const doLoginResults = await doLogin({

            event,
            ipAddress,
            needGoogleCode: true,
        });

        const responseData = Object.assign(
            {},
            doLoginResults
        );

        console.log(
            
            'the exchange /login - POST function executed successfully: ' +
            stringify({ responseData })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log( `error in exchange /login - POST function: ${ err }` );

        return handleError( err );
    }
});