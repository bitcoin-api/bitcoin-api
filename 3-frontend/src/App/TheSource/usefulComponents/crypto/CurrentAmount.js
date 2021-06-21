import { createElement as e } from 'react';
import { getState } from '../../../reduxX';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const getStyles = ({

    width,
    height,
    color,
    fontWeight,
    balanceFontSize,
    backgroundColor,
    borderRadius,
    maxWidth,

}) => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        amountDisplayOuterContainer: {

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            
            height,
            width,
            maxWidth,
            backgroundColor,
            borderRadius,

            // alignSelf: 'flex-end',
        },

        amountDisplayTopText: {

            color,
            // fontSize,
            textAlign: 'center',
            width: '100%',
            fontWeight,
        },

        amountDisplayAmountText: {

            color,
            fontSize: balanceFontSize,
            textAlign: 'center',
            width: '100%',
        },
    };
};


const getText = ({
    
    textVersion,
    crypto

}) => {

    if( textVersion === 'b' ) {

        return `Current ${ crypto ? 'Dynasty Bitcoin' : 'Bitcoin' } Amount`;
    }
    else if( textVersion === 'c' ) {

        return 'Balance';
    }
    
    return `Current Amount in ${ crypto ? 'Dynasty Bitcoin' : 'Bitcoin' }`;
};


export default ({

    backgroundColor = 'beige',
    crypto = true,
    width = 160,
    maxWidth,
    fontWeight = 'bold',
    height = 100,
    color = 'black',
    textVersion = 'a',
    borderRadius = 4,
    freeGameMode,
    noTitleText = false,
    balanceFontSize = 16,

}) => {

    const styles = getStyles({

        width,
        height,
        color,
        fontWeight,
        backgroundColor,
        borderRadius,
        maxWidth,
        balanceFontSize,
    });

    const balanceAmountText = freeGameMode ? (
        
        getState( 'notLoggedInMode', 'freeGameModeBalance' )

    ) : (
        
        getState( 'loggedInMode', 'userData' ).balanceData.summary[
            
            crypto ? 'crypto' : 'bitcoin'

        ].totalAmount
    );

    const balanceText = (
        `${ balanceAmountText } ${ crypto ? 'DB' : 'BTC' }`
    );

    return e(
        Box,
        {
            style: styles.amountDisplayOuterContainer,
        },
        !noTitleText && e(
            Typography,
            {
                style: styles.amountDisplayTopText,
            },
            getText({

                textVersion,
                crypto,
            })
        ),
        e(
            Typography,
            {
                style: styles.amountDisplayAmountText
            },
            balanceText
        )
    );
};
