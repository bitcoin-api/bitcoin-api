import { actions } from '../utils';
import { getState, setState } from '../reduxX';


export default () => {

    window.history.pushState(
        {
            key: 'exchange'
        },
        'exchange'
    );

    window.onpopstate = () => {

        const freeGameMode = !!getState( 'notLoggedInMode', 'freeGame' );

        if( freeGameMode ) {
    
            setState(
                [ 'notLoggedInMode', 'freeGame' ],
                null
            );

            return;
        }
        
        const isOnRestPage = actions.getIsOnRestPage();

        if( !isOnRestPage ) {

            window.location = '/';
        }
        else {
            
            window.history.back();
        }
    };
};
