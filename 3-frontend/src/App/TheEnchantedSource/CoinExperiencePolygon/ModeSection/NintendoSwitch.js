import { createElement as e } from 'react';
import { setState } from '../../../reduxX';
import withStyles from '@material-ui/core/styles/withStyles';
import lightBlue from '@material-ui/core/colors/lightBlue';
// import lightGreen from '@material-ui/core/colors/lightGreen';
import { gameData, games } from '../../../constants';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const gameModes = gameData[ games.theDragonsTalisman ].modes;

const getStyles = () => {
    
    return {

        formGroup: {

            width: '100%',
            marginTop: 0,

            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
        },

        formControlLabel: {

            width: '100%',
            marginTop: 0,

            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center'
        }
    };
};

const CoolSwitch = withStyles({
    switchBase: {
      color: lightBlue[300],
      '&$track': {
        backgroundColor: lightBlue[500],
      },
    //   '&$checked': {
    //     color: lightGreen[500],
    //   },
    //   '&$checked + $track': {
    //     backgroundColor: lightGreen[500],
    //   },
    },
    checked: {
        color: lightBlue[300],
        '&$track': {
            backgroundColor: lightBlue[500],
        },
        // '&$checked': {
        //   color: lightGreen[500],
        // },
        // '&$checked + $track': {
        //   backgroundColor: lightGreen[500],
        // },
    },
    track: {
        color: lightBlue[300],
        '&$track': {
            backgroundColor: lightBlue[500],
        },
    },
})(Switch);


export default ({

    isJackpotMode

}) => {

    const styles = getStyles();

    return e(
        FormGroup,
        {
            style: styles.formGroup,
        },
        e(
            FormControlLabel,
            {
                style: styles.formControlLabel,
                control: e(
                    CoolSwitch,
                    {
                        checked: isJackpotMode,
                        onChange: () => {

                            if( isJackpotMode ) {

                                const netAmount = 0.00003;

                                setState(
                                    [
                                        'loggedInMode',
                                        'coinFlip',
                                        'mode'
                                    ],
                                    gameModes.standard,
                                    [
                                        'loggedInMode',
                                        'coinFlip',
                                        'selectedAmount'
                                    ],
                                    netAmount,
                                    [
                                        'notLoggedInMode',
                                        'coinFlip',
                                        'selectedAmount'
                                    ],
                                    netAmount
                                );
                            }
                            else {

                                const netAmount = 0.0003;

                                setState(
                                    [
                                        'loggedInMode',
                                        'coinFlip',
                                        'mode'
                                    ],
                                    gameModes.jackpot,
                                    [
                                        'loggedInMode',
                                        'coinFlip',
                                        'selectedAmount'
                                    ],
                                    netAmount,
                                    [
                                        'notLoggedInMode',
                                        'coinFlip',
                                        'selectedAmount'
                                    ],
                                    netAmount
                                );
                            }
                        },
                        name: "checkedA",
                        color: 'primary',
                        size: 'small'
                        // inputProps: { 'aria-label': 'secondary checkbox' }
                    }
                ),
                label: isJackpotMode ? 'Jackpot' : 'Diamond',
            },
        )
    );
};
