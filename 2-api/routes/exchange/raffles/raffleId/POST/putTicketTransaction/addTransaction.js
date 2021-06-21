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
                putTicket,
            },
        }
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

// const {
//     constants: {
//         raffle: {
//             lotteryTypes
//         }
//     }
// } = require( '../../../../../../enchantedUtils' );


module.exports = Object.freeze( async ({

    raffleId,
    choice,
    exchangeUserId,
    action,
    amount,

}) => {

    console.log(
        
        `running addTransaction with the following values - ${
            
            stringify({

                exchangeUserId,
                raffleId,
                action,
                choice,
                amount,
            })
        }`
    );

    await addTransactionAndUpdateExchangeUser({

        noLocka: true,
        exchangeUserId,
        type: types.raffle,
        data: {

            searchId: raffleId,
            amount,
            raffleType: putTicket,
            choice,
            action,
        },
    });

    console.log( 'addTransaction executed successfully' );
});