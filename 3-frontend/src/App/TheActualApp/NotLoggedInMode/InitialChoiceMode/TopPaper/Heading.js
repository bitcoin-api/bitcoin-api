import { createElement as e } from 'react';
// import { setState/*, getState*/ } from '../../../reduxX';
// import { story } from '../../../constants';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const getStyles = () => {

    return {

        outerContainer: {

            // backgroundColor: 'black',
            width: '100%',
            maxWidth: 320,
            borderRadius: 4,
            // padding: 5,
            // height: 320,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: 'black',
        },

        theText: {
            width: '95%',
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
        },
    };
};


export default () => {

    const styles = getStyles();

    return e(
        Paper,
        {
            style: styles.outerContainer,
            elevation: 5,
        },
        e(
            Typography,
            {
                style: styles.theText,
            },
            'Bitcoin Games and Technology'
        )
    );
};
