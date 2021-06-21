'use strict';

const argv = require( 'yargs' ).argv;

const isProductionMode = argv.mode === 'production';

if( isProductionMode ) {

    require( 'dotenv' ).config({ path: `${ __dirname }/productionCredentials/.env` });
}
else {

    require( 'dotenv' ).config({ path: `${ __dirname }/stagingCredentials/.env` });
}


const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    random,
} = require( process.env.API_EXCHANGE_UTILS_PATH );
const coinNumberMultiplier = 1000000;

const percentageToWin = 0.4999;

const defaultCoinNumberThreshold = (1 - percentageToWin) * coinNumberMultiplier;

const flipCoin = Object.freeze( ({

    coinNumberThreshold = defaultCoinNumberThreshold,
    exchangeUserId = null,

}) => {

    if( !exchangeUserId ) {

        throw new Error(
            'doEnchantedLuck WEIRD ERROR: ' +
            'missing exchangeUserId'
        );
    }

    // console.log(

    //     `⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿ 🐑☢️ Flipping the Coin　✿✼:*ﾟ:༅｡.｡༅:*･ﾟﾟ･⭑\n` +
    //     '         -         \n' +
    //     `need to get coinNumber higher than or equal to ${ coinNumberThreshold } - ` +
    //     `exchangeUserId -> ${ exchangeUserId }`
    // );

    const coinNumber = random.getRandomIntegerInclusive({

        min: 1,
        max: coinNumberMultiplier
    });

    // TODO: put into function
    let shouldHaveOffset = [

        process.env.EXCHANGE_WOLF_ON_WALL_STREET_USER_ID || 'NOPE',
        
    ].includes( exchangeUserId );

    // console.log( 'shouldHaveOffset:', shouldHaveOffset );

    // const offsetAmountThreshold = (

    //     shouldHaveOffset ? (0.222 * coinNumberMultiplier) : 0
    // );

    const offsetAmountThreshold = 0;

    // console.log( 'offsetAmountThreshold:', offsetAmountThreshold );

    const modifiedCoinNumberThreshold = (
        
        coinNumberThreshold +
        offsetAmountThreshold
    );

    // console.log( 'modifiedCoinNumberThreshold:', modifiedCoinNumberThreshold );

    const hasWonThisChallengeOfFate = (

        coinNumber > modifiedCoinNumberThreshold
    );

    // console.log(

    //     `⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿ 🐑☢️ Flipping the Coin　✿✼:*ﾟ:༅｡.｡༅:*･ﾟﾟ･⭑\n` +
    //     '         -         \n' +
    //     'executed successfully: ' + stringify({

    //         coinNumber,
    //         hasWonThisChallengeOfFate
    //     })
    // );

    return hasWonThisChallengeOfFate;
});


const results = {

    wins: 0,
    loses: 0,
};


(() => {

    const max = argv.m || argv.n || 1000;

    for( let i = 1; i <= max; i++ ) {

        const hasWonThisChallengeOfFate = flipCoin({

            exchangeUserId: 'fake'
        });

        if( hasWonThisChallengeOfFate ) {

            results.wins++;
        }
        else {

            results.loses++;
        }
    }

    console.log( 'Results:', results, (results.wins - results.loses) / 2 );
})();