'use strict';

const { 
    utils: {
        // stringify,
        bitcoin: {
            formatting: { getAmountNumber }
        },  
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const bitcoinSumReducer = Object.freeze(
    
    ( accumulator, currentValue ) => accumulator + currentValue.amount
);


const getSumOfBitcoinDeposits = Object.freeze( ({

    bitcoinData

}) => {

    const sumOfBitcoinDeposits = bitcoinData.reduce( bitcoinSumReducer, 0 );

    return sumOfBitcoinDeposits;
});


module.exports = Object.freeze( ({

    exchangeUser,
    balanceData,

}) => {

    const bitcoinData = (

        !!exchangeUser.moneyData &&
        !!exchangeUser.moneyData.bitcoin &&
        exchangeUser.moneyData.bitcoin

    ) || [];

    if( bitcoinData.length === 0 ) {

        const bitcoinBalanceData = {

            totalAmount: 0,
            depositAddress: null
        };
    
        balanceData.bitcoin = bitcoinBalanceData;
        return;
    }

    const totalAmount = getSumOfBitcoinDeposits({

        bitcoinData
    });

    const depositAddress = bitcoinData[
        bitcoinData.length - 1
    ].address;

    const bitcoinBalanceData = {

        totalAmount: getAmountNumber( totalAmount ),
        depositAddress
    };

    balanceData.bitcoin = bitcoinBalanceData;
});
