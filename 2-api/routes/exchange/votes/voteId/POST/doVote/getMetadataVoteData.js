'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );


module.exports = Object.freeze( ({
// module.exports = Object.freeze( async ({

    voteId,
    
}) => {

    console.log(
        
        'running getMetadataVoteData with ' +
        `the following values - ${ stringify({
            voteId,
        }) }`
    );

    const metadataVoteData = {

        choices: [ 'trump', 'biden' ],
        votingEndTime: Date.now() + (6 * 60 * 1000),
    };

    console.log(
        `getMetadataVoteData executed successfully - returning values ${
            stringify( metadataVoteData )
        }`
    );

    return metadataVoteData;
});
