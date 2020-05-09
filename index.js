'use strict';

const {
    endpointTypes,
} = require( './constants' );

const {
    log,
} = require( './utils' );

const validateAndGetInitializationValues = require( './validateAndGetInitializationValues' );

const {

    makeApiCall,
    withdraw,
    getTokenInfo,
    createOrGetAddress,
    getFeeData,

} = require( './methodLogic' );


module.exports = class BitcoinApi {

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

        return await getTokenInfo({

            selfie: this,
        });
    }

    async createOrGetAddress() {

        return await createOrGetAddress({

            selfie: this,
        });
    }

    async getFeeData() {

        return await getFeeData({

            selfie: this,
        });
    }

    async withdraw({

        amount,
        address,
        includeFeeInAmount = false

    }) {
        
        return await withdraw({

            amount,
            address,
            includeFeeInAmount,
            selfie: this,
        });
    }
};