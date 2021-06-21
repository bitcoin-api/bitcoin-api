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
    crypto: { getCryptoAmountNumber },
} = require( '../../../../../exchangeUtils' );

const minSlotNumber = 1;
const maxSlotNumber = 3;

const winMultiplier = 7;

const percentageToWin = 0.95;
const coinNumberMultiplier = 1000000;
const coinNumberThreshold = (1 - percentageToWin) * coinNumberMultiplier;


const flipCoin = Object.freeze( () => {

    const coinNumber = random.getRandomIntegerInclusive({

        min: 1,
        max: coinNumberMultiplier
    });

    const hasWonThisChallengeOfFate = coinNumber > coinNumberThreshold;

    console.log(

        `⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿ ' +
        '👑🐸 Flipping the 🎰Slot Coin　✿✼:*ﾟ:༅｡.｡༅:*･ﾟﾟ･⭑\n` +
        '         -         \n' +
        'executed successfully: ' + stringify({

            coinNumber,
            hasWonThisChallengeOfFate
        })
    );

    return hasWonThisChallengeOfFate;
});


const spinSlot = Object.freeze( ({

    amount

}) => {

    console.log(

        `⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿ 🐑☢️ Spinning the Slot　✿✼:*ﾟ:༅｡.｡༅:*･ﾟﾟ･⭑\n ` +
        'value: ' + stringify({

            amount,
        })
    );

    const slotNumber1 = random.getRandomIntegerInclusive({

        min: minSlotNumber,
        max: maxSlotNumber
    });

    const slotNumber2 = random.getRandomIntegerInclusive({

        min: minSlotNumber,
        max: maxSlotNumber
    });

    const slotNumber3 = random.getRandomIntegerInclusive({

        min: minSlotNumber,
        max: maxSlotNumber
    });

    console.log(
        'slotNumbers:',
        stringify({
            slotNumber1,
            slotNumber2,
            slotNumber3,
        })
    );

    const results = {};

    const hasWon = (
        (slotNumber1 === slotNumber2) &&
        (slotNumber2 === slotNumber3)
    );

    if( hasWon ) {

        console.log( '🧑‍🎨has one level one checking if won for real' );

        const hasWonForReal = flipCoin();

        console.log(
            
            `🧑‍🎨slot =>>>: ${ stringify({

                hasWonForReal
            })}`
        );

        if( hasWonForReal ) {

            Object.assign(

                results,
                {
                    hasWonGame: true,
                    transactionAmount: getCryptoAmountNumber(
                        winMultiplier * amount
                    ),
                    resultValues: {
                        slotNumbers: [
                            slotNumber1,
                            slotNumber2,
                            slotNumber3,
                        ]
                    },
                }
            );
        }
        else {

            Object.assign(

                results,
                {
                    hasWonGame: false,
                    transactionAmount: getCryptoAmountNumber(
                        -amount
                    ),
                    resultValues: {
                        slotNumbers: [
                            slotNumber1,
                            (
                                (
                                    slotNumber2 -
                                    minSlotNumber + 
                                    1 // inc. amount
                                ) % maxSlotNumber
                            ) + minSlotNumber,
                            slotNumber3,
                        ]
                    },
                }
            );
        }
    }
    else if( // has tied
        (slotNumber1 !== slotNumber2) &&
        (slotNumber2 !== slotNumber3) &&
        (slotNumber1 !== slotNumber3)
    ) {
        
        console.log( `🧑‍🎨slot -> it's a tie🎀` );

        Object.assign(

            results,
            {
                hasWonGame: false,
                hasTied: true,
                transactionAmount: 0,
                resultValues: {
                    slotNumbers: [
                        slotNumber1,
                        slotNumber2,
                        slotNumber3,
                    ]
                },
            }
        );
    }
    else { // has lost

        console.log(
            
            `🧑‍🎨slot -> lost😭`
        );

        Object.assign(

            results,
            {
                hasWonGame: false,
                transactionAmount: getCryptoAmountNumber( -amount ),
                resultValues: {
                    slotNumbers: [
                        slotNumber1,
                        slotNumber2,
                        slotNumber3,
                    ]
                },
            }
        );
    }

    console.log(

        `⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿ 🐑☢️ Spinning the Slot ✿✼:*ﾟ:༅｡.｡༅:*･ﾟﾟ･⭑\n` +
        '         -         \n' +
        'executed successfully: ' + stringify( results )
    );

    return results;
});


module.exports = Object.freeze( async ({

    amount,
    exchangeUserId,

}) => {

    console.log(
        'running doEnchantedLuck ' +
        `with the following values: ${ stringify({

            amount,
            exchangeUserId,
        })}`
    );

    const {
        
        hasWonGame,
        transactionAmount,
        hasTied = false,
        resultValues,
        
    } = spinSlot({

        amount
    });

    const happyDream = hasWonGame;

    await addTransactionAndUpdateExchangeUser({

        noLocka: true,
        exchangeUserId,
        type: transactions.types.dream,
        data: {
            dreamType: dreams.types.slot,
            amount: transactionAmount,
            happyDream,
            resultValues,
            hasTied,
        },
    });

    const luckResults = {

        happyDream,
        hasTied,
        resultValues,
    };

    console.log(
        'doEnchantedLuck executed successfully - ' +
        `returning luck results: ${ stringify( luckResults ) }`
    );

    return luckResults;
});