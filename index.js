'use strict';

const f = Object.freeze;

const {
    endpointTypes
} = require( './constants' );

const {
    log,
    stringify
} = require( './utils' );

const validateAndGetInitializationValues = require( './validateAndGetInitializationValues' );
const getMakeApiCall = require( './getMakeApiCall' );


module.exports = f( initializationValues => {

    log( 'initializing bitcoin-api' );

    const {

        livenetMode,
        token,

    } = validateAndGetInitializationValues( initializationValues );

    const makeApiCall = getMakeApiCall({

        livenetMode,
        token
    });

    const bitcoinApiInstance = f({

        getTokenInfo: f( async () => {

            log( 'running getTokenInfo' );

            const tokenInfo = await makeApiCall({

                resource: 'tokens',
                method: 'GET',
                endpointType: endpointTypes.generalToken,
            });

            log(
                'getTokenInfo executed successfully - token info: ' +
                stringify( tokenInfo )
            );

            return tokenInfo;
        }),

        getOrCreateAddress: f( async () => {

            log( 'running getOrCreateAddress' );

            const { address } = await makeApiCall({

                resource: 'addresses',
                method: 'POST',
                endpointType: endpointTypes.generalToken,
                body: {},
            });

            log(
                'getOrCreateAddress executed successfully - ' +
                `address (or null): ${ address }`
            );

            return address;
        }),
    });

    log( 'bitcoin-api successfully initialized' );

    return bitcoinApiInstance;
});