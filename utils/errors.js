'use strict';


class BitcoinApiIoError extends Error {

    constructor( message ) {

        const formattedMessage = `bitcoin-api error: ${ message }`;
        
        super( formattedMessage );
    }
}


module.exports = Object.freeze({

    BitcoinApiIoError,
});
