'use strict';

const {
    utils: {
        stringify
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    raffle: {
        getChoiceTimeData,
    }
} = require( '../../../../../../enchantedUtils' );

// const oneMinute = 1000 * 60;
// const fiveMinutes = oneMinute * 5;
// const oneHour = fiveMinutes * 12;

// const getNumberWhenRoundedToHourAbove = Object.freeze(({
   
//     timestamp

// }) => {

//     const timeFromHourUnder = timestamp % oneHour;

//     const theHourAfterPurchase = (

//         timestamp +
//         (oneHour - timeFromHourUnder)
//     );

//     return theHourAfterPurchase;
// });


module.exports = Object.freeze( ({

    mostRecentBuyTransactionCreationDate,
    
}) => {

    console.log(

        'running validateIfCancelTransactionIsAllowed: ' +
        stringify({
            mostRecentBuyTransactionCreationDate,
        })
    );

    // const raffleDrawTimeAfterPurchase = getNumberWhenRoundedToHourAbove({

    //     timestamp: mostRecentBuyTransactionCreationDate
    // });
    const {

        lastCancelTime

    } = getChoiceTimeData({

        timestamp: mostRecentBuyTransactionCreationDate
    });

    const thePowerOfNow = Date.now();

    const itIsAlreadyPastTheLastCancelTime = thePowerOfNow > lastCancelTime;

    console.log(

        'making sure raffle ticket can still be cancelled: ' +
        stringify({
            lastCancelTime,
            thePowerOfNow,
            itIsAlreadyPastTheLastCancelTime,
        })
    );

    if( itIsAlreadyPastTheLastCancelTime ) {

        const error = new Error(
        
            `Error in cancelling your lottery ticket. ` +
            `It's past five minute before the next lottery draw, ` +
            `it's too late to cancel your lottery ticket. ` +
            'Thank you for your ticket purchase ' +
            'and good luck from DynastyBitcoin.com!'
        );
        error.bulltrue = true;
        error.statusCode = 400;
        throw error;
    }

    console.log(
        'validateIfCancelTransactionIsAllowed executed successfully'
    );
});
