import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const getStyles = () => {

    return {

        outerContainer: {

            width: '100%',
            // minWidth: '100%',
            // height: 100,
            // backgroundColor: 'pink',
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'center'
        },

        text: {

            width: '100%',
            // height: 100,
            color: 'black',
            marginTop: 15,
            marginBottom: 5,
            // padding: 5,
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
            Typography,
            {
                style: styles.text,
            },
            `• Spin slot for 0.0001 DB (10 Satoshi)`
        ),
        e(
            Typography,
            {
                style: styles.text,
            },
            `• all different -> tie with 0.0001 DB (10 Satoshi)`
        ),
        e(
            Typography,
            {
                style: styles.text,
            },
            `• 3 same -> win 0.0007 DB (70 Satoshi)!`
        ),
    );
};
