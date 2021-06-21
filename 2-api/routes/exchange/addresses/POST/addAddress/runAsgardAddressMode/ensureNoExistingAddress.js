'use strict';

const {
    utils: {
        stringify,
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    utils:{
        aws: {
            dino: {
                getExchangeDatabaseEntry
            } 
        }
    },
    constants: {
        aws: {
            database: {
                tableNames: {
                    EXCHANGE_USERS,
                }
            }
        }
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

const {
    throwStandardError,
} = require( '../../../../../../utils' );


module.exports = Object.freeze( async ({

    exchangeUserId,
    exchangeUser,

}) => {
    
    console.log(
        
        'running ensureNoExistingAddress ' +
        `with the following values: ${ stringify({

            exchangeUserId,
            'exchangeUser has been provided': !!exchangeUser
        }) }`
    );

    if( !exchangeUser ) {

        console.log(
        
            'running ensureNoExistingAddress ' +
            `with the following values: ${ stringify({
    
                exchangeUserId,
                exchangeUser: !!exchangeUser
            }) }`
        );

        exchangeUser = await getExchangeDatabaseEntry({
        
            tableName: EXCHANGE_USERS,
            value: exchangeUserId,
        });

        if( !exchangeUser ) {
            // safeguard
            return throwStandardError({

                message: (
                    `exchange user with id ${ exchangeUserId } ` +
                    'has not been found'
                ),
                statusCode: 500,
            });
        }
    }

    if(
        !!exchangeUser.moneyData &&
        !!exchangeUser.moneyData.bitcoin &&
        (exchangeUser.moneyData.bitcoin.length >= 1)
    ) {

        return throwStandardError({

            message: (
                'user already has Bitcoin address'
            ),
            statusCode: 400,
            bulltrue: true
        });
    }

    console.log(
        
        'ensureNoExistingAddress executed successfully'
    );
});
