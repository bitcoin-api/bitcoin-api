import { createElement as e } from 'react';
import { getState, setState } from '../../reduxX';
import { story } from '../../constants';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import IconButton from '@material-ui/core/IconButton';


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

        fullscreenIconButton: {

            // backgroundColor: 'green',
        },

        fullscreenIcon: {

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
                'Transactions'
            )
        ),
        e(
            IconButton,
            {
                disabled: isLoading,
                // 'aria-label': '',
                style: styles.fullscreenIconButton,
                onClick: () => {

                    setState(
                        'dialogMode',
                        story.dialogModes.viewTransactions
                    );
                }
            },
            e(
                FullscreenIcon,
                {
                    style: styles.fullscreenIcon,
                }
            )
        )
    );
};
