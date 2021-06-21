import { createElement as e } from 'react';
import { getState, setState } from '../../../../reduxX';
import { grecaptcha } from '../../../../utils';
import { google } from '../../../../constants';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NumberBox from './NumberBox';
import putTicket from '../putTicket';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            // backgroundColor: 'green',
            marginTop: 30,
            width: '100%',
            // height: 200,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        titleText: {
            fontSize: 18,
            width: '90%',
            color: 'black',
            fontWeight: 'bold'
        },
        
        subtitleText: {
            fontSize: 18,
            width: '90%',
            color: 'black',
        },

        button: {
            marginTop: 20,
            // marginBottom: 30,

            width: '100%',
            color: 'black',
        },
    };
};


export default ({

    raffleId,

}) => {

    const styles = getStyles();

    const isLoading = getState( 'isLoading' );
    const selectedNumberOne = Number(
        getState( 'destinyRaffle', 'selectedNumberOne' )
    ) || null;
    const selectedNumberTwo = Number(
        getState( 'destinyRaffle', 'selectedNumberTwo' )
    ) || null;
    
    const buttonIsDisabled = (

        isLoading ||
        !Number.isInteger( selectedNumberOne ) ||
        !Number.isInteger( selectedNumberTwo )
    );

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            Typography,
            {
                style: styles.titleText,
            },
            'Petal Pick'
        ),
        e(
            Typography,
            {
                style: styles.subtitleText,
            },
            'Select 2 different numbers between 1 and 36:'
        ),
        e( NumberBox ),
        e(
            Button,
            {
                style: styles.button,
                disabled: buttonIsDisabled,
                onClick: async () => {

                    setState( 'isLoading', true );

                    try {

                        const googleCode = await grecaptcha.safeGetGoogleCode({

                            action: (
                                google
                                    .grecapcha
                                    .actions
                                    .destinyRaffleTicketPut
                            )
                        });

                        if( !googleCode ) {

                            return setState( 'isLoading', false );
                        }

                        await putTicket({

                            raffleId,
                            numbers: [
                                selectedNumberOne,
                                selectedNumberTwo
                            ],
                            action: 'buy',
                            googleCode
                        });

                        setState( 'isLoading', false );
                    }
                    catch( err ) {

                        setState( 'isLoading', false );

                        alert(
            
                            `error in buying ticket: ${
                                
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
            'Pick Petal'
        )
    );
};
