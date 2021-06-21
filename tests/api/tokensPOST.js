'use strict';

require( 'dotenv' ).config();

const request = require( 'request-promise' );

const {

    apiUrl,

} = require( './values' );



(async () => {

    try {

        const uri = `${ apiUrl }/tokens`;

        const response = await request({

            uri,
            headers: {},
            json: true,
            method: 'POST',
            body: {},
            resolveWithFullResponse: true,
        });

        console.log(`
        
        
            The Results: ${ JSON.stringify( {

                response: response.body
                
            }, null, 4 ) }
        
        `);
    }
    catch( err ) {

        console.log(
            
            'an error occurred in the request:',
            err.message,
            err.body,
            err.data
        );
    }
})();
