import { createElement as e, useState, useEffect } from 'react';
import { getState } from '../../../reduxX';
// import { getState, setState } from '../../../reduxX';
// import { gameData, games } from '../../../constants';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const getStyles = () => {
    
    return {

        outerContainer: {
            // backgroundColor: 'lightGreen',
            // maxWidth: 620,
            width: '100%',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
        },

        theText: {

            fontSize: 16,
            textAlign: 'center',
            maxWidth: '90%',
        }
    };
};


const getDisplayValue = ({

    isJackpotMode,
    freeGameMode,
    freeGameJackpotAmount,

}) => {

    if( !isJackpotMode ) {

        return '💎';
    }

    if( freeGameMode ) {

        return `${ freeGameJackpotAmount } DB`;
    }

    // if not logged in, get fake one
    const jackpotAmount = getState(
        'loggedInMode',
        'coinFlip',
        'jackpotAmount'
    );

    if( typeof jackpotAmount !== 'number' ) {

        return '-';
    }

    return `${ jackpotAmount } DB`;
};



export default ({

    isJackpotMode,
    freeGameMode

}) => {

    const [ freeGameJackpotAmount, setFreeGameJackpotAmount ] = useState( 1 );

    useEffect( () => {

        if( freeGameMode && isJackpotMode ) {

            const intervalID = setInterval( () => {

                setFreeGameJackpotAmount( freeGameJackpotAmount + 1 );
    
            }, 3500 );
    
            return () => {
    
                clearInterval( intervalID );
            };
        }

    }, [ freeGameMode, freeGameJackpotAmount, isJackpotMode ] );

    const styles = getStyles();

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            Typography,
            {
                style: styles.theText,
            },
            getDisplayValue({

                isJackpotMode,
                freeGameMode,
                freeGameJackpotAmount,
            })
        )
    );
};
