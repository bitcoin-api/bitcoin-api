import { getState, setState } from '../../../reduxX';
import { bitcoinExchange } from '../../../utils';


export default async () => {

    const userId = getState( 'auth', 'userId' );
    const loginToken = getState( 'auth', 'loginToken' );
    
    const currentLastKey = getState( 'destinyRaffle', 'lastKey' );
    const currentLastTime = getState( 'destinyRaffle', 'lastTime' );

    if( !currentLastKey || !currentLastTime ) {
        // @safeguard
        return;
    }

    const {
        raffleData,
        lastValues: {
            lastKey,
            lastTime,
        },
    } = await bitcoinExchange.getRaffleData({

        userId,
        loginToken,
        lastKey: currentLastKey,
        lastTime: currentLastTime,
    });

    const currentData = getState( 'destinyRaffle', 'data' );

    const newData = currentData.concat( raffleData );

    setState(
        [
            'destinyRaffle',
            'data'
        ],
        newData,
        [
            'destinyRaffle',
            'lastKey'
        ],
        lastKey,
        [
            'destinyRaffle',
            'lastTime'
        ],
        lastTime
    );
};