import { createElement as e, lazy, Suspense } from 'react';
import Box  from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { getState } from '../../../reduxX';
import { games } from '../../../constants';
import { actions } from '../../../utils';
import { TitlePolygon } from '../../../TheSource';
// const FreeDestinyRaffle = lazy(() => import('./freeGameModes/FreeDestinyRaffle'));
const CoinExperiencePolygon = lazy(() => import('../../../TheEnchantedSource/CoinExperiencePolygon'));
const SlotPolygon = lazy(() => import('../../../TheEnchantedSource/SlotPolygon'));
// import { CoinExperiencePolygon } from '../../../TheEnchantedSource/CoinExperiencePolygon';
// import { FreeDestinyRaffle } from './freeGameModes';

const getStyles = () => {
    
    return {

        outerContainer: {
            // backgroundColor: 'pink',
            width: '100%',
            maxWidth: 620,
            // height: 300,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: 'white',
        },

        menuButton: {

            marginRight: 10,
        }
    };
};


const getGameData = () => {

    const freeGame = getState( 'notLoggedInMode', 'freeGame' );

    switch( freeGame ) {
        
        case games.theDragonsTalisman: {

            return {
                
                titleBackgroundColor: 'lightgreen',
                game: e(
                    Suspense,
                    {
                        fallback: e( 'div' ),
                    },
                    e(
                        CoinExperiencePolygon,
                        {
                            freeGameMode: true,
                        }
                    )
                )
            };
        }

        case games.slot: {

            return {
                
                // titleBackgroundColor: ''
                game: e(
                    
                    Suspense,
                    {
                        fallback: e( 'div' ),
                    },
                    e(
                        SlotPolygon,
                        {
                            freeGameMode: true,
                        }
                    )
                ),
            };
            // return e(

            //     CoinExperiencePolygon,
            //     {
            //         freeGameMode: true,
            //     }
            // );
        }

        // case games.destinyRaffle: {

        //     return {
                
        //         // titleBackgroundColor: ''
        //         game: e(
                    
        //             Suspense,
        //             {
        //                 fallback: e( 'div' ),
        //             },
        //             e( FreeDestinyRaffle )
        //         ),
        //     };
        //     // return e(

        //     //     CoinExperiencePolygon,
        //     //     {
        //     //         freeGameMode: true,
        //     //     }
        //     // );
        // }
        
        default: {

            return null;
        }
    }
};


export default () => {

    const styles = getStyles();

    // const isLoading = getState( 'isLoading' );

    const {
        
        titleBackgroundColor,
        game,

    } = getGameData();
    
    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            TitlePolygon,
            {
                backgroundColor: titleBackgroundColor,
                customButton: e(
                    Button,
                    {
                        style: styles.menuButton,
                        onClick: () => {
        
                            actions.goToHomePage();
                            // setState(
                            //     [
                            //         'notLoggedInMode',
                            //         'freeGame'
                            //     ],
                            //     null
                            // );
                        },
                    },
                    e(
                        Typography,
                        {
                            style: styles.menuButtonText,
                        },
                        'Home'
                    )
                )
            }    
        ),
        game
    );
};
