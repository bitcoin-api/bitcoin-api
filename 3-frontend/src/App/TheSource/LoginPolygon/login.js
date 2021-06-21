import { setState } from '../../reduxX';
import { bitcoinExchange, actions, grecaptcha } from '../../utils';
import { google, isLivenetMode } from '../../constants';


export default async ({

    emailInput,
    passwordInput,

}) => {

    try {

        setState( 'isLoading', true );

        const googleCode = await grecaptcha.safeGetGoogleCode({

            action: google.grecapcha.actions.login,
        });

        if( isLivenetMode && !googleCode ) {
            // NOTE: safeguard
            return setState( 'isLoading', false );
        }

        const {

            userId,
            loginToken,

        } = await bitcoinExchange.login({

            email: emailInput,
            password: passwordInput,
            googleCode,
        });

        actions.login({
            userId,
            loginToken,
        });

        setState( 'isLoading', false );
    }
    catch( err ) {


        setState(
            {
                keys: [ 'isLoading' ],
                value: false,
            },
            // {
            //     keys: [ 'loginPolygon', 'emailInput' ],
            //     value: ''
            // },
            {
                keys: [ 'loginPolygon', 'passwordInput' ],
                value: ''
            },
        );

        console.log( 'the error:', err );

        alert(
            
            `error in logging in: ${
                
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
