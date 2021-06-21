import { createElement as e } from 'react';
// import { getState } from '../../../../reduxX';
// import {
//     usefulComponents,
//     // POWBlock,
// } from '../../TheSource';
// import {
//     enchanted
// } from '../../../../../../../utils';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import getSortByTicketProcessedData from './getSortByTicketProcessedData';
// import SortSelector from './SortSelector';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';


const getTicketBoxBackgroundColor = ({

    alt = false,
    own = false,

}) => {

    if( own ) {

        return alt ? '#BCF8BC' : 'lightgreen';
    }

    return alt ? '#FDFEF4': '#F4F5DB';
};


const getTicketBoxStyle = ({

    alt = false,
    own = false,

} = { alt: false, own: false, }) => {
    
    return {

        backgroundColor: getTicketBoxBackgroundColor({

            alt,
            own,
        }),
        width: '100%',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: 42,
    };
};


const getStyles = () => {
    
    return {

        metaContainer: {

            width: '100%',
            
            height: '100%',
            // backgroundColor: '#FDFEF4',
            // backgroundColor: 'green',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',

            overflowY: 'scroll',
            // marginBottom: 8,

            // marginTop: 10,
            // marginBottom: 10,
        },

        ticketBox: getTicketBoxStyle(),
        
        altTicketBox: getTicketBoxStyle({ alt: true }),

        ownTicketBox: getTicketBoxStyle({ own: true }),
        
        ownAltTicketBox: getTicketBoxStyle({ own: true, alt: true, }),

        ticketBoxTicketText: {
            
            width: '90%',
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'left',
        },

        ticketBoxDataText: {

            width: '90%',
            fontSize: 12,
            color: 'black',
            textAlign: 'left',
        }
    };
};


const getTicketListItemStyle = ({

    choiceDatum,
    styles,
    index,

}) => {


    if( choiceDatum.own ) {

        return (
        
            (index % 2) === 0
            
        ) ? styles.ownTicketBox : styles.ownAltTicketBox;    
    }

    return (
        
        (index % 2) === 0
        
    ) ? styles.ticketBox : styles.altTicketBox;
};


export default ({

    data,
    ownSpecialId

}) => {

    const styles = getStyles();

    const ticketListItems = getSortByTicketProcessedData({

        data,
        ownSpecialId

    }).map(
        
        ( choiceDatum, index ) => {

            return e(
                Box,
                {
                    style: getTicketListItemStyle({

                        choiceDatum,
                        styles,
                        index
                    }),
                    // style: (

                    //     (index % 2) === 0
                        
                    // ) ? styles.ticketBox : styles.altTicketBox,
                },
                e(
                    Typography,
                    {
                        style: styles.ticketBoxTicketText,
                    },
                    choiceDatum.choice,
                ),
                e(
                    Typography,
                    {
                        style: styles.ticketBoxDataText,
                    },
                    `petal pick count: ${ choiceDatum.numberOfTicketsPurchased }`
                )    
            );
        }
    );

    return e(
        Box,
        {
            style: styles.metaContainer
        },
        ...ticketListItems
    );
};