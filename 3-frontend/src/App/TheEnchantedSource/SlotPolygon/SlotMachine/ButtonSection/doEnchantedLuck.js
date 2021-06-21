import { getState, setState } from '../../../../reduxX';
import {
    bitcoinExchange,
    actions,
    // delay,
    dynastyBitcoin,
    grecaptcha,
    javascript
} from '../../../../utils';
import { google, gameData } from '../../../../constants';
// import { spinDinocoin } from './dinocoinActions';

const slotImageNamesLastIndex = gameData.slot.slotImageNames.length - 1; 
const minSlotNumber = 1; 
const maxSlotNumber = 3; 


const getSlotNumberImageIndices = () => {

    const slotNumberImageIndicesSet = new Set();

    while( slotNumberImageIndicesSet.size < 3 ) {

        slotNumberImageIndicesSet.add(
            javascript.getRandomIntInclusive( 0, slotImageNamesLastIndex )
        );
    }

    const slotNumberImageIndices = Array.from( slotNumberImageIndicesSet );

    return slotNumberImageIndices;
};


const doPaidGameAction = async () => {

    const userId = getState( 'auth', 'userId' );
    const loginToken = getState( 'auth', 'loginToken' );

    const googleCode = await grecaptcha.safeGetGoogleCode({

        action: google.grecapcha.actions.slotSpin,
    });

    return await bitcoinExchange.enchantedSlot({

        userId,
        loginToken,
        googleCode,
    }); 
};


const doFreeGameAction = () => {

    const slotNumber1 = javascript.getRandomIntInclusive(
        minSlotNumber,
        maxSlotNumber
    );

    const slotNumber2 = javascript.getRandomIntInclusive(
        minSlotNumber,
        maxSlotNumber
    );

    const slotNumber3 = javascript.getRandomIntInclusive(
        minSlotNumber,
        maxSlotNumber
    );

    const currentFreeGameModeBalance = getState(
        'notLoggedInMode',
        'freeGameModeBalance',
    );

    if(
        (
            slotNumber1 ===
            slotNumber2
        ) &&
        (
            slotNumber2 ===
            slotNumber3
        )
    ) {

        setState(
            [
                'notLoggedInMode',
                'freeGameModeBalance'
            ],
            dynastyBitcoin.getDynastyBitcoinAmount(
                currentFreeGameModeBalance + 0.0007
            )
        );
    }
    else if(
        !(
            (
                slotNumber1 !==
                slotNumber2
            ) &&
            (
                slotNumber2 !==
                slotNumber3
            ) &&
            (
                slotNumber1 !==
                slotNumber3
            )
        )
    ) {

        setState(
            [
                'notLoggedInMode',
                'freeGameModeBalance'
            ],
            dynastyBitcoin.getDynastyBitcoinAmount(
                currentFreeGameModeBalance - 0.0001
            )
        );
    }


    return {
        resultValues: {
            slotNumbers: [
                slotNumber1,
                slotNumber2,
                slotNumber3,
            ]
        }
    };
};


export default async ({

    freeGameMode,

}) => {

    setState( 'isLoading', true );

    try {

        const {

            // happyDream,
            // hasTied,
            resultValues,

        } = freeGameMode ? doFreeGameAction() : (

            await doPaidGameAction()
        );

        setState(
            {
                keys: [ 'isLoading' ],
                value: false,
            },
            {
                keys: [ 'loggedInMode', 'slot', 'slotNumber1' ],
                value: resultValues.slotNumbers[0],
            },
            {
                keys: [ 'loggedInMode', 'slot', 'slotNumber2' ],
                value: resultValues.slotNumbers[1],
            },
            {
                keys: [ 'loggedInMode', 'slot', 'slotNumber3' ],
                value: resultValues.slotNumbers[2],
            },
            {
                keys: [ 'loggedInMode', 'slot', 'slotNumberImageIndices' ],
                value: getSlotNumberImageIndices(),
            },
        );

        // await delay({ timeout: 1000 });

        if( !freeGameMode ) {

            await actions.refreshUserData({ setToLoading: false });
        }
    }
    catch( error ) {

        setState( 'isLoading', false );

        console.log( 'the error:', error );

        alert(
            
            `error in slot: ${
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
