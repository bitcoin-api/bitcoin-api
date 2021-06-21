'use strict';

// const { 
//     utils: {
//         stringify,
//         bitcoin: {
//             formatting: { getAmountNumber }
//         },  
//     },
// } = require( '@bitcoin-api/full-stack-api-private' );

const getCryptoAmountNumber = require( '../../crypto/getCryptoAmountNumber' );


module.exports = Object.freeze( ({

    exchangeUser,
    balanceData,

}) => {

    const cryptoBalanceData = {};

    const cryptoBalanceDataFromExchangeUser = (

        !!exchangeUser.moneyData &&
        !!exchangeUser.moneyData.dream &&
        !!exchangeUser.moneyData.dream.crypto &&
        exchangeUser.moneyData.dream.crypto

    ) || null;

    if( !cryptoBalanceDataFromExchangeUser ) {

        Object.assign(
            cryptoBalanceData,
            {
                totalAmount: 0,
            }
        );
    }
    else {

        Object.assign(
            cryptoBalanceData,
            {
                totalAmount: getCryptoAmountNumber(
                    cryptoBalanceDataFromExchangeUser.amount
                ),
            }
        );
    }

    balanceData.crypto = cryptoBalanceData;
});
