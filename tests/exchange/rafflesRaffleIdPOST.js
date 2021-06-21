'use strict';

require( 'dotenv' ).config();

const request = require( 'request-promise' );

const { argv } = require( 'yargs' );

const {

    exchangeApiUrl,
    exchangeUserId,
    loginToken,
    raffleId

} = require( './values' );


(async () => {

    try {

        const uri = `${ exchangeApiUrl }/raffles/${ raffleId }`;
        const method = 'POST';
        const action = argv.action || argv.a || 'buy';
        const numbers = [
            Number( argv.number1 ) || Number( argv.n1 ) || 1,
            Number( argv.number2 ) || Number( argv.n2 ) || 36
        ];

        console.log(

            `making request to ${ method } - ${ uri } ` +
            'with the following values: ' +
            JSON.stringify({

                action,
                numbers,

            }, null, 4 )
        );

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
                numbers,
                action
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
