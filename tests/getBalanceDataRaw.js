'use strict';

const stringify = m => JSON.stringify( m, null, 4 );

const getAmountNumber = Object.freeze(
    amount => Number(
        (Math.round( Number(amount) * 100000000 ) / 100000000).toFixed(8)
    )
);

const toFixedConstant = 5;
const amountMultiplier = 100000;

const getCryptoAmountNumber = Object.freeze( amount => {

    const cryptoAmount = Number(
        (
            Math.round(
                Number(amount) * amountMultiplier
            ) / amountMultiplier
        ).toFixed( toFixedConstant )
    );

    return cryptoAmount;
});



const no_withdraws_are_currently_being_processed = 'no_withdraws_are_currently_being_processed';


const bitcoinSumReducer = Object.freeze(
    
    ( accumulator, currentValue ) => accumulator + currentValue.amount
);


const getSumOfBitcoinDeposits = Object.freeze( ({

    bitcoinData

}) => {

    const sumOfBitcoinDeposits = bitcoinData.reduce( bitcoinSumReducer, 0 );

    return sumOfBitcoinDeposits;
});


const addBitcoinBalanceData = Object.freeze( ({

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


const addBitcoinWithdrawsBalanceData = Object.freeze( ({

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


const addCryptoBalanceData = Object.freeze( ({

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


const addExchangeBalanceData = Object.freeze( ({

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


const addVoteBalanceData = Object.freeze( ({

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


const addRaffleBalanceData = Object.freeze( ({

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


const addSummaryBalanceData = Object.freeze( ({

    balanceData,

}) => {

    const summaryBalanceData = {
        bitcoin: {
            totalAmount: getAmountNumber(
                balanceData.bitcoin.totalAmount +
                (-balanceData.bitcoinWithdraws.totalAmount) +
                (balanceData.exchange.bitcoin.totalAmount)
            )
        },
        crypto: {
            totalAmount: getCryptoAmountNumber(
                balanceData.crypto.totalAmount +
                (balanceData.exchange.crypto.totalAmount) +
                balanceData.vote.crypto.totalAmount +
                balanceData.raffle.crypto.totalAmount
            )
        },
    };

    balanceData.summary = summaryBalanceData;
});


module.exports = Object.freeze( ({

    exchangeUser,

}) => {

    console.log( 'running getBalanceData' );

    const balanceData = {};

    addBitcoinBalanceData({

        exchangeUser,
        balanceData,
    });

    addBitcoinWithdrawsBalanceData({

        exchangeUser,
        balanceData,
    });

    addCryptoBalanceData({

        exchangeUser,
        balanceData,
    });

    addExchangeBalanceData({

        exchangeUser,
        balanceData,
    });

    addVoteBalanceData({

        exchangeUser,
        balanceData,
    });

    addRaffleBalanceData({

        exchangeUser,
        balanceData,
    });

    addSummaryBalanceData({

        exchangeUser,
        balanceData,
    });

    console.log(
        
        'getBalanceData executed successfully: ' +
        `got balance data ${ stringify( balanceData ) }` 
    );

    return balanceData;
});