import { getState, setState, resetReduxX } from '../../reduxX';
import { bitcoinExchange, actions, grecaptcha } from '../../utils';
import { google } from '../../constants';


export default async () => {

    const googleCode = await grecaptcha.safeGetGoogleCode({

        action: google.grecapcha.actions.exchange,
    });

    if( !googleCode ) {

        console.log( 'unable to get google code' );

        return;
    }

    const amountWantedInCryptos = getState( 'exchangePolygon', 'amountWantedInCryptos' );

    if( amountWantedInCryptos ) {

        setState( 'isLoading', true );

        try {

            const userId = getState( 'auth', 'userId' );
            const loginToken = getState( 'auth', 'loginToken' );

            await bitcoinExchange.exchange({

                userId,
                loginToken,
                amountWantedInCryptos,
                googleCode
            });

            await actions.refreshUserData({ setToLoading: false });
            
            resetReduxX({
                listOfKeysToInclude: [
                    [ 'isLoading' ],
                    [ 'exchangePolygon', 'amountWantedInBitcoin' ],
                    [ 'exchangePolygon', 'amountWantedInCryptos' ],
                ]
            });
        }
        catch( error ) {

            setState( 'isLoading', false );

            console.log( 'the error:', error );

            alert(
                
                `error in doing exchange: ${
                    (
                        !!error &&
                        !!error.response &&
                        !!error.response.data &&
                        !!error.response.data.message &&
                        error.response.data.message

                    ) || 'internal server error'
                }`
            );   
        }
    }

    const amountWantedInBitcoin = getState( 'exchangePolygon', 'amountWantedInBitcoin' );

    if( !!amountWantedInBitcoin ) {

        setState( 'isLoading', true );

        try {

            const userId = getState( 'auth', 'userId' );
            const loginToken = getState( 'auth', 'loginToken' );

            await bitcoinExchange.exchange({

                userId,
                loginToken,
                amountWantedInBitcoin,
                googleCode,
            });
            
            await actions.refreshUserData({ setToLoading: false });

            resetReduxX({
                listOfKeysToInclude: [
                    [ 'isLoading' ],
                    [ 'exchangePolygon', 'amountWantedInBitcoin' ],
                    [ 'exchangePolygon', 'amountWantedInCryptos' ],
                ]
            });
        }
        catch( error ) {

            setState( 'isLoading', false );

            console.log( 'the error:', error );

            alert(
                
                `error in doing exchange: ${
                    (
                        !!error &&
                        !!error.response &&
                        !!error.response.data &&
                        !!error.response.data.message &&
                        error.response.data.message

                    ) || 'internal server error'
                }`
            );   
        }
    }
};
