'use strict';

const {
    endpointTypes,
} = require( './constants' );

const {
    log,
    makeApiCall,
} = require( './utils' );

const validateAndGetInitializationValues = require( './validateAndGetInitializationValues' );

const {

    withdraw,
    getTokenInfo,
    createOrGetAddress,
    getFeeData,
    createToken,

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
            baseUrl

        } = this;

        return await makeApiCall({

            token,
            baseUrl,
            resource,
            method,
            body,
            endpointType,
        });
    }

    static async createToken({

        baseUrl,

    } = {

        baseUrl: undefined,

    }) {

        return await createToken({

            rawBaseUrl: baseUrl,
        });
    }

    async getTokenInfo() {

        return await getTokenInfo({

            selfie: this,
        });
    }

    async createOrGetAddress( values ) {

        return await createOrGetAddress( this, values );
    }

    async getFeeData() {

        return await getFeeData({

            selfie: this,
        });
    }

    async withdraw({

        amount,
        address,
        includeFeeInAmount = false,
        enviroWithdrawAmount,

    }) {
        
        return await withdraw({

            amount,
            address,
            includeFeeInAmount,
            enviroWithdrawAmount,
            selfie: this,
        });
    }
};