import { getState, setState } from '../../../reduxX';
import { bitcoinExchange } from '../../../utils';


export default async ({ voteId }) => {

    setState( 'isLoading', true );

    try {

        const userId = getState( 'auth', 'userId' );
        const loginToken = getState( 'auth', 'loginToken' );

		const voteResults = await bitcoinExchange.getVote({

	        userId,
	        loginToken,
	        voteId,
		});
		
	    setState(
			[ 'presidentialVote2020', 'currentChoice' ],
			voteResults.choice,
			[ 'presidentialVote2020', 'currentVoteType' ],
			voteResults.voteType,
			[ 'presidentialVote2020', 'currentAmount' ],
			voteResults.amount,
			[ 'presidentialVote2020', 'currentMetadata' ],
			voteResults.metadata,
			[ 'isLoading' ],
			false
		);
	}
	catch( err ) {

		setState(
			[ 'presidentialVote2020', 'localError' ],
			true,
			[ 'isLoading' ],
			false
		);
	}
};
