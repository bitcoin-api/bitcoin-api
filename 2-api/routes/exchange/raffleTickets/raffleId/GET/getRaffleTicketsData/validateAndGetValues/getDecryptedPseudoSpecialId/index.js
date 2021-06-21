'use strict';

const pseudoDecrypt = require( './pseudo' );


module.exports = ({

    rawSpecialId,
    
}) => {

    const psuedoOmega1 = pseudoDecrypt({

        text: rawSpecialId
    });

    return psuedoOmega1;
};
