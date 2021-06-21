'use strict';

const {
    utils: {
        doOperationInQueue,
        stringify,
        javascript: {
            getQueueId,
        },
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    EXCHANGE_USERS
                }
            }
        },
        raffles: {
            actions: {
                buy
            }
        }
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

const {
    constants: {
        http: {
            headers
        }
    }
} = require( '../../../../../../utils' );

const {
    raffle: {
        getChoiceFromNumbers,
    }
} = require( '../../../../../../enchantedUtils' );

const validateAndGetValues = require( './validateAndGetValues' );
const getRaffleData = require( './getRaffleData' );
const getCurrentChoiceData = require( './getCurrentChoiceData' );
const ensureExchangeUserHasEnoughMoneyForBuy = require( './ensureExchangeUserHasEnoughMoneyForBuy' );
const validateIfCancelTransactionIsAllowed = require( './validateIfCancelTransactionIsAllowed' );
const getTransactionAmount = require( './getTransactionAmount' );
const addTransaction = require( './addTransaction' );


module.exports = Object.freeze( async ({

    exchangeUserId,
    event,
    rawRaffleId,
    ipAddress,

}) => {

    const rawNumbers = event.body.numbers;
    const rawAction = event.body.action;
    const rawGoogleCode = event.headers[ headers.grecaptchaGoogleCode ];

    console.log(
        
        `running putTicketTransaction with the following values - ${
            
            stringify({

                exchangeUserId,
                rawRaffleId,
                rawNumbers,
                rawAction,
                rawGoogleCode: !!rawGoogleCode,
                ipAddress,
            })
        }`
    );

    const {

        raffleId,
        numbers,
        action,
        // amount,

    } = await validateAndGetValues({

        rawRaffleId,
        rawNumbers,
        rawAction,
        rawGoogleCode,
        ipAddress,
    });

    console.log(
        'getting raffle data using raffleId with the metadata table'
    );

    const raffleData = await getRaffleData({

        raffleId,
        numbers,
        // amount,
    });

    const choice = getChoiceFromNumbers({ numbers });

    const returnValues = {

        // NOTE: temporary
        raffleId,
        numbers,
        raffleData,
        action,
        // currentAmountForChoice,
        // mostRecentCancelTransactionCreationDate,
        // transactionAmount
    };

    await doOperationInQueue({
        
        queueId: getQueueId({
            
            type: EXCHANGE_USERS,
            id: exchangeUserId
        }),
        
        doOperation: async () => {

            const {
                
                currentAmountForChoice,
                mostRecentBuyTransactionCreationDate

            } = await getCurrentChoiceData({

                raffleId,
                exchangeUserId,
                choice,
            });

            const transactionAmount = getTransactionAmount({

                ticketCryptoPrice: raffleData.ticketCryptoPrice,
                action,
                currentAmountForChoice,
            });

            if( action === buy ) {

                await ensureExchangeUserHasEnoughMoneyForBuy({

                    ticketCryptoPrice: raffleData.ticketCryptoPrice,
                    exchangeUserId,
                });
            }
            else {

                validateIfCancelTransactionIsAllowed({

                    mostRecentBuyTransactionCreationDate
                });
            }

            await addTransaction({

                raffleId,
                choice,
                exchangeUserId,
                action,
                amount: transactionAmount,
            });

            return Object.assign( // NOTE: temporary

                returnValues,
                {
                    transactionAmount,
                    currentAmountForChoice,
                    mostRecentBuyTransactionCreationDate
                }
            );
        },
    });

    console.log(
        
        `putTicketTransaction executed successfully,
            returning values - ${ stringify( returnValues )
        }`
    );

    return returnValues;
});