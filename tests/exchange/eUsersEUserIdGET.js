'use strict';

require( 'dotenv' ).config();

const request = require( 'request-promise' );
const { argv } = require('yargs');

const {

    exchangeApiUrl,
    exchangeUserId,
    loginToken

} = require( './values' );


const getUser = async () => {

    try {

        const uri = `${ exchangeApiUrl }/exchange-users/${ exchangeUserId }`;

        const response = await request({

            uri,
            json: true,
            headers: {
                'Content-Type': 'application/json',
                'login-token': loginToken,
                'user-id': exchangeUserId,
            },
            method: 'GET',
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
};


const numberOfTries = argv.n || 1;

(async () => {

    for( let i = 1; i <= numberOfTries; i++ ) {

        console.log( 'doing get: ', i );

        getUser();
    }
})();
