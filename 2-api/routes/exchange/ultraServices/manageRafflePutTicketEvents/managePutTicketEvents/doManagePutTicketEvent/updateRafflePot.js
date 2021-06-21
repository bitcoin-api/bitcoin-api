'use strict';

const {

    utils: {
        javascript: { getQueueId },
        doOperationInQueue,
        aws: {
            dino: {
                getDatabaseEntry,
                updateDatabaseEntry
            }
        },
        stringify,
    },
    constants: {
        aws: {
            database: {
                tableNames: { METADATA },
            }
        },
    }

} = require( '@bitcoin-api/full-stack-api-private' );


module.exports = Object.freeze( async ({

    currentRafflePotAmount,
    raffleId,

}) => {

    console.log(
        
        'running updateRafflePot with the following values: ' +
        stringify({
            currentRafflePotAmount,
            raffleId,
        })
    );

    await doOperationInQueue({
        queueId: getQueueId({ type: METADATA, id: raffleId }),
        doOperation: async () => {

            const raffleData = await getDatabaseEntry({

                tableName: METADATA,
                value: raffleId,
            });

            if( !raffleData ) {

                throw new Error(
                    
                    'updateRafflePot - WEIRD ISSUE: ' +
                    `raffle with raffleId "${ raffleId }" not found`
                );
            }

            if( !!raffleData.winRaffleDrawId ) {

                throw new Error(
                        
                    'updateRafflePot - ' +
                    `raffle with id "${ raffleId }" ` +
                    'has already finished'
                );
            }
 
            const newRaffleData = Object.assign(

                {},
                raffleData,
                {
                    cryptoPot: currentRafflePotAmount
                }
            );

            await updateDatabaseEntry({

                tableName: METADATA,
                entry: newRaffleData,
            });
        }
    });

    console.log( 'updateRafflePot executed successfully' );
});
