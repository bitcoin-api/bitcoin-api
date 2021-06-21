'use strict';

require( 'dotenv' ).config();

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

        const queryString = (
            
            (!!argv.t && !!argv.p && !!argv.s) && (
            
                '?' +
                `time=${ argv.t }` +
                '&' +
                `powerId=${ argv.p }` +
                '&' +
                `specialId=${ argv.s }`

            ) || ''
        );

        const uri = (

            `${ exchangeApiUrl }/raffle-tickets/${ raffleId }` + queryString
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
