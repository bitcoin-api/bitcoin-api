'use strict';

require( 'dotenv' ).config();

const request = require( 'request-promise' );

const {

    exchangeApiUrl,
    email,
    // grecaptchaBypassHeaderKeyValue,

} = require( './values' );


(async () => {

    try {

        const uri = `${ exchangeApiUrl }/login/password`;

        const response = await request({

            uri,
            json: true,
            headers: {
                'Content-Type': 'application/json',
                email,
                // 'grecaptcha-google-code': grecaptchaBypassHeaderKeyValue,
            },
            method: 'POST',
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
