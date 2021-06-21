import { createElement as e } from 'react';
import { getState } from '../../../../reduxX';
// import {
//     usefulComponents,
//     // POWBlock,
// } from '../../TheSource';
// import {
//     usefulComponents
// } from '../../../../TheSource';
import Box from '@material-ui/core/Box';
// import DayBox from './DayBox';
// import Buttons from './Buttons';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import ViewDraws from './ViewDraws';
import ViewAllTickets from './ViewAllTickets';

// const getAlignItems = () => {

//     const windowWidth = getState( 'windowWidth' );

//     const largeScreenMode = (windowWidth > 700);

//     console.log(`
    
    
//         MEGA LOG: ${ JSON.stringify( {

//             windowWidth,
//             largeScreenMode

//         }, null, 4 ) }
    
    
//     `);

//     if( largeScreenMode ) {

//         return 'top';
//     }

//     return 'center';
// };


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );
    const windowWidth = getState( 'windowWidth' );

    const largeScreenMode = (windowWidth > 700);

    const {

        metaContainer,
        spacerBox,

    } = largeScreenMode ? {

        metaContainer: {
            
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'start', 
        },

        spacerBox: {
        },

    } : {

        metaContainer: {
            
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
        },

        spacerBox: {

            height: 20,
            width: 5,
        },
    };

    return {

        metaContainer: Object.assign(
            
            {

                width: '90%',

                display: 'flex',
                // flexDirection,
                // justifyContent,
                // alignItems: 'center', 
                // alignItems: 'top', 
                // alignItems, 
                marginTop: 15,
                marginBottom: 15,
            },
            metaContainer
        ),

        spacerBox: Object.assign(
            
            {},
            spacerBox
        ),
    };
};


export default ({
    
    raffleDatum

}) => {

    const styles = getStyles();

    return e(
        Box,
        {
            style: styles.metaContainer,
        },
        e(
            ViewDraws,
            {
                raffleDatum,
            }
        ),
        e(
            Box,
            {
                style: styles.spacerBox
            }
        ),
        e(
            ViewAllTickets,
            {
                raffleDatum,
            }
        )
    );
};
