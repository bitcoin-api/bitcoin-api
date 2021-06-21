import getUserData from './getUserData';
import setPage from './setPage';
import { actions } from '../../../utils';


export default () => {

    return Promise.resolve().then( async () => {

        try {

            setPage();
            await getUserData();
        }
        catch( err ) {
    
            console.log( 'error componentDidMount for LoggedInMode', err );
    
            actions.signOut();
        }
    });
};
