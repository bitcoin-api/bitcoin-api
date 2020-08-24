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

    livenetMode,
    livenetBaseUrl,
    testnetBaseUrl,

}) => {

    if( livenetMode ) {

        if( !!livenetBaseUrl ) {
            
            if( !validation.getIsValidUrl( livenetBaseUrl ) ) {

                throw new BitcoinApiError(
                    'createToken error: invalid livenetBaseUrl'
                );
            }

            return livenetBaseUrl;
        }

        return urls.bitcoinApiIo;
    }

    if( !!testnetBaseUrl ) {
            
        if( !validation.getIsValidUrl( testnetBaseUrl ) ) {

            throw new BitcoinApiError(
                'createToken error: invalid testnetBaseUrl'
            );
        }

        return testnetBaseUrl;
    }

    return urls.apiBitcoinIo;
});


module.exports = Object.freeze( async ({

    livenetMode,
    testnetBaseUrl,
    livenetBaseUrl

}) => {

    log(
        'running createToken with the following values: ' +
        stringify({
            livenetMode,
            testnetBaseUrl,
            livenetBaseUrl
        })
    );

    const baseUrl = getBaseUrl({
        livenetMode,
        testnetBaseUrl,
        livenetBaseUrl
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
