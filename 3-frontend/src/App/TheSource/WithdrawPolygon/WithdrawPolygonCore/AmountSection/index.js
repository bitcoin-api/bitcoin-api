import { createElement as e } from 'react';
// import { getState } from '../../../../reduxX';
import AmountInput from './AmountInput';
import FullWithdrawSelect from './FullWithdrawSelect';
import TotalWithdrawAmount from './TotalWithdrawAmount';
import Box from '@material-ui/core/Box';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            width: '100%',
            // backgroundColor: mainStyleObject.backgroundColor,
            backgroundColor: 'beige',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
    };
};


export default () => {

    const styles = getStyles();

    return e(
        Box,
        {
            style: styles.outerContainer
        },
        e( AmountInput ),
        e( FullWithdrawSelect ),
        e( TotalWithdrawAmount )
    );
};
