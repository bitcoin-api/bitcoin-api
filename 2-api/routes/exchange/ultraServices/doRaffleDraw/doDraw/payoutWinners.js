'use strict';

const {
    utils: {
        stringify
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    utils: {
        aws: {
            dinoCombos: {
                addTransactionAndUpdateExchangeUser,
            }
        }
    },
    constants: {
        transactions: {
            types,
        },
        raffles: {
            types: {
                payout,
            },
        }
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );


module.exports = Object.freeze( async ({

    raffleId,
    cryptoPayout,
    winnerExchangeUserIds,
    raffleDrawId,

}) => {

    console.log(
        
        'running payoutWinners ' +
        'with the following values: ' +
        stringify({
            raffleId,
            cryptoPayout,
            winnerExchangeUserIds,
            raffleDrawId,
        })
    );

    for( const exchangeUserId of winnerExchangeUserIds ) {

        await addTransactionAndUpdateExchangeUser({

            // noLocka: true,
            exchangeUserId,
            type: types.raffle,
            data: {
                searchId: raffleId,
                amount: cryptoPayout,
                raffleType: payout,
                raffleDrawId,
            },
        });
    }

    console.log( 'payoutWinners executed successfully' );
});
