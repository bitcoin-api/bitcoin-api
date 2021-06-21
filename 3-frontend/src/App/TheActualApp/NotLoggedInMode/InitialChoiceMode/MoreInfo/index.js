import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { story } from '../../../../constants';
import { setState } from '../../../../reduxX';
// import Link from '@material-ui/core/Link';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import LegalSection from './LegalSection';


const getStyles = () => {

    return {

        outerContainer: {
            // backgroundColor: 'beige',
            width: '100%',
            maxWidth: 620,
            minWidth: 300,
            // height: 40,
            // backgroundColor: 'pink',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        row: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 25,
            marginBottom: 30,
        },

        outerContainerRow2: {
            width: 160,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 35,
            borderRadius: 5,
        },

        row2Title: {
            color: 'black',
            width: '91%',
            // width: '100%',
            // marginLeft: 10,
            marginTop: 10,
        },

        row2Divider: {

            width: '91%',
            backgroundColor: 'black',
        },

        row2: {
            width: '91%',
            // width: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 10,
            // marginTop: 30,
        },

        button: {
            // backgroundColor: 'beige',
            // width: '85%',
            // height: 40,
            color: 'white',
        },

        link: {
            color: 'black',
            paddingTop: 10,
            paddingBottom: 10,
            // marginRight: 20,
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
            Box,
            {
                style: styles.row,
            },
            e( 
                Button,
                {
                    style: styles.button,
                    onClick: () => {

                        setState(
                            [ 'dialogMode' ],
                            story.dialogModes.about
                        );
                    },
                },
                'About'
            ),
            e( 
                Button,
                {
                    style: styles.button,
                    onClick: () => {

                        setState(
                            [ 'dialogMode' ],
                            story.dialogModes.faq
                        );
                    },
                },
                'FAQ'
            )
        ),
        // e(
        //     Divider,
        //     {
        //         style: {
        //             width: '64%',
        //             backgroundColor: 'beige',
        //             marginTop: 30,
        //         }
        //     }
        // ),
        // e(
        //     Box,
        //     {
        //         style: styles.outerContainerRow2,
        //     },
        //     e(
        //         Typography,
        //         {
        //             style: styles.row2Title,
        //         },
        //         'On the Web'  
        //     ),
        //     e(
        //         Divider,
        //         {
        //             style: styles.row2Divider,
        //         }
        //     ),
        //     e(
        //         Box,
        //         {
        //             style: styles.row2,
        //         },
        //         e( 
        //             Link,
        //             {
        //                 style: styles.link,
        //                 href: 'https://twitter.com/DynastyBitcoin',
        //                 target: '_blank',
        //                 rel: 'noopener',
        //             },
        //             'Twitter'
        //         )//,
        //         // e( 
        //         //     Link,
        //         //     {
        //         //         style: styles.link,
        //         //         href: 'https://discord.gg/TdHHvsg',
        //         //         target: '_blank'
        //         //     },
        //         //     'Discord'
        //         // )
        //     )
        // )
    );
};
