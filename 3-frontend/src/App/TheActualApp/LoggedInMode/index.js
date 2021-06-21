import { createElement as e, useEffect } from 'react';
import { getState } from '../../reduxX';
// import getUserData from './componentDidMount/getUserData';
import componentDidMount from './componentDidMount';
import Drawer from './Drawer';
import {
    TitlePolygon,
    UserDataPolygon,
    LoadingPage,
    DeleteUserButton,
    ExchangePolygon,
    MoneyActionsPolygon,
    ReferralIdPolygon,
} from '../../TheSource';
import {
    DestinyRafflePolygon,
    CoinExperiencePolygon,
    SlotPolygon
} from '../../TheEnchantedSource';
import WithdrawsPage from './WithdrawsPage';
import { story } from '../../constants';
import Box from '@material-ui/core/Box';


const getStyles = () => {
    
    const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: mainStyleObject.backgroundColor,
            width: '100%',
            // height: 200,

            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: 'white',
        },
    };
};


export default () => {

    useEffect( () => {

        componentDidMount();

    }, [] );

    const styles = getStyles();

    const createElementArguments = [
        Box,
        {
            style: styles.outerContainer,
        }
    ];

    const userData = getState( 'loggedInMode', 'userData' );

    if( !!userData ) {

        const mode = getState( 'loggedInMode', 'mode' );

        createElementArguments.push(
            
            e( Drawer ),
        );

        if( mode === story.LoggedInMode.modes.exchange ) {

            createElementArguments.push(
                e( TitlePolygon ),
                e( ExchangePolygon )
            );
        }
        // else if( mode === story.LoggedInMode.modes.vote ) {

        //     createElementArguments.push(
        //         e( TitlePolygon ),
        //         e( votePolygons.UsaElectionPolygon ),
        //     );
        // }
        else if( mode === story.LoggedInMode.modes.coinFlip ) {

            createElementArguments.push(
                e(
                    TitlePolygon,
                    {
                        backgroundColor: 'lightgreen',
                    }
                ),
                e( CoinExperiencePolygon ),
            );
        }
        else if( mode === story.LoggedInMode.modes.slot ) {

            createElementArguments.push(
                e(
                    TitlePolygon,
                    {
                        backgroundColor: '#FFCC66',
                    }
                ),
                e( SlotPolygon )
            );
        }
        else if( mode === story.LoggedInMode.modes.destinyRaffle ) {

            createElementArguments.push(
                e(
                    TitlePolygon,
                    {
                        // backgroundColor: 'lightgreen',
                    }
                ),
                e( DestinyRafflePolygon ),
            );
        }
        else if( mode === story.LoggedInMode.modes.withdraw ) {

            createElementArguments.push(
                e( TitlePolygon ),
                e( WithdrawsPage )
            );
        }
        else if( mode === story.LoggedInMode.modes.settings ) {

            createElementArguments.push(
                
                e( TitlePolygon ),
                e( DeleteUserButton )
            );
        }
        else {

            createElementArguments.push(

                e( TitlePolygon ),
                e( UserDataPolygon ),
                e( MoneyActionsPolygon ),
                e( ReferralIdPolygon )
                // e( ExchangePolygon ),
                // e( SignOutButton ),
            );
        }
    }
    else {

        createElementArguments.push(
            
            e( LoadingPage )
        );
    }

    return e( ...createElementArguments );
};
