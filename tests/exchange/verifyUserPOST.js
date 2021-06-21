'use strict';

require( 'dotenv' ).config();

const request = require( 'request-promise' );

const {

    exchangeApiUrl,
    // loginToken,
    // exchangeUserId,
    email,
    password,
    verifyEmailCode

} = require( './values' );



(async () => {

    try {

        const uri = `${ exchangeApiUrl }/verify-user`;

        const response = await request({

            uri,
            json: true,
            headers: {
                'Content-Type': 'application/json',
                email,
                password, 
                'verify-email-code': verifyEmailCode,
            },
            method: 'POST',
            // body: {
            // },
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
