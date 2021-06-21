'use strict';

require( 'dotenv' ).config();

const { argv } = require( 'yargs' );

const request = require( 'request-promise' );

const {

    apiUrl,

} = require( './values' );


const doRequest = async () => {

    try {
        
        const uri = `${ apiUrl }/ultra-test`;

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
};

const count = argv.count || argv.c || 1;

for( let i = 1; i <= count; i++ ) {

    doRequest();
}
