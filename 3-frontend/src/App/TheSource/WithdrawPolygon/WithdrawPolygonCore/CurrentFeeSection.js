import { createElement as e, useEffect } from 'react';
import { getState, setState } from '../../../reduxX';
import { bitcoinExchange } from '../../../utils';
import Box from '@material-ui/core/Box';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import { usefulComponents } from '../../../TheSource';
import Typography from '@material-ui/core/Typography';


const getStyles = () => {
    
    return {

        outerContainer: {
            backgroundColor: 'beige',
            width: '100%',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        headerText: {

            width: '100%',
            paddingTop: 10,
            color: 'black',
            fontSize: 16,
            textAlign: 'center',
            fontWeight: 'bold',
        },

        text: {

            width: '100%',
            paddingTop: 5,
            paddingBottom: 20,
            color: 'black',
            fontSize: 16,
            textAlign: 'center',
            // padding: 15,
        },
    };
};


export default () => {

    useEffect( () => {

        Promise.resolve().then( async () => {

            try {

                const fee = getState( 'withdrawPolygon', 'fee' );

                if( Number( fee ) === 0 ) {

                    const {

                        fee

                    } = await bitcoinExchange.getFeeData();

                    setState(
                        [ 'withdrawPolygon', 'fee' ],
                        String( fee )
                    );
                }
            }
            catch( err ) {

                console.log( 'error in getting fee' );
            }
        });

    }, [] );

    const styles = getStyles();

    const fee = getState( 'withdrawPolygon', 'fee' );

    const feeToDisplay = (Number( fee ) === 0) ? '-' : `${ fee } BTC`;

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            Typography,
            {
                style: styles.headerText
            },
            'Blockchain Fee Estimate'
        ),
        e(
            Typography,
            {
                style: styles.text
            },
            feeToDisplay
        )      
    );
};
