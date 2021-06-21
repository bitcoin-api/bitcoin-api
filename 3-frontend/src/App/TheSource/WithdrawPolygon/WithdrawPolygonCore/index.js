import { createElement as e } from 'react';
import CurrentAmountSection from './CurrentAmountSection';
import CurrentFeeSection from './CurrentFeeSection';
import AmountSection from './AmountSection';
import AddressInput from './AddressInput';
import WithdrawButton from './WithdrawButton';
import Divider from '@material-ui/core/Divider';


const getStyles = () => {

    return {

        divider: {
            backgroundColor: 'black'
        }
    };
};


export default () => {

    const styles = getStyles();

    return [
        e(
            Divider,
            {
                key: 'divider1',
                style: styles.divider
            }
        ),
        e( CurrentAmountSection, { key: 'x' } ),
        e( CurrentFeeSection, { key: 'y' } ),
        e(
            Divider,
            {
                key: 'divider2',
                style: styles.divider
            }
        ),
        e( AmountSection, { key: 'a' } ),
        e(
            Divider,
            {
                key: 'divider3',
                style: styles.divider
            }
        ),
        e( AddressInput, { key: 'b' } ),
        e( WithdrawButton, { key: 'c' } )
    ];
};
