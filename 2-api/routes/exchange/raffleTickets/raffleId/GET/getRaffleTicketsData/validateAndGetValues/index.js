'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    validation: {
        getIfTransactionIdIsValid,
        getIfExchangeUserIdIsValid,
        // getIfRaffleDrawIdIsValid
    },
    constants: {
        transactions: {
            transactionId: { prefix }
        }
    }
} = require( '../../../../../../../exchangeUtils' );

const {
    raffle: {
        getIfRaffleIdIsValid,
        // getIfRaffleDrawIdIsValid
    },
} = require( '../../../../../../../enchantedUtils' );

const getDecryptedPseudoSpecialId = require( './getDecryptedPseudoSpecialId' );

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


const throwMissingPageInfoError = Object.freeze( () => {

    const validationError = new Error(

        'missing required values: ' +
        'time, powerId, and specialId all need to be defined'
    );
    validationError.bulltrue = true;
    validationError.statusCode = 400;
    throw validationError; 
});


module.exports = Object.freeze( ({

    rawRaffleId,
    rawTime,
    rawPowerId,
    rawSpecialId,

}) => {

    console.log(
        
        `running validateAndGetValues with the following values - ${
            stringify({
                rawRaffleId,
                rawTime,
                rawPowerId,
                rawSpecialId,
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

    const values = {

        raffleId: rawRaffleId,
    };

    if( !!rawTime ) {

        const time = Number( rawTime );

        if( !getIfIsValidTime({ time }) ) {

            const validationError = new Error(

                `invalid time: ${ time }`
            );
            validationError.bulltrue = true;
            validationError.statusCode = 400;
            throw validationError;   
        }

        if( !rawPowerId || !rawSpecialId ) {

            return throwMissingPageInfoError();
        }

        values.time = time;
    }

    if( !!rawPowerId ) {

        const transactionId = `${ prefix }${ rawPowerId }`;

        if( !getIfTransactionIdIsValid({ transactionId }) ) {

            const validationError = new Error(

                `invalid powerId: ${ rawPowerId }`
            );
            validationError.bulltrue = true;
            validationError.statusCode = 400;
            throw validationError;   
        }

        if( !rawTime || !rawSpecialId ) {

            return throwMissingPageInfoError();
        }

        values.transactionId = transactionId;
    }

    if( !!rawSpecialId ) {

        if( typeof rawSpecialId !== 'string' ) {

            const validationError = new Error(

                `invalid specialId: ${ rawSpecialId }`
            );
            validationError.bulltrue = true;
            validationError.statusCode = 400;
            throw validationError;
        }

        const decryptedPseudoSpecialId = getDecryptedPseudoSpecialId({

            rawSpecialId,
        });

        if(
            !getIfExchangeUserIdIsValid({
                exchangeUserId: rawSpecialId,
            })
        ) {

            const validationError = new Error(

                `invalid specialId: ${ rawSpecialId }`
            );
            validationError.bulltrue = true;
            validationError.statusCode = 400;
            throw validationError;   
        }

        if( !rawTime || !rawPowerId ) {

            return throwMissingPageInfoError();
        }

        values.specialId = rawSpecialId;
    }

    console.log(
        
        `validateAndGetValues executed successfully,
            returning values - ${ stringify( values )
        }`
    );

    return values;
});
