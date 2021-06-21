'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

// const {
//     raffle: {
//         getIfRaffleIdIsValid,
//     },
// } = require( '../../../../../../enchantedUtils' );

const validateAndGetValues = require( './validateAndGetValues' );
const getDrawsData = require( './getDrawsData' );


module.exports = Object.freeze( async ({

    rawRaffleId,
    rawLastTime,
    rawLastKey,
    rawStartTime = 1,
    rawEndTime = 9604340079791,

}) => {

    console.log(
        
        `running getRaffleDrawsData with the following values - ${
            stringify({
                rawRaffleId,
                rawStartTime,
                rawLastKey,
                rawEndTime,
                rawLastTime,
            })
        }`
    );

    const {

        raffleId,
        startTime,
        endTime,
        lastTime,
        lastKey,

    } = validateAndGetValues({

        rawRaffleId,
        rawStartTime,
        rawLastKey,
        rawEndTime,
        rawLastTime
    });

    const drawsData = await getDrawsData({

        raffleId,
        startTime,
        endTime,
        lastTime,
        lastKey,
    });

    console.log(
        
        `getRaffleDrawsData executed successfully - returning raffle draws: ${
            stringify({
                'number of raffle draws': drawsData.draws.length,
                'page info': drawsData.pageInfo
            })
        }`
    );

    return drawsData;
});