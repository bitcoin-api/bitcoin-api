'use strict';

const {
    utils: {
        javascript: {
            getQueueId,
            getRandomIntInclusive,
        },
    },
} = require( '@bitcoin-api/full-stack-api-private' );


module.exports = Object.freeze({

    getQueueId,
    getRandomIntInclusive,
    Crypto: require( './Crypto' ),
    getCoolCoolId: require( './getCoolCoolId' ),
    ensureEnvValuesAreTruthful: require( './ensureEnvValuesAreTruthful' ),
    getHashedValue: require( './getHashedValue' ),
});
