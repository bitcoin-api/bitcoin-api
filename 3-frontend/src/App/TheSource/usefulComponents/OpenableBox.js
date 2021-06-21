import { createElement as e, useState } from 'react';
// import { getState } from '../../../../reduxX';
// import {
//     usefulComponents,
//     // POWBlock,
// } from '../../TheSource';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const getStyles = ({

    width,
    maxWidth,
    minWidth,
    isOpen

}) => {
    
    return {
        
        outerContainer: {
            backgroundColor: '#D0D2A8',
            width,
            maxWidth,
            minWidth,
            height: isOpen ? undefined : 61,
            // minHeight: 75,
            borderRadius: 10,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        topBar: {

            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '94%',
            marginTop: 10,
            marginBottom: 15,
        },

        leftTopBarPlaceHolder: {

            width: 50,
        },

        rightButton: {

            width: 50,
        },

        titleText: {

            fontSize: 16,
            color: 'black',
            fontWeight: 'bold',
        },

        contentsBox: {

            width: '100%',
            backgroundColor: '#D0D2A8',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            borderRadius: 10,
            alignItems: 'center',
        },
        contentsInsideBox: {

            width: '90%',
            // backgroundColor: '#D0D2A8',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        }
    };
};


export default ({

    title,
    ContentComponent = Box,
    contentProps = {},
    width = '48%',
    maxWidth = '100%',
    minWidth = 265,
    showHideButtonIsDisabled = false,
    // width: '48%',
    // maxWidth: '48%',
    // minWidth: 300,

}) => {

    const [ isOpen, setIsOpen ] = useState( false );
    // const [ isOpen, setIsOpen ] = useState( true );

    const styles = getStyles({

        width,
        maxWidth,
        minWidth,
        isOpen
    });

    return e(
        Box,
        {
            style: styles.outerContainer
        },
        e(
            Box,
            {
                style: styles.topBar,
            },
            e(
                Box,
                {
                    style: styles.leftTopBarPlaceHolder,
                }
            ),
            e(
                Typography,
                {
                    style: styles.titleText,
                },
                title
            ),
            e(
                Button,
                {
                    disabled: showHideButtonIsDisabled,
                    style: styles.rightButton,
                    onClick: () => {

                        setIsOpen( !isOpen );
                    },
                },
                isOpen ? 'Hide' : 'View'
            )
        ),
        isOpen && e(
            Box,
            {
                style: styles.contentsBox,
            },
            e(
                Box,
                {
                    style: styles.contentsInsideBox,
                },
                e(

                    ContentComponent,
                    contentProps
                )
            )
        )
    );
};
