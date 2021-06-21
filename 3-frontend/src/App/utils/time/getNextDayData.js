export default ({
    
    time = Date.now(),
    previous = false,

} = {

    time: Date.now(),
    previous: false,

}) => {
    
    const nextDate = new Date( time );

    const changeInDate = previous ? -1 : 1;
    
    nextDate.setDate( nextDate.getDate() + changeInDate );

    const startOfNextDayDate = new Date(
        
        nextDate.getFullYear(),
        nextDate.getMonth(),
        nextDate.getDate()
    );

    const startOfNextDayTime = startOfNextDayDate.getTime();

    const nextDayData = {

        time,
        startOfNextDayDate,
        startOfNextDayTime,
    };

    return nextDayData;
};
