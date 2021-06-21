import { createElement as e } from 'react';
import { getState, setState } from '../../../../reduxX';
import { validation } from '../../../../utils';
// import { TitlePolygon } from '../../../TheSource';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import submit from './submit';
// import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
// import { story } from '../../../constants';


const getStyles = () => {

    return {

        outerContainer: {
            width: '100%',
            marginTop: 28,
            // height: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        theButton: {
            color: 'white'
        },
    };
};


export default () => {

    const styles = getStyles();

    const isLoading = getState( 'isLoading' );
    
    const emailInput = getState( 'forgotMyPasswordPolygon', 'emailInput' );

    const emailInputIsValid = validation.isValidEmail( emailInput );

    const buttonIsDisabled = !(

        !isLoading &&
        emailInputIsValid
    );

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            Button,
            {
                disabled: buttonIsDisabled,
                style: styles.theButton,
                form: 'forgotMyPasswordForm',
                onSubmit: () => {},
                onClick: async () => {

                    try {

                        setState( 'isLoading', true );

                        await submit({

                            email: emailInput,
                        });

                        setState( 'isLoading', false );
                    }
                    catch( err ) {

                        setState( 'isLoading', false );

                        alert(
                    
                            `error in submit: ${
                                
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
                }
            },
            'Send Password Reset Email'
        )
    );
};
