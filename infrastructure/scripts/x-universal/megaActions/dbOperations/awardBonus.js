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
        bitcoin: {
            formatting: {
                getAmountNumber
            }
        },
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    utils: {
        aws: {
            dinoCombos: {
                addTransactionAndUpdateExchangeUser
            }
        },
    },
    constants: {
        transactions: {
            types: {
                bonus
            }
        }
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );


const exchangeUserId = argv.e;
const searchId = argv.s;

if( !exchangeUserId || !searchId ) {

    throw new Error( 'Award Bonus - missing values' );
}

const amount = getAmountNumber( argv.amount || argv.a );

if(
    Number.isNaN( amount ) ||
    (amount > 0.0001) ||
    (amount < 0)
) {

    throw new Error( `invalid amount: ${ amount }` );
}


const bonusData = [

    {
        exchangeUserId,
        bitcoinAmount: amount,
        cryptoAmount: 0,

        // bitcoinAmount: 0.00015,
        // searchId: 'First1000DynastySatsBonus',
        searchId,
    }
];


const awardBonus = Object.freeze( async ({

    exchangeUserId,
    bitcoinAmount,
    cryptoAmount,
    searchId,

}) => {

    console.log(
        '🎁📈📈📈adding bonus with the following values: ',
        JSON.stringify({
            exchangeUserId,
            bitcoinAmount,
            cryptoAmount,
            searchId,
        }, null, 4 )
    );

    await addTransactionAndUpdateExchangeUser({

        exchangeUserId,
        type: bonus,
        data: {
            bitcoinAmount,
            cryptoAmount,
            searchId,
        }
    });

    console.log( '🎁📈📈📈bonus added successfully' );
});


(async () => {

    try {

        console.log( `✅Awarding ${ bonusData.length } bonus(es)` );

        for( const bonusDatum of bonusData ) {

            await awardBonus( bonusDatum );
        }

        console.log( `💯Awarded ${ bonusData.length } bonus(es)` );

        process.exit( 0 );
    }
    catch( err ) {
    
        console.log( '❌error in awarding bonus(es):', err );

        process.exit( 1 );
    }
})();
