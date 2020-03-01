'use strict';


class BitcoinApiError extends Error {

    constructor( message ) {

        const formattedMessage = `bitcoin-api error: ${ message }`;
        
        super( formattedMessage );
    }
}


module.exports = Object.freeze({

    BitcoinApiError,
});
