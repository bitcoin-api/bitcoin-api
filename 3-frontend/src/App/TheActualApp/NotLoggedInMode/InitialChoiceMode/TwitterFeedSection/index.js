import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
// import { story } from '../../../../constants';
// import { setState } from '../../../../reduxX';
// import Link from '@material-ui/core/Link';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import LegalSection from './LegalSection';


const getStyles = () => {

    return {

        outerContainer: {
            // backgroundColor: 'green',
            width: '90%',
            maxWidth: 500,
            // minWidth: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        innerBox: {

            marginTop: 27,
            marginBottom: 27,
            // backgroundColor: 'pink',

            width: '100%',
            height: 710,

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
        e(
            Box,
            {
                style: styles.innerBox,
            },
            e(
                'iframe',
                {
                    style: {
                        touchAction: 'pan-y'
                    },
                    frameBorder: '0',
                    allowFullScreen: false,
                    // allow: true,
                    // sandbox: false,
                    width: '100%',
                    height: '100%',
                    src: 'https://master.d2lq8bb1axbb9y.amplifyapp.com/?height=450',
                    loading: 'lazy',
                }
            )
        )
    );
};
// <iframe src="https://www.w3schools.com" title="W3Schools Free Online Web Tutorials"></iframe>