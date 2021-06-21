import { createElement as e /*, useState, useEffect*/ } from 'react';
import Box from '@material-ui/core/Box';
import TitleBar from './TitleBar';
import ReferralSpace from './ReferralSpace';
// import Typography from '@material-ui/core/Typography';
// import { getState } from '../../reduxX';
// import componentDidMount from './componentDidMount';


const getStyles = () => {
    
    return {

        outerContainer: {
            // backgroundColor: mainStyleObject.backgroundColor,
            backgroundColor: 'beige',
            width: '100%',
            maxWidth: 620,
            // height: 50,

            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
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
        e( TitleBar ),
        e( ReferralSpace )
    );
};
