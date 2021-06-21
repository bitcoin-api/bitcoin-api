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

        const uri = `${ exchangeApiUrl }/exchange-users/${ exchangeUserId }`;

        const response = await request({

            uri,
            json: true,
            headers: {
                'Content-Type': 'application/json',
                'login-token': loginToken,
                'user-id': exchangeUserId,
                // 'login-token': 'login_token-90688de386db4013b8f7537433f9073e955b440ee238429e80c9767eb5bcf77ab67c63d63de948d884994f7ad5f06734',
            },
            method: 'DELETE',
            resolveWithFullResponse: true,
        });

        console.log(`
        
        
            The Results: ${ JSON.stringify( {

                ['response body']: response.body,
                
            }, null, 4 ) }
        
        `);
    }
    catch( err ) {

        console.log( 'an error occurred in the request:', err.message );
    }
})();
