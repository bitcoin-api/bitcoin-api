'use strict';

const crypto = require( 'crypto' );


module.exports = Object.freeze( value => {

    const hashedValue = crypto.createHash(

        'md5'

    ).update(
        
        value

    ).digest( 'hex' );

    return hashedValue;
});