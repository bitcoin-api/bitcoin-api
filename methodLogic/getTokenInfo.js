'use strict';

const {
    endpointTypes,
} = require( '../constants' );

const {
    log,
    stringify,
} = require( '../utils' );


module.exports = Object.freeze( async ({

    selfie

}) => {

    log( 'running getTokenInfo' );

    const tokenInfo = await selfie.makeApiCall({

        resource: 'tokens',
        method: 'GET',
        endpointType: endpointTypes.generalToken,
    });

    log(
        'getTokenInfo executed successfully - token info: ' +
        stringify( tokenInfo )
    );

    return tokenInfo;
});
