import { createElement as e } from 'react';
import Button from '@material-ui/core/Button';

// 
const getStyles = ({


    marginTop,
    marginBottom,
    isLoadingMode,

}) => {

    return {

        backButton: {
            backgroundColor: isLoadingMode ? 'grey' : 'beige',
            marginTop,
            marginBottom,
            marginRight: 15,
            marginLeft: 15,
            borderRadius: 4,
            width: '75%',
            height: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        // text: {

        //     textAlign: 'center',
        //     color: 'black',
        //     fontSize: 20,
        // }
    };
};


export default ({

    onClick,
    text,
    isLoadingMode = false,
    marginTop = 0,
    marginBottom = 0,

}) => {

    const styles = getStyles({

        marginTop,
        marginBottom,
        isLoadingMode,
    });

    return e(
        Button,
        {
            style: styles.backButton,
            onClick: isLoadingMode ? () => {} : onClick,
        },
        text
    );
};
