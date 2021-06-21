'use strict';

const {
    exchangeUsers: {
        exchangeUserId: {
            prefix,
            minLength,
            maxLength
        }
    }
} = require( '../../constants' );


module.exports = Object.freeze( ({

    exchangeUserId,

}) => {

    const exchangeUserIdIsValid = (

        !!exchangeUserId &&
        (typeof exchangeUserId === 'string') &&
        exchangeUserId.startsWith( prefix ) &&
        (exchangeUserId.length >= minLength) &&
        (exchangeUserId.length <= maxLength)
    );

    return exchangeUserIdIsValid;
});
