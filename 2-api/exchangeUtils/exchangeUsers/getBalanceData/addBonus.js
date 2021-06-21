'use strict';

const { 
    utils: {
        // stringify,
        bitcoin: {
            formatting: { getAmountNumber }
        },  
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const getCryptoAmountNumber = require( '../../crypto/getCryptoAmountNumber' );


module.exports = Object.freeze( ({

    exchangeUser,
    balanceData,

}) => {

    const bonusBalanceDataFromExchangeUser = (

        !!exchangeUser.moneyData &&
        !!exchangeUser.moneyData.bonus &&
        exchangeUser.moneyData.bonus

    ) || null;

    const bonusBalanceData = {};

    if( !bonusBalanceDataFromExchangeUser ) {

        Object.assign(

            bonusBalanceData,
            {
                bitcoin: {
                    totalAmount: 0,
                },
                crypto: {
                    totalAmount: 0,
                },
            }
        );
    }
    else {

        Object.assign(

            bonusBalanceData,
            {
                bitcoin: {
                    totalAmount: getAmountNumber(
                        !!bonusBalanceDataFromExchangeUser.bitcoin &&
                        !!bonusBalanceDataFromExchangeUser.bitcoin.amount &&
                        bonusBalanceDataFromExchangeUser.bitcoin.amount
                    ) || 0,
                },
                crypto: {
                    totalAmount: getCryptoAmountNumber(
                        !!bonusBalanceDataFromExchangeUser.crypto &&
                        !!bonusBalanceDataFromExchangeUser.crypto.amount &&
                        bonusBalanceDataFromExchangeUser.crypto.amount
                    ) || 0,
                },
            }
        );        
    }

    balanceData.bonus = bonusBalanceData;
});
