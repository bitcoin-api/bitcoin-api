import { createElement as e } from 'react';
// import { getState } from '../../../reduxX';
// import {
//     usefulComponents,
//     // POWBlock,
// } from '../../TheSource';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Tickets from './Tickets';
import BuyTicketPolygon from './BuyTicketPolygon';
// import ViewDraws from './ViewDraws';
import DrawsBar from './DrawsBar';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: 'beige',
            width: '100%',
            marginTop: 10,
            marginBottom: 10,
            // height: 200,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        text: {
            width: '90%',
            color: 'black',
        },
    };
};


export default ({

    raffleDatum

}) => {

    const styles = getStyles();
    
    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            Typography,
            {
                style: styles.text,
            },
            `Lotus Season ${ raffleDatum.raffleNumber }`
        ),
        e(
            Typography,
            {
                style: styles.text,
            },
            `Flower Pot: ${ raffleDatum.cryptoPot } DB`
        ),
        e(
            Typography,
            {
                style: styles.text,
            },
            `Petal Pick Cost: ${ raffleDatum.ticketCryptoPrice } DB`
        ),
        e(
            Typography,
            {
                style: styles.text,
            },
            `House Flower Pot: ${ raffleDatum.houseCut * 100 }%`
        ),
        e(
            Typography,
            {
                style: styles.text,
            },
            `Lotus Season Start: ${
                new Date( raffleDatum.previousRaffleEndHour ).toLocaleString()
            }`
        ),
        // ...choiceElements,
        e(
            DrawsBar,
            {
                raffleDatum,
            }
        ),
        e(
            Tickets,
            {
                raffleDatum,
            }
        ),
        !!raffleDatum.winHour && e(
            Typography,
            {
                style: styles.text,
            },
            `Winning Draw Time: ${

                new Date( raffleDatum.winHour ).toLocaleString()
            }`
        ),
        !!raffleDatum.winChoice && e(
            Typography,
            {
                style: styles.text,
            },
            `Winning Numbers: ${ raffleDatum.winChoice }`
        ),
        !!raffleDatum.numberOfWinners && e(
            Typography,
            {
                style: styles.text,
            },
            `Number of Winners: ${ raffleDatum.numberOfWinners }`
        ),
        !!raffleDatum.winCryptoPayout && e(
            Typography,
            {
                style: styles.text,
            },
            `Winning Payout: ${ raffleDatum.winCryptoPayout } DB`
        ),
        !!raffleDatum.winData && raffleDatum.winData.hasWon && e(
            Typography,
            {
                style: styles.text,
            },
            'Winner!🎉🎊🥳'
        ),
        !raffleDatum.winRaffleDrawId && e(
            
            BuyTicketPolygon,
            {
                raffleId: raffleDatum.raffleId,          
            }
        )
    );
};
