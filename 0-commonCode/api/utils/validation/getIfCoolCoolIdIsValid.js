'use strict';

const coolCoolIdRegex = /^[0-9a-f]{32}$/;


module.exports = Object.freeze( ({

    coolCoolId,

}) => {

    if(
        (typeof coolCoolId === 'string') &&
        !!coolCoolId.match( coolCoolIdRegex )
    ) {

        return true;
    }

    return false;
});