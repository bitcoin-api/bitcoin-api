#!/usr/bin/env node
'use strict';

const argv = require( 'yargs' ).argv;

const isProductionMode = argv.mode === 'production';

if( isProductionMode ) {

    require( 'dotenv' ).config({ path: `${ __dirname }/productionCredentials/.env` });
}
else {

    require( 'dotenv' ).config({ path: `${ __dirname }/stagingCredentials/.env` });
}


const {
    utils: {
        aws: {
            dinoCombos: {
                addTransactionAndUpdateExchangeUser
            }
        }
    },
    constants: {
        transactions: {
            types: {
                identity
            }
        },
        identityTransactions: {
            types: {
                pure,
                recalculate
            }
        }
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );


const exchangeUserId = argv.e;

if( !exchangeUserId ) {

    throw new Error( 'Identity Transaction - missing values' );
}


const identityData = [

    {
        exchangeUserId,
        identityType: argv.recalculate ? recalculate : pure 
    }
];


const identityTransaction = Object.freeze( async ({

    exchangeUserId,
    identityType

}) => {

    console.log(
        '🏰identity transaction with the following values: ',
        JSON.stringify({
            exchangeUserId,
        }, null, 4 )
    );

    await addTransactionAndUpdateExchangeUser({

        exchangeUserId,
        type: identity,
        data: {
            identityType,
        }
    });

    console.log( '🏰identity transaction accomplished' );
});


(async () => {

    try {

        console.log( `✅Identity ${ identityData.length } transaction(s)` );

        for( const identityDatum of identityData ) {

            await identityTransaction( identityDatum );
        }

        console.log( `💯Identity ${ identityData.length } transaction(s)` );

        process.exit( 0 );
    }
    catch( err ) {
    
        console.log( '❌error in identity transaction(s):', err );

        process.exit( 1 );
    }
})();
