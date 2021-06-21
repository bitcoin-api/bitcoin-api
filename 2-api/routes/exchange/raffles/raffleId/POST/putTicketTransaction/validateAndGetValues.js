'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    constants: {
        // exchanges: {
        //     bounds
        // },
        raffles: {
            actions
        },
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

const {
    raffle: {
        getIfRaffleIdIsValid,
    },
    constants: {
        raffle: {
            bounds: {
                twoNumber: {
                    minTicketNumber,
                    maxTicketNumber,
                }
            }
        }
    }
} = require( '../../../../../../enchantedUtils' );

const {
    business: {
        verifyGoogleCode,
    },
    constants: {
        google: {
            captcha
        }
    }
} = require( '../../../../../../utils' );

const minNumber = minTicketNumber;
const maxNumber = maxTicketNumber;
const minNumberOfNumbers = 1;
const maxNumberOfNumbers = 10;

const getIfAllNumbersAreUnique = Object.freeze( ({ numbers }) => {

    for( let i = 0; i <= numbers.length; i++ ) {
        for( let j = 0; j <= numbers.length; j++ ) {

            if(
                ( i !== j ) &&
                (numbers[i] === numbers[j])
            ) {

                return false;
            }
        }
    }

    return true;
});


module.exports = Object.freeze( async ({

    rawRaffleId,
    rawNumbers,
    rawAction,
    rawGoogleCode,
    ipAddress,

}) => {

    console.log(
        
        `running validateAndGetValues with the following values - ${
            stringify({
                rawRaffleId,
                rawNumbers,
                rawAction,
                rawGoogleCode: !!rawGoogleCode,
                ipAddress,
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

    const rawNumbersAreInValid = !(

        !!rawNumbers &&
        Array.isArray( rawNumbers ) &&
        (rawNumbers.length >= minNumberOfNumbers) &&
        (rawNumbers.length <= maxNumberOfNumbers) &&
        rawNumbers.every( number => {

            const numberIsValid = (

                Number.isInteger( number ) &&
                (number >= minNumber) &&
                (number <= maxNumber)
            );

            return numberIsValid;
        })
    );

    if( rawNumbersAreInValid ) {

        const validationError = new Error(

            `invalid numbers: ${ JSON.stringify( rawNumbers ) }`
        );
        validationError.bulltrue = true;
        validationError.statusCode = 400;
        throw validationError;
    }

    const thereAreDuplicateNumbers = !getIfAllNumbersAreUnique({

        numbers: rawNumbers
    });

    if( thereAreDuplicateNumbers ) {

        const validationError = new Error(

            `invalid numbers: ${ JSON.stringify( rawNumbers ) } ` +
            'duplicate numbers are not allowed'
        );
        validationError.bulltrue = true;
        validationError.statusCode = 400;
        throw validationError;
    }

    // const rawAmountIsInvalid = !(

    //     !!rawAmount &&
    //     (typeof rawAmount === 'number') &&
    //     (rawAmount >= bounds.crypto.min) &&
    //     (rawAmount <= bounds.crypto.max)
    // );

    // if( rawAmountIsInvalid ) {

    //     const validationError = new Error(

    //         `invalid amount: ${ rawAmount }`
    //     );
    //     validationError.bulltrue = true;
    //     validationError.statusCode = 400;
    //     throw validationError;
    // }

    const rawActionIsInvalid = (

        ![
            actions.buy,
            actions.cancel

        ].includes( rawAction )
    );
    
    if( rawActionIsInvalid ) {

        const validationError = new Error(

            `invalid action: ${ rawAction }`
        );
        validationError.bulltrue = true;
        validationError.statusCode = 400;
        throw validationError;
    }

    await verifyGoogleCode({

        rawGoogleCode,
        ipAddress,
        expectedAction: captcha.actions.destinyRaffleTicketPut,
    });

    const values = {

        raffleId: rawRaffleId,
        numbers: rawNumbers,
        action: rawAction,
    };

    console.log(
        
        `validateAndGetValues executed successfully,
            returning values - ${ stringify( values )
        }`
    );

    return values;
});