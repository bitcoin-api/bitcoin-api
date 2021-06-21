'use strict';

require( 'dotenv' ).config();

const request = require( 'request-promise' );

const {

    exchangeApiUrl,
    loginToken,
    exchangeUserId,

} = require( './values' );


(async () => {

    try {

        const uri = `${ exchangeApiUrl }/logout`;

        const response = await request({

            uri,
            json: true,
            headers: {
                'Content-Type': 'application/json',
                'login-token': loginToken,
                'user-id': exchangeUserId
            },
            method: 'POST',
            body: {},
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
