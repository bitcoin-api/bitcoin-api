'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );


const {
    validation: {
        getIfVoteIdIsValid
    }
} = require( '../../../../../../exchangeUtils' );


module.exports = Object.freeze( ({

    rawVoteId,
    
}) => {

    console.log(
        `running validateAndGetValues
            with the following values - ${ stringify({
                voteId: rawVoteId,
            })
        }`
    );

    const voteIdIsInvalid = !getIfVoteIdIsValid({
        
        voteId: rawVoteId,
    });
    
    if( voteIdIsInvalid ) {

    	console.log(
    		'validateAndGetValues - invalid voteId provided'
    	);

        const err = new Error( 'invalid voteId provided' );
        err.bulltrue = true;
        err.statusCode = 400;
        throw err;
    }

    const values = {

    	voteId: rawVoteId,
    };

    console.log(
        
        'validateAndGetValues executed successfully - got values: ' +
        stringify( values )
    );

    return values;
});
