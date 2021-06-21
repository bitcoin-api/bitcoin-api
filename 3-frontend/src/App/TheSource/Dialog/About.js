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
            'Our mission at DynastyBitcoin.com is to provide ' +
            'high quality Bitcoin games and fun crypto technology.'
        ),
        e(
            Typography,
            {
                style: styles.text,
            },
            'Here are some of our core values at DynastyBitcoin.com: ' +
            'security, transparency, strength, kindness, ' +
            'ethical business operations, ' +
            'and of course, high quality ' +
            `technology that's super fun!!!😁🌞🥳🎊🎈🎉`
        ),
        e(
            Typography,
            {
                style: styles.text,
            },
            'Stay tuned for exciting new features and updates - ' +
            'follow Dynasty Bitcoin on Twitter for the latest DynastyBitcoin.com crypto news and fun tweets ',
            e(
                'a',
                {
                    target: '_blank',
                    href: 'https://twitter.com/DynastyBitcoin'
                },
                '🐦➡️@DynastyBitcoin'
            ),
            '!'
        )
    );
};
