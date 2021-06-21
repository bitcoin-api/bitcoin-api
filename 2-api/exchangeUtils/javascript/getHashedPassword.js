'use strict';

const getHashedValue = require( '../../utils/javascript/getHashedValue' );


module.exports = Object.freeze( ({

    password,

}) => {

    const hashedPassword = getHashedValue( password );

    return hashedPassword;
});