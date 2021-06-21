'use strict';

const oneHour = 1000 * 60 * 60;


module.exports = Object.freeze( () => {

    const thePowerOfNow = Date.now();

    const timeFromHourUnder = thePowerOfNow % oneHour;

    const currentHour = thePowerOfNow - timeFromHourUnder;

    return currentHour;
});
