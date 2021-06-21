import { setState } from '../../../../reduxX';
import { bitcoinExchange, grecaptcha } from '../../../../utils';
import { google } from '../../../../constants';


export default async ({

    email,

}) => {

    const googleCode = await grecaptcha.safeGetGoogleCode({

        action: google.grecapcha.actions.resetPasswordInitialization,
    });

    const {
        
        passwordResetHasBeenSuccessfullyInitialized

    } = await bitcoinExchange.initializeResetPassword({

        email,
        googleCode,
    });

    if( passwordResetHasBeenSuccessfullyInitialized ) {

        return setState(
      
            [ 'forgotMyPasswordPolygon', 'successEmail' ],
            email,
            [ 'forgotMyPasswordPolygon', 'emailInput' ],
            '',
        );
    }

    throw new Error(
        
        'Password reset initialization was not successful. ' +
        'We apologize for any inconvenience, please contact ' +
        'support@dynastybitcoin.com if the issue persists, thank you.'
    );
};
