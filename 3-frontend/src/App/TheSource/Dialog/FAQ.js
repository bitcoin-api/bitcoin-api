import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { setState } from '../../reduxX';
import { story } from '../../constants';
import ProjectRoadmap from '../../TheSource/usefulComponents/ProjectRoadmap';

const getStyles = () => {

    return {

        outerContainer: {

            width: '100%',
            // height: 100,
            // backgroundColor: 'pink',
        },

        text: {

            width: '100%',
            // height: 100,
            color: 'black',
            padding: 5,
        },
    };
};


const FrequentlyAskedQuestionAndAnswer = ({

    question = '',
    answer = ''

}) => {

    return e(

        Box,
        {
            style: {

                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }
        },
        e(
            Typography,
            {
                style: {
                    fontWeight: 'bold',
                    width: '90%',
                    marginTop: 15,
                }
            },
            question
        ),
        (typeof answer === 'string' ) ? e(
            Typography,
            {
                style: {
                    marginTop: 2,
                    width: '90%',
                }
            },
            answer
            
        ) : answer
    );
};


export default () => {

    const styles = getStyles();

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            FrequentlyAskedQuestionAndAnswer,
            {
                question: `I just signed up, why don't I see an account verification email?`,
                answer: 'Check your spam mail folder.',
            }
        ),
        e(
            FrequentlyAskedQuestionAndAnswer,
            {
                question: `I just deposited Bitcoin into my account, why don't I see it in my balance?`,
                answer: 'Deposits appear in your account soon after the 6th Bitcoin confirmation.',
            }
        ),
        e(
            FrequentlyAskedQuestionAndAnswer,
            {
                question: `What's a Dynasty Bitcoin (DB) and how much is a DB worth?`,
                answer: 'Dynasty Bitcoin (DB) is a digital quantity used to play games on DynastyBitcoin.com. 1 DB can be converted to and from 0.001 Bitcoin (BTC) once logged in.',
            }
        ),
        e(
            FrequentlyAskedQuestionAndAnswer,
            {
                question: `I'm having trouble accessing my account, I forgot my password, what should I do?`,
                answer: e(
                    Box,
                    {
                        style: {
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }
                    },
                    e(
                        Typography,
                        {
                            style: {
                                marginTop: 2,
                                width: '90%',
                            }
                        },
                        `Go to the login page and select `,
                        e(  
                            'a',
                            {
                                style: {
                                    color: 'blue',
                                    cursor: 'pointer',
                                },
                                onClick: () => {

                                    setState(
                                        [ 'notLoggedInMode', 'mainMode' ],
                                        story
                                            .NotLoggedInMode
                                            .mainModes
                                            .forgotMyPasswordMode,
                                        'dialogMode',
                                        story.dialogModes.none
                                    );
                                },
                            },
                            `"Reset My Password" (or click here)`
                        ),
                        `, you can send a password reset link to your email from there.`
                    )
                )
            }
        ),
        e(
            FrequentlyAskedQuestionAndAnswer,
            {
                question: `What should I do if I have trouble withdrawing my Bitcoin?`,
                answer: 'Email support@dynastybitcoin.com from the email address of your DynastyBitcoin.com account that has the Bitcoin in it.',
            }
        ),
        e(
            FrequentlyAskedQuestionAndAnswer,
            {
                question: `What's next for DynastyBitcoin.com?`,
                answer: e(
                    Box,
                    {
                        style: {
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }
                    },
                    e(
                        Typography,
                        {
                            style: {
                                marginTop: 2,
                                width: '90%',
                            }
                        },
                        `Here's the DynastyBitcoin.com project roadmap:`,
                    ),
                    e(
                        ProjectRoadmap,
                        {
                            color: 'black',
                            headerFontSize: 16,
                            marginTop: 16,
                            marginBottom: 27,
                        }
                    )
                ),
            }
        )
    );
};
