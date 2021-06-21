'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    crypto: { getCryptoAmountNumber },
} = require( '../../../../../../exchangeUtils' );

const {
    maxAmount,
} = require( '../localConstants' );




module.exports = Object.freeze( ({

    amount,
    jackpotAmount,
    houseCut,

}) => {

    const amountOverMaxAmount = (amount/maxAmount);

    console.log(
        'running getWinAmount with the following values:',
        stringify({

            amount,
            maxAmount,
            amountOverMaxAmount,
            houseCut,
            jackpotAmount
        })
    );

    const rawWinAmount = amountOverMaxAmount * jackpotAmount;

    const oneMinusHouseCut = (1 - houseCut);

    const winAmount = getCryptoAmountNumber(
        rawWinAmount * oneMinusHouseCut
    );

    console.log(
        'getWinAmount executed successfully, here is the win amount:',
        stringify({

            rawWinAmount,
            '(1 - houseCut)': oneMinusHouseCut,
            winAmount,
        })
    );

    return winAmount;
});
