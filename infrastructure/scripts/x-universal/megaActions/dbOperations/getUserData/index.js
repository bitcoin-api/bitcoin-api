#!/usr/bin/env node
'use strict';

const argv = require( 'yargs' ).argv;

const isProductionMode = argv.mode === 'production';

if( isProductionMode ) {

    require( 'dotenv' ).config({ path: `${ __dirname }/../productionCredentials/.env` });
}
else {

    require( 'dotenv' ).config({ path: `${ __dirname }/../stagingCredentials/.env` });
}

const {
    utils: {
        aws: {
            dinoCombos: {
                getExchangeUser
            }
        }
    },
    // constants: {
    //     transactions: {
    //         types: {
    //             bonus
    //         }
    //     }
    // }
} = require( '@bitcoin-api/full-stack-exchange-private' );

const fs = require( 'fs' );

const getBalanceData = require( process.env.GET_BALANCE_DATA_PATH );


const writeUserDataToFile = Object.freeze( ({

    exchangeUserId,
    userData

}) => {

    const stream = fs.createWriteStream(
        
        `${ __dirname }/userData.txt`,
        {
            flags: 'a'
        }
    );

    stream.write(
        `==--==--==--==--==--==--==--==--==--==--==--==--==\n` +
        `User Data ${ exchangeUserId } - ${ (new Date()).toLocaleString() }\n` +
        `${ JSON.stringify( userData, null, 4 ) },\n` +
        {
            [process.env.EU1]: '👑🐸',
            [process.env.EU2]: '🦃',
            [process.env.EU3]: '👸❤️',
            [process.env.EU4]: '🌈🐑',
            [process.env.EU5]: '🐳',
            [process.env.EU6]: '🧑🏿‍⚕️',
        }[ exchangeUserId ] + '\n' +
        `==--==--==--==--==--==--==--==--==--==--==--==--==\n`
    );

    stream.end();
});


const getUserData = async ({

    exchangeUserId
    
}) => {

    const exchangeUser = await getExchangeUser({

        exchangeUserId,
    });

    if( !exchangeUser ) {

        throw new Error(
            
            'holy fuck fuck duck no exchangeUser for ' +
            `exchange user ID ${ exchangeUserId }`
        );
    }

    const balanceData = getBalanceData({

        exchangeUser
    });

    const userData = {
        
        'Balance Summary': balanceData.summary,
        'Total BTC Balance': (
            Math.round(
                (
                    balanceData.summary.bitcoin.totalAmount +
                    (balanceData.summary.crypto.totalAmount/1000)
                ) * 100000000 ) / 100000000
        ).toFixed(8),
        'Transaction Count': exchangeUser.transactionCount,
    };

    writeUserDataToFile({

        exchangeUserId,
        userData
    });
};


(async () => {

    const exchangeUserId = argv.e || (

        isProductionMode ? (
            
            process.env.PRODUCTION_EXCHANGE_USER_ID

        ) : process.env.STAGING_EXCHANGE_USER_ID
    );

    try {

        if( !exchangeUserId ) {

            throw new Error( `invalid exchangeUserId: ${ exchangeUserId }` );
        }
        
        await getUserData({

            exchangeUserId,
        });
    }
    catch( err ) {

        console.log(
            
            `error in getting exchange user ${ exchangeUserId }:`,
            err
        );
    }
})();
