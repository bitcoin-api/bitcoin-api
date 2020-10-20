'use strict';

const {
    endpointTypes,
} = require( '../constants' );

const {
    log,
} = require( '../utils' );


module.exports = Object.freeze( async ({

    selfie

}) => {

    log( 'running getFeeData' );

    const feeData = await selfie.makeApiCall({

        resource: 'fee-data',
        method: 'GET',
        endpointType: endpointTypes.public,
    });

    log(
        'getFeeData executed successfully - ' +
        JSON.stringify( feeData, null, 4 )
    );

    return feeData;
});
