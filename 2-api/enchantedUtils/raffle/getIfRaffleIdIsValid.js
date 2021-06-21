'use strict';

const {
    raffle: {
        raffleId: {
            prefix,
            maxLength,
            minLength
        }
    }
} = require( '../constants' );


module.exports = Object.freeze( ({

    raffleId,

}) => {

    const raffleIdIsValid = (

        !!raffleId &&
        (typeof raffleId === 'string') &&
        raffleId.startsWith( prefix ) &&
        (raffleId.length >= minLength) &&
        (raffleId.length <= maxLength)
    );

    return raffleIdIsValid;
});
