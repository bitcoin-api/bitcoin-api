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
    enviroWithdrawAmount,
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
    else if(
        !!enviroWithdrawAmount &&
        !(
            (typeof enviroWithdrawAmount === 'number') &&
            (enviroWithdrawAmount > 0) &&
            (enviroWithdrawAmount < 50)
        )
    ) {

        throw new BitcoinApiError(
            'error in .withdraw: invalid enviroWithdrawAmount'
        );
    }

    const body = {

        amount,
        address,
        includeFeeInAmount,
    };

    if( !!enviroWithdrawAmount ) {

        body.enviroWithdrawAmount = enviroWithdrawAmount;
    }    

    await selfie.makeApiCall({

        resource: 'withdraws',
        method: 'POST',
        endpointType: endpointTypes.activatedToken,
        body
    });

    log( 'withdraw executed successfully' );
});
