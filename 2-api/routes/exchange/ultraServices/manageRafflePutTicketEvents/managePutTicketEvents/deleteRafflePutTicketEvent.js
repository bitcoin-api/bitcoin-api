'use strict';

const {
    utils: {
        aws: {
            dino: {
                removeDatabaseEntry,
            }
        },
        stringify,
    },
    constants: {
        aws: {
            database: {
                // tableNameToKey,
                tableNames: { METADATA },
            }
        },
    }
} = require( '@bitcoin-api/full-stack-api-private' );


module.exports = Object.freeze( async ({

    rafflePutTicketEventId,

}) => {

    console.log(
        
        'running deleteRafflePutTicketEvent with the following values: ' +
        stringify({
            rafflePutTicketEventId,
        })
    );

    await removeDatabaseEntry({

        tableName: METADATA,
        value: rafflePutTicketEventId,
    });

    console.log( 'deleteRafflePutTicketEvent executed successfully' );
});
