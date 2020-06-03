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

    static async createToken({

        livenetMode = false

    } = {

        livenetMode: false

    }) {
        
        const createTokenApiCall = Object.freeze( async () => {

            return await makeApiCall({

                token: null,
                livenetMode,
                resource: 'tokens',
                method: 'POST',
                endpointType: endpointTypes.public,
                body: {},
            });
        });

        return await createToken({

            createTokenApiCall
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