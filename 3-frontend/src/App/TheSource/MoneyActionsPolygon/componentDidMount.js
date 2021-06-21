import { getState, setState } from '../../reduxX';
import { bitcoinExchange } from '../../utils';


export default async () => {
    
    const moneyActions = getState(
        
        'transactionsPolygon',
        'moneyActions'
    );

    if( !!moneyActions ) {

        return;
    }

    const userId = getState( 'auth', 'userId' );
    const loginToken = getState( 'auth', 'loginToken' );

    const getTransactionsResults = await bitcoinExchange.getTransactions({

        userId,
        loginToken,
        smallBatch: true,
    });

    setState(
        [
            'transactionsPolygon',
            'moneyActions'
        ],
        getTransactionsResults.moneyActions,
        [
            'transactionsPolygon',
            'lastTransactionId'
        ],
        getTransactionsResults.lastTransactionId,
        [
            'transactionsPolygon',
            'lastTime'
        ],
        getTransactionsResults.lastTime
    );
};
