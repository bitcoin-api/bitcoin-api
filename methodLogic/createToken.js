'use strict';

const {
    log,
} = require( '../utils' );


module.exports = Object.freeze( async ({

    createTokenApiCall

}) => {

    log( 'running createToken' );

    const createTokenResults = await createTokenApiCall();

    log(
        'createToken executed successfully - ' +
        `got token of length ${ createTokenResults.token.length }`
    );

    return createTokenResults;
});
