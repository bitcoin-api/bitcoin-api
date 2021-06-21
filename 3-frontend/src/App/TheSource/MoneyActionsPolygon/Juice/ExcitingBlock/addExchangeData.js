import { createElement as e } from 'react';
// import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { moneyActions } from '../../../../constants';


const getStyles = ({

    dialogMode

}) => {
    
    const {

        color,

    } = dialogMode ? {

        color: 'white',

    } : {

        color: 'black',
    };
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        amountText: {

            color,
            fontSize: 14,
            marginLeft: 5,
            marginTop: 3,
        },
    };
};


export default ({
    excitingElements,
    moneyAction,
    dialogMode,
}) => {

    const styles = getStyles({

        dialogMode,
    });

    if(
        moneyAction.type ===
        moneyActions.types.regal.exchange.btcToCrypto
    ) {

        excitingElements.push(

            e(
                Typography,
                {
                    style: styles.amountText
                },
                'BTC spent: ' +
                `${ moneyAction.amountInBTCNeeded } BTC`
            ),
            e(
                Typography,
                {
                    style: styles.amountText
                },
                'DB acquired: ' +
                `${ moneyAction.amountInCryptoWanted } DB`
            ),
        );
    }
    else if(
        moneyAction.type ===
        moneyActions.types.regal.exchange.cryptoToBTC
    ) {

        excitingElements.push(

            e(
                Typography,
                {
                    style: styles.amountText
                },
                'DB spent: ' +
                `${ moneyAction.amountInCryptoNeeded } DB`
            ),
            e(
                Typography,
                {
                    style: styles.amountText
                },
                'BTC acquired: ' +
                `${ moneyAction.amountInBitcoinWanted } BTC`
            ),
        );
    }
};
