import { createElement as e } from 'react';
import CowCowCheckbox from '../../../usefulComponents/CowCowCheckbox';
import { getState, setState } from '../../../../reduxX';
import Box from '@material-ui/core/Box';


const getStyles = () => {
    
    return {

        outerContainer: {
            backgroundColor: 'beige',

            width: 300,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
    };
};


export default () => {

    const styles = getStyles();

    const isLoading = getState( 'isLoading' );
    const fullWithdraw = getState( 'withdrawPolygon', 'fullWithdraw' );

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            CowCowCheckbox,
            {
                alignItems: 'center',
                isBox: true,
                isLoadingMode: isLoading,
                text: 'Withdraw Full Amount',
                marginTop: 0,
                marginBottom: 0,
                checked: fullWithdraw,
                onCheck: event => {

                    setState(
                        [
                            'withdrawPolygon',
                            'fullWithdraw'
                        ],
                        event.target.checked
                    );
                },
            }
        )
    );
};
