'use strict';

const { argv } = require( 'yargs' );

const getRandomIntegerInclusive = ({ min, max }) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const stringify = message => JSON.stringify( message, null, 4 );

const minSlotNumber = 1;
const maxSlotNumber = 3;

// const winMultiplier = 7;

const percentageToWin = 0.9 + 0.00;
const coinNumberMultiplier = 1000000;
const coinNumberThreshold = (1 - percentageToWin) * coinNumberMultiplier;


const flipCoin = Object.freeze( () => {

    const coinNumber = getRandomIntegerInclusive({

        min: 1,
        max: coinNumberMultiplier
    });

    const hasWonThisChallengeOfFate = coinNumber > coinNumberThreshold;

    return hasWonThisChallengeOfFate;
});


let theTestAmount = 0;

const spinSlot = Object.freeze( () => {

    theTestAmount -= 0.0001;


    const slotNumber1 = getRandomIntegerInclusive({

        min: minSlotNumber,
        max: maxSlotNumber
    });

    const slotNumber2 = getRandomIntegerInclusive({

        min: minSlotNumber,
        max: maxSlotNumber
    });

    const slotNumber3 = getRandomIntegerInclusive({

        min: minSlotNumber,
        max: maxSlotNumber
    });

    const hasWon = (
        (slotNumber1 === slotNumber2) &&
        (slotNumber2 === slotNumber3)
    );

    if( hasWon ) {

        const hasWonForReal = flipCoin();

        if( hasWonForReal ) {

            // console.log( 'WINWIN' );

            theTestAmount += 0.0007;
        }
        // else {

        //     // console.log( 'WINLOSE' );

        //     // theTestAmount -= 0.0001;
        // }
    }
    else if( // has tied
        (slotNumber1 !== slotNumber2) &&
        (slotNumber2 !== slotNumber3) &&
        (slotNumber1 !== slotNumber3)
    ) {
        
        theTestAmount += 0.0001;
            // console.log( 'TIE' );
    }
    // else { // has lost

    //     // console.log( 'LOSE' );

    //     // theTestAmount -= 0.0001;
    // }
});


const doSpins = () => {

    const max = Number( argv.n ) || 1000;

    for( let i = 0; i < max; i++ ) {

        spinSlot();
    }

    // console.log(
    //     stringify({

    //         theTestAmount
    //     })
    // );

    return theTestAmount;
};


const metaDoSpins = () => {

    const max = Number( argv.m ) || 10;

    const doSpinsResults = [];

    for( let i = 0; i < max; i++ ) {

        theTestAmount = 0;

        doSpinsResults.push( doSpins() );
    }

    console.log(
        doSpinsResults.reduce( (a, b) => a + b, 0 ) / doSpinsResults.length
    );
};


metaDoSpins();

