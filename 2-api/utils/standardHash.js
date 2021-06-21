'use strict';

const crypto = require( 'crypto' );


module.exports = Object.freeze( stringToHashInStandardizedWay => {

    const standardHashedString = crypto.createHash(

        'md5'

    ).update(
        
        stringToHashInStandardizedWay

    ).digest( 'hex' );

    return standardHashedString;
});
