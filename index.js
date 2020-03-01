'use strict';

const f = Object.freeze;

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
        BitcoinApiIoError
    },
    validation: {
        getIsValidBitcoinAddress
    }
} = require( './utils' );

const validateAndGetInitializationValues = require( './validateAndGetInitializationValues' );
const getMakeApiCall = require( './getMakeApiCall' );


module.exports = f( initializationValues => {

    log( 'initializing bitcoin-api' );

    const {

        livenetMode,
        token,

    } = validateAndGetInitializationValues( initializationValues );

    const makeApiCall = getMakeApiCall({

        livenetMode,
        token
    });

    const bitcoinApiInstance = f({

        getTokenInfo: f( async () => {

            log( 'running getTokenInfo' );

            const tokenInfo = await makeApiCall({

                resource: 'tokens',
                method: 'GET',
                endpointType: endpointTypes.generalToken,
            });

            log(
                'getTokenInfo executed successfully - token info: ' +
                stringify( tokenInfo )
            );

            return tokenInfo;
        }),

        getOrCreateAddress: f( async () => {

            log( 'running getOrCreateAddress' );

            const { address } = await makeApiCall({

                resource: 'addresses',
                method: 'POST',
                endpointType: endpointTypes.activatedToken,
                body: {},
            });

            log(
                'getOrCreateAddress executed successfully - ' +
                `address (or null): ${ address }`
            );

            return address;
        }),

        getFeeData: f( async () => {

            log( 'running getFeeData' );

            const feeData = await makeApiCall({

                resource: 'fee-data',
                method: 'GET',
                endpointType: endpointTypes.public,
            });

            log(
                'getFeeData executed successfully - ' +
                JSON.stringify( feeData, null, 4 )
            );

            return feeData;
        }),

        withdraw: f( async ({

            amount,
            address,
            includeFeeInAmount = false

        }) => {

            log( 'running withdraw' );

            if(
                !amount ||
                (typeof amount !== 'number') ||
                (amount < minimumWithdrawAmount) ||
                (amount > maximumWithdrawAmount)
            ) {

                throw new BitcoinApiIoError(
                    'error in .withdraw: invalid withdraw amount'
                );
            }
            else if(
                !address ||
                (typeof address !== 'string') ||
                (
                    livenetMode &&   
                    !getIsValidBitcoinAddress( address )
                )
            ) {

                throw new BitcoinApiIoError(
                    'error in .withdraw: invalid address specified'
                );
            }
            else if( typeof includeFeeInAmount !== 'boolean' ) {

                throw new BitcoinApiIoError(
                    'error in .withdraw: ' +
                    'invalid includeFeeInAmount value specified'
                );
            }

            await makeApiCall({

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
        }),
    });

    log( 'bitcoin-api successfully initialized' );

    return bitcoinApiInstance;
});