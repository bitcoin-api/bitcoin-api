'use strict';

const { passwordResetCode: { prc } } = require( '../constants' );
const getIfExchangeUserIdIsValid = require( './getIfExchangeUserIdIsValid' );
const getIfTimeIsValid = require( '../../utils/validation/getIfTimeIsValid' );
const getIfCoolCoolIdIsValid = require( '../../utils/validation/getIfCoolCoolIdIsValid' );


const getBaseResults = Object.freeze(({

    isValid = false,
    data = null,

} = {

    isValid: false,
    data: null,

}) => ({

    isValid,
    data,
}));


const getGetResultsOrThrowError = Object.freeze(({

    shouldThrowError

}) => ({

    message,

}) => {

    if( shouldThrowError ) {

        throw new Error( message );
    }

    return getBaseResults();
});


module.exports = Object.freeze( ({

    passwordResetCode,
    shouldThrowError = false,

}) => {

    const getResultsOrThrowError = getGetResultsOrThrowError({

        shouldThrowError
    });

    if( !passwordResetCode ) {

        return getResultsOrThrowError({

            message: 'missing password reset code',
        });
    }

    if( typeof passwordResetCode !== 'string' ) {

        return getResultsOrThrowError({

            message: 'invalid password reset code - is not string',
        });
    }

    const splitPasswordResetCode = passwordResetCode.split( '-' );

    if( splitPasswordResetCode.length !== 4 ) {

        return getResultsOrThrowError({

            message: 'invalid password reset code',
        });
    }

    const exchangeUserId = splitPasswordResetCode[1];
    const coolCoolId = splitPasswordResetCode[2];
    const expiryTime = Number( splitPasswordResetCode[3] );

    if(
        !(
            (splitPasswordResetCode[0] === prc) &&
            getIfExchangeUserIdIsValid({ exchangeUserId }) &&
            getIfCoolCoolIdIsValid({ coolCoolId }) &&
            getIfTimeIsValid({ time: expiryTime })
        )
    ) {

        return getResultsOrThrowError({

            message: 'invalid password reset code',
        });
    }

    return getBaseResults({
        isValid: true,
        data: {

            exchangeUserId,
            expiryTime
        }
    });
});
