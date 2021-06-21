'use strict';

const { 
    utils: {
        bitcoin: {
            formatting: { getAmountNumber }
        },  
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    constants: {
        withdraws: {
            states: {
                no_withdraws_are_currently_being_processed
            }
        },
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );


module.exports = Object.freeze( ({

    exchangeUser,
    balanceData,

}) => {

    const bitcoinWithdrawsBalanceDataFromExchangeUser = (

        !!exchangeUser.moneyData &&
        !!exchangeUser.moneyData.bitcoinWithdraws &&
        exchangeUser.moneyData.bitcoinWithdraws

    ) || null;

    const bitcoinWithdrawsBalanceData = {};

    if( !bitcoinWithdrawsBalanceDataFromExchangeUser ) {

        Object.assign(
            bitcoinWithdrawsBalanceData,
            {

                totalAmount: 0,
                currentState: no_withdraws_are_currently_being_processed,
            }
        );
    }
    else {

        Object.assign(
            bitcoinWithdrawsBalanceData,
            {
                totalAmount: getAmountNumber(
                    bitcoinWithdrawsBalanceDataFromExchangeUser.totalAmount
                ),
                currentState: (
                    bitcoinWithdrawsBalanceDataFromExchangeUser.currentState
                ),
            }
        );
    }

    balanceData.bitcoinWithdraws = bitcoinWithdrawsBalanceData;
});
