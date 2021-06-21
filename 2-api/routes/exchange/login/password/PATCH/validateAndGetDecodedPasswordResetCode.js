'use strict';

const {

    stringify,
    throwStandardError,

} = require( '../../../../../utils' );

const {
    validation: {
        getIfPasswordResetCodeIsValid
    }
} = require( '../../../../../exchangeUtils' );


module.exports = Object.freeze( ({

    passwordResetCode,

}) => {

    console.log(
        
        'running validateAndGetDecodedPasswordResetCode ' +
        'with the following values:',
        stringify({
            passwordResetCode: passwordResetCode,
        })
    );

    const prcValidationResults = getIfPasswordResetCodeIsValid({

        passwordResetCode,
    });

    if( !prcValidationResults.isValid ) {

        return throwStandardError({

            logMessage: (
                'validateAndGetDecodedPasswordResetCode - ' +
                `Invalid password reset code: ${ passwordResetCode }`
            ),
            message: 'Invalid password reset link',
            statusCode: 400,
            bulltrue: true,
        });
    }

    const {

        exchangeUserId,
        expiryTime
        
    } = prcValidationResults.data;

    if( expiryTime <= Date.now() ) {

        return throwStandardError({

            message: 'Password reset link has expired',
            statusCode: 400,
            bulltrue: true,
        });
    }

    const decodedPasswordResetCode = {

        exchangeUserId
    };

    console.log(
        
        'validateAndGetDecodedPasswordResetCode executed successfully, ' +
        'returning the decoded password reset code values:',
        stringify( decodedPasswordResetCode )
    );

    return decodedPasswordResetCode;
});
