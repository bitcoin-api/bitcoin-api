import { createElement as e } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const getStyles = ({

    marginTop,
    marginBottom,
    
}) => {
    
    return {

        metaOuterContainer: {

            width: 300,
            marginTop,
            marginBottom,
            borderRadius: 4,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'beige',
        },

        outerContainer: {
            // backgroundColor: mainStyleObject.backgroundColor,
            width: '100%',
            padding: 10,
            // height: 200,


            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            // backgroundColor: 'green',
        },

        checkbox: {

            color: 'black',
            marginLeft: 20,
            height: 20,
            width: 20,
        },

        textAndMore: {

            width: '74%',
            textAlign: 'left',
            color: 'black',
            fontSize: 15,

            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginRight: 20,
            userSelect: 'none',
        },

        fakeLinkText: {

            textAlign: 'left',
            color: 'blue',
            textDecoration: 'underline',
            fontSize: 15,
            marginLeft: 5,
            userSelect: 'none',
        },
    };
};


export default ({

    isLoadingMode,
    text,
    linkText,
    marginTop = 0,
    marginBottom = 0,
    checked,
    onLinkClick,
    onCheck,

}) => {

    const styles = getStyles({

        isLoadingMode,
        marginTop,
        marginBottom,
    });

    return e(
        Paper,
        {
            style: styles.metaOuterContainer,
        },
        e(
            Box,
            {
                style: styles.outerContainer,
            },
            e(
                Checkbox,
                {
                    // color: 'black',
                    disabled: isLoadingMode,
                    type: 'checkbox',
                    checked,
                    style: styles.checkbox,
                    onChange: onCheck,
                }
            ),
            e(
                Box,
                {
                    style: styles.textAndMore
                },
                e(
                    Typography,
                    {},
                    text
                ),
                e(
                    Typography,
                    {
                        style: styles.fakeLinkText,
                        onClick: onLinkClick,
                    },
                    linkText
                )
            )
        ),
    );
};
