'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    random,
} = require( '../../../../../../exchangeUtils' );

const percentageToWin = 0.495;
const coinNumberMultiplier = 1000000;
const coinNumberThreshold = (1 - percentageToWin) * coinNumberMultiplier;


module.exports = Object.freeze( () => {

    console.log(

        `⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿ 🌸🐲 Flipping the 🌸Lotus Coin　✿✼:*ﾟ:༅｡.｡༅:*･ﾟﾟ･⭑\n` +
        '         -         \n' +
        `need to get coinNumber higher than or equal to ${ coinNumberThreshold }`
    );

    const coinNumber = random.getRandomIntegerInclusive({

        min: 1,
        max: coinNumberMultiplier
    });

    const hasWonThisChallengeOfFate = coinNumber > coinNumberThreshold;

    console.log(

        `⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿ ' +
        '👑🐸 Flipping the 🌸Lotus Coin　✿✼:*ﾟ:༅｡.｡༅:*･ﾟﾟ･⭑\n` +
        '         -         \n' +
        'executed successfully: ' + stringify({

            coinNumber,
            hasWonThisChallengeOfFate
        })
    );

    return hasWonThisChallengeOfFate;
});
