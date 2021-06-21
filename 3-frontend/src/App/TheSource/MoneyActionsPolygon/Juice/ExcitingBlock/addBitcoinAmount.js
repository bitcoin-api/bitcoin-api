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
        [
            
            moneyActions.types.regal.addressAmountUpdate,
            moneyActions.types.regal.withdraw.start,
            moneyActions.types.regal.withdraw.success,
            moneyActions.types.regal.withdraw.failed,

        ].includes( moneyAction.type )
    ) {

        excitingElements.push(

            e(
                Typography,
                {
                    style: styles.amountText
                },
                `amount: ${ moneyAction.amount } BTC`
            )
        );
    }
};