'use strict';

const pseudoEncrypt = require( './pseudo' );


module.exports = ({

    exchangeUserId,
    
}) => {

    const psuedoOmega1 = pseudoEncrypt({

        text: exchangeUserId
    });

    return psuedoOmega1;
};
