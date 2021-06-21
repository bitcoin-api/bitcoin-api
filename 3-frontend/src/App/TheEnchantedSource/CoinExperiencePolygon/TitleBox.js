import { createElement as e, useEffect } from 'react';
import {
    setState
} from '../../reduxX';
import { actions } from '../../utils';
import { story, pages } from '../../constants';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import BlurLinearIcon from '@material-ui/icons/BlurLinear';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );
    
    return {

        emptyBox: {

            width: 49,
            height: 49,
        },

        helpIcon: {

            color: 'white',
            fontSize: 25,
        },

        titleBox: {

            width: '100%',

            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            // justifyContent: 's',
            alignItems: 'center',
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
    };
};


export default ({

    noDinoCoin,
    setNoDinoCoin

}) => {

    useEffect( () => {

        actions.scroll();
        actions.setLastVisitedPage({

            loggedInMode: true,
            page: pages.loggedInMode.coinFlip,
        });

    }, [] );

    const styles = getStyles();

    const subtitleText = 'Coin Toss Game';

    return e(
        Box,
        {
            style: styles.titleBox,
        },
        e(
            IconButton,
            {
                onClick: () => {

                    setNoDinoCoin( !noDinoCoin );
                },
            },
            e(
                BlurLinearIcon,
                {
                    style: styles.helpIcon,
                }
            )
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
                `The Dragon's Talisman`
            ),
            e(
                Typography,
                {
                    style: styles.subtitleText,
                    variant: 'h2',
                },
                subtitleText
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
                        story.dialogModes.games.aboutCoinFlip
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
