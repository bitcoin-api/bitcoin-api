import { createElement as e } from 'react';
import { getState, setState } from '../../../../../reduxX';
import { bitcoinExchange/*, delay*/ } from '../../../../../utils';
// import {
//     usefulComponents,
//     // POWBlock,
// } from '../../TheSource';
// import DayBox from './DayBox';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { getViewDrawsContainerId } from './viewDrawsTools';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        buttonsContainer: {

            backgroundColor: '#D0D2A8',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',

            marginBottom: 15,
        },

        button: {

            // color: 'black',
        },
    };
};


const handleClickOnRightButtonLoadNewDraws = async ({

    raffleId,
    lastTime,
    index,
    lastKey,
    startTime,
    endTime
    // setIsLocalLoading,

}) => {

    const userId = getState( 'auth', 'userId' );
    const loginToken = getState( 'auth', 'loginToken' );

    const {

        draws,
        pageInfo

    } = await bitcoinExchange.getRaffleDraws({

        userId,
        loginToken,
        raffleId,
        lastTime,
        lastKey,
        startTime,
        endTime
    });

    const raffleIdToDrawData = getState(
    
        'destinyRaffle',
        'raffleIdToDrawData'
    );

    const newAllDraws = raffleIdToDrawData[ raffleId ].allDraws.slice();

    newAllDraws.push( draws );

    const newRaffleIdToDrawData = Object.assign(

        {},
        raffleIdToDrawData,
        {
            [raffleId]: {

                allDraws: newAllDraws,
                index: index + 1,
                startTime,
                endTime,               
            }
        }
    );

    if( !!pageInfo ) {

        Object.assign(

            newRaffleIdToDrawData[ raffleId ],
            {
                lastTime: pageInfo.lastTime,
                lastKey: pageInfo.lastKey,
            }
        );
    }

    setState(

        [ 'destinyRaffle', 'raffleIdToDrawData' ],
        newRaffleIdToDrawData
    );
};


const scrollUpViewDrawsBox = ({ raffleId }) => {

    const viewDrawsBox = document.getElementById(
        getViewDrawsContainerId({ raffleId })
    );

    if( !!viewDrawsBox ) {

        viewDrawsBox.scrollTop = 0;
    }
};


const getIfRightButtonIsDisabled = ({

    allDraws,
    index,
    isLocalLoading,
    lastTime,
    lastKey,

}) => {

    if( isLocalLoading ) {

        return true;
    }

    if(
        (index === (allDraws.length - 1)) &&
        (!lastTime || !lastKey)
    ) {

        return true;
    }

    return false;
};


export default ({

    raffleDatum,
    isLocalLoading,
    setIsLocalLoading,

}) => {

    const styles = getStyles();

    const { raffleId } = raffleDatum;

    const drawData = getState(
        
        'destinyRaffle',
        'raffleIdToDrawData'

    )[ raffleId ] || {

        allDraws: [ [] ],
        lastTime: null,
        index: 0,
        startTime: 22,
        endTime: Date.now(),
    };

    const {

        index,
        allDraws,
        lastTime,
        lastKey,
        startTime,
        endTime,

    } = drawData;

    const leftButtonIsDisabled = (

        isLocalLoading ||
        (index === 0)
    );

    const rightButtonIsDisabled = getIfRightButtonIsDisabled({

        allDraws,
        index,
        isLocalLoading,
        lastTime,
        lastKey,
    });

    return e(
        Box,
        {
            style: styles.buttonsContainer,
        },
        e(
            Button,
            {
                disabled: leftButtonIsDisabled,
                style: styles.button,
                onClick: () => {

                    const raffleIdToDrawData = getState(

                        'destinyRaffle',
                        'raffleIdToDrawData'
                    );
                
                    const newRaffleIdToDrawData = Object.assign(
                        {},
                        raffleIdToDrawData,
                        {
                            [raffleId]: Object.assign(
                                {},
                                raffleIdToDrawData[ raffleId ],
                                {
                                    index: index - 1,
                                }                   
                            )
                        }
                    );
                
                    setState(
                
                        [ 'destinyRaffle', 'raffleIdToDrawData' ],
                        newRaffleIdToDrawData
                    );

                    scrollUpViewDrawsBox({ raffleId });
                },
            },
            '<'
        ),
        e(
            Button,
            {
                style: styles.button,
                disabled: rightButtonIsDisabled,
                onClick: async () => {

                    try {
                        
                        const newIndex = index + 1;

                        if( !!allDraws[ newIndex ] ) {

                            const raffleIdToDrawData = getState(
    
                                'destinyRaffle',
                                'raffleIdToDrawData'
                            );
                        
                            const newRaffleIdToDrawData = Object.assign(
                                {},
                                raffleIdToDrawData,
                                {
                                    [raffleId]: Object.assign(
                                        {},
                                        raffleIdToDrawData[ raffleId ],
                                        {
                                            index: newIndex,
                                        }                   
                                    )
                                }
                            );
                        
                            setState(
                        
                                [ 'destinyRaffle', 'raffleIdToDrawData' ],
                                newRaffleIdToDrawData
                            );

                            scrollUpViewDrawsBox({ raffleId });

                            return;
                        }
                                             
                        setIsLocalLoading( true );
                    
                        // await delay({ timeout: 2000 });

                        await handleClickOnRightButtonLoadNewDraws({

                            raffleId,
                            lastTime,
                            index,
                            lastKey,
                            startTime,
                            endTime,
                        });

                        scrollUpViewDrawsBox({ raffleId });

                        setIsLocalLoading( false );
                    }
                    catch( err ) {

                        setIsLocalLoading( true );
                        
                        console.log( 'error in loading draws:', err );
                    }
                },
            },
            '>'
        )
    );
};
