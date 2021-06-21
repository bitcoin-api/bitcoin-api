import { createElement as e } from 'react';
import { setState } from '../../reduxX';
import { story } from '../../constants';
// import WithdrawPolygonCore from './WithdrawPolygonCore';
import Box from '@material-ui/core/Box';
// import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        titleTextBox: {

            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

            width: '100%',
            backgroundColor: 'beige',
        },

        titleText: {

            paddingTop: 20,
            paddingBottom: 20,
            color: 'black',
            fontSize: 20,
            textAlign: 'center',
            // padding: 15,
        },

        spacerBox: {

            // backgroundColor: 'green',
            width: 49,
            height: 49,
            marginLeft: 7,
            // padding: 15,
        },

        helpIcon: {

            color: 'black',
            fontSize: 25,
            
        },

        iconButton: {
            marginRight: 7,
            // marginRight: 5
        }
    };
};


export default () => {

    const styles = getStyles();

    return e(
        Box,
        {
            style: styles.titleTextBox
        },
        e(
            Box,
            {
                style: styles.spacerBox
            }
        ),
        e(
            Typography,
            {
                style: styles.titleText
            },
            'Withdraw Bitcoin'
        ),
        e(
            IconButton,
            {
                style: styles.iconButton,
                onClick: () => {

                    setState(
                        [
                            'dialogMode'
                        ],
                        story.dialogModes.withdraws
                    );
                },
            },
            e(
                HelpOutlineIcon,
                {
                    style: styles.helpIcon,
                }
            )
        )
    );
};
