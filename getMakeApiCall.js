'use strict';

const axios = require( 'axios' );

const {
    endpointTypes,
    urls,
    headerKeys
} = require( './constants' );

const {
    errors: {
        BitcoinApiIoError
    },
    log,
    stringify,
} = require( './utils' );

const httpMethodToAxiosMethod = Object.freeze({

    GET: 'get',
    POST: 'post',
});

const endpointTypesThatRequireToken = Object.freeze([
        
    endpointTypes.generalToken,
    endpointTypes.activatedToken
]);


const makeApiCallCore = Object.freeze( async ({

    endpointType,
    token,
    livenetMode,
    resource,
    body,
    method,

}) => {
    
    const baseUrl = livenetMode ? (
        urls.bitcoinApiIo
    ) : urls.apiBitcoinIo;

    const url = `${ baseUrl }/${ resource }`;

    const axiosArgs = [ url ];

    if( !!body ) {

        axiosArgs.push( body );
    }

    const axiosOptions = {};

    if( endpointTypesThatRequireToken.includes( endpointType ) ) {

        if( !token ) {

            throw new BitcoinApiIoError(
                
                `request to ${ endpointType } ` +
                `${ resource } - ${ method } endpoint requires token ` +
                `(see ${ urls.github }#${ endpointType.toLowerCase() }` +
                `-endpoints) for more info`
            );
        }

        axiosOptions.headers = {

            [headerKeys.token]: token
        };
    }

    const instance = axios.create( axiosOptions );

    const axiosMethod = httpMethodToAxiosMethod[ method ];

    const response = await instance[ axiosMethod ]( ...axiosArgs );

    const requestFailed = !(

        !!response &&
        !!response.data &&
        (
            (typeof response.data.statusCode === 'number') &&
            (response.data.statusCode >= 200) &&
            (response.data.statusCode < 300)
        ) &&
        !!response.data.body &&
        (typeof response.data.body === 'object')
    );

    if( requestFailed ) {

        throw new BitcoinApiIoError(
        
            `${ method } request to ${ resource } failed - ` +
            `invalid API response: ${
                JSON.stringify(
                    (
                        !!response &&
                        response.data
                    ) || 'N/A'
                )
            }`
        );
    }

    const responseData = response.data; 

    return responseData;
});


module.exports = Object.freeze( ({

    livenetMode,
    token

}) => Object.freeze( async ({

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
}));