'use strict';

const managePutTicketEvents = require( './managePutTicketEvents' );


exports.handler = Object.freeze( async () => {

    console.log( '🎟Running manageRafflePutTicketEvents' );

    try {

        await managePutTicketEvents();

        console.log( '✅🎟manageRafflePutTicketEvents executed successfully' );
    }
    catch( err ) {

        console.log( '❌🎟error in manageRafflePutTicketEvents:', err );
    }
});
