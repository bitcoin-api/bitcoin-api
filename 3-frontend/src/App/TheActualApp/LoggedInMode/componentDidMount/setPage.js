import { pages, story } from '../../../constants';
import { setState } from '../../../reduxX';


export default () => {

    const currentSetPage = localStorage.getItem(
        'loggedInModeLastVisitedPage'
    );

    switch( currentSetPage ) {
        case pages.loggedInMode.base: {

            setState(
                [ 'loggedInMode', 'mode' ],
                story.LoggedInMode.modes.base
            );
            break;
        }
        case pages.loggedInMode.exchange: {

            setState(
                [ 'loggedInMode', 'mode' ],
                story.LoggedInMode.modes.exchange
            );
            break;
        }
        case pages.loggedInMode.destinyRaffle: {

            setState(
                [ 'loggedInMode', 'mode' ],
                story.LoggedInMode.modes.destinyRaffle
            );
            break;
        }
        case pages.loggedInMode.withdraw: {

            setState(
                [ 'loggedInMode', 'mode' ],
                story.LoggedInMode.modes.withdraw
            );
            break;
        }
        case pages.loggedInMode.coinFlip: {

            setState(
                [ 'loggedInMode', 'mode' ],
                story.LoggedInMode.modes.coinFlip
            );
            break;
        }
        case pages.loggedInMode.slot: {

            setState(
                [ 'loggedInMode', 'mode' ],
                story.LoggedInMode.modes.slot
            );
            break;
        }
        default: {
            break;
        }
    }
};
