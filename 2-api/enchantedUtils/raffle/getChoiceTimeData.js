'use strict';

const oneMinute = 1000 * 60;
const fiveMinutes = oneMinute * 5;
const oneHour = fiveMinutes * 12;


module.exports = Object.freeze( ({

    timestamp,

}) => {

    const timeFromHourUnder = timestamp % oneHour;

    const hourUnder = timestamp - timeFromHourUnder;
    
    const timeToHourOver = oneHour - timeFromHourUnder;

    const hourAbove = timestamp + timeToHourOver;

    const lastCancelTime = hourAbove - fiveMinutes;

    const choiceTimeData = {

        hourUnder,
        hourAbove,
        lastCancelTime,
    };
    
    return choiceTimeData;
});
