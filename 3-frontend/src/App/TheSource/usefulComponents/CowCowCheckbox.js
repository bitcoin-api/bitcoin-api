import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
// import Checkbox from '../../constants';

const getStyles = ({

    marginTop,
    marginBottom,
    alignItems
}) => {
    
    return {

        metaOuterContainer: {

            width: '100%',
            marginTop,
            marginBottom,
            backgroundColor: 'beige',
            // borderRadius: 4,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems,
            // backgroundColor: 'darkGreen',
        },

        outerContainer: {
            borderRadius: 0,
            width: '80%',
            // margin: 10,
            // padding: 5,
            // height: 200,


            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            // backgroundColor: 'green',
        },

        checkbox: {

            // marginLeft: 20,
            // height: 20,
            // width: 20,
            color: 'black'
        },

        textAndMore: {

            // width: '74%',
            textAlign: 'left',
            color: 'black',
            fontSize: 16,
            marginLeft: 8,
            // padding: 10,

            userSelect: 'none',
        }
    };
};


export default ({

    isLoadingMode,
    text,
    marginTop = 0,
    marginBottom = 0,
    checked,
    onCheck,
    isBox = false,
    alignItems = 'left',

}) => {

    const styles = getStyles({

        isLoadingMode,
        marginTop,
        marginBottom,
        alignItems
    });

    return e(
        isBox ? Box : Paper,
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
                    disabled: isLoadingMode,
                    type: 'checkbox',
                    checked,
                    style: styles.checkbox,
                    onChange: onCheck,
                }
            ),
            e(
                Typography,
                {
                    style: styles.textAndMore
                },
                text
            )
        ),
    );
};
