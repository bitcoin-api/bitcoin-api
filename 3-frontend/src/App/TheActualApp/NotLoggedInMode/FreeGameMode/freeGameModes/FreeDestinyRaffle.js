import { createElement as e, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { getState, setState } from '../../../../reduxX';
import { desireElements } from '../../../../TheEnchantedSource';
import { story } from '../../../../constants';
import { actions } from '../../../../utils';


const getWindowWidthModeVariables = () => {

    const windowWidth = getState( 'windowWidth' );

    if( windowWidth > 1410 ) {
     
        // return {

        //     previewVideoWidth: 1080,
        //     previewVideoHeight: 607.5,
        // };
        return {

            previewVideoWidth: 900,
            previewVideoHeight: 488.7931,
        };
    }
    else
    if( windowWidth > 580 ) {
     
        return {

            previewVideoWidth: 560,
            previewVideoHeight: 315,
    
        };
    }

    return {

        previewVideoWidth: 320,
        previewVideoHeight: 180,
    };
};


const getStyles = ({

    previewVideoWidth

}) => {
    
    return {

        outerContainer: {
            // backgroundColor: 'pink',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 20,
        },

        // text: {

        //     width: '90%',
        //     color: 'white',
        //     fontSize: 16,
        //     marginTop: 30,
        // },
        
        previewVideoTitleTextContainer: {

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

            // marginTop: 10,
            width: '100%',
        },

        previewVideoTitleText: {

            color: 'white',
            width: previewVideoWidth,
            fontWeight: 'bold',
            fontSize: 18,
        },

        previewVideoContainer: {

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

            width: '100%',
            minHeight: 300,
            // backgroundColor: 'brown',
        },

        temporarySpacer: {

            width: '100%',
            height: 100,
            maxWidth: 500,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
        },

        temporaryText: {
            width: '80%',
            textAlign: 'left',
        },

        buttonPlaceContainer: {
            // backgroundColor: 'pink',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 15,
        },

        button: {
            backgroundColor: 'beige',
        },

        alreadyHaveAnAccountTextContainer: {
            // backgroundColor: 'brown',
            width: 320,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 40,
        },

        alreadyHaveAnAccountText: {
            // width: '100%',
            color: 'white',
            fontSize: 16,
        },

        alreadyHaveAnAccountLoginNowText: {
            // width: '100%',
            // textAlign: 'left',
            color: '#85f3ff',
            fontWeight: 'bold',
            marginLeft: 5,
            cursor: 'pointer',
            fontSize: 16,
        },
    };
};


export default () => {

    useEffect( () => {

        actions.scroll();
        
    }, [] );


    const {

        previewVideoWidth,
        previewVideoHeight

    } = getWindowWidthModeVariables();

    const styles = getStyles({

        previewVideoWidth
    });
    
    return e(
        Box,
        {
            style: styles.outerContainer
        },
        e(
            desireElements.gameTitles.DestinyRaffleTitle
        ),
        // e(
        //     Box,
        //     {
        //         style: styles.temporarySpacer,
        //     },
        //     e(
        //         Typography,
        //         {
        //             style: styles.temporaryText,
        //         },
        //         'Available on Login Only'
        //     ),
        //     e(
        //         Typography,
        //         {
        //             style: styles.temporaryText,
        //         },
        //         'Hourly Draw Lottery is Currently Active!'
        //     )
        // ),
        e(
            Box,
            {
                style: styles.previewVideoContainer
            },
            e(
                Box,
                {
                    style: styles.previewVideoTitleTextContainer
                },
                e(
                    Typography,
                    {
                        style: styles.previewVideoTitleText
                    },
                    'Gameplay Video'
                ),
            ),
            e(
                'iframe',
                {
                    width: previewVideoWidth,
                    height: previewVideoHeight,
                    src: 'https://www.youtube.com/embed/nwxhWTpu5yM',
                    frameBorder: 0,
                    allow: 'accelerometer; autoplay;',
                    clipboardwrite: 'encrypted-media; gyroscope; picture-in-picture',
                    allowFullScreen: true,
                }
            )            
        ),
        e(
            Box,
            {
                style: styles.buttonPlaceContainer
            },
            e(
                Button,
                {
                    style: styles.button,
                    size: 'large',
                    onClick: () => {

                        setState(

                            {
                                keys: [ 'notLoggedInMode', 'freeGame' ],
                                value: null,
                            },
                            {
                                keys: [ 'notLoggedInMode', 'mainMode' ],
                                value: (
                                    story
                                        .NotLoggedInMode
                                        .mainModes
                                        .signUpMode
                                ),
                            }
                        );
                    }
                },
                'Create an Account and Play Now!'
            ),
            e(
                Box,
                {
                    style: styles.alreadyHaveAnAccountTextContainer
                },
                e(
                    Typography,
                    {
                        style: styles.alreadyHaveAnAccountText
                    },
                    'Already have an account?'
                ),
                e(
                    Box,
                    {
                        onClick: () => {

                            setState(

                                {
                                    keys: [ 'notLoggedInMode', 'freeGame' ],
                                    value: null,
                                },
                                {
                                    keys: [ 'notLoggedInMode', 'mainMode' ],
                                    value: (
                                        story
                                            .NotLoggedInMode
                                            .mainModes
                                            .loginMode
                                    ),
                                }
                            );
                        }
                    },
                    e(
                        Typography,
                        {
                            style: styles.alreadyHaveAnAccountLoginNowText,
                        },
                        'Login now!'
                    )   
                )
            )
        )
    );
};
