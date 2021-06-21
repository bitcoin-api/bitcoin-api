import {
    createElement as e,
} from 'react';
import { getState } from '../../../reduxX';
import Box from '@material-ui/core/Box';
import VerticalSection from './VerticalSection';
import ButtonSection from './ButtonSection';


export default ({

    freeGameMode,

}) => {

    const slotNumber1 = getState(

        'loggedInMode',
        'slot',
        'slotNumber1'
    );

    const slotNumber2 = getState(

        'loggedInMode',
        'slot',
        'slotNumber2'
    );

    const slotNumber3 = getState(

        'loggedInMode',
        'slot',
        'slotNumber3'
    );

    return e(
        Box,
        {
            style: {

                width: '100%',
                // height: 200,
                marginTop: 33,
                // backgroundColor: 'crimson',

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            },
        },
        e(
            Box,
            {
                style: {
                    width: '91%',
                    // height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',    
                }
            },
            e(
                VerticalSection,
                {
                    slotNumber: slotNumber1,
                }
            ),
            e(
                VerticalSection,
                {
                    slotNumber: slotNumber2,
                }
            ),
            e(
                VerticalSection,
                {
                    slotNumber: slotNumber3,
                }
            )
        ),
        e(
            ButtonSection,
            {
                freeGameMode,
            }
        )
    );
};
