'use strict';

// const argv = require( 'yargs' ).argv;

const {
    utils: {
        stringify,
    },
    // constants: {
    //     aws: { database: { tableNames: { BALANCES, WITHDRAWS } } }
    // }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    utils: {
        aws: {
            dinoCombos: {
                addTransactionAndUpdateExchangeUser
            }
        }
    },
    constants: {
        transactions: {
            types: {
                identity
            }
        },
        identityTransactions: {
            types: {
                refresh
            }
        }
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );


module.exports = Object.freeze( async ({

    ultimateResult,

}) => {

    const { exchangeUserId } = ultimateResult; 

    console.log(
        'running refreshExistingAtaeue with the following values:',
        stringify({ exchangeUserId })
    );

    await addTransactionAndUpdateExchangeUser({

        exchangeUserId,
        type: identity,
        data: {
            identityType: refresh,
        }
    });
    
    console.log(
        'refreshExistingAtaeue executed successfully for:',
        stringify({ exchangeUserId })
    );
});
