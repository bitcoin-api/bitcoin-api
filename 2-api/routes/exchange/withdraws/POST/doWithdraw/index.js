'use strict';

const uuidv4 = require( 'uuid/v4' );

const {
    utils: {
        doOperationInQueue,
        stringify,
        business: {
            getIsValidWithdrawAmount
        },
        javascript: {
            getQueueId
        },
        database:{
            metadata: {
                metaGetFeeToPayFromFeeData
            } 
        }
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    utils: {
        aws: {
            dinoCombos: {
                addTransactionAndUpdateExchangeUser,
                getExchangeUser,
            }
        }
    },
    constants: {
        transactions: {
            types,
            bitcoinWithdrawTypes
        },
        aws: {
            database: {
                tableNames: {
                    EXCHANGE_USERS
                }
            }
        }
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

const {
    exchangeUsers: {
        getBalanceData
    }
} = require( '../../../../../exchangeUtils' );

const {
    constants: {
        http: {
            headers
        }
    }
} = require( '../../../../../utils' );

const validateAndGetValues = require( './validateAndGetValues' );
const getFeeData = require( '../../../../withdraws/POST/withdrawMoney/getFeeData' );
const getMagnaFeeData = require( '../../../../withdraws/POST/withdrawMoney/doWithdrawMoney/getMagnaFeeData' );
const ensureExchangeUserHasEnoughMoney = require( './ensureExchangeUserHasEnoughMoney' );
const putVanguardWithdraw = require( './putVanguardWithdraw' );

// const exchangeFeeToAdd = 0.000001;


const doWithdrawCore = Object.freeze( async ({

    exchangeUserId,
    rawAmount,
    rawShouldIncludeFeeInAmount,
    rawAddress,
    rawEnviroWithdrawAmount,
    rawShouldDoFullWithdraw,
    ipAddress,
    rawGoogleCode,

}) => {
    
    const {

        withdrawAmount,
        addressToSendTo,
        shouldIncludeFeeInAmount,
        enviroWithdrawAmount,
        shouldDoFullWithdraw,

    } = await validateAndGetValues({

        rawAmount,
        rawShouldIncludeFeeInAmount,
        rawAddress,
        rawEnviroWithdrawAmount,
        rawShouldDoFullWithdraw,
        ipAddress,
        rawGoogleCode,
    });

    if( shouldDoFullWithdraw ) {

        console.log(
            'doWithdraw: ' +
            'doing full withdraw - getting the exchange user'
        );

        const exchangeUser = await getExchangeUser({

            exchangeUserId,
        });

        const balanceData = getBalanceData({

            exchangeUser,
        });

        const totalAmountUserHas = (
            balanceData.summary.bitcoin.totalAmount
        );

        const totalWithdrawAmount = (

            totalAmountUserHas -
            (
                // exchangeFeeToAdd +
                enviroWithdrawAmount
            )
        );

        console.log(
            'doWithdraw: ' +
            'got the exchange user and here is the relevant money data ' +
            `for the user: ${
                stringify({
                    totalAmountUserHas,
                    // exchangeFeeToAdd,
                    enviroWithdrawAmount,
                    ['the calculation']: (
                        `const totalWithdrawAmount = (

                            totalAmountUserHas -
                            (
                                /* exchangeFeeToAdd + */
                                enviroWithdrawAmount
                            )
                        );`
                    ),
                    totalWithdrawAmount
                })
            }`
        );

        const theWithdrawAmountIsInvalid = !getIsValidWithdrawAmount({

            withdrawAmount: totalWithdrawAmount
        });
    
        if(
            theWithdrawAmountIsInvalid ||
            (totalWithdrawAmount < 0.00025)
        ) {
    
            const validationError = new Error(
                `invalid withdraw amount: ${ totalWithdrawAmount }`
            );
            validationError.bulltrue = true;
            validationError.statusCode = 400;
            throw validationError;
        }

        const feeData = getMagnaFeeData({
        
            feeData: await getFeeData(),
            enviroWithdrawAmount,
            // exchangeFeeToAdd,
        });

        const metaFeeToPay = metaGetFeeToPayFromFeeData(
            {
                shouldIncludeFeeInAmount: true
            },
            {
                feeData,
            }
        );

        const withdrawId = uuidv4();

        await addTransactionAndUpdateExchangeUser({

            noLocka: true,
            exchangeUserId,
            type: types.withdrawBitcoin,
            data: {
                address: addressToSendTo,
                amount: totalWithdrawAmount,
                fee: metaFeeToPay,
                withdrawId,
                bitcoinWithdrawType: bitcoinWithdrawTypes.start,
                isFullWithdraw: true,
                feeIncludedInAmount: true,
            },
        });
    
        await putVanguardWithdraw({
    
            addressToSendTo,
            amount: totalWithdrawAmount,
            feeData,
            shouldIncludeFeeInAmount: true,
            withdrawId,
            exchangeUserId,
        });

        const doWithdrawResults = {};

        console.log(
            'doWithdraw - withdraw full amount - ' +
            `executed successfully - returning values ${
                stringify( doWithdrawResults )
            }`
        );
    
        return doWithdrawResults;
    }

    const feeData = getMagnaFeeData({
        
        feeData: await getFeeData(),
        enviroWithdrawAmount,
        // exchangeFeeToAdd,
    });

    const {
        
        metaFeeToPay
        
    } = await ensureExchangeUserHasEnoughMoney({

        withdrawAmount,
        shouldIncludeFeeInAmount,
        feeData,
        exchangeUserId,
    });

    const withdrawId = uuidv4();

    await addTransactionAndUpdateExchangeUser({

        noLocka: true,
        exchangeUserId,
        type: types.withdrawBitcoin,
        data: {
            address: addressToSendTo,
            amount: withdrawAmount,
            fee: metaFeeToPay,
            withdrawId,
            bitcoinWithdrawType: bitcoinWithdrawTypes.start,
            feeIncludedInAmount: shouldIncludeFeeInAmount,
        },
    });

    await putVanguardWithdraw({

        addressToSendTo,
        amount: withdrawAmount,
        feeData,
        shouldIncludeFeeInAmount,
        withdrawId,
        exchangeUserId,
    });

    const doWithdrawResults = {};

    console.log(
        `doWithdraw executed successfully - returning values ${
            stringify( doWithdrawResults )
        }`
    );

    return doWithdrawResults;
});


module.exports = Object.freeze( async ({

    event,
    ipAddress,
    exchangeUserId
    
}) => {
    
    const requestBody = event.body;

    const rawAmount = (
        requestBody.amount
    ) || null;
    const rawShouldIncludeFeeInAmount = (
        requestBody.includeFeeInAmount
    ) || false;
    const rawShouldDoFullWithdraw = (
        requestBody.fullWithdraw
    ) || false;
    const rawAddress = requestBody.address;
    // const rawEnviroWithdrawAmount = requestBody.enviroWithdrawAmount;
    const rawEnviroWithdrawAmount = null; // NOTE: for now
    const rawGoogleCode = event.headers[ headers.grecaptchaGoogleCode ];

    console.log(
        
        `running doWithdraw with the following values - ${ stringify({

            exchangeUserId,
            rawAmount,
            rawShouldIncludeFeeInAmount,
            rawAddress,
            rawEnviroWithdrawAmount,
            rawShouldDoFullWithdraw,
            ipAddress,
            rawGoogleCode
        }) }`
    );

    const doWithdrawResults = await doOperationInQueue({
        queueId: getQueueId({ type: EXCHANGE_USERS, id: exchangeUserId }),
        doOperation: async () => {

            return await doWithdrawCore({

                exchangeUserId,
                rawAmount,
                rawShouldIncludeFeeInAmount,
                rawAddress,
                rawEnviroWithdrawAmount,
                rawShouldDoFullWithdraw,
                ipAddress,
                rawGoogleCode,
            });
        }
    });

    console.log(
        `doWithdraw executed successfully - returning values ${
            stringify( doWithdrawResults )
        }`
    );

    return doWithdrawResults;
});
