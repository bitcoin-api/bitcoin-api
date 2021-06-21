'use strict';

const {
    raffle: {
        raffleDrawId: {
            prefix,
            maxLength,
            minLength
        }
    }
} = require( '../constants' );


module.exports = Object.freeze( ({

    raffleDrawId,

}) => {

    const raffleDrawIdIsValid = (

        !!raffleDrawId &&
        (typeof raffleDrawId === 'string') &&
        raffleDrawId.startsWith( prefix ) &&
        (raffleDrawId.length >= minLength) &&
        (raffleDrawId.length <= maxLength)
    );

    return raffleDrawIdIsValid;
});
