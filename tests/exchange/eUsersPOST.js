'use strict';

require( 'dotenv' ).config();

const request = require( 'request-promise' );

const {

    exchangeApiUrl,
    email,
    password

} = require( './values' );


(async () => {

    try {

        const uri = `${ exchangeApiUrl }/exchange-users`;

        const response = await request({

            uri,
            json: true,
            headers: {
                'Content-Type': 'application/json',
                email,
                password,
            },
            method: 'POST',
            resolveWithFullResponse: true,
        });

        console.log(`
        
        
            The Results: ${ JSON.stringify( {

                response,
                responseBodyType: typeof response.body,
                
            }, null, 4 ) }
        
        `);
    }
    catch( err ) {

        console.log( 'an error occurred in the request:', err.message );
    }
})();
