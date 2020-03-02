'use strict';

const f = Object.freeze;

const {
    errors: { BitcoinApiError }
} = require( './utils' );

const getIfTokenIsValid = f(
    token => (
        (typeof token === 'string') &&
        (token.length > 100) &&
        (token.length < 1000) 
    )
);


module.exports = f( initializationValues => {

    if(
        !initializationValues ||
        (typeof initializationValues !== 'object')
    ) {

        throw new BitcoinApiError(
            'initialization error: missing initialization values'
        );
    }

    const rawLivenetMode = initializationValues.livenetMode || false;
    const rawLivenetToken = initializationValues.livenetToken;
    const rawTestnetToken = initializationValues.testnetToken;

    if( typeof rawLivenetMode !== 'boolean' ) {

        throw new BitcoinApiError(
            'initialization error: invalid livenetMode'
        );
    }
    else if( !!rawLivenetToken && !getIfTokenIsValid( rawLivenetToken ) ) {

        throw new BitcoinApiError(
            'initialization error: invalid livenetToken'
        );
    }
    else if( !!rawTestnetToken && !getIfTokenIsValid( rawTestnetToken ) ) {

        throw new BitcoinApiError(
            'initialization error: invalid testnetToken'
        );
    }
    else if( !rawLivenetToken && !rawTestnetToken ) {

        throw new BitcoinApiError(
            'initialization error: ' +
            'missing testnetToken and/or livenetToken'
        );
    }

    const values = {

        livenetMode: rawLivenetMode,
    };

    if( values.livenetMode ) {

        values.token = rawLivenetToken;
    }
    else {

        values.token = rawTestnetToken;
    }

    return f( values );
});