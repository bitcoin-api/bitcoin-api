'use strict';

require( 'dotenv' ).config();

const yargs = require( 'yargs' );

const request = require( 'request-promise' );

const {

    apiUrl,
    token,
    withdrawAddress

} = require( './values' );


const performOperation = async () => {

    try {
            
        const uri = `${ apiUrl }/withdraws`;

        const body = {

            address: withdrawAddress, 
            // address: [ 'ete', '34 '], 
            amount: 0.00007,
            // includeFeeInAmount: true,
            // enviroWithdrawAmount: 0.00002,
        };

        console.log(`
        
        
            doing withdraw with body: ${ JSON.stringify( {

                body
                
            }, null, 4 ) }
        
        `);

        const response = await request({

            uri,
            method: 'POST',
            json: true,
            headers: {

                'Content-Type': 'application/json',
                'Token': token,
            },
            body,
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
            err.statusCode,
        );
    }
};

const theNumber = yargs.argv.theNumber || 1;


for( let i = 1; i <= theNumber; i++ ) {

    performOperation();    
}
