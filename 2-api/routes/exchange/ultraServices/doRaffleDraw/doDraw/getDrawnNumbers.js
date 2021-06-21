'use strict';

const {
    utils: {
        javascript: {
            getRandomIntInclusive,
        },
        stringify,
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    constants: {
        raffle: {
            bounds: {
                twoNumber: {
                    minTicketNumber,
                    maxTicketNumber
                }
            }
        }
    }
} = require( '../../../../../enchantedUtils' );

// TODO: TEST LOCAL
const getDrawnNumber = Object.freeze( ({

    drawnNumbers

}) => {

    let drawnNumber;

    do {
        
        drawnNumber = getRandomIntInclusive({

            min: minTicketNumber,
            max: maxTicketNumber
        });

    } while( drawnNumbers.includes( drawnNumber ) );

    return drawnNumber;
});


module.exports = Object.freeze( () => {

    console.log( '👅👅👅🐸🐸🐸running getDrawnNumbers🐸🐸🐸👅👅👅' );

    const drawnNumbers = [];

    for( let i = 1; i <= 2; i++ ) {

        const drawnNumber = getDrawnNumber({

            drawnNumbers
        });

        drawnNumbers.push( drawnNumber );
    }

    console.log(
        '🥬🍣🦐👅👅👅🐸🐸🐸getDrawnNumbers ' +
        'executed successfully🐸🐸🐸👅👅👅🥒🥦🍌\n' +
        `Got drawn numbers: ${ stringify( drawnNumbers )}`
    );

    return drawnNumbers;
});
