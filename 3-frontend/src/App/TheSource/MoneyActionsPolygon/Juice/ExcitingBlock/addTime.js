import { createElement as e } from 'react';
// import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// import { moneyActions } from '../../../../constants';
// import { getState } from '../../../../reduxX';

const weekday = [
    "Sunday",
    'Monday',
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const numberEnglish = [
    'th',
    'st',
    'nd',
    'rd',
    'th',
    'th',
    'th',
    'th',
    'th',
    'th',
];

const getStyles = ({

    dialogMode

}) => {
    
    const {

        color,

    } = dialogMode ? {

        color: 'white',

    } : {

        color: 'black',
    };
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        timeText: {

            color,
            fontSize: 12,
            marginLeft: 5,
            marginTop: 3,
        }
    };
};


const getHours = ({

    theDate,

}) => {

    const hours1 = theDate.getHours();

    const hours2 = hours1 % 12;

    if( hours2 === 0 ) {

        return 12;
    }

    return hours2;
};


const getSecondsWithAddedZeroIfNecessary = ({

    theDate,

}) => {

    const rawSeconds = theDate.getSeconds();

    if( rawSeconds < 10 ) {

        const minutes = `0${ rawSeconds }`;

        return minutes;
    }

    return rawSeconds;
};


const getMinutesWithAddedZeroIfNecessary = ({

    theDate,

}) => {

    const rawMinutes = theDate.getMinutes();

    if( rawMinutes < 10 ) {

        const minutes = `0${ rawMinutes }`;

        return minutes;
    }

    return rawMinutes;
};


export default  ({
    excitingElements,
    moneyAction,
    dialogMode,
}) => {

    const styles = getStyles({

        dialogMode,
    });

    const theDate = new Date( moneyAction.time );

    const hours = theDate.getHours();

    const isPM = hours > 12;

    const theDateDate = theDate.getDate();

    const minutes = getMinutesWithAddedZeroIfNecessary({

        theDate
    });

    const swaggyTime = (
        `${ getHours({ theDate }) }:` +
        `${ minutes }:` +
        `${ getSecondsWithAddedZeroIfNecessary({ theDate }) } ` +
        `${ isPM ? 'PM' : 'AM' }, ` +
        `${ weekday[ theDate.getDay() ] } ` +
        `${ monthNames[ theDate.getMonth() ] } ` +
        `${ theDateDate }` +
        `${ numberEnglish[ theDateDate % 10 ] } ` +
        `${ theDate.getFullYear() }`
    );

    excitingElements.push(

        e(
            Typography,
            {
                style: styles.timeText
            },
            swaggyTime
        )
    );
};
