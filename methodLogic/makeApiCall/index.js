'use strict';

const {
    endpointTypes,
} = require( '../../constants' );

const {
    log,
    stringify,
} = require( '../../utils' );

const makeApiCallCore = require( './makeApiCallCore' );


module.exports = Object.freeze( async ({

    token,
    livenetMode,
    resource,
    method = 'GET',
    body = null,
    endpointType = endpointTypes.activatedToken,

}) => {

    log(
        'running makeApiCall with the following values:',
        stringify({
            resource,
            method,
            body,
            endpointType,
            livenetMode,
        })
    );

    try {

        const response = await makeApiCallCore({

            endpointType,
            token,
            livenetMode,
            resource,
            body,
            method,
        });

        log(
            'makeApiCall with the following values:',
            stringify({
                resource,
                method,
                body,
                endpointType,
                livenetMode,
            }),
            'executed successfully, here is the response:',
            stringify( response ),
            'returning response body'
        );
    
        return response.body;
    }
    catch( err ) {

        log(
            'error in makeApiCall with the following values:',
            stringify({
                resource,
                method,
                body,
                endpointType,
                livenetMode,
            }),
            'here is the error:',
            err
        );

        throw err;
    }
});
