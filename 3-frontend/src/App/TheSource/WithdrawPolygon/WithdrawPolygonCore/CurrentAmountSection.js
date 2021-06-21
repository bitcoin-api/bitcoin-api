import { createElement as e } from 'react';
// import { getState } from '../../../reduxX';
import Box from '@material-ui/core/Box';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import { usefulComponents } from '../../../TheSource';


const getStyles = () => {
    
    return {

        outerContainer: {
            backgroundColor: 'beige',
            width: '100%',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        text: {

            width: '100%',
            paddingTop: 10,
            paddingBottom: 10,
            color: 'black',
            fontSize: 16,
            textAlign: 'center',
            // padding: 15,
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
                crypto: false,
                width: '100%',
                height: '100%',
                textVersion: 'b',
            }
        )        
    );
};
