'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    raffle: {
        getIfRaffleIdIsValid,
        getIfRaffleDrawIdIsValid
    },
} = require( '../../../../../../enchantedUtils' );

// const {
//     constants: {
//         timeNumbers
//     }
// } = require( '../../../../../../utils' );

const minimumTime = 1;
const maximumTime = 9604340079791;


const getIfIsValidTime = Object.freeze( ({

    time,

}) => {

    const timeIsValid = (

        !Number.isNaN( time ) &&
        (time >= minimumTime) &&
        (time <= maximumTime)
    );

    return timeIsValid;
});


module.exports = Object.freeze( ({

    rawRaffleId,
    rawStartTime,
    rawEndTime,
    rawLastTime,
    rawLastKey,

}) => {

    console.log(
        
        `running validateAndGetValues with the following values - ${
            stringify({
                rawRaffleId,
                rawLastTime,
                rawStartTime,
                rawEndTime,
                rawLastKey,
            })
        }`
    );

    if( !getIfRaffleIdIsValid({ raffleId: rawRaffleId }) ) {

        const validationError = new Error(

            `invalid raffleId: ${ rawRaffleId }`
        );
        validationError.bulltrue = true;
        validationError.statusCode = 400;
        throw validationError;
    }

    const startTime = Number( rawStartTime );

    if( !getIfIsValidTime({ time: startTime }) ) {

        const validationError = new Error(

            `invalid start time: ${ rawStartTime }`
        );
        validationError.bulltrue = true;
        validationError.statusCode = 400;
        throw validationError;
    }

    const endTime = Number( rawEndTime );

    if( !getIfIsValidTime({ time: endTime }) ) {

        const validationError = new Error(

            `invalid end time: ${ rawEndTime }`
        );
        validationError.bulltrue = true;
        validationError.statusCode = 400;
        throw validationError;
    }

    const timeDifference = endTime - startTime;

    const invalidStartAndEndTimeCombination = (
        (timeDifference <= 0) //||
        // (timeDifference > timeNumbers.week)
    );

    if( invalidStartAndEndTimeCombination ) {

        const validationError = new Error(

            'invalid start and end times: ' +
            `startTime: ${ startTime }, endTime: ${ endTime }`
        );
        validationError.bulltrue = true;
        validationError.statusCode = 400;
        throw validationError;
    }

    const values = {

        raffleId: rawRaffleId,
        startTime,
        endTime,
    };

    if( !!rawLastTime ) {

        const lastTime = Number( rawLastTime );

        if( !getIfIsValidTime({ time: lastTime }) ) {
    
            const validationError = new Error(
    
                `invalid last time: ${ rawLastTime }`
            );
            validationError.bulltrue = true;
            validationError.statusCode = 400;
            throw validationError;
        }

        values.lastTime = lastTime;

        if( !rawLastKey ) {

            const validationError = new Error(

                'need both lastKey and lastTime'
            );
            validationError.bulltrue = true;
            validationError.statusCode = 400;
            throw validationError;
        }
    }

    if( !!rawLastKey ) {

        if( !getIfRaffleDrawIdIsValid({ raffleDrawId: rawLastKey }) ) {
    
            const validationError = new Error(
    
                `invalid last key: ${ rawLastKey }`
            );
            validationError.bulltrue = true;
            validationError.statusCode = 400;
            throw validationError;
        }

        values.lastKey = rawLastKey;

        if( !values.lastTime ) {

            const validationError = new Error(

                'need both lastKey and lastTime'
            );
            validationError.bulltrue = true;
            validationError.statusCode = 400;
            throw validationError;
        }
    }

    console.log(
        
        `validateAndGetValues executed successfully,
            returning values - ${ stringify( values )
        }`
    );

    return values;
});