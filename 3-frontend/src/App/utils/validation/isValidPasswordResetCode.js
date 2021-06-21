const getBaseResults = ({

    isValid = false,
    data = null,

} = {

    isValid: false,
    data: null,

}) => ({

    isValid,
    data,
});


const getGetResultsOrThrowError = ({

    shouldThrowError

}) => ({

    message,

}) => {

    if( shouldThrowError ) {

        throw new Error( message );
    }

    return getBaseResults();
};


export default ({

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
            (splitPasswordResetCode[0] === 'prc') &&
            exchangeUserId.startsWith( 'exchange_user_' ) &&
            (exchangeUserId.length > 5) &&
            (exchangeUserId.length < 100) &&
            (coolCoolId.length > 5) &&
            (coolCoolId.length < 100) &&
            Number.isInteger( expiryTime ) &&
            (expiryTime > 69420) &&
            (expiryTime < 76129040221370)
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
};
