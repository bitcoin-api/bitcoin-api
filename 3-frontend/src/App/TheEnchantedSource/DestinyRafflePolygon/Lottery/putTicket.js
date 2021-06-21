import { bitcoinExchange, actions } from '../../../utils';
import { getState } from '../../../reduxX';

export default async ({

    raffleId,
    numbers,
    action,
    googleCode,

}) => {

    const userId = getState( 'auth', 'userId' );
    const loginToken = getState( 'auth', 'loginToken' );

    await bitcoinExchange.postRaffleTicket({

        userId,
        loginToken,
        raffleId,
        numbers,
        action,
        googleCode
    });

    await Promise.all([
        
        actions.refreshUserData({ setToLoading: false }),
        actions.refreshDensityRaffleData({ setToLoading: false }),
        actions.refreshes.refreshRaffleTickets({ raffleId })
    ]);
};