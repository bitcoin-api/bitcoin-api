import { createElement as e } from 'react';
// import CowCowCheckbox from '../../../usefulComponents/CowCowCheckbox';
import { getState } from '../../../../reduxX';
import { bitcoin } from '../../../../utils';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const getStyles = () => {
    
    return {

        outerContainer: {
            backgroundColor: 'beige',

            width: '100%',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        headerText: {

            width: '100%',
            paddingTop: 10,
            color: 'black',
            fontSize: 16,
            textAlign: 'center',
            fontWeight: 'bold',
        },

        text: {

            width: '100%',
            paddingTop: 5,
            paddingBottom: 20,
            color: 'black',
            fontSize: 16,
            textAlign: 'center',
            // padding: 15,
        },
    };
};


const noValueText = '-';


const getTotalWithdrawAmount = ({

    fullWithdraw,

}) => {

    const amount = getState( 'withdrawPolygon', 'amount' );
    const fee = getState( 'withdrawPolygon', 'fee' );

    const feeAsNumber = Number( fee );

    if( !!fullWithdraw && feeAsNumber ) {

        const totalBitcoinAmount = getState(
            
            'loggedInMode',
            'userData'

        ).balanceData.summary.bitcoin.totalAmount;

        // const totalWithdrawAmount = bitcoin.getBitcoinAmountNumber(
            // totalBitcoinAmount
            
            //- feeAsNumber
        // );
        const totalWithdrawAmount = totalBitcoinAmount;

        if( totalWithdrawAmount < 0 ) {

            return noValueText;
        }

        // return `${ totalWithdrawAmount } BTC (includes fee)`;
        return `${ totalWithdrawAmount } BTC`;
    }

    const amountAsNumber = Number( amount );

    const shouldDisplayTotalWithdrawAmount = (

        (
            !!amount &&
            (amountAsNumber !== 0)
        ) &&
        (
            !!fee &&
            (feeAsNumber !== 0)
        )
    );

    if( shouldDisplayTotalWithdrawAmount ) {

        const totalWithdrawAmount = bitcoin.getBitcoinAmountNumber(
            amountAsNumber + feeAsNumber
        );

        return `${ totalWithdrawAmount } BTC`;
    }

    return noValueText;
};


export default () => {

    const styles = getStyles();

    const fullWithdraw = getState( 'withdrawPolygon', 'fullWithdraw' );

    const totalWithdrawAmount = getTotalWithdrawAmount({

        fullWithdraw
    });

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            Typography,
            {
                style: styles.headerText
            },
            fullWithdraw ? (
                
                'Total Withdraw Amount'
                
            ) :'Estimated Total Withdraw Amount'
        ),
        e(
            Typography,
            {
                style: styles.text
            },
            totalWithdrawAmount
        )
    );
};
