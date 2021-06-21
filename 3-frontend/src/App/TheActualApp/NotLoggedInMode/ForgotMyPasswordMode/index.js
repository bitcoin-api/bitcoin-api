import { createElement as e, useEffect } from 'react';
import { getState, } from '../../../reduxX';
import { actions, grecaptcha } from '../../../utils';
import { TitlePolygon } from '../../../TheSource';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import EmailInput from './EmailInput';
import SubmitButton from './SubmitButton';
// import { story } from '../../../constants';


const getStyles = () => {
    
    const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: mainStyleObject.backgroundColor,
            width: '100%',
            maxWidth: 620,
            minWidth: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: 'white',
        },

        titleTextContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 21,
        },

        titleText: {
            textAlign: 'center',
            color: 'white',
            fontSize: 18,
        },

        explanationTextContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 21,
            width: '90%'
        },

        explanationText: {
            // textAlign: 'center',
            color: 'white',
            // fontSize: 16,
        },
        
        successExplanationText: {
            textAlign: 'center',
            color: 'white',
            // fontSize: 16,
        }
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

    const styles = getStyles();

    const successEmail = getState(
        
        'forgotMyPasswordPolygon',
        'successEmail'
    );

    // const isLoading = getState( 'isLoading' );

    const createElementArguments = [
        'div',
        {
            style: styles.outerContainer,
        },
        e(
            TitlePolygon,
            {
                shouldHaveHomeButton: true,
                marginBottom: 6,
            }
        ),
        e(
            Box,
            {
                style: styles.titleTextContainer
            },
            e(
                Typography,
                {
                    style: styles.titleText
                },
                'Reset My Password'
            )
        )
    ];

    const isNotSuccessModeYet = !successEmail;

    if( isNotSuccessModeYet ) {

        createElementArguments.push( 

            e(
                Box,
                {
                    style: styles.explanationTextContainer
                },
                e(
                    Typography,
                    {
                        style: styles.explanationText
                    },
                    'Input your email to send a password reset link:'
                )
            ),
            e(
                'form',
                {
                    id: 'forgotMyPasswordForm',
                    onSubmit: event => {

                        event.preventDefault();
                    },
                },
                e( EmailInput )
            ),
            e( SubmitButton )
        );
    }
    else {

        createElementArguments.push( 

            e(
                Box,
                {
                    style: styles.explanationTextContainer
                },
                e(
                    Typography,
                    {
                        style: styles.successExplanationText
                    },
                    `Email with password reset link sent to ${ successEmail }.`
                )
            )
        );
    }

    return e( ...createElementArguments );
};
