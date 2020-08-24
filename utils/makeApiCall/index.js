'use strict';

const {
    endpointTypes,
} = require( '../../constants' );

const log = require( '../log' );
const stringify = require( '../stringify' );
const makeApiCallCore = require( './makeApiCallCore' );


module.exports = Object.freeze( async ({

    token,
    baseUrl,
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
            baseUrl,
        })
    );

    try {

        const response = await makeApiCallCore({

            endpointType,
            token,
            baseUrl,
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
                baseUrl,
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
                baseUrl,
            }),
            'here is the error:',
            err
        );

        throw err;
    }
});
