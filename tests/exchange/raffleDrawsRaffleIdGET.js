'use strict';

require( 'dotenv' ).config();

const nodeQueryString = require( 'querystring' );

const request = require( 'request-promise' );

const { argv } = require( 'yargs' );

const {

    exchangeApiUrl,
    exchangeUserId,
    loginToken,
    raffleId,
    // raffleGetDrawsStartTime,
    // raffleGetDrawsEndTime
    // raffleGetDrawsLastTime,

} = require( './values' );


(async () => {

    try {

        const queryStringObject = {};

        if( !!argv.t ) {

            queryStringObject.lastTime = argv.t;
        }

        if( !!argv.k ) {

            queryStringObject.lastKey = argv.k;
        }

        if( !!argv.s ) {

            queryStringObject.startTime = argv.s;
        }
        
        if( !!argv.e ) {

            queryStringObject.endTime = argv.e;
        }

        const queryString = nodeQueryString.stringify( queryStringObject );

        const uri = (

            `${ exchangeApiUrl }/raffle-draws/${ raffleId }` +
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
            method,
            // body: {},
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
