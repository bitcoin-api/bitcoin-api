'use strict';

const {

    utils: {
        aws: {
            dino: {
                updateDatabaseEntry
            }
        },
        stringify,
    },
    constants: {
        aws: {
            database: {
                tableNameToKey,
                tableNames: { METADATA },
            }
        },
        metadata: {
            types
        }
    }

} = require( '@bitcoin-api/full-stack-api-private' );

const {
    raffle: { getRaffleDrawId }
} = require( '../../../../../enchantedUtils' );


module.exports = Object.freeze( async ({

    raffleId,
    choice,
    currentHour,
    raffleDrawId = getRaffleDrawId(),
    winData = null,

}) => {

    console.log(
        
        'running putRaffleDrawEntry ' +
        'with the following values: ' +
        stringify({
            raffleId,
            choice,
            currentHour,
            raffleDrawId,
            winData,
        })
    );

    const raffleDraw = {

        [ tableNameToKey[ METADATA] ]: raffleDrawId, 
        raffleId,
        choice,
        currentHour,
        creationDate: Date.now(),
        type: types.raffleDraw,
    };

    if( !!winData ) {
        
        raffleDraw.winData = winData;
    }

    await updateDatabaseEntry({

        tableName: METADATA,
        entry: raffleDraw,
    });

    console.log( 'putRaffleDrawEntry executed successfully' );
});
