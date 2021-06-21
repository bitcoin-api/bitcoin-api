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

    if( moneyAction.type === moneyActions.types.regal.bonus ) {

        excitingElements.push(

            e(
                Typography,
                {
                    style: styles.amountText
                },
                `Bonus name: ${ moneyAction.bonusNameId }`
            ),
            e(
                Typography,
                {
                    style: styles.amountText
                },
                'Bitcoin amount: ' +
                `${ moneyAction.bitcoinAmount } BTC`
            ),
            e(
                Typography,
                {
                    style: styles.amountText
                },
                'Dynasty Bitcoin Amount: ' +
                `${ moneyAction.cryptoAmount } DB`
            ),
        );
    }
};
