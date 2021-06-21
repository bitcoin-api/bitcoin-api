import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const getStyles = () => {

    return {

        outerContainer: {

            width: '100%',
            // height: 100,
            // // backgroundColor: 'pink',
            // display: 'flex',
            // justifyContent: 'center',
            // flexDirection: 'column',
            // alignItems: 'center'
        },

        text: {

            width: '90%',
            // height: 100,
            color: 'black',
            marginTop: 13,
            marginBottom: 9,
            marginLeft: 15,
            // padding: 5,
        },
    };
};


const texts = [

    `• Thousand Petal Lotus is an hourly draw lottery game`,
    `• Users pick lotus petals, each petal has two numbers associated with it`,
    `• The numbers range from 1 to 36 and duplicate numbers cannot be chosen`,
    `• Picking a petal costs Dynasty Bitcoin (DB), when a user picks a petal the amount they pay goes to the Flower Pot.`,
    `• A petal is drawn at the beginning of each hour. Users who've picked the same petal win the Flower Pot!`,
    `• Thousand Petal Lotus is segmented overall in time by Lotus Seasons. A Lotus Season is the time period until the hourly draw choses a winning picked petal. After a winning petal is picked, a new Lotus Season starts.`,
    `• If multiple users have the same winning petal, then the Flower Pot is split evenly among winners.`,
    `• Dynasty Bitcoin takes a percentage of the Flower Pot. This percentage is called the "House Flower Pot" and is specified per Lotus Season.`,
    `• Petals can be unpicked (cancelled - and completely refunded) if they have not yet been considered for a petal draw. Petals cannot be unpicked 5 minutes before a draw, or any later. Draws happen at the beginning of each hour. This means if a petal is picked five minutes before the next draw, which happens at the beginning of each hour, that petal cannot be unpicked.`,
    `• The petal draw happens on the hour slightly after the start of the hour and it takes a small amount of time to process. If a petal was picked for the draw after the draw's hour and the draw was a winning draw, then any petal picked for that draw after the draw's hour will be unpicked and refunded.`,
    `• The petal draw probability can be described using a mathematical function of the following form: for a number of chosen petals x, the probability of winning the Flower Pot (minus the House Flower Pot) per draw is given by the function f( x ) = ( x / 1260 ) * 100%.`
];


export default () => {

    const styles = getStyles();

    const textElements = texts.map( text => {

        return e(
            Typography,
            {
                style: styles.text,
            },
            text
        );
    });

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        ...textElements
    ); 
};
