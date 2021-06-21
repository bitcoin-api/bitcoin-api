'use strict';

const {

    utils: {
        stringify,
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const getCurrentRafflePotAmountData = require( './getCurrentRafflePotAmountData' );
const updateRafflePot = require( './updateRafflePot' );


module.exports = Object.freeze( async ({

    putTicketEvent

}) => {

    console.log(
        
        'running doManagePutTicketEvent with the following values: ' +
        stringify({
            putTicketEvent
        })
    );

    const { currentRafflePotAmount } = await getCurrentRafflePotAmountData({

        putTicketEvent
    });

    await updateRafflePot({

        currentRafflePotAmount,
        raffleId: putTicketEvent.raffleId,
    });

    console.log( 'doManagePutTicketEvent executed successfully' );
});
