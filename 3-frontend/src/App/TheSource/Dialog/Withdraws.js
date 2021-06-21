import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const getStyles = () => {

    return {

        outerContainer: {

            // backgroundColor: 'pink',
            width: '100%',
            // display: 'flex',
            // justifyContent: 'center',
            // flexDirection: 'column',
            // alignItems: 'center'
        },

        explanationText: {
            width: '90%',
            // color: 'white',
            color: 'black',
            textAlign: 'left',
            fontSize: 16,
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 15,
        }
    };
};


const aboutWithdrawText = Object.freeze([

    `the minimum withdraw amount for standard withdraws is 0.00004 BTC`,
    `the minimum withdraw amount for full balance withdraws is 0.00025 BTC`,
    `the only fee is the Bitcoin network fee (the blockchain fee)`,
    `the withdraw system aims to minimize the actual blockchain fee used`,
    `the "Blockchain Fee Estimate" is an estimate of the fee to be used and it's generally an overestimate; while performing a withdraw the withdraw system aims to set the actual fee used to be lower than what's estimated`,
    `the actual fee will not be more than the fee estimate`,
    `if the actual fee used for a withdraw is less than the fee estimate, whatever amount that's reserved for the fee estimate which is not used to cover the actual fee will automatically be refunded after the withdraw is made`,
    `the "Estimated Total Withdraw Amount" is also considered an estimate because it contains the fee estimate`,
    `the fee is included in the withdraw amount while withdrawing your full balance amount`,
    `full balance amount withdraws also aim to minimize the fee used, if the actual fee used for a full balance amount withdraw is less than the fee estimate, then the unused Bitcoin amount reserved for the fee estimate will be sent along with the withdraw in addition to the withdraw amount`,
    `please contact support@dynastybitcoin.com if you have any difficulties withdrawing your Bitcoin`
]);


export default () => {

    const styles = getStyles();

    const textElements = aboutWithdrawText.map( text => {

        return e(
            Typography,
            {
                style: styles.explanationText,
            },
            `• ${ text }`
        );
    });

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        ...textElements
        // e(
        //     Typography,
        //     {
        //         style: styles.text,
        //     },
        //     'Our mission at DynastyBitcoin.com is to provide ' +
        //     'a high quality crypto game platform with modern crypto games.'
        // )
    );
};
