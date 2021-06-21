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
} = require( '../../../../../exchangeUtils' );


module.exports = Object.freeze( async ({

    amount,
    exchangeUserId,

}) => {

    console.log(
        'running ensureExchangeUserHasEnoughMoney ' +
        'has enough to live the dream☮️🙏 with the following ' +
        `values: ${ stringify({

            amount,
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

            ['requested amount']: amount,
            ['amount user currently has🧐']: totalAmountExchangeUserHas,
        })
    );

    if( amount > totalAmountExchangeUserHas ) {

        const error = new Error(

            `Attempted to put forward ${ amount } ` +
            'Dynasty Bitcoin although ' +
            `only have ${ totalAmountExchangeUserHas } Dynasty Bitcoin.`
        );
        error.statusCode = 400;
        error.bulltrue = true;
        throw error;
    }

    console.log(
        
        'ensureExchangeUserHasEnoughMoney executed successfully - ' +
        'exchange user has enough money to live the dream☮️🙏'
    );
});