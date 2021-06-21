import { createElement as e } from 'react';
// import { getState } from '../../reduxX';
// import { story } from '../../constants';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// import Typography from '@material-ui/core/Typography';
// import FullscreenIcon from '@material-ui/icons/Fullscreen';
// import IconButton from '@material-ui/core/IconButton';


const getStyles = ({

    dialogMode,
    isLoading,
    moneyActions,

}) => {
    
    const {

        outerContainerWidth,
        outerContainerHeight,
        outerContainerBackgroundColor,
        textColor,

    } = dialogMode ? {

        outerContainerWidth: '100%',
        outerContainerHeight: '100%',
        outerContainerBackgroundColor: 'white',

        textColor: 'black',

    } : {

        outerContainerWidth: '90%',
        outerContainerHeight: '80%',
        outerContainerBackgroundColor: 'black',
        textColor: 'white',
    };

    const {

        textSize,
        fontWeight

    } = !!moneyActions ? {

        textSize: 22,

    } : {

        textSize: 16,
        fontWeight: 'bold',
    };

    return {

        outerContainer: {
            // backgroundColor: mainStyleObject.backgroundColor,
            // backgroundColor: '#FF9900',
            backgroundColor: outerContainerBackgroundColor,
            width: outerContainerWidth,
            minWidth: 300,
            height: outerContainerHeight,

            marginBottom: 20,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        theTextBox: {

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '95%',

        },

        theText: {

            textColor,
            textAlign: 'center',
            fontSize: textSize,
            fontWeight,
        }
    };
};


export default ({

    dialogMode,
    moneyActions

}) => {

    // const isLoading = getState( 'isLoading' );

    const styles = getStyles({

        dialogMode,
        moneyActions,
    });

    const text = !moneyActions ? (
        'Loading Transactions...'
     ) : (
        'Currently no transactions. Deposit some Bitcoin to start!🤠'
     );

    return e(
        Box,
        {
            style: styles.outerContainer
        },
        e(
            Box,
            {
                style: styles.theTextBox,
            },
            e(
                Typography,
                {
                    style: styles.theText
                },
                text
            )
        )
    );
};
