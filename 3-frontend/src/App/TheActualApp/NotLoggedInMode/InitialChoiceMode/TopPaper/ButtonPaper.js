import { createElement as e } from 'react';
import { setState/*, getState*/ } from '../../../../reduxX';
import { story } from '../../../../constants';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


const getStyles = () => {

    return {

        buttonPaper: {

            borderRadius: 4,
            backgroundColor: 'beige',
            width: 300,
            // height: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            // marginBottom: 30,
        },

        buttonTop: {

            backgroundColor: 'black',
            color: 'white',
            marginTop: 25,
            marginBottom: 20,
            width: '90%',
        },

        buttonBottom: {

            backgroundColor: 'black',
            color: 'white',
            marginTop: 30,
            marginBottom: 15,
            width: '90%',
        },
    };
};


export default () => {

    const styles = getStyles();

    return e(
        Paper,
        {
            style: styles.buttonPaper,
            elevation: 5,
        },
        e(
            Button,
            {
                onClick: () => {

                    setState(
                        ['notLoggedInMode', 'mainMode' ],
                        story.NotLoggedInMode.mainModes.signUpMode
                    );
                },
                variant: 'contained',
                style: styles.buttonTop,
            },
            'Create New Account'
        ),
        e(
            Button,
            {
                onClick: () => {

                    setState(
                        ['notLoggedInMode', 'mainMode' ],
                        story.NotLoggedInMode.mainModes.loginMode
                    );
                },
                variant: 'contained',
                style: styles.buttonBottom,
            },
            'Login to Existing Account'
        )
    );
};
