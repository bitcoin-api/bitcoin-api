'use strict';

const uuidv4 = require( 'uuid' ).v4;

const {
    utils: {
        stringify,
        aws: {
            dino: {
                updateDatabaseEntry,
            }
        }
    },
    constants: {
        aws: {
            database: {
                tableNameToKey,
                tableNames: {
                    METADATA
                }
            }
        },
        metadata: {
            types: {
                rafflePutTicketEvent,
            }
        }
    }
} = require( '@bitcoin-api/full-stack-api-private' );


const getRafflePutTicketEventId = Object.freeze( () => {

    const rafflePutTicketEventId = (

        `raffle_put_ticket_event_${ uuidv4() }`
    );

    return rafflePutTicketEventId;
});


module.exports = Object.freeze( async ({

    dino,

}) => {

    console.log(
        'running handleRafflePutTicket with the following values: ' +
        stringify({
            dino
        })
    );

    const key = tableNameToKey[ METADATA ];

    const metadataEntry = {

        [ key ]: getRafflePutTicketEventId(),
        type: rafflePutTicketEvent,
        raffleId: dino.searchId,
        transactionId: dino.transactionId,
        creationDate: Date.now(),
    };

    await updateDatabaseEntry({
        
        tableName: METADATA,
        entry: metadataEntry,
    });

    console.log(
        '✅handleRafflePutTicket executed successfully'
    );
});
