import {
    createElement as e,
    useEffect,
    // useState
} from 'react';
import {
    usefulComponents,
} from '../../TheSource';
// import {
//     getState
// } from '../../reduxX';
import { actions } from '../../utils';
import {
    pages,
    // gameData,
    // games
} from '../../constants';
import TitleBox from './TitleBox';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import SlotMachine from './SlotMachine';
// const gameModes = gameData[ games.theDragonsTalisman ].modes;


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
            marginTop: 20,
            // maxWidth: 320,
            width: '90%',

            display: 'flex',
            flexDirection: 'row',
            // justifyContent: 'space-around',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
    };
};


export default ({

    freeGameMode = false,
    // lotusDreamsMode = false,

}) => {

    useEffect( () => {

        actions.scroll();
        actions.setLastVisitedPage({

            loggedInMode: true,
            page: pages.loggedInMode.slot,
        });

    }, [] );

    const styles = getStyles();

    // const subtitleText = 'Coin Toss Game';

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
            e( TitleBox ),
            e(
                Box,
                {
                    style: styles.dataBar,
                },
                e(
                    usefulComponents.crypto.CurrentAmount,
                    {
                        freeGameMode,
                        // backgroundColor: 'lightGreen',
                        backgroundColor: '#FFCC66',   // color: 'white',
                        fontWeight: 'normal',
                        // height: 35,
                        height: 25,
                        width: 169,
                        borderRadius: 5,
                        balanceFontSize: 16,
                        // width: '90%',
                        // maxWidth: 140,
                        noTitleText: true,
                        textVersion: 'c',
                    }
                )
            ),
            e(
                SlotMachine,
                {
                    freeGameMode,
                }
            )
        )
    );
};
