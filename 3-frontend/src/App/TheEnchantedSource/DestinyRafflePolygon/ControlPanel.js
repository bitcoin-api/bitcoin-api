import { createElement as e } from 'react';
// import { getState, setState } from '../../reduxX';
// import { story } from '../../constants';
import {
    usefulComponents,
    // POWBlock,
} from '../../TheSource';
import Box from '@material-ui/core/Box';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            // backgroundColor: 'beige',
            width: '100%',

            // backgroundColor: 'pink',
            maxWidth: 620,
            // height: 300,

            marginTop: 20,
            marginBottom: 20,
            // borderRadius: '50%',
            // backgroundColor: 'pink',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'left',
        },
    };
};


export default () => {

    const styles = getStyles();

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            usefulComponents.crypto.CurrentAmount,
            {
                backgroundColor: 'beige',
                crypto: true,
                width: 160,
                // maxWidth = undefined,
                // fontWeight = 'bold',
                // height = 100,
                // color = 'black',
                // textVersion = 'a',
                // borderRadius = 4,
                // freeGameMode,
            }
        )
    );
};
