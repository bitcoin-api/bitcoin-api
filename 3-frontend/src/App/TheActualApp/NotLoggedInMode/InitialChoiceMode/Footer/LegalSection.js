import { createElement as e } from 'react';
import { setState/*, getState*/ } from '../../../../reduxX';
import { story } from '../../../../constants';
import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';


const getStyles = () => {

    return {

        buttonBox: {

            // backgroundColor: 'beige',
            width: '90%' ,
            maxWidth: 500,
            minWidth: 320,
            // height: 100,
            // marginTop: 40,
            // marginTop: 40,
            marginBottom: 25,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },

        buttonTextBox: {

            cursor: 'pointer',
            // marginTop: 15,
            // marginBottom: 15,
            // width: '90%',
            // fontSize: 14,
        },

        buttonText: {

            // backgroundColor: 'black',
            color: '#696969',
            cursor: 'pointer',
            fontSize: 12,
            // marginTop: 15,
            // marginBottom: 15,
            // width: '90%',
            // fontSize: 14,
        }
    };
};


export default () => {

    const styles = getStyles();

    return e(
        Box,
        {
            style: styles.buttonBox,
            // elevation: 10,
        },
        e(
            Box,
            {
                style: styles.buttonTextBox,
            },
            e(
                Typography,
                {
                    size: 'small',
                    onClick: () => {

                        setState( 'metaMode', story.metaModes.privacyPolicy );
                    },
                    // variant: 'contained',
                    style: styles.buttonText,
                },
                'Privacy Policy'
            ),
        ),
        e(
            Box,
            {
                style: styles.buttonTextBox,
                // elevation: 10,
            },
            e(
                Typography,
                {
                    // size: 'small',
                    onClick: () => {

                        setState( 'metaMode', story.metaModes.termsOfService );
                    },
                    // variant: 'contained',
                    style: styles.buttonText,
                },
                'Terms of Service'
            )
        )
    );
};
