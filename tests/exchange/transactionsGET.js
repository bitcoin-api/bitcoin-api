'use strict';

require( 'dotenv' ).config();

const nodeQueryString = require( 'querystring' );

const request = require( 'request-promise' );

const { argv } = require( 'yargs' );

const {

    exchangeApiUrl,
    exchangeUserId,
    loginToken

} = require( './values' );


(async () => {

    try {

        const queryStringObject = {};

        if( !!argv.t ) {

            queryStringObject.lastTime = argv.t;
        }

        if( !!argv.i ) {

            queryStringObject.lastTransactionId = argv.i;
        }

        if( !!argv.s ) {

            queryStringObject.smallBatch = 'true';
        }

        const queryString = nodeQueryString.stringify( queryStringObject );

        const uri = (

            `${ exchangeApiUrl }/transactions` +
            (!!queryString ? `?${ queryString }` : '')
        );
        const method = 'GET';

        console.log(

            `making request to ${ method } - ${ uri }`
        );

        const response = await request({

            uri,
            json: true,
            headers: {
                'Content-Type': 'application/json',
                'login-token': loginToken,
                'user-id': exchangeUserId
            },
            method: 'GET',
            resolveWithFullResponse: true,
        });

        console.log(`
        
        
            The Results: ${ JSON.stringify( {

                responseBody: response.body,
                
            }, null, 4 ) }
        
        `);
    }
    catch( err ) {

        console.log( 'an error occurred in the request:', err.message );
    }
})();
