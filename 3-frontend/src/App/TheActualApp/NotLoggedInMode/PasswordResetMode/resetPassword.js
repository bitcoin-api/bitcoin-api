import { setState, getState } from '../../../reduxX';
import {
    bitcoinExchange,
    grecaptcha,
    actions,
    throwApiStyleError,
} from '../../../utils';
import { google } from '../../../constants';


export default async () => {

    const googleCode = await grecaptcha.safeGetGoogleCode({

        action: google.grecapcha.actions.resetPasswordDo,
    });

    const passwordResetCode = getState(
        'notLoggedInMode', 'passwordReset',
        'passwordResetCode'
    );

    const {
        
        expiryTime
        
    } = actions.passwordReset.getDecodedPasswordResetCode({

        passwordResetCode,
    });

    if( Date.now() > expiryTime ) {
        return throwApiStyleError({
            message: 'password reset link expired',
        });
    }

    const newPassword = getState(

        'notLoggedInMode',
        'passwordReset',
        'passwordInput'
    );

    const {
        
        userId,
        loginToken

    } = await bitcoinExchange.resetPasswordDo({

        passwordResetCode,
        newPassword,
        googleCode,
    });

    actions.login({
        userId,
        loginToken,
    });

    setState(

        [
            'notLoggedInMode', 'passwordReset',
            'email'
        ],
        '',
        [
            'notLoggedInMode', 'passwordReset',
            'passwordInput'
        ],
        '',
        [
            'notLoggedInMode', 'passwordReset',
            'repeatPasswordInput'
        ],
        '',
        [
            'notLoggedInMode', 'passwordReset',
            'passwordResetCode'
        ],
        null
    );
};
