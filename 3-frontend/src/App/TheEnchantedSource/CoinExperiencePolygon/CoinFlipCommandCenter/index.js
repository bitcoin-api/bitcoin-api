import { createElement as e } from 'react';
import { getState/*, setState*/ } from '../../../reduxX';
import {
    usefulComponents,
    // POWBlock,
} from '../../../TheSource';
import {
    gameData, games
} from '../../../constants';
import {
    dynastyBitcoin,
} from '../../../utils';
// import { validation } from '../../utils';
import AmountChooser from './AmountChooser';
import doEnchantedLuck from './doEnchantedLuck';
import Box from '@material-ui/core/Box';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import TheDinocoin from './TheDinocoin';
// import About from './About';
// import doExchange from './doExchange';
const theGameData = gameData[ games.theDragonsTalisman ];
const diamondMin = theGameData.diamondMin;
const diamondMax = theGameData.diamondMax;
const jackpotMin = theGameData.jackpotMin;
const jackpotMax = theGameData.jackpotMax;


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            // backgroundColor: 'beige',
            backgroundColor: 'black',
            maxWidth: 620,
            width: '100%',
            // marginTop: 20,
            // height: 300,
            // borderRadius: '50%',
            // backgroundColor: 'pink',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
    };
};


export default ({

    freeGameMode = false,
    isJackpotMode,

}) => {

    const styles = getStyles();

    const isLoading = getState( 'isLoading' );
    // const amount = getState( 'coinExperiencePolygon', 'amount' );
    const selectedAmount = getState(
        
        freeGameMode ? 'notLoggedInMode' : 'loggedInMode',
        'coinFlip',
        'selectedAmount'
    );

    const selectedDynastyAmount = dynastyBitcoin.getDynastyBitcoinAmount(
        selectedAmount
    );

    let min;
    let max;

    if( isJackpotMode ) {

        min = jackpotMin;
        max = jackpotMax;
    }
    else {

        min = diamondMin;
        max = diamondMax;
    }

    const buttonIsDisabled = !(
        !isLoading &&
        (
            (selectedDynastyAmount >= min) &&
            (selectedDynastyAmount <= max)
        )
    );

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            AmountChooser,
            {
                freeGameMode,
                isJackpotMode,
                min,
                max
            }
        ),
        e(
            usefulComponents.POWBlock,
            {
                onClick: async () => {
    
                    await doEnchantedLuck({

                        freeGameMode,
                        min,
                        max,
                    });
                },
                backgroundColor: 'lightgreen',
                width: '100%',
                text: `Toss Talisman for ${ selectedAmount } DB`,
                isLoadingMode: buttonIsDisabled,
                // marginTop: 10,
            }
        )
    );
};
