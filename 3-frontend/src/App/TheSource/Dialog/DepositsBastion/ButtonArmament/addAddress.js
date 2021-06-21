import { getState } from '../../../../reduxX';
import {
    bitcoinExchange,
    grecaptcha,
    actions,
    throwApiStyleError,
} from '../../../../utils';
import { google } from '../../../../constants';


export default async () => {

    const googleCode = await grecaptcha.safeGetGoogleCode({

        action: google.grecapcha.actions.addAddress,
    });

    const userId = getState( 'auth', 'userId' );
    const loginToken = getState( 'auth', 'loginToken' );

    const {
        
        addressPostOperationSuccessful

    } = await bitcoinExchange.addAddress({

        userId,
        loginToken,
        googleCode
    });

    if( !addressPostOperationSuccessful ) {

        return throwApiStyleError({

            message: 'error in adding address'
        });
    }

    await actions.refreshUserData({ setToLoading: false });
};
