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
    },
} = require( '@bitcoin-api/full-stack-api-private' );


module.exports = Object.freeze( async ({

    raffleId,
    cryptoPot,
    winRaffleDrawId,
    winHour,
    winChoice,
    winnerExchangeUserIds,
    winCryptoPayout,

}) => {

    console.log(
        
        'running updateCurrentRaffle with the following values: ' +
        stringify({
            raffleId,
            cryptoPot,
            winRaffleDrawId,
            winHour,
            winChoice,
            winnerExchangeUserIds,
            winCryptoPayout,
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
                // NOTE: safeguard
                throw new Error(
                    
                    'updateCurrentRaffle - WEIRD ISSUE: ' +
                    `raffle with raffleId "${ raffleId }" not found`
                );
            }

            const newRaffleData = Object.assign(

                {},
                raffleData,
                {
                    winHour,
                    winChoice,
                    cryptoPot,
                    winRaffleDrawId,
                    winnerExchangeUserIds,
                    winCryptoPayout,
                }
            );

            await updateDatabaseEntry({

                tableName: METADATA,
                entry: newRaffleData,
            });
        }
    });

    console.log( 'updateCurrentRaffle executed successfully' );
});
