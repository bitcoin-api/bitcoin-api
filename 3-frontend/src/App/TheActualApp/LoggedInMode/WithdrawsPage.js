import { createElement as e, useEffect } from 'react';
// import { getState } from '../../reduxX';
import { pages } from '../../constants';
import {
    WithdrawPolygon,
} from '../../TheSource';
import {
    actions,
    // grecaptcha,
} from '../../utils';
import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';


const getStyles = () => {
    
    return {

        outerContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            // marginBottom: 20,
        },

        // explanationTextContainer: {
        //     width: '80%',
        //     minWidth: 300,
        //     maxWidth: 620,
        //     display: 'flex',
        //     flexDirection: 'column',
        //     justifyContent: 'flex-start',
        //     alignItems: 'center',
        //     marginTop: 50,
        // },

        // explanationTextHeader: {
        //     width: '100%',
        //     color: 'white',
        //     textDecoration: 'underline',
        //     textAlign: 'left',
        //     fontSize: 18
        // },

        // explanationText: {
        //     width: '100%',
        //     color: 'white',
        //     textAlign: 'left',
        //     fontSize: 16
        // }
    };
};


export default () => {

    useEffect( () => {

        actions.scroll();
        actions.setLastVisitedPage({

            loggedInMode: true,
            page: pages.loggedInMode.withdraw,
        });
        // grecaptcha.showGrecaptcha();

        // return () => {

        //     Promise.resolve().then( async () => {

        //         try {

        //             await grecaptcha.hideGrecaptcha();
        //         }
        //         catch( err ) {

        //             console.log( 'error in hiding grecaptcha:', err );
        //         }
        //     });
        // };
        
    }, [] );

    const styles = getStyles();

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e( WithdrawPolygon )
        
        // e(
        //     Box,
        //     {
        //         style: styles.explanationTextContainer,
        //     },
        //     e(
        //         Typography,
        //         {
        //             style: styles.explanationTextHeader,
        //         },
        //         'About Withdraws'
        //     ),
        //     e(
        //         Typography,
        //         {
        //             style: styles.explanationText,
        //         },
        //         '• the minimum withdraw amount is 0.00004 BTC'
        //     ),
        //     e(
        //         Typography,
        //         {
        //             style: styles.explanationText,
        //         },
        //         '• the only fee is the Bitcoin network fee'
        //     ),
        //     e(
        //         Typography,
        //         {
        //             style: styles.explanationText,
        //         },
        //         '• the fee is an estimate ' +
        //         `and it's generally an overestimate; ` +
        //         `while performing a withdraw, the withdraw system aims to make the fee lower than what's displayed`
        //     ),
        //     e(
        //         Typography,
        //         {
        //             style: styles.explanationText,
        //         },
        //         '• the actual fee will never be more than the fee estimate'
        //     ),
        //     e(
        //         Typography,
        //         {
        //             style: styles.explanationText,
        //         },
        //         `• if the actual fee used for a withdraw is less than the estimated fee, whatever amount from the fee estimate that's not used to cover the actual fee will be automatically refunded after the withdraw is made`
        //     ),
        //     e(
        //         Typography,
        //         {
        //             style: styles.explanationText,
        //         },
        //         '• the fee is not included in the withdraw amount unless withdrawing your full balance amount'
        //     ),
        //     e(
        //         Typography,
        //         {
        //             style: styles.explanationText,
        //         },
        //         `• full balance amount withdraws also aim to minimize the fee used, if the actual fee is less than the estimate than the unused Bitcoin from the fee estimate will be sent along with the withdraw amount in this case`
        //     ),
        //     e(
        //         Typography,
        //         {
        //             style: styles.explanationText,
        //         },
        //         '• the total withdraw amount is also an estimate because it contains the fee which is estimated'
        //     ),
        //     e(
        //         Typography,
        //         {
        //             style: styles.explanationText,
        //         },
        //         '• please contact support@dynastybitcoin.com if you have ' +
        //         'any difficulties withdrawing your Bitcoin'
        //     )
        // )
    );
};
