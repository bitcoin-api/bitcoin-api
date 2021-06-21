import { createElement as e } from 'react';
import { getState } from '../../../../../../../reduxX';
// import {
//     usefulComponents,
//     // POWBlock,
// } from '../../TheSource';
// import {
//     enchanted
// } from '../../../../../../../utils';
import Box from '@material-ui/core/Box';
import SortByTicket from './SortByTicket';
import SortByUser from './SortByUser';
import { gameData } from '../../../../../../../constants';
// import SortSelector from './SortSelector';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';


const getStyles = () => {
    
    return {

        metaContainer: {

            width: '100%',
            
            height: 200,
            backgroundColor: '#FDFEF4',
            // backgroundColor: 'green',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',

            // marginTop: 10,
            // marginBottom: 10,
        },
    };
};



export default ({

    raffleDatum,

}) => {

    const styles = getStyles();

    const {

        data,
        sortByOption,

    } = getState(

        'destinyRaffle',
        'raffleIdToTicketData'

    )[ raffleDatum.raffleId ] || {

        data: [],
        sortByOption: gameData.destinyRaffle.sortByUser,
    };

    const ownSpecialId = getState(

        'destinyRaffle',
        'ownSpecialId'

    );

    const sortByElement = (
        
        sortByOption ===
        gameData.destinyRaffle.sortByUser

    ) ? e(
        
        SortByUser,
        {
            data,
            ownSpecialId,
        }

    ) : e(
        
        SortByTicket,
        {
            data,
            ownSpecialId,
        }
    );

    return e(
        Box,
        {
            style: styles.metaContainer
        },
        sortByElement
    );
};