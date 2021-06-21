import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
import LegalSection from './LegalSection';


const getStyles = () => {

    return {

        outerContainer: {
            // backgroundColor: 'beige',
            width: '100%',
            maxWidth: 620,
            minWidth: 300,
            // marginBottom: 
            // height: 40,
            // backgroundColor: 'pink',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        // importantMessage: {
        //     // backgroundColor: 'beige',
        //     marginTop: 25,
        //     width: '85%',
        //     // height: 40,
        //     color: 'white',
        // },

        // threeDots: {

        //     marginTop: 15,
        //     // marginTop: 30,
        //     textAlign: 'center',
        //     fontSize: 25,
        // }
    };
};


export default () => {

    const styles = getStyles();

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        // e( 
        //     Typography,
        //     {
        //         style: styles.importantMessage,
        //     },
        //     `If you're having trouble accessing or ` +
        //     'withdrawing your Bitcoin, please contact ' +
        //     'support@dynastybitcoin.com. ' +
        //     'Thank you for choosing DynastyBitcoin.com.'
        // ),
        // e( 
        //     Typography,
        //     {
        //         style: styles.threeDots,
        //     },
        //     '• • •'
        // ),
        e( LegalSection )
    );
};
