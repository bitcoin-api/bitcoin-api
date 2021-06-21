import { createElement as e, useState } from 'react';
import { getState } from '../../../../../reduxX';
// import {
//     usefulComponents,
//     // POWBlock,
// } from '../../TheSource';
import {
    usefulComponents
} from '../../../../../TheSource';
import Juice from './Juice';
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



export default ({
    
    raffleDatum

}) => {

    // const styles = getStyles();
    // const [ isLocalLoading, setIsLocalLoading ] = useState( true ); // TODO: CHANGE TO THIS
    const [ isLocalLoading, setIsLocalLoading ] = useState( false );

    const isLoading = getState( 'isLoading' );

    const showHideButtonIsDisabled = (
        isLocalLoading ||
        isLoading
    );

    return e(
        usefulComponents.OpenableBox,
        {
            title: 'All User Petals',
            showHideButtonIsDisabled,
            ContentComponent: Juice,
            contentProps: {

                raffleDatum,
                isLocalLoading,
                setIsLocalLoading,
            },
        }
    );
};