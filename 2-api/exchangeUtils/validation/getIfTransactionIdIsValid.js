'use strict';

const {
    transactions: {
        transactionId: {
            prefix,
            minLength,
            maxLength
        }
    }
} = require( '../constants' );


module.exports = Object.freeze( ({

    transactionId,

}) => {

    const transactionIdIsValid = (

        !!transactionId &&
        (typeof transactionId === 'string') &&
        transactionId.startsWith( prefix ) &&
        (transactionId.length >= minLength) &&
        (transactionId.length <= maxLength)
    );

    return transactionIdIsValid;
});
