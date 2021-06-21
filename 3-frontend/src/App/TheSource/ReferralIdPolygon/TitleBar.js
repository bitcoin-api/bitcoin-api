import { createElement as e } from 'react';
import { getState, setState } from '../../reduxX';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import IconButton from '@material-ui/core/IconButton';
import { story } from '../../constants';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        titleTextMetaBox: {

            width: '97%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        leftSpacerBox: {

            width: 50,
            height: 20,
            // backgroundColor: 'purple',
        },
        
        titleTextBox: {

            // backgroundColor: 'pink',
        },

        titleText: {

            paddingTop: 5,
            paddingBottom: 5,
            color: 'black',
            fontSize: 18,
            textAlign: 'center',
            // padding: 15,
        },

        iconButton: {

            // backgroundColor: 'green',
        },

        icon: {

            color: 'black',
        },
    };
};


export default () => {

    const styles = getStyles();

    const isLoading = getState( 'isLoading' );

    return e(
        Box,
        {
            style: styles.titleTextMetaBox
        },
        e(
            Box,
            {
                style: styles.leftSpacerBox
            },
        ),
        e(
            Box,
            {
                style: styles.titleTextBox
            },
            e(
                Typography,
                {
                    style: styles.titleText
                },
                'Referral ID'
            )
        ),
        e(
            IconButton,
            {
                disabled: isLoading,
                // 'aria-label': '',
                style: styles.iconButton,
                onClick: () => {

                    setState(
                        'dialogMode',
                        story.dialogModes.referralIdInfo
                    );
                }
            },
            e(
                HelpOutlineIcon,
                {
                    style: styles.icon,
                }
            )
        )
    );
};
