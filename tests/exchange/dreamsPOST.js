'use strict';

require( 'dotenv' ).config();

const request = require( 'request-promise' );

const {

    exchangeApiUrl,
    exchangeUserId,
    loginToken

} = require( './values' );


(async () => {

    try {

        const uri = `${ exchangeApiUrl }/dreams`;

        const response = await request({

            uri,
            json: true,
            headers: {
                'Content-Type': 'application/json',
                'login-token': loginToken,
                'user-id': exchangeUserId
            },
            method: 'POST',
            body: {
                mode: 'a',
            },
            resolveWithFullResponse: true,
        });

        console.log(`
        
        
            The Results: ${ JSON.stringify( {

                responseB: response.body,
                
            }, null, 4 ) }
        
        `);
    }
    catch( err ) {

        console.log( 'an error occurred in the request:', err.message );
    }
})();
