'use strict';

const logIsOn = !!process.env.BITCOIN_API_LOGS_ON;


module.exports = Object.freeze( ( ...args ) => {

    if( logIsOn ) {

        console.log( '|~~~| bitcoin-api --->', ...args );
    }
});
