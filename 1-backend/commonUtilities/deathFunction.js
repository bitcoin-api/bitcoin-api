'use strict';

const fiveMinutes = 1000 * 60 * 5;


// const deadFunction = Object.freeze(
module.exports = Object.freeze(
    
    ({ name }) => new Promise( (/* resolve, reject */) => {
            
        const runFunctionRecursion = async () => {

            const date = new Date();
            
            const powerOfNowString = (
                `${ date.toDateString() } ${ date.toTimeString() } - ` +
                date.getTime().toString()
            );

            console.log(
                `${ name } is dead💀🏴‍☠️ - ${ powerOfNowString }`
            );
            
            await new Promise( resolve => setTimeout( resolve, fiveMinutes ) );

            runFunctionRecursion();
        };

        runFunctionRecursion();
    })
);


// (() => {

//     console.log( 1 + 4 );
    
//     return deadFunction({

//         name: 'bot'
//     });
// })();