import { createElement as e } from 'react';
import { getState } from '../../../reduxX';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import QrStronghold from './QrStronghold';
import ButtonArmament from './ButtonArmament';

const getStyles = ({

    isDialogDesktopMode,

}) => {

    return {

        outerContainer: {

            // backgroundColor: 'pink',
            width: '100%',
            // display: 'flex',
            // justifyContent: 'center',
            // flexDirection: 'column',
            // alignItems: 'center'
        },

        daBox: {
            width: '100%',
            // height: 150,
            // backgroundColor: 'lightgreen',

            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
        },

        titleTextBox: {

            marginTop: isDialogDesktopMode ? 0 : 20,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
        },

        titleText: {
            textAlign: 'center',
            fontSize: 18,
            // marginTop: 20,
            // marginBottom: 20,
        },
    };
};


export default ({

    isDialogDesktopMode,

}) => {

    const styles = getStyles({

        isDialogDesktopMode,
    });

    const userData = getState( 'loggedInMode', 'userData' );

    const address = (
        
        !!userData &&
        !!userData.balanceData &&
        !!userData.balanceData.bitcoin &&
        !!userData.balanceData.bitcoin.depositAddress &&
        userData.balanceData.bitcoin.depositAddress
    );

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            Box,
            {
                style: styles.daBox,
            },
            e(
                Box,
                {
                    style: styles.titleTextBox,
                },
                e(
                    Typography,
                    {
                        style: styles.titleText,
                    },
                    'Bitcoin Deposit Address'
                ),
                !!address ? e(
                    
                    QrStronghold,
                    {
                        address
                    }

                ) : e( ButtonArmament )
            )
        )
    );
};
