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
    utils: {
        aws: {
            dinoCombos: {
                addTransactionAndUpdateExchangeUser,
                getExchangeUser,
            }
        }
    },
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
        }
    }
} = require( '../../../../../utils' );

const validateAndGetValues = require( './validateAndGetValues' );
const getAddTransactionValues = require( './getAddTransactionValues' );


module.exports = Object.freeze( async ({

    event,
    exchangeUserId,
    ipAddress,

}) => {

    const rawType = event.body.type;
    const rawData = event.body.data;
    const rawGoogleCode = event.headers[ headers.grecaptchaGoogleCode ];

    console.log(
        
        'running doExchange with the following values:',
        stringify({

            rawType,
            rawData,
            rawGoogleCode: !!rawGoogleCode,
            ipAddress
        })
    );

    const {

        type,
        data

    } = await validateAndGetValues({

        rawType,
        rawData,
        rawGoogleCode,
        ipAddress
    });

    const doExchangeResponseValues = await doOperationInQueue({

        queueId: getQueueId({ type: EXCHANGE_USERS, id: exchangeUserId }),

        doOperation: async () => {

            const exchangeUser = await getExchangeUser({

                exchangeUserId,
            });

            if( !exchangeUser ) {
                // safeguard: should not get here in normal operation
                throw new Error(
                    'cannot find exchange user: ' +
                    exchangeUserId
                );
            }

            const addTransactionValues = getAddTransactionValues({

                exchangeUserId,
                exchangeUser,
                type,
                data
            });

            await addTransactionAndUpdateExchangeUser( addTransactionValues );

            return {};
        }
    });

    console.log(
        'doExchange executed successfully: ' +
        stringify( doExchangeResponseValues )
    );

    return doExchangeResponseValues;
});