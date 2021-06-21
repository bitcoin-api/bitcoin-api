'use strict';

const lotteryTypes = {

    twoNumber: 'twoNumber',
};


module.exports = Object.freeze({

    raffle: {

        raffleId: {

            prefix: 'raffle_',
            maxLength: 100,
            minLength: 10,
        },

        raffleDrawId: {

            prefix: 'raffle_draw_',
            maxLength: 122,
            minLength: 10,
        },

        lotteryTypes,

        bounds: {
            [lotteryTypes.twoNumber]: {
                minTicketNumber: 1,
                maxTicketNumber: 36
            },
        },
    }
});

