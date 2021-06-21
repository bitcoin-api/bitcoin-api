'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    utils: {
        crypto: {
            getCryptoAmountNumber
        }
    },
} = require( '@bitcoin-api/full-stack-exchange-private' );


module.exports = Object.freeze( ({

    cryptoPot,
    numberOfWinners,
    houseCut,

}) => {

    console.log(
        'running getCryptoPayout: ' +
        stringify({
            cryptoPot,
            numberOfWinners,
            houseCut,
        })
    );

    const rawCryptoPayout = (
        ( cryptoPot * ( 1 - houseCut ) ) / numberOfWinners
    );

    const cryptoPayout = getCryptoAmountNumber( rawCryptoPayout );

    console.log(
        'getCryptoPayout executed successfully - ' +
        `here is the crypto payout: ${ cryptoPayout } Cryptos`
    );

    return cryptoPayout;
});
