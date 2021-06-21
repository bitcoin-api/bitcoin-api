'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const validateAndGetValues = require( './validateAndGetValues' );
const getMostRecentVoteTransaction = require( '../../../../../../sacredElementals/probability/votes/getMostRecentVoteTransaction' );


module.exports = Object.freeze( async ({

    // event,
    exchangeUserId,
    rawVoteId,

}) => {

	console.log(

		'running getVote with the following values: ' +
		stringify({

			exchangeUserId,
			rawVoteId,
		})
	);

	const {

		voteId,

	} = validateAndGetValues({

		rawVoteId,
	});

	const mostRecentVoteTransaction = await getMostRecentVoteTransaction({

		exchangeUserId,
		voteId,
	});

	if( !mostRecentVoteTransaction ) {

		const results = {

			choice: null,
			voteType: null,
			amount: 0,
			metadata: {}
		};

		console.log(

			'getVote executed successfully - ' +
			`no vote info for vote "${ voteId }" - ` +
			`returning results ${ stringify( results ) }`
		);

		return results;
	}

	const results = {

		choice: mostRecentVoteTransaction.choice,
		voteType: mostRecentVoteTransaction.voteType,
		amount: Math.abs( mostRecentVoteTransaction.amount ),
		metadata: Object.assign(
			{
				time: mostRecentVoteTransaction.creationDate,
			},
			mostRecentVoteTransaction.metadata || {}
		),
	};

	console.log(

		'getVote executed successfully - ' +
		`got vote info for vote "${ voteId }" - ` +
		`returning results ${ stringify( results ) }`
	);

	return results;
});
