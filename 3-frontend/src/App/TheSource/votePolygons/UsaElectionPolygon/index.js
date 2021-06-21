import { createElement as e, useEffect } from 'react';
import { getState } from '../../../reduxX';
import { usefulComponents } from '../../../TheSource';
import VoteStation from './VoteStation';
import componentDidMount from './componentDidMount';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


const getStyles = () => {
    
    const {

    	backgroundColor,

    } = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            width: 300,
            // height: 200,
            backgroundColor,
            // borderRadius: 25,
            // borderStyle: 'solid',
            // borderWidth: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            // color: 'white',
            marginTop: 20,
        },

        titleTextBox: {

            width: '100%',
            backgroundColor: 'beige',
        },

        titleText: {

            paddingTop: 10,
            paddingBottom: 10,
            color: 'black',
            fontSize: 16,
            textAlign: 'center',
            // padding: 15,
        },

        divider: {

            backgroundColor: 'black',
            width: '100%',
        },

        divider2: {

            backgroundColor: 'black',
            width: '100%',
            marginBottom: 30,
        }
    };
};

const staticVoteData = {
    
    voteId: 'usaElection',
    votingPeriodEnd: Date.now() + (360 * 60 * 1000),
    // votingPeriodEnd: Date.now() - (360 * 60 * 1000),
    choiceToChoiceData: {

        trump: {

            image: 'https://computerstorage.s3.amazonaws.com/images/trump-choice.jpg'
        },
        biden: {

            image: 'https://computerstorage.s3.amazonaws.com/images/biden-choice.jpg'
        }
    }
};


export default () => {

    const {

        voteId,
        votingPeriodEnd,
        choiceToChoiceData,

    } = staticVoteData;

    const userData = getState( 'loggedInMode', 'userData' );

    useEffect( () => {

        Promise.resolve().then( async () => {

            await componentDidMount({ voteId });
        });

    }, [ voteId, userData ] );

    const styles = getStyles();
    
    const mainElements = [
        e(
            Box,
            {
                style: styles.titleTextBox
            },
            e(
                Typography,
                {
                    style: styles.titleText
                },
                'Vote for 2020 Presidential Candidate'
            ),
            e(
                Divider,
                {
                    style: styles.divider,
                }
            ),
            e(
                usefulComponents.crypto.CurrentAmount,
                {
                    width: '100%',
                    height: 60,
                }
            ),
            e(
                Divider,
                {
                    style: styles.divider2,
                }
            )
        ),
    ];

    const localError = getState( 'presidentialVote2020', 'localError' );

    if( !!localError ) {

        mainElements.push(

            e(
                Box,
                {
                    style: styles.titleText
                },
                'Error'
            )
        );
    }
    else {

        const choiceInput = getState( 'presidentialVote2020', 'choiceInput' );
        const currentChoice = getState( 'presidentialVote2020', 'currentChoice' );
        const currentVoteType = getState( 'presidentialVote2020', 'currentVoteType' );
        const currentAmount = getState( 'presidentialVote2020', 'currentAmount' );
        const currentMetadata = getState( 'presidentialVote2020', 'currentMetadata' );

        mainElements.push(

            e(
                VoteStation,
                {
                    voteId,
                    choiceInput,
                    currentChoice,
                    currentVoteType,
                    currentAmount,
                    currentMetadata,
                    votingPeriodEnd,
                    choiceToChoiceData,
                }
            )
        );
    }

    return e(
        Paper,
        {
            style: styles.outerContainer,
        },
        ...mainElements
    );
};

