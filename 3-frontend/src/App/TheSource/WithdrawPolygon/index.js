import { createElement as e } from 'react';
// import { getState } from '../../reduxX';
import WithdrawPolygonCore from './WithdrawPolygonCore';
import Box from '@material-ui/core/Box';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import TitleTextBox from './TitleTextBox';

const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: 'beige',
            width: '100%',
            maxWidth: 620,
            marginTop: 20,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
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
        e( TitleTextBox ),
        // e(
        //     Typography,
        //     {
        //         style: {

        //             paddingTop: 2,
        //             paddingBottom: 20,
        //             color: 'black',
        //             fontSize: 16,
        //             textAlign: 'left',
        //             width: '80%',
        //             maxWidth: 469,
        //             minWidth: 300
        //         }
        //     },
        //     e(
        //         'span',
        //         {
        //             style: {
        //                 fontWeight: 'bold',
        //             }
        //         },
        //         'Important Note: '
        //     ),
        //     'Due to current blockchain updating, withdraws may fail, ' +
        //     'if so, please email support@dynastybitcoin.com ' +
        //     'to make a withdraw ASAP (contact via twitter @DynastyBitcoin works too, your info will be confidential). '+
        //     'Automated withdraws will be ' +
        //     'back to being 100% operational soon.'
        // ),
        e( WithdrawPolygonCore )
    );
};
