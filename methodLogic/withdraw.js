'use strict';

const {
    endpointTypes,
    withdraws: {
        minimumWithdrawAmount,
        maximumWithdrawAmount
    }
} = require( '../constants' );

const {
    log,
    // stringify,
    errors: {
        BitcoinApiError
    },
    validation: {
        getIsValidBitcoinAddress
    }
} = require( '../utils' );


module.exports = Object.freeze( async ({

    amount,
    address,
    includeFeeInAmount = false,
    selfie

}) => {

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
            selfie.livenetMode &&   
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

    await selfie.makeApiCall({

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
});
