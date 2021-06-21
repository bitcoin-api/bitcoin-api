import { setState } from '../../reduxX';
import { bitcoinExchange, actions, grecaptcha } from '../../utils';
import { google } from '../../constants';


export default async ({

    emailInput,
    passwordInput,
    verifyEmailCodeInput

}) => {

    try {

        setState( 'isLoading', true );

        const googleCode = await grecaptcha.safeGetGoogleCode({

            action: google.grecapcha.actions.verifyUser,
        });

        if( !googleCode ) {

            setState( 'isLoading', false );

            return;
        }

        const {

            loginToken,
            userId

        } = await bitcoinExchange.verifyEmail({

            email: emailInput,
            password: passwordInput,
            verifyEmailCode: verifyEmailCodeInput,
            googleCode,
        });

        actions.login({

            userId,
            loginToken,
        });

        setState( 'isLoading', false );
    }
    catch( err ) {

        setState( 'isLoading', false );

        console.log( 'the error:', Object.keys( err ) );

        alert(
            
            `error in verifying email: ${
                (
                    !!err &&
                    !!err.response &&
                    !!err.response.data &&
                    !!err.response.data.message &&
                    err.response.data.message

                ) || 'internal server error'
            }`
        );                        
    }
};
