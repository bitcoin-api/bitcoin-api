import { createElement as e } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const getStyles = ({
    marginTop,
    marginBottom,
    isLoadingMode,
    borderRadius,
    width,
}) => {
    
    return {

        outerContainer: {
            backgroundColor: 'beige',
            width,
            // height: 200,
            // padding: 5,
            borderRadius,

            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            justifyContent: 'space-around',
            alignItems: 'center',
            color: 'white',
            marginTop,
            marginBottom,
        },

        innerContainer: {
            width: '95%',
            // height: 200,
            // padding: 5,
            borderRadius,

            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            justifyContent: 'space-around',
            alignItems: 'center',
            color: 'black',
            marginTop,
            marginBottom,
        },

        input: {
            backgroundColor: isLoadingMode ? 'grey' : 'white',

            height: 40,
            width: '90%',
            fontSize: 17,
            // color: 'white',
            // backgroundColor: 'white',
            marginBottom: 8,
            // padding: 10,
            border: 'none',
            borderRadius: 4,
        },

        title: {
            width: '90%',
            textAlign: 'left',
            color: 'black',
            fontSize: 16,
            marginTop: 8,
            marginBottom: 5,
        }
    };
};


export default ({

    value,
    type,
    onChange,
    title,
    width = 300,
    marginTop = 0,
    marginBottom = 0,
    borderRadius = 4,
    isLoadingMode = false,
    baseComponentName = 'paper',
    autoComplete,

}) => {

    const styles = getStyles({
        marginTop,
        marginBottom,
        isLoadingMode,
        borderRadius,
        width,
    });

    return e(
        (baseComponentName === 'box') ? Box : Paper,
        {
            style: styles.outerContainer,
            elevation: 3,
        },
        e(
            Box,
            {
                style: styles.innerContainer,
            },
            e(
                Typography,
                {
                    style: styles.title,
                },
                title
            ),
            e(
                TextField,
                {
                    disabled: isLoadingMode,
                    style: styles.input,
                    value,
                    type,
                    onChange,
                    autoComplete,
                }
            )
        )
    );
};
