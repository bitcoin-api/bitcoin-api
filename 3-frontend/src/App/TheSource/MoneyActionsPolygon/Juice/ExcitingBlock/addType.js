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

        typeText: {

            color,
            fontSize: 16,
            marginLeft: 5,
            marginTop: 3,
            fontWeight: 'bold',
        },
    };
};


const moneyActionToTypeText = {

    [moneyActions.types.regal.addressAmountUpdate]: 'Address Amount Update',
    [moneyActions.types.regal.withdraw.start]: 'Withdraw Request',
    [moneyActions.types.regal.withdraw.success]: 'Withdraw Success',
    [moneyActions.types.regal.withdraw.failed]: 'Withdraw Failed',
    [moneyActions.types.regal.exchange.btcToCrypto]: 'Exchange: BTC to DB',
    [moneyActions.types.regal.exchange.cryptoToBTC]: 'Exchange: DB to BTC',
    [moneyActions.types.regal.bonus]: 'Bonus!',
    [moneyActions.types.game.talismanFlip]: 'Game: Talisman Flip',
    [moneyActions.types.game.talismanLotus]: 'Game: Lotus Jackpot Talisman Flip',
    [moneyActions.types.game.slot]: 'Game: Satoshi Slot',
    [moneyActions.types.game.lotus.pickPetal]: 'Game: Lotus Lottery - Pick Petal',
    [moneyActions.types.game.lotus.unpickPetal]: 'Game: Lotus Lottery - Unpick Petal',
    [moneyActions.types.game.lotus.flowerPotPayout]: 'Game: Lotus Lottery - Winning Payout!!',
};


export default ({
    excitingElements,
    moneyAction,
    dialogMode,
}) => {

    const styles = getStyles({

        dialogMode,
    });

    excitingElements.push(

        e(
            Typography,
            {
                style: styles.typeText
            },
            moneyActionToTypeText[ moneyAction.type ]
        )
    );
};
