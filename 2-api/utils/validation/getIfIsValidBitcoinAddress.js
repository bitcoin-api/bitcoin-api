'use strict';

const {
    utils: {
        bitcoin: {
            validation: { getIsValidAddress }
        },
    },
} = require( '@bitcoin-api/full-stack-api-private' );

module.exports = getIsValidAddress;