'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    utils: {
        aws: {
            dinoCombos: {
                getExchangeUser
            }
        }
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

const {
    exchangeUsers: {
        getBalanceData
    }
} = require( '../../../../../../exchangeUtils' );


module.exports = Object.freeze( async ({

    ticketCryptoPrice,
    exchangeUserId,

}) => {

    console.log(
        'running ensureExchangeUserHasEnoughMoney ' +
        'has enough to buy ticket with the following ' +
        `values: ${ stringify({

            ticketCryptoPrice,
            exchangeUserId
        })}`
    );

    const exchangeUser = await getExchangeUser({

        exchangeUserId,
    });

    const balanceData = getBalanceData({

        exchangeUser,
    });

    const totalAmountExchangeUserHas = balanceData.summary.crypto.totalAmount;

    console.log(
        '⏰🤑ensureExchangeUserHasEnoughMoney - ' +
        'here are the values to be considered: ' +
        stringify({

            ['requested amount (ticket Crypto price)']: ticketCryptoPrice,
            ['amount user currently has🧐']: totalAmountExchangeUserHas,
        })
    );

    if( ticketCryptoPrice > totalAmountExchangeUserHas ) {

        const error = new Error(

            `Attempted to put forward ${ ticketCryptoPrice } ` +
            'Dynasty Bitcoin although ' +
            `only have ${ totalAmountExchangeUserHas } Dynasty Bitcoin.`
        );
        error.statusCode = 400;
        error.bulltrue = true;
        throw error;
    }

    console.log(
        
        'ensureExchangeUserHasEnoughMoney executed successfully - ' +
        'exchange user has enough money to purchase lottery ticket'
    );
});