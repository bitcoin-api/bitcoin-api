'use strict';

const logIsOn = process.env.BITCOIN_API_LOGS_ON === 'true';


module.exports = Object.freeze( ( ...args ) => {

    if( logIsOn ) {

        console.log( '|~~~| bitcoin-api --->', ...args );
    }
});
