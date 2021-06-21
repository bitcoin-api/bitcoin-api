'use strict';

const bitcoinAddressValidation = require( '@bitcoin-api/bitcoin-address-validation' );

const { environment: { isProductionMode } } = require( '../../../constants' );


module.exports = Object.freeze( value => {

    const isValidAddress = bitcoinAddressValidation(

        value,
        isProductionMode ? 'mainnet' : 'testnet'
    );

    return isValidAddress;
});