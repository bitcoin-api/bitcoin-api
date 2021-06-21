import { createElement as e } from 'react';
import { setState } from '../../reduxX';
// import {
    // usefulComponents,
    // POWBlock,
// } from '../../TheSource';
// import { actions } from '../../utils';
// import { story } from '../../constants';
// import doEnchantedLuck from './CoinFlipCommandCenter/doEnchantedLuck';
import Box from '@material-ui/core/Box';
// import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import About from './About';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
// import doExchange from './doExchange';


const getStyles = ({

    marginTop,
    marginBottom,

}) => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        titleBox: {

            width: '100%',

            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            // justifyContent: 's',
            alignItems: 'center',
            marginTop,
            marginBottom,
        },

        emptyBox: {

            width: 49,
            height: 49,
        },

        helpIcon: {

            color: 'white',
            fontSize: 25,
        },

        titleTextBox: {

            // width: '100%',
            // backgroundColor: 'beige',
            backgroundColor: 'black',
            color: 'white',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        titleText: {

            paddingTop: 10,
            // paddingBottom: 10,
            // color: 'black',
            color: 'white',
            fontSize: 20,
            // fontWeight: 'bold',
            textAlign: 'center',
            // padding: 15,
        },

        subtitleText: {

            // backgroundColor: 'white',
            color: 'white',
            // color: 'black',
            borderRadius: 6,
            borderWidth: 1,
            borderColor: 'white',
            borderStyle: 'solid',
            // fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center',
            marginTop: 9,
            paddingTop: 2,
            paddingBottom: 2,
            paddingRight: 5,
            paddingLeft: 5
        },

        divider: {

            backgroundColor: 'black',
            width: '100%'
        }
    };
};


export default ({

    title = 'Game',
    type = 'Dice',
    helpDialogMode,
    marginTop = 0,
    marginBottom = 0,
    
}) => {

    const styles = getStyles({

        marginTop,
        marginBottom
    });

    return e(
        Box,
        {
            style: styles.titleBox,
        },
        e(
            Box,
            {
                style: styles.emptyBox,
            },    
        ),
        e(
            Box,
            {
                style: styles.titleTextBox
            },
            e(
                Typography,
                {
                    style: styles.titleText,
                    variant: 'h1',
                },
                title
            ),
            e(
                Typography,
                {
                    style: styles.subtitleText,
                    variant: 'h2',
                },
                type
            )
        ),
        e(
            IconButton,
            {
                onClick: () => {

                    setState(
                        [
                            'dialogMode'
                        ],
                        helpDialogMode
                    );
                },
            },
            e(
                HelpOutlineIcon,
                {
                    style: styles.helpIcon,
                }
            )
        )
    );
};
