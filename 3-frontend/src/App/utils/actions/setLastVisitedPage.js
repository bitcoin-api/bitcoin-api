// import { pages } from '../../constants';

export default ({

    loggedInMode = false,
    page,

} = { loggedInMode: false }) => {

    if( loggedInMode ) {

        localStorage.setItem( 'loggedInModeLastVisitedPage', page );
    }
    else {

        localStorage.setItem( 'notLoggedInModeLastVisitedPage', page );
    }
};