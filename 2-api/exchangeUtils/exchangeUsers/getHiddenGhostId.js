'use strict';

const constants = require( '../constants' );
const getHashedValue = require( '../../utils/javascript/getHashedValue' );


module.exports = Object.freeze( ({

    exchangeUserId,
    
}) => {

    const hiddenGhostId = getHashedValue(
        exchangeUserId.substring( 
            constants.exchangeUsers.exchangeUserId.prefix.length
        )
    );

    return hiddenGhostId;
});
