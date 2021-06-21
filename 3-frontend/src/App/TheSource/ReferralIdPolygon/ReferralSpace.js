import { createElement as e } from 'react';
import { getState } from '../../reduxX';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
// import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        metaBox: {

            width: '97%',
            display: 'flex',
            flexDirection: 'row-wrap',
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: 'black',

            borderRadius: 5,

            marginTop: 10,
            marginBottom: 10,
        },

        // leftSpacerBox: {

        //     width: 50,
        //     height: 20,
        //     // backgroundColor: 'purple',
        // },
        
        referralIdBox: {

            // backgroundColor: 'pink',
            overflowX: 'scroll',
            width: '70%',
        },

        referralId: {

            paddingTop: 15,
            paddingBottom: 15,
            color: 'white',
            fontSize: 12,
            textAlign: 'center',
            marginRight: 2.5,
            // padding: 15,
        },

        button: {
            backgroundColor: 'black',
            marginTop: 5, 
            marginLeft: 2.5, 
            marginBottom: 5, 
            color: 'white'
        },

        icon: {

            color: 'white',
        },
    };
};


export default () => {

    const styles = getStyles();

    const referralId = (
        (
            (
                getState( 'loggedInMode', 'userData' ) || {}
            ).publicId
        ) || ''
    );

    const modifiedPublicId = `DynastyBitcoin_Ref_ID_${ referralId }`;
    
    return e(
        Box,
        {
            style: styles.metaBox
        },
        // e(
        //     Box,
        //     {
        //         style: styles.leftSpacerBox
        //     },
        // ),
        e(
            Box,
            {
                style: styles.referralIdBox
            },
            e(
                Typography,
                {
                    style: styles.referralId
                },
                modifiedPublicId
            )
        ),

            /*
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
      >
            */

        e(
            Button,
            {
                variant: 'contained',
                style: styles.button,
                size: 'small',
                // label: ,
                // 'aria-label': 'copy'
                onClick: () => {
    
                    navigator.clipboard.writeText( modifiedPublicId );
                    // setState(
                    //     'dialogMode',
                    //     story.dialogModes.viewTransactions
                    // );
                },
                startIcon: e(
                    FileCopyIcon,
                    {
                        style: styles.icon,
                    }
                )
            },
            'copy'
            // e(
            //     IconButton,
            //     {
            //         // disabled: isLoading,
            //         // 'aria-label': '',
            //         style: styles.iconButton,
            //         onClick: () => {
    
            //             navigator.clipboard.writeText( referralId );
            //             // setState(
            //             //     'dialogMode',
            //             //     story.dialogModes.viewTransactions
            //             // );
            //         }
            //     },
            //     e(
            //         FileCopyIcon,
            //         {
            //             style: styles.icon,
            //         }
            //     )
            // )
        )
    );
};
