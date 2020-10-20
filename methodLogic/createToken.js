'use strict';

const {
    endpointTypes,
    urls,
} = require( '../constants' );

const {
    errors: {
        BitcoinApiError
    },
    log,
    validation,
    stringify,
    makeApiCall
} = require( '../utils' );


const getBaseUrl = Object.freeze( ({

    rawBaseUrl,

}) => {

    if( !!rawBaseUrl ) {
        
        if( !validation.getIsValidUrl( rawBaseUrl ) ) {

            throw new BitcoinApiError(
                'createToken error: invalid baseUrl'
            );
        }

        return rawBaseUrl;
    }

    throw new BitcoinApiError(
        'createToken error: missing baseUrl'
    );
});


module.exports = Object.freeze( async ({

    rawBaseUrl,

}) => {

    log(
        'running createToken with the following values: ' +
        stringify({
            rawBaseUrl,
        })
    );

    const baseUrl = getBaseUrl({
        rawBaseUrl,
    });

    const createTokenResults = await makeApiCall({

        token: null,
        baseUrl,
        resource: 'tokens',
        method: 'POST',
        endpointType: endpointTypes.public,
        body: {},
    });

    log(
        'createToken executed successfully - ' +
        `got token of length ${ createTokenResults.token.length }`
    );

    return createTokenResults;
});
