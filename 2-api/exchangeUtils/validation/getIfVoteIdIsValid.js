'use strict';


module.exports = Object.freeze( ({

    voteId,

}) => {

    const voteIdIsValid = (

        !!voteId &&
        (typeof voteId === 'string') &&
        (voteId.length >= 2) &&
        (voteId.length <= 100) &&
        (voteId !== 'undefined') &&
        (voteId !== 'null')
    );

    return voteIdIsValid;
});