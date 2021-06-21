'use strict';

require( 'dotenv' ).config();


const request = require( 'request-promise' );

const {

    apiUrl,

} = require( './values' );


(async () => {

    try {
        
        const uri = `${ apiUrl }/fee-data`;

        const response = await request({

            uri,
            json: true,
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
            // body: {},
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
