import { getState, setState } from '../../../../reduxX';
import { bitcoinExchange } from '../../../../utils';


export default async () => {
    
    const userId = getState( 'auth', 'userId' );
    const loginToken = getState( 'auth', 'loginToken' );
    const lastTransactionId = getState(

        'transactionsPolygon',
        'lastTransactionId'
    );
    const lastTime = getState(

        'transactionsPolygon',
        'lastTime'
    );

    const getTransactionsResults = await bitcoinExchange.getTransactions({

        userId,
        loginToken,
        lastTransactionId,
        lastTime,
    });

    const existingMoneyActions = getState(
        [
            'transactionsPolygon',
            'moneyActions'
        ]
    );

    setState(
        [
            'transactionsPolygon',
            'moneyActions'
        ],
        existingMoneyActions.concat(
            getTransactionsResults.moneyActions
        ),
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
