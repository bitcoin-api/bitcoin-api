'use strict';

const uuidv4 = require( 'uuid' ).v4;


module.exports = Object.freeze( () => uuidv4().split( '-' ).join( '' ) );
