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
    });

    log( 'bitcoin-api successfully initialized' );

    return bitcoinApiInstance;
});