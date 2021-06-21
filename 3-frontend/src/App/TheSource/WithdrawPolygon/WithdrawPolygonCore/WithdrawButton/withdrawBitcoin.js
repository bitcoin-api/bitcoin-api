import { setState, resetReduxX } from '../../../../reduxX';
import { bitcoinExchange, grecaptcha } from '../../../../utils';
import { google } from '../../../../constants';

export default async ({

    amount,
    address,
    userId,
    loginToken,
    fullWithdraw

}) => {

    try {

        setState( 'isLoading', true );

        const googleCode = await grecaptcha.safeGetGoogleCode({

            action: google.grecapcha.actions.withdraw,
        });

        if( !googleCode ) {
            // NOTE: safeguard
            return setState( 'isLoading', false );
        }

        await bitcoinExchange.withdraw({
 
            userId,
            amount,
            address,
            loginToken,
            fullWithdraw,
            googleCode
        });

        resetReduxX({

            listOfKeysToInclude: [
                [ 'withdrawPolygon', 'amount' ],
                [ 'withdrawPolygon', 'address' ],
                [ 'withdrawPolygon', 'fullWithdraw' ]
            ]
        });

        setState( 'isLoading', false );

        console.log( 'successfully withdrew bitcoin' );
    }
    catch( err ) {

        console.log( 'error in withdrawing bitcoin:', err );                     

        resetReduxX({

            listOfKeysToInclude: [
                [ 'withdrawPolygon', 'amount' ],
                [ 'withdrawPolygon', 'address' ]
            ]
        });

        setState( 'isLoading', false );

        alert(
            
            `error in withdraw: ${
                
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
