import { getState, setState } from '../../reduxX';
import bitcoinExchange from '../bitcoinExchangeInstance';


export default async () => {

    const userId = getState( 'auth', 'userId' );
    const loginToken = getState( 'auth', 'loginToken' );

    try {

        const jackpotData = await bitcoinExchange.getJackpotData({

            userId,
            loginToken,
        });

        setState({
            keys: [
                'loggedInMode',
                'coinFlip',
                'jackpotAmount'
            ],
            value: jackpotData.jackpotAmount,
        });
    }
    catch( err ) {

        console.log( 'error getting jackpot data', err );
    }
};
