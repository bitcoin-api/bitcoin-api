'use strict';

const {
    utils: {
        doOperationInQueue,
        stringify,
        javascript: {
            getQueueId
        },
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    constants: {
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
    constants: {
        http: {
            headers
        },
        // google: {
        //     captcha
        // }
    }
} = require( '../../../../../utils' );
 
const validateAndGetValues = require( './validateAndGetValues' );
const ensureExchangeUserHasEnoughMoney = require( './ensureExchangeUserHasEnoughMoney' );
const doEnchantedLuck = require( './doEnchantedLuck' );


const performEnchantedLuckFunctionCore = Object.freeze( async ({

    exchangeUserId,
    amount,

}) => {

    await ensureExchangeUserHasEnoughMoney({

        amount,
        exchangeUserId,
    });

    const doEnchantedLuckResults = await doEnchantedLuck({

        amount,
        exchangeUserId,
    });

    return doEnchantedLuckResults;
});


module.exports = Object.freeze( async ({

    event,
    ipAddress,
    exchangeUserId
    
}) => {
    
    const requestBody = event.body;

    // const rawMode = requestBody.mode;
    const rawAmount = requestBody.amount;
    const rawGoogleCode = event.headers[ headers.grecaptchaGoogleCode ];

    console.log(
        
        `running performEnchantedLuckFunction
            with the following values - ${
                
                stringify({

                    exchangeUserId,
                    ipAddress,
                    rawAmount,
                    rawGoogleCode,
                })
        }`
    );

    const {

        amount,

    } = await validateAndGetValues({

        rawAmount,
        ipAddress,
        rawGoogleCode
    });

    const enchantedLuck = await doOperationInQueue({
        queueId: getQueueId({ type: EXCHANGE_USERS, id: exchangeUserId }),
        doOperation: async () => {

            return await performEnchantedLuckFunctionCore({

                exchangeUserId,
                amount,
            });
        }
    });

    console.log(
        `performEnchantedLuckFunction executed successfully
            - returning values ${
                stringify( enchantedLuck )
        }`
    );

    return enchantedLuck;
});
