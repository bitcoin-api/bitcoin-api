import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
// import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GameBox from './GameBox';
import { games } from '../../../../constants';
import { getState } from '../../../../reduxX';


const getStyles = () => {

    const windowWidth = getState( 'windowWidth' );

    return {

        outerContainer: {

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',

            width: '100%',
            maxWidth: 600,
            // height: 300,
            marginTop: 25,
            marginBottom: 25,
            // backgroundColor: 'green',
        },

        titleTextContainer: {

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',

            width: '100%',
            // maxWidth: 600,
            // height: 300,
            // backgroundColor: 'green',
        },

        titleText: {

            width: '100%',
            textAlign: 'center',
            fontSize: 22,
            marginTop: 22,
            // textDecoration: 'underline',

            // height: 300,
            // backgroundColor: 'green',
        },

        gameBoxGrid: (windowWidth > 650) ? {

            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',

        } : {

            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        gameBox: {

            width: 250,
            height: 250,
            backgroundColor: 'beige',
            marginTop: 20,
            marginBottom: 20,
            alignSelf: 'center'
        },
    };
};


export default () => {

    const styles = getStyles();

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            Box,
            {
                style: styles.titleTextContainer,
            },
            e(
                Typography,
                {
                    style: styles.titleText,
                },
                'Game Previews'
            )
        ),
        e(
            Box,
            {
                style: styles.gameBoxGrid,
            },
            e(
                GameBox,
                {
                    nameOfTheGame: 'Satoshi Slot',
                    // smallButtonText: true,
                    // noActionOnClick: true,
                    gameStateName: games.slot,
                    mainScreen: e(
                        Box,
                        {
                            style: {
                                borderRadius: 10,
                                width: 250,
                                height: 216,
                                backgroundColor: 'beige',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }
                        },
                        e(
                            Typography,
                            {
                                style: {
                                    // marginTop: 18,
                                    width: '100%',
                                    fontSize: 125,
                                    textAlign: 'center',
                                    userSelect: 'none',
                                }
                            },
                            '🎰'
                        )
                    )
                }
            ),
            e(
                GameBox,
                {
                    // nameOfTheGame: `The Dragon's Talisman`,
                    nameOfTheGame: `The Dragon's Talisman`,
                    gameStateName: games.theDragonsTalisman,
                    backgroundColor: 'green',
                    mainScreen: e(
                        Box,
                        {
                            style: {
                                borderRadius: 10,
                                width: 250,
                                height: 216,
                                backgroundColor: 'green',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }
                        },
                        e(
                            Box,
                            {
                                style: {
                                    width: 200,
                                    height: 200,
                                    borderRadius: '50%',
                                    backgroundColor: 'lightgreen',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }
                            },
                            e(
                                Typography,
                                {
                                    style: {
                                        marginTop: 18,
                                        width: '100%',
                                        fontSize: 125,
                                        textAlign: 'center',
                                        userSelect: 'none',
                                    }
                                },
                                '🐲'
                            )
                        )
                    )
                }
            )
        )
    );
};
