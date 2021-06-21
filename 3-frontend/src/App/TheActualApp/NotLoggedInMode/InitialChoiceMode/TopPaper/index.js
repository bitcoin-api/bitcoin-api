import { createElement as e } from 'react';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Heading from './Heading';
import HowItWorks from './HowItWorks';
import ButtonPaper from './ButtonPaper';


const getStyles = () => {

    return {

        outerContainer: {
            backgroundColor: 'beige',
            borderRadius: 4,
            // backgroundColor,
            maxWidth: 600,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        upperBox: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        titlePaper: {

            backgroundColor: 'black',
            width: '100%',
            paddingTop: 20,
            paddingBottom: 20,
            display: 'flex',
            flexDirection: 'flex-start',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5,
        },

        titleText: {

            textAlign: 'center',
            color: 'white',
            fontSize: 30,
        },
    };
};


const getClasses = makeStyles( theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(3),
      },
    },
}));

export default () => {

    const styles = getStyles();
    const classes = getClasses();

    return e(
        Paper,
        {
            style: styles.outerContainer,
            className: classes.root,
        },
        e(
            Box,
            {
                style: styles.upperBox,
            },
            e(
                Paper,
                {
                    style: styles.titlePaper,
                    elevation: 5,
                },
                e(
                    Typography,
                    {
                        style: styles.titleText,
                        variant: 'h1'
                    },
                    'DynastyBitcoin.com'
                )
            ),
            e( Heading ),
        ),
        e( HowItWorks ),
        e( ButtonPaper )//,
        // e( LegalSelection )
    );
};
