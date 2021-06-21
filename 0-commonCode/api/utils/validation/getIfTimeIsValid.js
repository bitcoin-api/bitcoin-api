'use strict';


module.exports = Object.freeze( ({

    time,

}) => {

    if(
        (typeof time === 'number') &&
        Number.isInteger( time ) &&
        (time >= 1) &&
        (time <= 99678647379534)
    ) {

        return true;
    }

    return false;
});