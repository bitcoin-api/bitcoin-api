'use strict';

const {
    endpointTypes,
} = require( '../constants' );

const {
    log,
    stringify,
} = require( '../utils' );


module.exports = Object.freeze( async (
    
    selfie,
    values = {}
    
) => {

    log( 'running createOrGetAddress' );

    const addressData = await selfie.makeApiCall({

        resource: 'addresses',
        method: 'POST',
        endpointType: endpointTypes.activatedToken,
        body: values,
    });

    log(
        'createOrGetAddress executed successfully - ' +
        `address (or null): ${ stringify( addressData ) }`
    );

    return addressData;
});
