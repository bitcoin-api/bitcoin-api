'use strict';

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    METADATA
                }
            }
        }
    },
    utils: {
        aws: {
            dino: {
                getDatabaseEntry,
            },
        },
        stringify
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    constants: {
        raffle: {
            lotteryTypes
        }
    }
} = require( '../../../../../../enchantedUtils' );


module.exports = Object.freeze( async ({

    raffleId,
    numbers,
    // amount,

}) => {

    console.log(
        
        `running getRaffleData with the following values - ${
            
            stringify({

                raffleId,
                numbers,
                // amount,
            })
        }`
    );

    const raffleData = await getDatabaseEntry({

        tableName: METADATA,
        value: raffleId,
    });

    if( !raffleData ) {

        const validationError = new Error(

            `invalid raffleId: ${ raffleId }`
        );
        validationError.bulltrue = true;
        validationError.statusCode = 400;
        throw validationError;
    }

    switch( raffleData.lotteryType ) {
        case lotteryTypes.twoNumber:

            if( !!raffleData.winRaffleDrawId ) {
      
                const validationError = new Error(
        
                    `lottery with Id "${ raffleId }" has already finished`
                );
                validationError.bulltrue = true;
                validationError.statusCode = 400;
                throw validationError;
            }

            if( numbers.length !== 2 ) {

                const validationError = new Error(

                    `invalid numbers: ${ JSON.stringify( numbers ) }`
                );
                validationError.bulltrue = true;
                validationError.statusCode = 400;
                throw validationError;
            }

            break;
    
        default:
            // safeguard: should not get here in normal operation
            const error = new Error(
                'weird error: raffle data with invalid lotteryType: ' +
                raffleData.lotteryType
            );
            throw error;
    }

    console.log(
        
        `getRaffleData executed successfully,
            returning raffle data: ${ stringify( raffleData )
        }`
    );

    return raffleData;
});