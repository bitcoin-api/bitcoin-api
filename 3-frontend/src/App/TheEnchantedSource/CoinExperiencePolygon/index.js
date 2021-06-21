import { createElement as e, useEffect, useState } from 'react';
import {
    usefulComponents,
} from '../../TheSource';
import {
    getState
} from '../../reduxX';
import { actions } from '../../utils';
import { pages, gameData, games } from '../../constants';
import TitleBox from './TitleBox';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ModeSection from './ModeSection';
import TheDinocoin from './TheDinocoin';
import CoinFlipCommandCenter from './CoinFlipCommandCenter';
const gameModes = gameData[ games.theDragonsTalisman ].modes;


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );
    
    return {

        metaContainer: {

            maxWidth: 620,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        outerContainer: {
            // backgroundColor: 'beige',
            backgroundColor: 'black',
            // maxWidth: 620,
            width: '100%',
            marginTop: 20,
            // height: 300,
            // borderRadius: '50%',
            // backgroundColor: 'pink',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        dataBar: {
            maxWidth: 320,
            width: '100%',

            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },


        divider: {

            backgroundColor: 'black',
            width: '100%'
        }
    };
};


export default ({

    freeGameMode = false,
    // lotusDreamsMode = false,

}) => {

    const [ noDinoCoin, setNoDinoCoin ] = useState( false );

    useEffect( () => {

        actions.scroll();
        actions.setLastVisitedPage({

            loggedInMode: true,
            page: pages.loggedInMode.coinFlip,
        });

    }, [] );

    const styles = getStyles();

    // const subtitleText = 'Coin Toss Game';

    const coinFlipMode = getState(
        'loggedInMode',
        'coinFlip',
        'mode'
    );

    const isJackpotMode = coinFlipMode === gameModes.jackpot;

    return e(
        Box,
        {
            style: styles.metaContainer,
        },
        e(
            Paper,
            {
                style: styles.outerContainer,
            },
            e(
                TitleBox,
                {
                    noDinoCoin,
                    setNoDinoCoin
                }
            ),
            e(
                Divider,
                {
                    style: styles.divider
                }
            ),
            noDinoCoin ? e(
                Box,
                {
                    style: {
                        height: 30,
                        width: 20,
                    }                    
                }
            ) : e( TheDinocoin ),
            e(
                Box,
                {
                    style: styles.dataBar,
                },
                e(
                    ModeSection,
                    {
                        freeGameMode,
                        isJackpotMode,
                    }    
                ),
                e(
                    usefulComponents.crypto.CurrentAmount,
                    {
                        backgroundColor: 'lightGreen',
                        // color: 'white',
                        fontWeight: 'normal',
                        // height: 35,
                        height: 85,
                        // width: '40%',
                        freeGameMode,
                        borderRadius: 5,
                        balanceFontSize: 16,
                        // width: '90%',
                        maxWidth: 140,
                        // noTitleText: true,
                        textVersion: 'c',
                    }
                )
            ),
            e(
                CoinFlipCommandCenter,
                {
                    freeGameMode,
                    isJackpotMode,
                }
            )
        )
    );
};
