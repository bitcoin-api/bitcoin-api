'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    utils: {
        aws: {
            dinoCombos: {
                addTransactionAndUpdateExchangeUser,
            }
        }
    },
    constants: {
        transactions,
        dreams,
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

const {
    random,
} = require( '../../../../../exchangeUtils' );
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

    console.log(

        `⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿ 🐑☢️ Flipping the Coin　✿✼:*ﾟ:༅｡.｡༅:*･ﾟﾟ･⭑\n` +
        '         -         \n' +
        `need to get coinNumber higher than or equal to ${ coinNumberThreshold } - ` +
        `exchangeUserId -> ${ exchangeUserId }`
    );

    const coinNumber = random.getRandomIntegerInclusive({

        min: 1,
        max: coinNumberMultiplier
    });

    // TODO: put into function
    let shouldHaveOffset = [

        process.env.EXCHANGE_WOLF_ON_WALL_STREET_USER_ID || 'NOPE',
        
    ].includes( exchangeUserId );

    console.log( 'shouldHaveOffset:', shouldHaveOffset );

    // const offsetAmountThreshold = (

    //     shouldHaveOffset ? (0.222 * coinNumberMultiplier) : 0
    // );

    const offsetAmountThreshold = 0;

    console.log( 'offsetAmountThreshold:', offsetAmountThreshold );

    const modifiedCoinNumberThreshold = (
        
        coinNumberThreshold +
        offsetAmountThreshold
    );

    console.log( 'modifiedCoinNumberThreshold:', modifiedCoinNumberThreshold );

    const hasWonThisChallengeOfFate = (

        coinNumber > modifiedCoinNumberThreshold
    );

    console.log(

        `⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿ 🐑☢️ Flipping the Coin　✿✼:*ﾟ:༅｡.｡༅:*･ﾟﾟ･⭑\n` +
        '         -         \n' +
        'executed successfully: ' + stringify({

            coinNumber,
            hasWonThisChallengeOfFate
        })
    );

    return hasWonThisChallengeOfFate;
});


module.exports = Object.freeze( async ({

    amount,
    exchangeUserId,

}) => {

    console.log(
        'running doEnchantedLuck ' +
        `with the following values: ${ stringify({

            amount,
            exchangeUserId
        })}`
    );

    const hasWonGame = flipCoin({

        exchangeUserId
    });
    
    const happyDream = hasWonGame;

    const transactionAmount = hasWonGame ? amount : -amount;

    await addTransactionAndUpdateExchangeUser({

        noLocka: true,
        exchangeUserId,
        type: transactions.types.dream,
        data: {
            dreamType: dreams.types.coin,
            amount: transactionAmount,
            happyDream,
        },
    });

    const luckResults = {

        happyDream,
    };

    console.log(
        'doEnchantedLuck executed successfully - ' +
        `returning luck results: ${ stringify( luckResults ) }`
    );

    return luckResults;
});