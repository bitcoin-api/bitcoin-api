import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const getStyles = () => {

    return {

        outerContainer: {

            width: '100%',
            // height: 100,
            // backgroundColor: 'pink',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
        },

        text: {

            width: '90%',
            // height: 100,
            color: 'black',
            marginTop: 15,
            marginBottom: 5,
            // padding: 5,
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
            Typography,
            {
                style: styles.text,
            },
            'Your Referral ID can be used ' +
            'for special promotions to get free Bitcoin, ' +
            'free Dynasty Bitcoin, and more! ' +
            'This Referral ID is okay to share publicly.'
        ),
        e(
            Typography,
            {
                style: styles.text,
            },
            'Follow ',
            e(
                'a',
                {
                    target: '_blank',
                    href: 'https://twitter.com/DynastyBitcoin'
                },
                '@DynastyBitcoin on Twitter'
            ),
            ' to keep up to date with the latest DynastyBitcoin.com ' +
            'promotions and giveaways!'
        ),
    );
};
