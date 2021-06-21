import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
// import { moneyActions } from '../../../../constants';
import addBitcoinAddress from './addBitcoinAddress';
import addBitcoinFee from './addBitcoinFee';
import addBitcoinAmount from './addBitcoinAmount';
import addTime from './addTime';
import addType from './addType';
import addExchangeData from './addExchangeData';
import addGameData from './addGameData';
import addBonus from './addBonus';


const getStyles = ({

    dialogMode,

}) => {
    
    const {

        backgroundColor,

    } = dialogMode ? {

        backgroundColor: 'black',

    } : {

        backgroundColor: 'beige',
    };

    return {

        outerContainer: {
            // backgroundColor: mainStyleObject.backgroundColor,
            backgroundColor,
            // width: '94%',
            width: 550,
            maxWidth: '94%',
            // height: 60,

            marginTop: 10,
            marginBottom: 10,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'left',
        },

    };
};


export default ({

    moneyAction,
    dialogMode,

}) => {

    const styles = getStyles({

        dialogMode,
    });

    const excitingElements = [];

    addType({
        excitingElements,
        moneyAction,
        dialogMode,
    });

    addBitcoinAddress({
        excitingElements,
        moneyAction,
        dialogMode,
    });
    
    addBitcoinAmount({
        excitingElements,
        moneyAction,
        dialogMode,
    });

    addBitcoinFee({
        excitingElements,
        moneyAction,
        dialogMode,
    });

    addExchangeData({
        excitingElements,
        moneyAction,
        dialogMode,
    });

    addGameData({
        excitingElements,
        moneyAction,
        dialogMode,
    });

    addBonus({
        excitingElements,
        moneyAction,
        dialogMode,
    });

    addTime({
        excitingElements,
        moneyAction,
        dialogMode,
    });

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        ...excitingElements
    );
};

