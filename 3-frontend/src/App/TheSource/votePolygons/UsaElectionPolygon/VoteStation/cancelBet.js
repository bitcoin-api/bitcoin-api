import { getState, setState, resetReduxX } from '../../../../reduxX';
import { bitcoinExchange, actions } from '../../../../utils';


export default async ({

    voteId,

}) => {

    setState( 'isLoading', true );

    try {

        const userId = getState( 'auth', 'userId' );
        const loginToken = getState( 'auth', 'loginToken' );
        
        await bitcoinExchange.vote({

            userId,
            loginToken,
            amount: 0,
            voteId,
            choice: null,
        });
        
        resetReduxX({
            listOfKeysToInclude: [
                [ 'presidentialVote2020', 'choiceInput' ],
                [ 'presidentialVote2020', 'amountInput' ],
                [ 'presidentialVote2020', 'currentAmount' ],
                [ 'presidentialVote2020', 'currentChoice' ],
                [ 'presidentialVote2020', 'currentVoteType' ],
                [ 'presidentialVote2020', 'currentMetadata' ],
            ]
        });

        await actions.refreshUserData({ setToLoading: false });

        setState( 'isLoading', false );
    }
    catch( error ) {

        setState( 'isLoading', false );

        console.log( 'the error:', error );

        alert(
            
            `error in cancelling bet: ${
                (
                    !!error &&
                    !!error.response &&
                    !!error.response.data &&
                    !!error.response.data.message &&
                    error.response.data.message

                ) || 'internal server error'
            }`
        );   
    }
};
