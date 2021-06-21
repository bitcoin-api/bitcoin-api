'use strict';

const {
    utils: {
        stringify,
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    transactions: {
        types: {
            identity
        },
    },
    identityTransactions: {
        types: {
            recalculate,
            refresh
        }
    }
} = require( '../../../../constants' );


module.exports = Object.freeze( ({

    type,
    data

}) => {

    console.log(
        'running getIfShouldSearchDb:',
        stringify({ type, data })
    );

    if(
        (type === identity) &&
        [ recalculate, refresh ].includes( data.identityType )
    ) {

        console.log(
            'getIfShouldSearchDb executed successfully:',
            '✅YES should search'
        );

        return true;
    }

    console.log(
        'getIfShouldSearchDb executed successfully:',
        '😬no need for search'
    );

    return false;
});
