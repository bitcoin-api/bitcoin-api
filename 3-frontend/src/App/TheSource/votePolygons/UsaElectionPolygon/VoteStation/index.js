import { createElement as e, useEffect } from 'react';
import { getState, setState } from '../../../../reduxX';
import { validation } from '../../../../utils';
import { votes } from '../../../../constants';
import Card from './Card';
import PayoutPolygon from './PayoutPolygon';
import placeBet from './placeBet';
import cancelBet from './cancelBet';
import WaitingForPayoutPolygon from './WaitingForPayoutPolygon';
// import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


const getStyles = ({

    betIsEnabled,
    cancelBetIsEnabled

}) => {
    
    // const {

    // 	backgroundColor,

    // } = getState( 'mainStyleObject' );

    return {

        voteStation: {

            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'beige',
        },

        cardHolder: {

            width: '100%',
            // height: 200,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            // marginTop: 10,
        },

        mainStatusTextSection: {

            // height: 40,
            width: '100%',
            backgroundColor: 'beige',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        mainStatusTextSectionText: {

            marginTop: 10,
            color: 'black',
        },

        mainStatusText: {

            padding: 5,
        	color: 'black',
        	textAlign: 'center',
        },

        amountInputSection: {

            width: '100%',
            backgroundColor: 'beige',
            // height: 40,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },

        // amountInputLabel: {

        //     width: '30%',
        //     padding: 5,
        // },

        amountInput: {

            width: '90%',
            padding: 5,
        },

        performBetButton: {

            height: 40,
            width: '90%',
            backgroundColor: betIsEnabled ? 'darkGreen': 'grey',
            color: 'white',
            marginTop: 10,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 13,
        },

        performBetButtonText: {

            padding: 5,
            color: 'black',
            textAlign: 'center',
        },

        cancelSectionTopDivider: {
            marginTop: 10,
            width: '95%',
            backgroundColor: 'black',
        },

        cancelVoteStation: {

            height: 40,
            // backgroundColor: cancelBetIsEnabled ? 'green' : 'grey',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 7,
        },

        cancelVoteStationButton: {

            // width: '100%',
            backgroundColor: cancelBetIsEnabled ? 'green' : 'grey',
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 15,
            paddingLeft: 15,
            color: 'white',
            textAlign: 'center',
        },
    };
};


const getStatusTextElements = ({

    choiceInput,
    styles

}) => {

    const statusTextElements = [];

    if( !!choiceInput ) {

        statusTextElements.push(
            e(
                Typography,
                {
                    style: styles.mainStatusText
                },
                `Bet on ${ choiceInput }`
            )
        );
    }
    else {

        statusTextElements.push(
            e(
                Typography,
                {
                    style: styles.mainStatusText
                },
                'Pick a candidate to vote!'
            )
        );
    }

    return statusTextElements;
};


export default ({

    voteId,
    choiceInput,
    currentChoice,
    currentVoteType,
    currentAmount,
    currentMetadata,
    votingPeriodEnd,
    choiceToChoiceData,

}) => {

    const votingPeriodHasEnded = ( Date.now() > votingPeriodEnd );
    const payoutHasHappenedAlready = ( currentVoteType === votes.types.payout );

    useEffect( () => {

        if(
            !votingPeriodHasEnded &&
            payoutHasHappenedAlready
        ) {
            console.log( 'error: received payout before vote ended' );

            setState(
                [ 'presidentialVote2020', 'localError' ],
                true,
                [ 'isLoading' ],
                false
            );
        }
    }, [ votingPeriodHasEnded, payoutHasHappenedAlready ] );

    if( votingPeriodHasEnded ) {

        if( currentVoteType === votes.types.payout ) {

            return e(
                PayoutPolygon,
                {
                    resultAmount: currentMetadata.resultAmount,
                    resultChoice: currentMetadata.resultChoice,
                    currentAmount,
                }
            );
        }

        return e(
            WaitingForPayoutPolygon,
            {
                currentAmount,
                currentChoice,
            }
        );
    }
    else if( currentVoteType === votes.types.payout ) {
        // safeguard
        return e( 'div' );
    }

    const amountAsString = getState( 'presidentialVote2020', 'amountInput' );
    const amount = Number( amountAsString );
    const isLoading = getState( 'isLoading' );

    const betIsEnabled = (

        !isLoading &&
        !!amount &&
        !!choiceInput
    );

    const cancelBetIsEnabled = (

        !isLoading &&
        !!currentChoice &&
        !!currentAmount
    );

    const styles = getStyles({

        betIsEnabled,
        cancelBetIsEnabled,
    });

    const statusTextElements = getStatusTextElements({

        choiceInput,
        styles,
    });

    return e(
        Box,
        {
            style: styles.voteStation
        },
        e(
            Box,
            {
                style: styles.cardHolder
            },
            e(
                Card,
                {
                    choiceInput,
                    cardIcon: 'trump',
                    defaultColor: 'red',
                    choiceToChoiceData,
                }
            ),
            e(
                Card,
                {
                    choiceInput,
                    cardIcon: 'biden',
                    choiceToChoiceData,
                }
            ),
        ),
        e(
            Box,
            {
                style: styles.mainStatusTextSection,
            },
            e(
                Box,
                {
                    style: styles.mainStatusTextSectionText,
                },
                ...statusTextElements,
            )
        ),
        e( // amount input
            Box,
            {
                style: styles.amountInputSection,
            },
            // e(
            //     Box,
            //     {
            //         style: styles.amountInputLabel,
            //     },
            //     'Bet amount in Cryptos'
            // ),
            e(
                TextField,
                {
                    style: styles.amountInput,
                    value: amountAsString,
                    label: 'Bet amount in Cryptos',
                    disabled: (

                        isLoading ||
                        !choiceInput
                    ),
                    onChange: event => {

                        const text = event.target.value;

                        const amountIsValid = validation.isValidNumberTextInput({

                            text,
                            maxAmount: 69000,
                            allowedNumberOfDecimals: 5
                        });

                        if( amountIsValid ) {

                            setState(

                                [ 'presidentialVote2020', 'amountInput' ],
                                text
                            );
                        }
                    },
                }
            )
        ),
        e(
            Button,
            {
                style: styles.performBetButton,
                onClick: async () => {

                    if( betIsEnabled ) {

                        await placeBet({

                            voteId,
                            amount,
                            choice: choiceInput,
                        });
                    }
                }
            },
            !!choiceInput && (
                `Place Bet on ${ choiceInput }`
            )
        ),
        ( !!currentChoice && !!currentAmount ) && [

            e(
                Divider,
                {
                    style: styles.cancelSectionTopDivider,
                    key: 'zyx',
                }
            ),
            e(
                Box,
                {
                    style: styles.mainStatusTextSection,
                    key: 'a',
                },
                e(
                    Typography,
                    {
                        style: styles.mainStatusText,
                    },
                    `Currently bet ${ currentAmount } Cryptos on ${ currentChoice }`
                )
            ),
            e(
                Box,
                {
                    style: styles.cancelVoteStation,
                    onClick: async () => {

                        if( cancelBetIsEnabled ) {

                            await cancelBet({

                                voteId,
                            });
                        }
                    },
                    key: 'b',
                },
                e(
                    Button,
                    {
                        style: styles.cancelVoteStationButton,
                    },
                    'Cancel Current Bet'
                )
            )
        ]
    );
};

