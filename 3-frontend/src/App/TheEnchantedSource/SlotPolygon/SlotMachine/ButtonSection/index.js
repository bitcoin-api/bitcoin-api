import {
    createElement as e,
} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import doEnchantedLuck from './doEnchantedLuck';
import { getState } from '../../../../reduxX';


export default ({

    freeGameMode

}) => {

    const isLoading = getState( 'isLoading' );

    return e(
        Box,
        {
            style: {

                width: '100%',
                // height: 90,
                marginTop: 50,
                // backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',    
            },
        },
        e(
            Button,
            {
                disabled: isLoading,
                style: {

                    // color: 'black',
                    // backgroundColor: 'white',
                    color: 'white',
                    borderColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',

                    fontSize: 24,
                },

                onClick: async () => {
    
                    await doEnchantedLuck({

                        freeGameMode,
                    });
                },

                variant: 'outlined'
            },
            '0.0001 DB Spin'
            // 'Buy $Barmy'
        )
    );
};
