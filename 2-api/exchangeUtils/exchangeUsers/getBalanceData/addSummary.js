'use strict';

const { 
    utils: {
        bitcoin: {
            formatting: { getAmountNumber }
        },  
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const getCryptoAmountNumber = require( '../../crypto/getCryptoAmountNumber' );


module.exports = Object.freeze( ({

    balanceData,

}) => {

    const summaryBalanceData = {
        bitcoin: {
            totalAmount: getAmountNumber(
                balanceData.bitcoin.totalAmount +
                (-balanceData.bitcoinWithdraws.totalAmount) +
                (balanceData.exchange.bitcoin.totalAmount) +
                (balanceData.bonus.bitcoin.totalAmount)
            )
        },
        crypto: {
            totalAmount: getCryptoAmountNumber(
                balanceData.crypto.totalAmount +
                (balanceData.exchange.crypto.totalAmount) +
                balanceData.vote.crypto.totalAmount +
                balanceData.raffle.crypto.totalAmount +
                (balanceData.bonus.crypto.totalAmount)
            )
        },
    };

    balanceData.summary = summaryBalanceData;
});
