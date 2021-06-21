import { createElement as e } from 'react';
import { getState, setState } from '../../../reduxX';
import { validation, dynastyBitcoin } from '../../../utils';
import { gameData, games } from '../../../constants';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
// import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
const theGameData = gameData[ games.theDragonsTalisman ];


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: 'lightgreen',
            // backgroundColor: 'black',

            marginTop: 25,
            marginBottom: 25,
            width: '95%',
            maxWidth: 332,
            borderRadius: 5,
            // height: 300,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        title: {
            width: '90%',
            marginTop: 5,
            // textDecoration: 'underline'
        },

        theRow: {
            // backgroundColor: 'pink',
            // backgroundColor: 'black',
            width: '100%',
            // height: 100,

            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
    };
};

// const diamondMin = theGameData.diamondMin;
// const diamondMax = theGameData.diamondMax;
const diamondStepCount = theGameData.diamondStepCount;
// const jackpotMin = theGameData.jackpotMin;
// const jackpotMax = 0.00008;
// const jackpotMax = theGameData.jackpotMax;
const jackpotStepCount = theGameData.jackpotStepCount;


const getSliderMarksData = ({

    step,
    addInitialMark = false,
    stepCount,

}) => {

    const sliderMarksData = [];

    if( addInitialMark ) {

        sliderMarksData.push({

            value: 0.00001,
        });
    }

    for( let i = 1; i <= stepCount; i++ ) {

        sliderMarksData.push({

            value: dynastyBitcoin.getDynastyBitcoinAmount(
                step * i
            )
        });
    }

    return sliderMarksData;
};


const getSliderValue = ({

    selectedAmountAsNumber,
    min,
    max,

}) => {


    if(
        (typeof selectedAmountAsNumber === 'number') &&
        !Number.isNaN(selectedAmountAsNumber)
    ) {

        if( selectedAmountAsNumber > max ) {

            return max;
        }
        else if( selectedAmountAsNumber < min ) {

            return min;
        }

        return selectedAmountAsNumber;
    }

    return min;
};


const PrettoSlider = withStyles({

    root: {
      color: '#52af77',
    //   height: 8,
    },
    thumb: {
    //   height: 24,
    //   width: 24,
        backgroundColor: 'green',
    //   border: '2px solid currentColor',
    //   marginTop: -8,
    //   marginLeft: -12,
    //   '&:focus, &:hover, &$active': {
    //     boxShadow: 'inherit',
    //   },
    },
    // active: {},
    // valueLabel: {
    //   left: 'calc(-50% + 4px)',
    // },
    // track: {
    //   height: 8,
    //   borderRadius: 4,
    // },
    // rail: {
    //   height: 8,
    //   borderRadius: 4,
    // },

})( Slider );


export default ({

    freeGameMode,
    isJackpotMode,
    min,
    max

}) => {

    const styles = getStyles();

    const isLoading = getState( 'isLoading' );

    const mainStateMode = freeGameMode ? 'notLoggedInMode' : 'loggedInMode';

    const selectedAmount = getState(
        
        mainStateMode,
        'coinFlip',
        'selectedAmount'
    );

    const selectedAmountAsNumber = Number( selectedAmount );

    let addInitialMark;
    let stepCount;

    if( isJackpotMode ) {

        stepCount = jackpotStepCount;
        addInitialMark = true;
    }
    else {

        stepCount = diamondStepCount;
        addInitialMark = false;
    }

    const step = dynastyBitcoin.getDynastyBitcoinAmount(
        max / stepCount
    );

    const sliderValue = getSliderValue({

        selectedAmountAsNumber,
        min,
        max,
    });

    const marks = getSliderMarksData({

        step,
        addInitialMark,
        stepCount
    });

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            Box,
            {
                style: styles.theRow,
            },
            e(
                PrettoSlider,
                { 
                    disabled: isLoading,
                    marks,
                    min,
                    max,
                    step,
                    style: {
                        width: 150,
                    },
                    onChange: ( event, newValue ) => {

                        // get crypto amount

                        setState(
        
                            [
                                mainStateMode,
                                'coinFlip',
                                'selectedAmount'
                            ],
                            newValue
                        );
                    },
                    // valueLabelDisplay: 'auto',
                    'aria-labelledby': 'input-slider',
                    value: sliderValue,
                }
            ),
            e(
                Input,
                { 
                    disabled: isLoading,
                    endAdornment: e(
                        InputAdornment,
                        {
                            position: 'end'
                        },
                        'DB'
                    ),
                    style: {
                        width: 93,
                        marginBottom: 5,
                    },
                    onChange: event => {

                        const newValue = event.target.value;

                        // get crypto amount
                        // const newValueAsNumber = Number( newValue );

                        const amountIsValid = validation.isValidNumberTextInput({
    
                            text: newValue,
                            maxAmount: max,
                            allowedNumberOfDecimals: 5
                        });

                        if( !amountIsValid ) {

                            return;
                        }

                        setState(
        
                            [
                                mainStateMode,
                                'coinFlip',
                                'selectedAmount'
                            ],
                            newValue
                        );
                    },
                    // type: 'number',
                    // increment: 0.1,
                    // valueLabelDisplay: 'auto',
                    'aria-labelledby': 'input-slider',
                    value: selectedAmount
                }
            )
        )
    );
};
