import { createElement as e, useEffect } from 'react';
import { getState, setState } from '../../reduxX';
import { actions/*, grecaptcha*/ } from '../../utils';
import { pages } from '../../constants';
// import { story } from '../../constants';
// import {
//     usefulComponents,
//     // POWBlock,
// } from '../../TheSource';
import Box from '@material-ui/core/Box';
// import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { gameTitles } from '../desireElements';
import componentDidMount from './componentDidMount';
import Lottery from './Lottery';
import ControlPanel from './ControlPanel';
import GetMorePresser from './GetMorePresser';
import { usefulComponents } from '../../TheSource';
// import GetMorePresser from '.';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            // backgroundColor: 'beige',
            // backgroundColor: 'black',
            maxWidth: 620,
            width: '100%',
            marginTop: 20,
            // height: 300,
            // borderRadius: '50%',
            // backgroundColor: 'pink',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        titleTextBox: {

            width: '100%',
            border: 5,
            borderStyle: 'white',
            
            // backgroundColor: 'beige',
        },

        titleText: {

            paddingTop: 10,
            paddingBottom: 10,
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
            // padding: 15,
        },

        loadingText: {

            paddingTop: 10,
            paddingBottom: 10,
            color: 'white',
            fontSize: 50,
            textAlign: 'center',
        },

        divider: {

            backgroundColor: 'black',
            width: '100%'
        }
    };
};

const ErrorMode = () => {

    const destinyRaffleError = getState( 'destinyRaffle', 'loadError' );

    return e(
        Box,
        {
            style: {
                width: '100%',
                height: '100%',
                backgroundColor: 'blue',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }
        },
        e(
            Typography,
            {
                style: {
                    textAlign: 'center',
                    fontSize: 40
                }
            },
            'Error'
        ),
        e(
            Typography,
            {
                style: {
                    textAlign: 'center'
                }
            },
            destinyRaffleError.message || 'Error in loading lottery datas'
        )
    );
};

const x = 1;
const y = 1;


export default () => {

    if( x === y ) {

        useEffect( () => {

            actions.scroll();
            actions.setLastVisitedPage({
    
                loggedInMode: true,
                page: pages.loggedInMode.destinyRaffle,
            });

        }, [] );

        return e(

            Box,
            {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 620,
                    marginTop: 50,
                }
            },
            e(
                Typography,
                {
                    style: {

                        width: '90%',
                        color: 'white',
                        marginBottom: 10,
                        fontWeight: 'bold',
                        fontSize: 21,
                    }
                },
                '🏰Dynasty Feed📰'
            ),
               
            e(
                Typography,
                {
                    style: {

                        width: '90%',
                        color: 'white',
                        marginBottom: 10,
                        marginTop: 19,
                        fontSize: 18,
                    }
                },
                '🐦The Latest on Twitter🐦'
            ),
            e(
                Typography,
                {
                    style: {

                        width: '90%',
                        color: 'white',
                        marginBottom: 18,
                    }
                },
                // 'Coming soon, ' +
                // 'the Lotus Lottery will be updated ' +
                // 'and will be ready to play,,🐸🐸🐸!! ' +
                'Stay tuned for 🎁bonus announcements🎁 ' +
                'and more fun crypto updates on Twitter at ',
                e(
                    'a',
                    {
                        key: 'daLinky',
                        href: 'https://twitter.com/DynastyBitcoin',
                        target: '_blank',
                        style: {
                            color: 'lightblue',
                        }
                    },
                  `@DynastyBitcoin`  
                ),
                '.'
            ),
            e(
                'iframe',
                {
                    style: {
                        touchAction: 'pan-y',
                        maxWidth: '90%',
                        width: '100%',
                    },
                    frameBorder: '0',
                    allowFullScreen: false,
                    // allow: true,
                    // sandbox: false,
                    height: 710,
                    src: 'https://master.d2lq8bb1axbb9y.amplifyapp.com/?height=450',
                    loading: 'lazy',
                }
            ),

            e( usefulComponents.ProjectRoadmap )
        );
    } 

    const styles = getStyles();

    useEffect( () => {

        actions.scroll();
        actions.setLastVisitedPage({

            loggedInMode: true,
            page: pages.loggedInMode.destinyRaffle,
        });

        const raffleData = getState( 'destinyRaffle', 'data' );

        if( !raffleData ) {

            Promise.resolve().then( async () => {

                try {
    
                    setState( 'isLoading', true );
    
                    await componentDidMount();
    
                    setState( 'isLoading', false );
                }
                catch( err ) {
    
                    setState(
                        {
                            keys: [ 'destinyRaffle', 'loadError' ],
                            value: err
                        },
                        {
                            keys: [ 'isLoading' ],
                            value: false
                        },
                    );
                }
            });
        }

        // grecaptcha.showGrecaptcha();

        // return () => {

        //     Promise.resolve().then( async () => {

        //         try {

        //             await grecaptcha.hideGrecaptcha();
        //         }
        //         catch( err ) {

        //             console.log( 'error in hiding grecaptcha:', err );
        //         }
        //     });
        // };

    }, [] );

    const components = [];

    const destinyRaffleError = getState( 'destinyRaffle', 'loadError' );

    if( !!destinyRaffleError ) {

        components.push(
            e( ErrorMode )
        );
    }
    else {

        const raffleData = getState( 'destinyRaffle', 'data' );

        if( !!raffleData ) {

            components.push(
                e( ControlPanel )
            );

            raffleData.sort( ( datumA, datumB ) => (

                datumB.raffleStartTime -
                datumA.raffleStartTime
            ));

            for( const raffleDatum of raffleData ) {

                components.push(
                    e(
                        Lottery,
                        {
                            raffleDatum
                        }
                    )
                );
            }

            if(
                !!getState( 'destinyRaffle', 'lastKey' ) &&
                !!getState( 'destinyRaffle', 'lastTime' )
            ) {

                components.push( e( GetMorePresser ) );
            }
        }
        else {

            components.push(
                e(
                    Typography,
                    {
                        style: styles.loadingText
                    },
                    '...'
                )
            ); 
        }
    }

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e( gameTitles.DestinyRaffleTitle ),
        e(
            Divider,
            {
                style: styles.divider
            }
        ),
        ...components
    );
};
