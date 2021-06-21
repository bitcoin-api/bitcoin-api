import { createElement as e } from 'react';
import { getState, setState } from '../../reduxX';
import { validation } from '../../utils';
import { usefulComponents } from '../../TheSource';
import login from './login';
import ForgotMyPassword from './ForgotMyPassword';
import Box from '@material-ui/core/Box';


const getStyles = ({

    marginBottom

}) => {
    
    return {

        outerContainer: {
            // backgroundColor: 'green',
            width: 300,
            // borderRadius: 4,

            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            justifyContent: 'space-around',
            alignItems: 'center',
            color: 'white',
            marginBottom
        },
    };
};


export default ({

    marginBottom = 0,

}) => {

    const styles = getStyles({

        marginBottom,
    });

    const isLoading = getState( 'isLoading' );
    const emailInput = getState( 'loginPolygon', 'emailInput' );
    const passwordInput = getState( 'loginPolygon', 'passwordInput' );

    const powBlockIsActive = (

        !isLoading &&
        validation.isValidEmail( emailInput ) &&
        validation.isValidPassword( passwordInput )
    );

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            'form',
            {
                id: 'loginPolygonForm',
            },
            e(
                usefulComponents.WatermelonInput,
                {
                    value: emailInput,
                    marginTop: 30,
                    title: 'email',
                    isLoadingMode: isLoading,
                    type: 'email',
                    autoComplete: 'username',
                    onChange: event => {

                        const newText = event.target.value;

                        if( newText.length > 200 ) {

                            return;
                        }

                        setState(
                            [
                                'loginPolygon',
                                'emailInput'
                            ],
                            newText.trim()
                        );
                    },
                },
            ),
            e(
                usefulComponents.WatermelonInput,
                {
                    value: passwordInput,
                    marginTop: 30,
                    title: 'password',
                    type: 'password',
                    autoComplete: 'current-password',
                    isLoadingMode: isLoading,
                    onChange: event => {

                        const newText = event.target.value;

                        if( newText.length > 200 ) {

                            return;
                        }

                        setState(
                            [
                                'loginPolygon',
                                'passwordInput'
                            ],
                            newText.trim()
                        );
                    },
                }
            )
        ),
        e(
            usefulComponents.POWBlock,
            {
                text: 'Login',
                form: 'loginPolygonForm',
                isLoadingMode: !powBlockIsActive,
                marginTop: 60,
                onClick: async () => {

                    await login({

                        emailInput,
                        passwordInput,
                    });
                },
            }
        ),
        e( ForgotMyPassword )
    );
};
