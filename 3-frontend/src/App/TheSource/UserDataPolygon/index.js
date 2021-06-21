import { createElement as e, useEffect } from 'react';
import { getState } from '../../reduxX';
import { actions } from '../../utils';
import { pages } from '../../constants';
import { UltraDataContainer } from '../usefulComponents';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AddressSection from './AddressSection';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            // backgroundColor: mainStyleObject.backgroundColor,
            backgroundColor: 'beige',
            width: '100%',
            maxWidth: 620,

            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'left',
        },
        
        titleTextBox: {

            width: '100%',
            backgroundColor: 'beige',
        },

        titleText: {

            paddingTop: 5,
            paddingBottom: 5,
            color: 'black',
            fontSize: 18,
            textAlign: 'center',
            // padding: 15,
        },
    };
};

const marginTop = 5;

const SwaggyDivider = () => {

    return e(
        Divider,
        {
            style: {
                backgroundColor: 'black',
                width: '80%',
                minWidth: 320,
                marginBottom: 17,
                marginTop: 5,
                // maxWidth: '100%',
            }
        }
    );
};


export default () => {

    useEffect( () => {

        actions.setLastVisitedPage({

            loggedInMode: true,
            page: pages.loggedInMode.base,
        });

    }, [] );

    const styles = getStyles();

    const {

        // userId,
        // email,
        balanceData,

    } = getState( 'loggedInMode', 'userData' );

    return e(
        Box,
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
                'Account Summary'
            )
        ),
        // e(
        //     UltraDataContainer,
        //     {
        //         text: `Email: ${ email }`,
        //         marginTop,
        //     }
        // ),
        // e( SwaggyDivider ),
        e(
            UltraDataContainer,
            {
                heading: (
                    'Bitcoin'
                ),
                lines: [
                    `Balance: ${ balanceData.summary.bitcoin.totalAmount } BTC`,
                    e(
                        Typography,
                        {
                            key: 'ultraKeyKeydfd',
                            style: {

                                width: '88%',
                                textAlign: 'left',
                                wordBreak: 'break-word',
                                // textIndent: 20,
                                color: 'black',
                                fontSize: 14,
                                marginBottom: 10,
                            }
                        },
                        '(Deposits appear after 6 confirmations)'
                    ),
                    // `Deposit Address: ${ balanceData.bitcoin.depositAddress || 'currently unavailable' }`,
                    e(    
                        AddressSection,
                        {
                            key: 'argon',
                            balanceData,
                        }
                    )
                ],
                marginTop,
            }
        ),
        e( SwaggyDivider ),
        e(
            UltraDataContainer,
            {
                heading: (
                    `Dynasty Bitcoin`
                ),
                lines: [
                    `Balance: ${ balanceData.summary.crypto.totalAmount } DB`
                ],
                marginTop,
            }
        )//,
        // e( SwaggyDivider )
    );
};
