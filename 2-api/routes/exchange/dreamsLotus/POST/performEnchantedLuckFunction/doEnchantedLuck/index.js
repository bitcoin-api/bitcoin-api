'use strict';

const {
    utils: {
        stringify,
        doOperationInQueue,
        javascript: {
            getQueueId
        }
    },
    constants: {
        aws: {
            database: {
                tableNames: {
                    METADATA
                }
            }
        }
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    utils: {
        aws: {
            dinoCombos: {
                addTransactionAndUpdateExchangeUser,
            }
        },
        crypto: {
            getCryptoAmountNumber
        }
    },
    constants: {
        transactions,
        dreams,
        aws: {
            database: {
                searchIds: {
                    dreamLotus
                }
            }
        },
        queues: {
            queueBaseIds: {
                lotusDreamsJackpotWin,
            }
        }
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

const {
    maxAmount,
} = require( '../localConstants' );

const flipCoin = require( './flipCoin' );
const flipJackpot = require( './flipJackpot' );
const getWinAmount = require( './getWinAmount' );
const updateJackpotMetadata = require( './updateJackpotMetadata' );
const {
    dream: { getJackpotMetadata }
} = require( '../../../../../../enchantedUtils' );

// const minimumJackpotAmount = 0.3;
const minimumJackpotAmount = 0;
const houseCut = 0.05;


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

    const hasWonGame = flipCoin();
    
    const happyDream = hasWonGame;

    // const transactionAmount = hasWonGame ? amount : -amount;

    const transactionData = {

        dreamType: dreams.types.lotus,
        happyDream,
        searchId: dreamLotus,
        amount: 0,
    };

    if( happyDream ) {

        transactionData.amount += amount;

        const hasWonJackpot = flipJackpot();

        if( hasWonJackpot ) {

            await doOperationInQueue({
                queueId: getQueueId({
                    type: METADATA,
                    id: lotusDreamsJackpotWin,
                }),
                doOperation: async () => {

                    const {

                        jackpotAmount,

                    } = await getJackpotMetadata();
                    // { jackpotAmount, unhappyDreamCount }

                    const isTrueJackpotWin = (
                        jackpotAmount >=
                        minimumJackpotAmount
                    );

                    console.log(

                        '🦉Jackpot Win Comparison:',
                        stringify({
                            jackpotAmount,
                            minimumJackpotAmount,
                            isTrueJackpotWin,
                        })
                    );

                    if( isTrueJackpotWin ) {

                        const winAmount = getWinAmount({

                            amount,
                            jackpotAmount,
                            houseCut,
                        });

                        transactionData.jackpotWinData = {

                            amount,
                            maxAmount,
                            minimumJackpotAmount,
                            jackpotAmount,
                            houseCut,
                            winAmount,
                            time: Date.now(),
                        };

                        transactionData.amount = getCryptoAmountNumber(
                            
                            transactionData.amount + winAmount
                        );
                        
                        await updateJackpotMetadata({

                            jackpotAmount,
                            winAmount,
                        });
                    }
                    else {

                        console.log(
                            'WOW, WOW, WOW, ' +
                            'JACKPOT WIN BUT NOT HIGH ENOUGH' +
                            '🐲🐲🐲🐲🐲🐲🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 - ' +
                            stringify({
                                jackpotAmount, 
                                minimumJackpotAmount
                            }) + 
                            ' The Dragon STRIKES in its MIGHT!!!!!!' +
                            '🐉🐉🐉🐉🐉🐉'
                        );
                    }
                },
            });
        }
    }
    else {

        transactionData.amount -= amount;
    }

    await addTransactionAndUpdateExchangeUser({

        noLocka: true,
        exchangeUserId,
        type: transactions.types.dream,
        data: transactionData,
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