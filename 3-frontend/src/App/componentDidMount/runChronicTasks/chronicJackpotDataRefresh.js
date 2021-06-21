import { getState } from '../../reduxX';
import { actions } from '../../utils';
import { story, gameData, games } from '../../constants';



export default async () => {

    if(
        actions.getIsLoggedIn() &&
        getState(
            'loggedInMode',
            'coinFlip',
            'hasGottenJackpotDataForFirstTime'
        ) &&
        (
            getState( 'loggedInMode', 'mode' ) ===
            story.LoggedInMode.modes.coinFlip
        ) &&
        (
            getState( 'loggedInMode', 'coinFlip', 'mode' ) ===
            gameData[ games.theDragonsTalisman ].modes.jackpot
        )
    ) {

        await actions.refreshJackpotData();
    }
};
