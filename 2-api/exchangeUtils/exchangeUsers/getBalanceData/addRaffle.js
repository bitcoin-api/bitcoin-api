'use strict';

const getCryptoAmountNumber = require( '../../crypto/getCryptoAmountNumber' );


module.exports = Object.freeze( ({

    exchangeUser,
    balanceData,

}) => {

    const raffleBalanceDataFromExchangeUser = (

        !!exchangeUser.moneyData &&
        !!exchangeUser.moneyData.raffle &&
        exchangeUser.moneyData.raffle

    ) || null;

    const raffleBalanceData = {};

    if( !raffleBalanceDataFromExchangeUser ) {

        raffleBalanceData.crypto = {
            totalAmount: 0,
        };
    }
    else {

        raffleBalanceData.crypto = {
            totalAmount: getCryptoAmountNumber(
                raffleBalanceDataFromExchangeUser.crypto.amount
            ) || 0,
        };
    }

    balanceData.raffle = raffleBalanceData;
});
