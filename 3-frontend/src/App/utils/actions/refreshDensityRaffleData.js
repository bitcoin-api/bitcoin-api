import { getState, setState } from '../../reduxX';
import { bitcoinExchange } from '..';


export default async ({

    setToLoading = true,

} = { setToLoading: true }) => {

    try {
        
        if( setToLoading ) {

            setState( 'isLoading', true );
        }

        const userId = getState( 'auth', 'userId' );
        const loginToken = getState( 'auth', 'loginToken' );
    
        const {
            raffleData,
            lastValues: {
                lastKey,
                lastTime,
            },
            ownSpecialId,
        } = await bitcoinExchange.getRaffleData({
    
            userId,
            loginToken
        });

        setState(
            [
                'destinyRaffle',
                'data'
            ],
            raffleData,
            [
                'destinyRaffle',
                'selectedNumberOne'
            ],
            '',
            [
                'destinyRaffle',
                'selectedNumberTwo'
            ],
            '',
            [
                'destinyRaffle',
                'lastKey'
            ],
            lastKey,
            [
                'destinyRaffle',
                'lastTime'
            ],
            lastTime,
            [
                'destinyRaffle',
                'ownSpecialId'
            ],
            ownSpecialId
        );

        if( setToLoading ) {

            setState( 'isLoading', false );
        }
    }
    catch( err ) {

        console.log( 'error in getting raffle data:', err );

        if( setToLoading ) {

            setState( 'isLoading', false );
        }

        throw err;
    }
};