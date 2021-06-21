import { createElement as e } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


const getStyles = ({

    isLoadingMode,
    marginTop,
    marginBottom,
    borderRadius,
    backgroundColor,
    color,
    width,

}) => {
    
    return {

        outerContainer: {

            width,
            marginTop,
            marginBottom,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        POW: {

            backgroundColor: isLoadingMode ? 'grey' : backgroundColor,
            borderRadius,
            width: '100%',
            // padding: 20,
            userSelect: 'none',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color,
        },
    };
};


export default ({

    onClick,
    text,
    isLoadingMode,
    marginTop = 0,
    marginBottom = 0,
    borderRadius = 4,
    width = 300,
    backgroundColor = 'beige',
    color = 'black',
    form,

}) => {

    const styles = getStyles({

        isLoadingMode,
        marginTop,
        marginBottom,
        borderRadius,
        backgroundColor,
        color,
        width,
    });

    return e(
        Paper,
        {
            style: styles.outerContainer,
        },
        e(
            Button,
            {
                form,
                style: styles.POW,
                disabled: isLoadingMode,
                onClick: isLoadingMode ? () => {} : onClick,
            },
            text
        )
    );
};
