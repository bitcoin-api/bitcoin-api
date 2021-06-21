'use strict';

const {
    utils: {
        aws: {
            dino: {
                updateDatabaseEntry,
            }
        },
        doOperationInQueue,
        javascript: {
            getQueueId
        },
        // stringify,
        // },
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    utils: {
        aws: {
            dinoCombos: {
                // addTransactionAndUpdateExchangeUser,
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

const getPasswordResetCode = require( './getPasswordResetCode' );

const {

    standardHash,

} = require( '../../../../../../utils' );

const tessa = require( '../../../../../../sacredElementals/crypto/tessa/index' );


module.exports = Object.freeze( async ({

    exchangeUserId,
    passwordResetCode,

}) => {

    console.log(
        
        'running updateExchangeUser with the following values:',
        stringify({

            exchangeUserId,
            passwordResetCode
        })
    );

    const updateExchangeUserResults = {};

    await doOperationInQueue({

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

            const passwordResetCode = getPasswordResetCode({
                exchangeUserId,
            });

            updateExchangeUserResults.passwordResetCode = passwordResetCode;

            const hashedPasswordResetCode = standardHash( passwordResetCode );

            const superPasswordResetCode = tessa({
        
                text: hashedPasswordResetCode,
            });

            const updatedExchangedUser = Object.assign(

                {},
                exchangeUser,
                {
                    superPasswordResetCode
                }
            );

            await updateDatabaseEntry({

                tableName: EXCHANGE_USERS,
                entry: updatedExchangedUser
            });
        }
    });

    console.log(
        'updateExchangeUser executed successfully - ' +
        'returning results: ' +
        stringify( updateExchangeUserResults )
    );

    return updateExchangeUserResults;
});