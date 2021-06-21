import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
import { MoneyActionsPolygon } from '../../TheSource';

const getStyles = () => {

    return {

        outerContainer: {

            // backgroundColor: 'pink',
            width: '100%',
            // display: 'flex',
            // justifyContent: 'center',
            // flexDirection: 'column',
            // alignItems: 'center'
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
        e(
            MoneyActionsPolygon,
            {
                dialogMode: true,
            }
        )
    );
};
