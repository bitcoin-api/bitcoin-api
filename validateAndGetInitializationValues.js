'use strict';

const f = Object.freeze;

const {
    errors: { BitcoinApiError },
    validation: {
        getIsValidUrl,
    }
} = require( './utils' );

const {
    urls,
} = require( './constants' );

const getIfTokenIsValid = f(
    token => (
        (typeof token === 'string') &&
        (token.length > 100) &&
        (token.length < 1000) 
    )
);


module.exports = f( ( initializationValues = {} ) => {

    if( !initializationValues ) {

        throw new BitcoinApiError(
            'initialization error: missing initialization values'
        );
    }

    const rawLivenetMode = initializationValues.livenetMode || false;
    const rawToken = initializationValues.token;
    const rawBaseUrl = initializationValues.baseUrl;

    if( typeof rawLivenetMode !== 'boolean' ) {

        throw new BitcoinApiError(
            'initialization error: invalid livenetMode'
        );
    }
    else if( !!rawToken && !getIfTokenIsValid( rawToken ) ) {

        throw new BitcoinApiError(
            'initialization error: invalid token'
        );
    }
    // else if( !rawToken ) {

    //     throw new BitcoinApiError(
    //         'initialization error: ' +
    //         'missing testnetToken and/or livenetToken'
    //     );
    // }
    
    const values = {

        // livenetMode: rawLivenetMode,
    };

    values.token = rawToken;

    if( !!rawBaseUrl ) {
        
        if( !getIsValidUrl( rawBaseUrl ) ) {

            throw new BitcoinApiError(
                'initialization error: ' +
                'invalid baseUrl provided'
            );
        }

        values.baseUrl = rawBaseUrl;
    }
    else {

        values.baseUrl = rawLivenetMode ? (
            urls.bitcoinApiIo
        ) : urls.apiBitcoinIo;
    }

    return f( values );
});