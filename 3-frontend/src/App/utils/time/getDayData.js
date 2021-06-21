export default ({
    
    time = Date.now(),

} = {

    time: Date.now(),

}) => {
    
    // new Date( year, month, day, hours, minutes, seconds, milliseconds );
    
    const date = new Date( time );

    const startOfDayDate = new Date(
    
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );

    const startOfDayTime = startOfDayDate.getTime();

    const dayData = {

        time,
        date,
        startOfDayDate,
        startOfDayTime,
    };

    return dayData;
};
