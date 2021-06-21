import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const getStyles = () => {

    return {

        outerContainer: {

            width: '100%',
            // height: 100,
            // backgroundColor: 'pink',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
        },

        text: {

            width: '90%',
            // height: 100,
            color: 'black',
            marginTop: 15,
            marginBottom: 5,
            // padding: 5,
        },
    };
};


export default () => {

    const styles = getStyles();

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            Typography,
            {
                style: styles.explanationText,
            },
        ),
        e(
            Typography,
            {
                style: styles.explanationText,
            },
        ),
        
        e(
            Typography,
            {
                style: styles.text,
            },
            `• The Dragon's Talisman is a coin toss type game where the user tosses The Dragon's Talisman to have a chance at winning Dynasty Bitcoin (DB).`
            // `• The Dragon's Talisman is a dice game with a 49.5% win rate`
        ),
        
        e(
            Typography,
            {
                style: styles.text,
            },
            '• In ',
            e(
                'span',
                {
                    style: {
                        fontWeight: 'bold',
                    }
                },
                'Jackpot Mode'
            ),
            `, the user has a 49.5% probability of winning the talisman (coin) toss. ` +
            `Winning immediately returns twice the user's input Dynasty Bitcoin (DB). ` +
            `In addition, when you win you have a ` +
            `1 in 100000 chance of winning the jackpot. ` +
            'The jackpot increases as users play. ' +
            'The amount the winner gets on jackpot win is calculated by ', 
            e(
                'span',
                {
                    style: {
                        fontStyle: 'italic',
                        color: 'blue',
                    }
                },
                `(wager ÷ max wager) x jackpot`
            ),
            ', this means wagering the max wager wins the full jackpot. ' +
            'The jackpot winnings have a 5% house fee. ' +
            'Odds/house fee subject to change in order to optimize game experience.'
            // `• The Dragon's Talisman is a dice game with a 49.5% win rate`
        ),

        e(
            Typography,
            {
                style: styles.text,
            },
            '• In ',
            e(
                'span',
                {
                    style: {
                        fontWeight: 'bold',
                    }
                },
                'Diamond Mode'
            ),
            `, the user has a 49.99% probability of winning the talisman (coin) toss. Winning immediately returns twice the user's input Dynasty Bitcoin (DB).`
            // `• The Dragon's Talisman is a dice game with a 49.5% win rate`
        ),
        
        // BELOW OG:
        // e(
        //     Typography,
        //     {
        //         style: styles.text,
        //     },
        //     `• The Dragon's Talisman is a coin toss type game where the user has a 49.99% probability of winning the talisman (coin) toss. Winning immediately returns twice the user's input Dynasty Bitcoin (DB).`
        //     // `• The Dragon's Talisman is a dice game with a 49.5% win rate`
        // ),


        // e(
        //     Typography,
        //     {
        //         style: styles.text,
        //     },
        //     `• The best way to win is from botting, good luck!🤠🤖📈 ` +
        //     '(Max rate is 500 talisman flips per hour, will increase to a large amount in the future👾📈📈)'
        //     // `• The Dragon's Talisman is a dice game with a 49.5% win rate`
        // ),
        // e(
        //     Typography,
        //     {
        //         style: styles.text,
        //     },
        //     `• Stay tuned for Jackpot, Multiplayer, Auto-Botting, and more modes, with higher stakes!!🔮🎉🐲`
        //     // `• The Dragon's Talisman is a dice game with a 49.5% win rate`
        // )
        // ,
        // e(
        //     Typography,
        //     {
        //         style: styles.text,
        //     },
        //     `• Function Definition: f is the function and x is the selected input amount in DB, f( x ) = 0 or 2x DB, with a 49.5% probability of getting 2x DB.`
        // )
    );
};
