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
    const rawLivenetBaseUrl = initializationValues.livenetBaseUrl;
    const rawTestnetBaseUrl = initializationValues.testnetBaseUrl;

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

        // livenetMode: rawLivenetMode,
    };

    if( rawLivenetMode ) {

        values.token = rawLivenetToken;

        if( !!rawLivenetBaseUrl ) {
            
            if( !getIsValidUrl( rawLivenetBaseUrl ) ) {

                throw new BitcoinApiError(
                    'initialization error: ' +
                    'invalid livenetBaseUrl provided'
                );
            }

            values.baseUrl = rawLivenetBaseUrl;
        }
        else {

            values.baseUrl = urls.bitcoinApiIo;
        }
    }
    else {

        values.token = rawTestnetToken;

        if( !!rawTestnetBaseUrl ) {
            
            if( !getIsValidUrl( rawTestnetBaseUrl ) ) {

                throw new BitcoinApiError(
                    'initialization error: ' +
                    'invalid testnetBaseUrl provided'
                );
            }

            values.baseUrl = rawTestnetBaseUrl;
        }
        else {

            values.baseUrl = urls.apiBitcoinIo;
        }
    }

    return f( values );
});