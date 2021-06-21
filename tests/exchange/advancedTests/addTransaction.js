'use strict';

require( 'dotenv' ).config();

Object.assign(

    process.env,
    {
        AWS_ACCESS_KEY_ID: process.env.ADD_TRANSACTION_AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.ADD_TRANSACTION_AWS_SECRET_ACCESS_KEY,
        AWS_REGION: process.env.ADD_TRANSACTION_AWS_REGION,
    }
);

const {

    exchangeUserId,
    // raffleId,

} = require( '../values' );

const addTransactionAndUpdateExchangeUser = require( process.env.IRELAND_ATAUEUP );

const params = {

    exchangeUserId: exchangeUserId,
    
    // exchangeUserId: 'exchange_user_a1bda9f18d494fdebfb670f63bff79cc',
    // type: 'raffle',
    // data: {

    //     // raffleId,
    //     // amount: -2,
    //     // raffleType: 'putTicket',
    //     // choice: '1-36',
    //     // // choice: '2-36',
    //     // action: 'buy',

    //     // raffleId,
    //     // amount: 2,
    //     // raffleType: 'putTicket',
    //     // choice: '1-36',
    //     // action: 'cancel',
        
    //     // raffleId: 'raffle_1602141854902',
    //     // amount: 500,
    //     // raffleType: 'payout',
    //     // raffleDrawId: 'raffle_draw_832193712939',
    // }

    type: 'dream',
    data: {
        dreamType: 'lotus',
        searchId: 'dreamLotus',
        amount: 0.0003,
    },

    // type: 'bonus',
    // data: {
    //     searchId: 'test-1',
    //     cryptoAmount: 0,
    //     bitcoinAmount: -0.0001
    // },

    // type: 'identity',
    // data: {
    //     // identityType: 'pure',
    //     // identityType: 'recalculate',
    //     identityType: 'refresh',
    // }
};


(async () => {

    try {
        console.log(
            'adding transaction',
            JSON.stringify({
                params,
            }, null, 4)
        );

        await addTransactionAndUpdateExchangeUser( params );

        console.log(`
        
        
            Adding Transaction Results: ${ JSON.stringify( {

                // responseB: response.body,
                
            }, null, 4 ) }
        
        `);
    }
    catch( err ) {

        console.log( 'an error occurred in the request:', err.message );
    }
})();
