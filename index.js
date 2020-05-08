'use strict';

const {
    endpointTypes,
    // withdraws: {
    //     minimumWithdrawAmount,
    //     maximumWithdrawAmount
    // }
} = require( './constants' );

const {
    log,
    stringify,
    // errors: {
    //     BitcoinApiError
    // },
    // validation: {
    //     getIsValidBitcoinAddress
    // }
} = require( './utils' );

const validateAndGetInitializationValues = require( './validateAndGetInitializationValues' );

const {

    makeApiCall,
    withdraw

} = require( './methodLogic' );


class BitcoinApi {

    constructor( initializationValues ) {

        log( 'initializing bitcoin-api' );

        Object.assign(

            this,
            validateAndGetInitializationValues( initializationValues )
        );

        log( 'bitcoin-api successfully initialized' );
    }

    async makeApiCall({

        resource,
        method = 'GET',
        body = null,
        endpointType = endpointTypes.activatedToken,

    }) {

        const {

            token,
            livenetMode

        } = this;

        return await makeApiCall({

            token,
            livenetMode,
            resource,
            method,
            body,
            endpointType,
        });
    }

    async getTokenInfo() {

        log( 'running getTokenInfo' );

        const tokenInfo = await this.makeApiCall({

            resource: 'tokens',
            method: 'GET',
            endpointType: endpointTypes.generalToken,
        });

        log(
            'getTokenInfo executed successfully - token info: ' +
            stringify( tokenInfo )
        );

        return tokenInfo;
    }

    async createOrGetAddress() {

        log( 'running createOrGetAddress' );

        const addressData = await this.makeApiCall({

            resource: 'addresses',
            method: 'POST',
            endpointType: endpointTypes.activatedToken,
            body: {},
        });

        log(
            'createOrGetAddress executed successfully - ' +
            `address (or null): ${ stringify( addressData ) }`
        );

        return addressData;
    }

    async getFeeData() {

        log( 'running getFeeData' );

        const feeData = await this.makeApiCall({

            resource: 'fee-data',
            method: 'GET',
            endpointType: endpointTypes.public,
        });

        log(
            'getFeeData executed successfully - ' +
            JSON.stringify( feeData, null, 4 )
        );

        return feeData;
    }

    async withdraw({

        amount,
        address,
        includeFeeInAmount = false

    }) {
        
        await withdraw({

            amount,
            address,
            includeFeeInAmount,
            selfie: this,
        });
    }
}


module.exports = BitcoinApi;