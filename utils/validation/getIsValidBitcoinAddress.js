'use strict';

const bitcoinAddressValidation = require( '@bitcoin-api/bitcoin-address-validation' );


module.exports = Object.freeze( value => {

    const isValidAddress = !!bitcoinAddressValidation( value );

    return isValidAddress;
});