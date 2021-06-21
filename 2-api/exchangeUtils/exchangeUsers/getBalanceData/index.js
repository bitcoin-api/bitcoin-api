'use strict';

const { 
    utils: {
        stringify,
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const addBitcoin = require( './addBitcoin' );
const addBitcoinWithdraws = require( './addBitcoinWithdraws' );
const addCrypto = require( './addCrypto' );
const addExchange = require( './addExchange' );
const addVote = require( './addVote' );
const addRaffle = require( './addRaffle' );
const addBonus = require( './addBonus' );
const addSummary = require( './addSummary' );


module.exports = Object.freeze( ({

    exchangeUser,

}) => {

    console.log( 'running getBalanceData' );

    const balanceData = {};

    addBitcoin({ exchangeUser, balanceData });
    addBitcoinWithdraws({ exchangeUser, balanceData });
    addCrypto({ exchangeUser, balanceData });
    addExchange({ exchangeUser, balanceData });
    addVote({ exchangeUser, balanceData });
    addRaffle({ exchangeUser, balanceData });
    addBonus({ exchangeUser, balanceData });
    addSummary({ exchangeUser, balanceData });

    console.log(
        
        'getBalanceData executed successfully: ' +
        `got balance data ${ stringify( balanceData ) }` 
    );

    return balanceData;
});
