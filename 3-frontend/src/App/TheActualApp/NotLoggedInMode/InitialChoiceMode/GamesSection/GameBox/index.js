import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { setState } from '../../../../../reduxX';
import makeStyles from '@material-ui/core/styles/makeStyles';


const getStyles = ({

    backgroundColor,

}) => {

    return {

        gameBox: {

            width: 250,
            // height: 250,
            backgroundColor,
            marginTop: 25,
            marginBottom: 20,
            alignSelf: 'center',

            borderRadius: 10,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        mainScreenHolder: {
            borderRadius: 10,
            width: '100%',
            height: 214,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        bottomButton: {

            width: '100%',
            // height
            backgroundColor: 'black',
            color: 'white',
            height: 36,
        }
    };
};

const useStyles = makeStyles({
    root: {

        width: '100%',
        // height
        backgroundColor: 'black',
        color: 'white',
        height: 36,
    },

    text: {
        fontSize: 10,
    }
});


export default ({

    mainScreen = e(
        Box,
        {
            style: {
                width: '100%',
                height: 214,
                backgroundColor: 'white',
            }
        }
    ),
    nameOfTheGame = 'Dino Game',
    gameStateName = null,
    smallButtonText = false,
    backgroundColor = 'beige',
    noActionOnClick = false,

}) => {

    const styles = getStyles({

        backgroundColor,
    });

    const buttonStyles = useStyles();

    const onClick = noActionOnClick ? () => {} : () => {

        setState({

            keys: [
                'notLoggedInMode',
                'freeGame'
            ],
            value: gameStateName
        });
    };

    return e(
        Paper,
        {
            style: styles.gameBox,
        },
        e(
            Box,
            {
                style: styles.mainScreenHolder,
                onClick,
            },
            mainScreen,
        ),
        e(
            Button,
            {
                classes: {
                    
                    root: buttonStyles.root,
                    text: smallButtonText ? buttonStyles.text : undefined,
                },
                // style: styles.bottomButton,
                // textStyle: {

                //     fontSize: 14,

                // },
                onClick,
            },
            nameOfTheGame
        )
    );
};
