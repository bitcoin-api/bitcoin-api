import { createElement as e } from 'react';
import { setState, getState } from '../../../reduxX';
import { enchanted, grecaptcha } from '../../../utils';
import { google } from '../../../constants';
// import {
//     usefulComponents,
//     // POWBlock,
// } from '../../TheSource';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import putTicket from './putTicket';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: '#D0D2A8',
            width: '90%',
            minHeight: 75,
            borderRadius: 10,
            marginTop: 5,
            marginBottom: 5,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        titleText: {
            width: '90%',
            fontSize: 18,
            color: 'black',
            fontWeight: 'bold',
            marginTop: 10,
        },

        choiceBox: {

            width: '90%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 4,
            marginBottom: 4,
        },

        text: {
            color: 'black',
        },

        cancelButton: {

            marginLeft: 10,
            backgroundColor: '#AFB278',
        },

        noTicketsSection: {
            width: '90%',
            color: 'black',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
        }
    };
};


export default ({

    raffleDatum

}) => {

    const styles = getStyles();

    const isLoading = getState( 'isLoading' );

    const choiceElements = [];

    if(
        !raffleDatum.choices ||
        (raffleDatum.choices.length === 0)
    ) {

        choiceElements.push(

            e(
                Typography,
                {
                    style: styles.noTicketsSection,
                },
                '...'
            )
        );
    }
    else {

        const choiceElementsToAdd = raffleDatum.choices.map( choiceData => {

            const cancelIsAllowed = (
                Date.now() <= choiceData.lastCancelTime
            );

            return e(
                Box,
                {
                    style: styles.choiceBox
                },
                e(
                    Typography,
                    {
                        style: styles.text,
                    },
                    choiceData.choice
                ),
                cancelIsAllowed && e(
                    Button,
                    {
                        disabled: isLoading,
                        style: styles.cancelButton,
                        onClick: async () => {

                            setState( 'isLoading', true );

                            try {

                                const numbers = (
                                    enchanted
                                        .destinyRaffle
                                        .getNumbersFromChoice({

                                            choice: choiceData.choice,
                                        })
                                );

                                const googleCode = (
                                    await grecaptcha.safeGetGoogleCode({
                                        action: (
                                            google
                                                .grecapcha
                                                .actions
                                                .destinyRaffleTicketPut
                                        )
                                    })
                                );
        
                                if( !googleCode ) {
        
                                    return setState( 'isLoading', false );
                                }
        
                                await putTicket({
        
                                    raffleId: raffleDatum.raffleId,
                                    numbers,
                                    action: 'cancel',
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
                    'Unpick Petal'
                )
            );
        });

        choiceElements.push( ...choiceElementsToAdd );
    }

    // for( const choiceData of raffleDatum.choices ) {

    //     choiceElements.push(

    //         e(
                // Box,
                // {
                //     style: styles.text,
                // },
                // choiceData.choice
    //         )
    //     );
    // }

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
            'My Petals'
        ),
        ...choiceElements
    );
};
