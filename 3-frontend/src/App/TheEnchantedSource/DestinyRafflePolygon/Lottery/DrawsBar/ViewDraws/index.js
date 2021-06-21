import { createElement as e, useState } from 'react';
import { getState } from '../../../../../reduxX';
// import {
//     usefulComponents,
//     // POWBlock,
// } from '../../TheSource';
import {
    usefulComponents
} from '../../../../../TheSource';
import DayBox from './DayBox';
import Buttons from './Buttons';
// import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';


// const getStyles = () => {
    
//     // const mainStyleObject = getState( 'mainStyleObject' );
//     const windowWidth = getState( 'windowWidth' );

//     return {

//         metaContainer: {

//             width: '90%',

//             display: 'flex',
//             flexDirection: 'row',
//             // justifyContent: 'flex-start',
//             justifyContent: (windowWidth > 700) ? 'flex-start' : 'center',
//             alignItems: 'center', 
//             marginTop: 15,
//             marginBottom: 15,
//         },
//     };
// };


const DrawsDisplayer = ({

    raffleDatum,
    isLocalLoading,
    setIsLocalLoading,

}) => {

    return [

        e(
            DayBox,
            {
                // startTime: Date.now(),
                key: 'a',
                raffleDatum,
                isLocalLoading,
                setIsLocalLoading,
                // choices,
            }
        ),
        e(
            Buttons,
            {
                // startTime: Date.now(),
                key: 'b',
                raffleDatum,
                isLocalLoading,
                setIsLocalLoading,
                // choices,
            }
        )
    ];
};


export default ({
    
    raffleDatum

}) => {

    // const [ isLocalLoading, setIsLocalLoading ] = useState( true );
    const [ isLocalLoading, setIsLocalLoading ] = useState( false );
    const isLoading = getState( 'isLoading' );

    // const styles = getStyles();


    const showHideButtonIsDisabled = (
        isLocalLoading ||
        isLoading
    );

    return e(
        usefulComponents.OpenableBox,
        {
            title: 'Petal Draws',
            ContentComponent: DrawsDisplayer,
            showHideButtonIsDisabled,
            contentProps: {

                raffleDatum,
                isLocalLoading,
                setIsLocalLoading,
            },
            // width: '48%',
            // maxWidth: '48%',
            // minWidth: 300,
        }
    );
};