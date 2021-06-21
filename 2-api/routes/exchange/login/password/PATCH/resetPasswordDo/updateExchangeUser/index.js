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

const ensurePasswordResetCodeIsValid = require( './ensurePasswordResetCodeIsValid' );

const {

    throwStandardError,
    standardHash,

} = require( '../../../../../../../utils' );

const flamingoCrescent = require( '../../../../../../../sacredElementals/crypto/flamingoCrescent' );


module.exports = Object.freeze( async ({

    exchangeUserId,
    newPassword,
    passwordResetCode,

}) => {

    console.log(
        
        'running updateExchangeUser with the following values:',
        stringify({

            exchangeUserId,
            newPassword: newPassword.length,
            passwordResetCode,
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

                return throwStandardError({

                    logMessage: (
                        'updateExchangeUser error - ' +
                        'exchange user specified by exchange user id - ' +
                        `"${ exchangeUserId }" does not exist`
                    ),
                    message: 'Invalid password reset link',
                    bulltrue: true,
                });
            }

            ensurePasswordResetCodeIsValid({

                passwordResetCode,
                exchangeUser,
            });

            updateExchangeUserResults.email = exchangeUser.email;

            const hashedNewPassword = standardHash( newPassword );

            const encryptedHashedNewPassword = flamingoCrescent({

                text: hashedNewPassword,
            });

            const updatedExchangedUser = Object.assign(

                {},
                exchangeUser,
                {
                    hashedPassword: encryptedHashedNewPassword,
                }
            );

            delete updatedExchangedUser.superPasswordResetCode;

            await updateDatabaseEntry({

                tableName: EXCHANGE_USERS,
                entry: updatedExchangedUser
            });
        }
    });

    console.log(
        'updateExchangeUser executed successfully, returning values: ' +
        stringify( updateExchangeUserResults )
    );

    return updateExchangeUserResults;
});