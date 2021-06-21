'use strict';

const getCryptoAmountNumber = require( '../../crypto/getCryptoAmountNumber' );


module.exports = Object.freeze( ({

    exchangeUser,
    balanceData,

}) => {

    const voteBalanceDataFromExchangeUser = (

        !!exchangeUser.moneyData &&
        !!exchangeUser.moneyData.vote &&
        exchangeUser.moneyData.vote

    ) || null;

    const voteBalanceData = {};

    if( !voteBalanceDataFromExchangeUser ) {

        voteBalanceData.crypto = {
            totalAmount: 0,
        };
    }
    else {

        voteBalanceData.crypto = {
            totalAmount: getCryptoAmountNumber(
                voteBalanceDataFromExchangeUser.crypto.amount
            ) || 0,
        };
    }

    balanceData.vote = voteBalanceData;
});
