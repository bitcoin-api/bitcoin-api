import { createElement as e } from 'react';
import { setState } from '../../reduxX';
import { story } from '../../constants';
// import { usefulComponents } from '..';
// import login from './login';
import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';


const getStyles = () => {
    
    return {

        outerContainer: {
            // backgroundColor: 'green',
            // width: '90%',
            // borderRadius: 4,

            display: 'flex',
            lineHeight: 1.5,
            // display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',

            marginTop: 20,

            width: '100%',
            // textAlign: 'left',
            textAlign: 'center',
        },

        innerContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',

            // marginTop: 20,

            width: '95%',
            // textAlign: 'left',
            // textAlign: 'left',
        },

        text: {
            fontSize: 14,
            width: '52%',
        },

        linkText: {
            fontSize: 14,
            color: 'lightblue',
            width: '48%',
            cursor: 'pointer',
        }
    };
};


export default () => {

    const styles = getStyles();

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            Box,
            {
                style: styles.innerContainer,
            },
            e(
                'div',
                {
                    style: styles.text,
                },
                'Forgot your password?'
            ),
            e(
                'div',
                {
                    style: styles.linkText,
                    onClick: () => {

                        setState(
                            [
                                'notLoggedInMode',
                                'mainMode'
                            ],
                            story
                                .NotLoggedInMode
                                .mainModes
                                .forgotMyPasswordMode
                        );
                    },
                },
                'Reset My Password'
            )   
        )
    );
};
