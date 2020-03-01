'use strict';

const {
    endpointTypes,
    withdraws: {
        minimumWithdrawAmount,
        maximumWithdrawAmount
    }
} = require( './constants' );

const {
    log,
    stringify,
    errors: {
        BitcoinApiError
    },
    validation: {
        getIsValidBitcoinAddress
    }
} = require( './utils' );

const validateAndGetInitializationValues = require( './validateAndGetInitializationValues' );
const getMakeApiCall = require( './getMakeApiCall' );


class BitcoinApi {

    constructor( initializationValues ) {

        log( 'initializing bitcoin-api' );

        const {
    
            livenetMode,
            token,
    
        } = validateAndGetInitializationValues( initializationValues );

        this.livenetMode = livenetMode;

        this.makeApiCall = getMakeApiCall({

            livenetMode,
            token
        });

        log( 'bitcoin-api successfully initialized' );
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

        const { address } = await this.makeApiCall({

            resource: 'addresses',
            method: 'POST',
            endpointType: endpointTypes.activatedToken,
            body: {},
        });

        log(
            'createOrGetAddress executed successfully - ' +
            `address (or null): ${ address }`
        );

        return address;
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

        log( 'running withdraw' );

        if(
            !amount ||
            (typeof amount !== 'number') ||
            (amount < minimumWithdrawAmount) ||
            (amount > maximumWithdrawAmount)
        ) {

            throw new BitcoinApiError(
                'error in .withdraw: invalid withdraw amount'
            );
        }
        else if(
            !address ||
            (typeof address !== 'string') ||
            (
                this.livenetMode &&   
                !getIsValidBitcoinAddress( address )
            )
        ) {

            throw new BitcoinApiError(
                'error in .withdraw: invalid address specified'
            );
        }
        else if( typeof includeFeeInAmount !== 'boolean' ) {

            throw new BitcoinApiError(
                'error in .withdraw: ' +
                'invalid includeFeeInAmount value specified'
            );
        }

        await this.makeApiCall({

            resource: 'withdraws',
            method: 'POST',
            endpointType: endpointTypes.activatedToken,
            body: {

                amount,
                address,
                includeFeeInAmount,
            }
        });

        log( 'withdraw executed successfully' );
    }
};


module.exports = BitcoinApi;