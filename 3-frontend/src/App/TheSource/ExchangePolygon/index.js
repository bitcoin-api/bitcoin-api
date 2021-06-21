import { createElement as e, useEffect } from 'react';
import { getState, setState } from '../../reduxX';
import {
    WatermelonInput,
    POWBlock,
    crypto,
} from '../usefulComponents';
import { validation, actions } from '../../utils';
import { pages } from '../../constants';
import doExchange from './doExchange';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: 'beige',
            width: '100%',
            maxWidth: 620,
            marginTop: 20,
            // borderRadius: '50%',
            // backgroundColor: 'pink',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        row: {

            width: '100%',
            maxWidth: 400,
            height: 150,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },

        currentAmountDisplayOuterContainer: {

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',

            height: 100,
            width: 150,
            backgroundColor: 'beige',
            borderRadius: 4,

            // alignSelf: 'flex-end',
        },

        currentAmountDisplayTopText: {

            color: 'black',
            fontSize: 16,
            textAlign: 'center',
            width: '100%',
            fontWeight: 'bold'
        },

        currentAmountDisplayAmountText: {

            color: 'black',
            fontSize: 16,
            textAlign: 'center',
            width: '100%',
        },
        
        titleTextBox: {

            width: '100%',
            backgroundColor: 'beige',
        },

        titleText: {

            color: 'black',
            fontSize: 16,
            textAlign: 'center',
            paddingTop: 10,
            paddingBottom: 10,
            // padding: 15,
        },

        subtitleTextBox: {

            width: '100%',
            backgroundColor: 'beige',
        },

        subtitleText: {

            color: 'black',
            fontSize: 14,
            textAlign: 'center',
            paddingTop: 10,
            paddingBottom: 10,
            // padding: 15,
        },

        divider: {}
    };
};


export default () => {

    useEffect( () => {

        actions.scroll();
        actions.setLastVisitedPage({

            loggedInMode: true,
            page: pages.loggedInMode.exchange,
        });
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

    const styles = getStyles();

    const isLoading = getState( 'isLoading' );
    const amountWantedInCryptos = getState( 'exchangePolygon', 'amountWantedInCryptos' );
    const amountWantedInBitcoin = getState( 'exchangePolygon', 'amountWantedInBitcoin' );
    // const {

        // userId,
        // email,
    //     balanceData,

    // } = getState( 'loggedInMode', 'userData' );

    const buttonIsDisabled = (

        isLoading ||
        !(
            (
                !!amountWantedInCryptos &&
                (Number( amountWantedInCryptos ) > 0)
            ) ||
            (
                !!amountWantedInBitcoin &&
                (Number( amountWantedInBitcoin ) > 0)
            )
        )
    );

    return e(
        Paper,
        {
            style: styles.outerContainer,
        },
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
                'Bitcoin to Dynasty Bitcoin Exchange'
            )
        ),
        e(
            Divider,
            {
                style: styles.divider
            }
        ),
        e(
            Box,
            {
                style: styles.subtitleTextBox
            },
            e(
                Typography,
                {
                    style: styles.subtitleText
                },
                '0.001 Bitcoin (BTC) <=> 1 Dynasty Bitcoin (DB)'
            )
        ),
        e(
            Box,
            {
                style: styles.row,
            },
            e(
                WatermelonInput,
                {
                    value: amountWantedInCryptos,
                    // marginTop: 30,
                    baseComponentName: 'box',
                    width: 160,
                    title: 'Amount Wanted in Dynasty Bitcoin',
                    isLoadingMode: isLoading,
                    onChange: event => {
    
                        const text = event.target.value;
    
                        const amountIsValid = validation.isValidNumberTextInput({
    
                            text,
                            maxAmount: 69000,
                            allowedNumberOfDecimals: 5
                        });
    
                        if( !!amountIsValid ) {
    
                            setState(
                                {
                                    keys: [
                                        'exchangePolygon',
                                        'amountWantedInCryptos'
                                    ],
                                    value: text
                                },
                                {
                                    keys: [
                                        'exchangePolygon',
                                        'amountWantedInBitcoin'
                                    ],
                                    value: ''
                                },
                            );
                        }
                    },
                },
            ),
            e( crypto.CurrentAmount )
        ),
        e(
            Box,
            {
                style: styles.row,
            },
            e(
                WatermelonInput,
                {
                    value: amountWantedInBitcoin,
                    // marginTop: 30,
                    baseComponentName: 'box',
                    width: 150,
                    title: 'Amount Wanted in Bitcoin',
                    isLoadingMode: isLoading,
                    onChange: event => {

                        const text = event.target.value;

                        const amountIsValid = validation.isValidNumberTextInput({

                            text
                        });

                        if( !!amountIsValid ) {

                            setState(
                                {
                                    keys: [
                                        'exchangePolygon',
                                        'amountWantedInBitcoin'
                                    ],
                                    value: text
                                },
                                {
                                    keys: [
                                        'exchangePolygon',
                                        'amountWantedInCryptos'
                                    ],
                                    value: ''
                                },
                            );
                        }
                    },
                },
            ),
            e(
                crypto.CurrentAmount,
                {
                    crypto: false
                }
            )
        ),
        e(
            POWBlock,
            {
                backgroundColor: 'black',
                color: 'white',
                onClick: async () => {
    
                    await doExchange();
                },
                marginTop: 20,
                text: 'Exchange',
                isLoadingMode: buttonIsDisabled,
            }
        )
    );
};
