'use strict';

const {
    utils: {
        aws: {
            dino: {
                updateDatabaseEntry,
            }
        },
        javascript: {
            getQueueId
        },
        doOperationInQueue,
        stringify,
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    EXCHANGE_EMAIL_DELIVERY_RESULTS
                }
            }
        }
    },
} = require( '@bitcoin-api/full-stack-exchange-private' );


const addEEDR = Object.freeze( async ({

    email,
    type,
    data,

}) => {

    await doOperationInQueue({
            
        queueId: getQueueId({
            
            type: EXCHANGE_EMAIL_DELIVERY_RESULTS,
            id: email,
        }),
        
        doOperation: async () => {

            const eedr = Object.assign(
                {
                    email,
                    type,
                    creationDate: Date.now(),
                },
                data
            );

            await updateDatabaseEntry({

                tableName: EXCHANGE_EMAIL_DELIVERY_RESULTS,
                entry: eedr,
            });
        }
    });
});


module.exports = Object.freeze( async ({

    emailAddresses,
    type,
    data,

}) => {

    console.log(

        'running addEEDRToDatabase with the following ' +
        'values: ' + 
        stringify({
            emailAddresses,
            type,
            data,
        })
    );

    for( const email of emailAddresses ) {

        await addEEDR({

            email,
            type,
            data,
        });
    }

    console.log(
        'addEEDRToDatabase executed successfully'
    );
});
