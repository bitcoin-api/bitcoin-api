'use strict';

const {
    utils: {
        aws: {
            dino: {
                getExchangeDatabaseEntry
            } 
        }
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );


module.exports = Object.freeze({

    getExchangeDatabaseEntry,
});
