import { createElement as e } from 'react';
import { getState, setState } from '../../reduxX';
import { actions } from '../../utils';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const getStyles = ({


    backgroundColor,
    marginBottom,

}) => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            maxWidth: 620,
            width: '100%',
            backgroundColor,
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white',
            marginBottom,
            // marginTop: 10,
            // marginBottom: 40,
        },

        luluLemonButtons: {
            // width: '95%',
            // height: 40,
            // margin: 20,
            // marginTop: 10,
            // marginBottom: 10,
            // marginLeft: 10,
            // marginRight: 10,
            // margin: 20,
            // margin: 20,
            // padding: 0,
            // backgroundColor: 'darkgreen',
            // backgroundColor: '#FF9900',
            // borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        theText: {
            color: 'black',
            fontSize: 18,
            textAlign: 'left',
            marginLeft: 10,
            fontWeight: 'bold',
            // paddingRight: 17,
            // paddingLeft: 17,
        },

        menuButton: {

            marginRight: 10,
        },

        menuButtonText: {
            color: 'black',
        }
    };
};



export default ({

    customButton = null,
    shouldHaveHomeButton = false,
    backgroundColor = 'beige',
    marginBottom = 0,

}) => {

    const styles = getStyles({

        backgroundColor,
        marginBottom,
    });

    const isLoggedIn = actions.getIsLoggedIn();
    const isLoading = getState( 'isLoading' );

    const buttonsAreDisabled = isLoading;

    return e(
        Paper,
        {
            style: styles.outerContainer,
        },
        e(
            Box,
            {
                style: styles.luluLemonButtons,
                onClick: () => {

                    if( buttonsAreDisabled ) {
                        return;
                    }

                    actions.goToHomePage();
                },
            },
            e(
                Typography,
                {
                    style: styles.theText,
                },
                process.env.REACT_APP_WEBSITE_NAME
            )
        ),
        customButton,
        shouldHaveHomeButton && e(
            Button,
            {
                style: styles.menuButton,
                disabled: buttonsAreDisabled,
                onClick: () => {

                    actions.goToHomePage();
                },
            },
            e(
                Typography,
                {
                    style: styles.menuButtonText,
                },
                'Home'
            )
        ),
        isLoggedIn && e(
            Button,
            {
                style: styles.menuButton,
                disabled: buttonsAreDisabled,
                onClick: () => {

                    const drawerIsOpen = getState(
                        'loggedInMode',
                        'drawerIsOpen'
                    );

                    setState(
                        [
                            'loggedInMode',
                            'drawerIsOpen'
                        ],
                        !drawerIsOpen
                    );
                },
            },
            e(
                Typography,
                {
                    style: styles.menuButtonText,
                },
                'Menu'
            )
        )
    );
};
