import { getState, setState, resetReduxX } from '../../../reduxX';
import {
    bitcoinExchange,
    actions,
    // delay,
    dynastyBitcoin,
    grecaptcha
} from '../../../utils';
import { google, gameData, games } from '../../../constants';
import { spinDinocoin } from './dinocoinActions';

const getRandomIntInclusive = ( min, max ) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};


const doFreeGameAction = () => {

    const coinNumber = getRandomIntInclusive( 1, 4 );

    const won = (coinNumber > 1);

    const balance = getState( 'notLoggedInMode', 'freeGameModeBalance' );

    const chosenAmount = dynastyBitcoin.getDynastyBitcoinAmount(
        getState(
            'notLoggedInMode',
            'coinFlip',
            'selectedAmount'
        )
    );

    setState(
        [ 'notLoggedInMode', 'freeGameModeBalance' ], 
        dynastyBitcoin.getDynastyBitcoinAmount(
            balance + (won ? chosenAmount : -chosenAmount)
        )
    );

    return {

        happyDream: won
    };
};


const doPaidGameAction = async ({

    chosenAmount,

}) => {

    const userId = getState( 'auth', 'userId' );
    const loginToken = getState( 'auth', 'loginToken' );

    const coinFlipMode = getState(
        'loggedInMode',
        'coinFlip',
        'mode'
    );

    const gameModes = gameData[ games.theDragonsTalisman ].modes;

    const isJackpotMode = coinFlipMode === gameModes.jackpot;

    if( isJackpotMode ) {

        const googleCode = await grecaptcha.safeGetGoogleCode({

            action: google.grecapcha.actions.lotusCoinFlip,
        });

        return await bitcoinExchange.enchantedLuckJackpot({

            userId,
            loginToken,
            amount: chosenAmount,
            googleCode,
        });
    }

    const googleCode = await grecaptcha.safeGetGoogleCode({

        action: google.grecapcha.actions.coinFlip,
    });

    return await bitcoinExchange.enchantedLuck({

        userId,
        loginToken,
        amount: chosenAmount,
        googleCode,
    }); 
};


export default async ({

    freeGameMode,
    min,
    max,

}) => {

    // const amount = getState( 'coinExperiencePolygon', 'amount' );
    const mainStateMode = freeGameMode ? 'notLoggedInMode' : 'loggedInMode';

    const chosenAmount = dynastyBitcoin.getDynastyBitcoinAmount(
        getState(
            mainStateMode,
            'coinFlip',
            'selectedAmount'
        )
    );

    if(
        (chosenAmount < min) ||
        (chosenAmount > max)
    ) {

        return;
    }

    setState( 'isLoading', true );

    try {

        // beginningSpinDinocoin({

        //     action: 'win',
        // });

        const {

            happyDream

        } = freeGameMode ? (

            doFreeGameAction()

        ) : (await doPaidGameAction({

            chosenAmount,
        }));
        // ) : (await bitcoinExchange.enchantedLuck({

        //     userId,
        //     loginToken,
        //     amount: chosenAmount,
        //     // mode: enchantedLuck.modes.a,
        // }));

        // await delay({ timeout: 1000 });

        spinDinocoin({

            action: happyDream ? 'win' : 'lose',
        });

        if( !freeGameMode ) {

            await actions.refreshUserData({ setToLoading: false });
        }
        
        resetReduxX({
            listOfKeysToInclude: [
                [ 'isLoading' ],
                [ 'coinExperiencePolygon', 'amount' ],
            ]
        });
    }
    catch( error ) {

        setState( 'isLoading', false );

        console.log( 'the error:', error );

        alert(
            
            `error in doing exchange: ${
                (
                    !!error &&
                    !!error.response &&
                    !!error.response.data &&
                    !!error.response.data.message &&
                    error.response.data.message

                ) || 'internal server error'
            }`
        );   
    }
};
