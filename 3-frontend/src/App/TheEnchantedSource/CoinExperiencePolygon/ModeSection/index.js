import { createElement as e, useEffect } from 'react';
import { getState, setState } from '../../../reduxX';
// import { gameData, games } from '../../../constants';
import { actions, delay } from '../../../utils';
import Paper from '@material-ui/core/Paper';
import NintendoSwitch from './NintendoSwitch';
import JackpotAmountDisplay from './JackpotAmountDisplay';

const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );
    
    return {

        outerContainer: {
            backgroundColor: 'lightGreen',
            // maxWidth: 620,
            width: '100%',
            maxWidth: 165,
            height: 85,
            borderRadius: 5,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
    };
};


export default ({

    freeGameMode,
    isJackpotMode,

}) => {

    useEffect( () => {

        const isLoggedIn = actions.getIsLoggedIn();

        if( !freeGameMode && isLoggedIn ) {

            const startedGettingJackpotDataForFirstTime = getState(
                'loggedInMode',
                'coinFlip',
                'startedGettingJackpotDataForFirstTime'
            );

            if( !startedGettingJackpotDataForFirstTime ) {

                setState(
                    [
                        'loggedInMode',
                        'coinFlip',
                        'startedGettingJackpotDataForFirstTime'
                    ],
                    true
                );

                new Promise( async () => {

                    try { 
                        
                        await actions.refreshJackpotData();

                        await delay({ timeout: 3000 });

                        setState(
                            [
                                'loggedInMode',
                                'coinFlip',
                                'hasGottenJackpotDataForFirstTime'
                            ],
                            true
                        );
                    }
                    catch( err ) {

                        console.log(
                            'an error occurred in loading jackpot data:',
                            err
                        );
                    }
                });
            }
        }

    }, [ freeGameMode ] );

    const styles = getStyles();

    return e(
        Paper,
        {
            style: styles.outerContainer,
        },
        e(
            NintendoSwitch,
            {
                isJackpotMode
            }
        ),
        e(
            JackpotAmountDisplay,
            {
                isJackpotMode,
                freeGameMode,
            }
        )
    );
};
