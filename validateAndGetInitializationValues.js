'use strict';

const f = Object.freeze;

const {
    errors: { BitcoinApiError },
    validation: {
        getIsValidUrl,
    }
} = require( './utils' );

const {
    urls
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

    const rawToken = initializationValues.token;
    const rawBaseUrl = initializationValues.baseUrl || urls.defaultBaseUrl;

    if( !!rawToken && !getIfTokenIsValid( rawToken ) ) {

        throw new BitcoinApiError(
            'initialization error: invalid token'
        );
    }

    if( !!rawBaseUrl ) {
        
        if( !getIsValidUrl( rawBaseUrl ) ) {

            throw new BitcoinApiError(
                'initialization error: ' +
                'invalid baseUrl provided'
            );
        }
    }
    else {

        throw new BitcoinApiError(
            'initialization error: missing baseUrl'
        );
    }

    const values = {
        
        token: rawToken,
        baseUrl: rawBaseUrl,
    };

    return f( values );
});