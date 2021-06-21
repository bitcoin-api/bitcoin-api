'use strict';

const uuidv4 = require( 'uuid' ).v4;

const {
    raffle: {
        raffleDrawId: {
            prefix
        }
    }
} = require( '../constants' );


module.exports = Object.freeze( () => {

    const raffleDrawId = `${ prefix }${ uuidv4() }_${ Date.now() }`;

    return raffleDrawId;
});
