import { createElement as e, useEffect } from 'react';
import { getState, setState } from '../../../reduxX';
import { validation } from '../../../utils';
// import { story } from '../../../constants';
import { grecaptcha, actions } from '../../../utils';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
    
    TitlePolygon,

} from '../../../TheSource';
import resetPassword from './resetPassword';


const getStyles = () => {
    
    return {

        outerContainer: {
            // backgroundColor: 'pink',
            width: 300,
            // height: 200,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        titleText: {

            width: '100%',
            color: 'white',
        },

        usernameInput: {

            backgroundColor: 'beige',
            color: 'black',
            width: '100%',
        },

        passwordInput: {

            width: '100%',
            // height: 69,
            backgroundColor: 'beige',
            // borderStyle: 'solid',
            // borderColor: '#4051B5',
            // borderWidth: '2px 2px 0px 2px',
            // borderRadius: 3,
            // color: 'white',
            marginTop: 15,
        },
        
        repeatPasswordInput: {
            marginTop: 20,
            width: '100%',
            backgroundColor: 'beige',
            borderRadius: 3,
        },

        buttonContainer: {
            marginTop: 40,

            width: '100%',
            // height: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        button: {

            color: 'black',
            width: '100%',
            backgroundColor: 'beige',  
        },
    };
};


export default () => {

    useEffect( () => {

        actions.scroll();
        grecaptcha.showGrecaptcha();

        return () => {

            Promise.resolve().then( async () => {

                try {

                    await grecaptcha.hideGrecaptcha();
                }
                catch( err ) {

                    console.log( 'error in hiding grecaptcha:', err );
                }
            });
        };
        
    }, [] );

    const isLoading = getState( 'isLoading' );

    const styles = getStyles();

    const email = getState(

        'notLoggedInMode',
        'passwordReset',
        'email'
    );

    const passwordResetCode = getState(

        'notLoggedInMode',
        'passwordReset',
        'passwordResetCode'
    );

    const passwordInput = getState(

        'notLoggedInMode',
        'passwordReset',
        'passwordInput'
    );

    const repeatPasswordInput = getState(

        'notLoggedInMode',
        'passwordReset',
        'repeatPasswordInput'
    );

    const resetPasswordIsDisabled = !(

        !isLoading &&
        !!passwordResetCode &&
        validation.isValidEmail( email ) &&
        validation.isValidPassword( passwordInput ) &&
        (
            passwordInput ===
            repeatPasswordInput
        )
    );

    return e(  
        Box,
        {
            style: styles.outerContainer,
        },

        e(
            TitlePolygon,
            {
                shouldHaveHomeButton: true,
                marginBottom: 39,
            }
        ),

        e(
            Typography,
            {
                style: styles.titleText,
            },
            `Reset Password`
        ),

        e(
            'form',
            {
                id: 'resetPasswordForm'
            },
            e(
                TextField,
                {
                    style: styles.usernameInput,
                    disabled: true,
                    type: 'email',
                    autoComplete: 'username',
                    onChange: () => {},
                    value: email,
                },
            ),
            e(
                TextField,
                { 
                    // variant: 'outlined',
                    label: 'new password',
                    disabled: isLoading,
                    style: styles.passwordInput,
                    type: 'password',
                    autoComplete: 'new-password',
                    onChange: event => {
                        
                        const newText = event.target.value;

                        if( newText.length > 200 ) {

                            return;
                        }

                        setState(
                            [
                                'notLoggedInMode',
                                'passwordReset',
                                'passwordInput'
                            ],
                            newText.trim()
                        );
                    },
                    // value: 'm.stecky.efantis@gmail.com'
                    value: passwordInput,
                }
            ),
    
            e(
                TextField,
                { 
                    // variant: 'outlined',
                    label: 'repeat new password',
                    disabled: isLoading,
                    style: styles.repeatPasswordInput,
                    autoComplete: 'new-password',
                    type: 'password',
                    onChange: event => {
                        
                        const newText = event.target.value;

                        if( newText.length > 200 ) {

                            return;
                        }

                        setState(
                            [
                                'notLoggedInMode',
                                'passwordReset',
                                'repeatPasswordInput'
                            ],
                            newText.trim()
                        );
                    },
                    // value: 'm.stecky.efantis@gmail.com'
                    value: repeatPasswordInput
                }
            ),
        ),

        e(
            Box,
            {
                style: styles.buttonContainer,
            },
            e(
                Button,
                {
                    disabled: resetPasswordIsDisabled,
                    form: 'resetPasswordForm',
                    style: styles.button,
                    onClick: async () => {

                        try {
    
                            setState( 'isLoading', true );
        
                            await resetPassword();

                            setState( 'isLoading', false );
                        }
                        catch( err ) {
        
                            setState( 'isLoading', false );
    
                            alert(            
                                `error in resetting password: ${
                                    
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
                    },
                },
                'Reset Password and Login'
            )
        )
    );
};
