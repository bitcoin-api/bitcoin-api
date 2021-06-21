'use strict';

require( 'dotenv' ).config();

const yargs = require( 'yargs' );
const { argv } = yargs;

const { delay } = require( 'bluebird' );

const request = require( 'request-promise' );

const {

    exchangeApiUrl,
    loginToken,
    exchangeUserId,
    withdrawAddress,
    grecaptchaBypassHeaderKeyValue

} = require( './values' );


const withdraw = async i => {

    try {

        const uri = `${ exchangeApiUrl }/withdraws`;

        const amount = yargs.argv.amount || yargs.argv.a || 0.00004;
        const address = withdrawAddress;

        await request({

            uri,
            json: true,
            headers: {
                'Content-Type': 'application/json',
                'login-token': loginToken,
                'user-id': exchangeUserId,
                'grecaptcha-google-code': grecaptchaBypassHeaderKeyValue,
            },
            method: 'POST',
            body: {

                amount,
                address,
                // enviroWithdrawAmount: 0.000002,
            },
            resolveWithFullResponse: true,
        });

        console.log( `withdraw ${ i } end: ${ amount } BTC withdraw to "${ address }" successful` );
    }
    catch( err ) {

        console.log( 'an error occurred in the request:', err.message );
    }
};

(async () => {

    const withdraws = [];

    const numberOfWithdraws = argv.numberOfWithdraws || argv.n || 1;

    for( let i = 1; i <= numberOfWithdraws; i++ ) {

        await delay( 100 );

        console.log(
            `withdraw ${ i } start: ` +
            'making request to POST /withdraws exchange API endpoint'
        );

        withdraws.push( withdraw( i ) );
    }

    await withdraws;
})();
