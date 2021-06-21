'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    raffle: {
        getIfRaffleIdIsValid,
    },
} = require( '../../../../../enchantedUtils' );

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

    rawLastTime,
    rawLastKey,

}) => {

    console.log(
        
        `running validateAndGetValues with the following values - ${
            stringify({
                rawLastTime,
                rawLastKey,
            })
        }`
    );

    const values = {};

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

        if( !getIfRaffleIdIsValid({ raffleId: rawLastKey }) ) {
    
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