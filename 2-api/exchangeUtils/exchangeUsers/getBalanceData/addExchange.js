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

    const exchangeBalanceDataFromExchangeUser = (

        !!exchangeUser.moneyData &&
        !!exchangeUser.moneyData.exchange &&
        exchangeUser.moneyData.exchange

    ) || null;

    const exchangeBalanceData = {};

    if( !exchangeBalanceDataFromExchangeUser ) {

        Object.assign(

            exchangeBalanceData,
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

            exchangeBalanceData,
            {
                bitcoin: {
                    totalAmount: getAmountNumber(
                        !!exchangeBalanceDataFromExchangeUser.bitcoin &&
                        !!exchangeBalanceDataFromExchangeUser.bitcoin.amount &&
                        exchangeBalanceDataFromExchangeUser.bitcoin.amount
                    ) || 0,
                },
                crypto: {
                    totalAmount: getCryptoAmountNumber(
                        !!exchangeBalanceDataFromExchangeUser.crypto &&
                        !!exchangeBalanceDataFromExchangeUser.crypto.amount &&
                        exchangeBalanceDataFromExchangeUser.crypto.amount
                    ) || 0,
                },
            }
        );        
    }

    balanceData.exchange = exchangeBalanceData;
});
