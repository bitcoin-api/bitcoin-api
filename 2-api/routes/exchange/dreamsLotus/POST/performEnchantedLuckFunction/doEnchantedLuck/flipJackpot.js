'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    random,
} = require( '../../../../../../exchangeUtils' );


// const percentageToWin = 0.01; 100
// const percentageToWin = 0.001; 1000
// const percentageToWin = 0.0001; 10000
// const percentageToWin = 0.00001; 100000
const percentageToWin = 0.00001;
const coinNumberMultiplier = 1000000000;
const coinNumberThreshold = (1 - percentageToWin) * coinNumberMultiplier;


module.exports = Object.freeze( () => {

    console.log(

        `𓏧 𓏲 𓏲 𓏲 𓋒 𓏲 𓏲 𓏲 𓏲 𓏧  🌸Lotus Flipping the Jackpot　𓏧 𓏲 𓏲 𓏲 𓋒 𓏲 𓏲 𓏲 𓏲 𓏧\n` +
        '         -         \n' +
        `need to get coinNumber higher than or equal to ${ coinNumberThreshold }`
    );

    const jackpotCoinNumber = random.getRandomIntegerInclusive({

        min: 1,
        max: coinNumberMultiplier
    });

    const hasWonThisChallengeOfFate = jackpotCoinNumber > coinNumberThreshold;

    console.log(

        `𓏧 𓏲 𓏲 𓏲 𓋒 𓏲 𓏲 𓏲 𓏲 𓏧  🌸Lotus Flipping the Jackpot　𓏧 𓏲 𓏲 𓏲 𓋒 𓏲 𓏲 𓏲 𓏲 𓏧\n` +
        '         -         \n' +
        'executed successfully: ' + stringify({

            jackpotCoinNumber,
            hasWonThisChallengeOfFate
        })
    );

    return hasWonThisChallengeOfFate;
});
