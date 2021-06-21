'use strict';

const {
    utils: {
        stringify
    },
} = require( '@bitcoin-api/full-stack-api-private' );


// const getTransactionId = require( './getTransactionId' );
const getNewBitcoinData = require( './getNewBitcoinData' );
const getBitcoinWithdrawsData = require( './getBitcoinWithdrawsData' );
const getExchangeData = require( './getExchangeData' );
const getDreamData = require( './getDreamData' );
const getVoteData = require( './getVoteData' );
const getRaffleData = require( './getRaffleData' );
const getBonusData = require( './getBonusData' );
const getAlienBalanceData = require( './getAlienBalanceData' );


module.exports = Object.freeze( ({

    exchangeUser,
    theOracleOfDelphiDefi,

}) => {

    console.log(
        
        'running getNewMoneyData with the following values: ' +
        stringify({
            exchangeUser,
            theOracleOfDelphiDefi,
        })
    );

    const newMoneyData = {

        bitcoin: getNewBitcoinData({

            exchangeUser,
            theOracleOfDelphiDefi,
        }),

        bitcoinWithdraws: getBitcoinWithdrawsData({

            theOracleOfDelphiDefi,
        }),

        exchange: getExchangeData({

            theOracleOfDelphiDefi,
        }),

        dream: getDreamData({

            theOracleOfDelphiDefi,
        }),

        vote: getVoteData({

            theOracleOfDelphiDefi,
        }),

        raffle: getRaffleData({

            theOracleOfDelphiDefi,
        }),

        bonus: getBonusData({

            theOracleOfDelphiDefi,
        }),

        alienBalance: getAlienBalanceData({

            theOracleOfDelphiDefi,
        }),
    };

    console.log(
        'getNewMoneyData executed successfully, returning money data:',
        newMoneyData
    );

    return newMoneyData;
});
