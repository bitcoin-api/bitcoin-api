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
import getSortByUserProcessedData from './getSortByUserProcessedData';
// import SortSelector from './SortSelector';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';

const getUserBoxBackgroundColour = ({

    alt,
    own,

}) => {

    if( own ) {

        return 'lightgreen';
    }

    return alt ? '#FDFEF4': '#F4F5DB';
};


const getUserBoxStyle = ({

    alt = false,
    own = false,

} = { alt: false, own: false }) => {

    return {

        backgroundColor: getUserBoxBackgroundColour({

            alt,
            own,
        }),
        width: '100%',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: 45,
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

        ownUserBox: getUserBoxStyle({ own: true }),

        userBox: getUserBoxStyle(),

        altUserBox: getUserBoxStyle({ alt: true }),

        userBoxTicketText: {
            
            width: '90%',
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'left',
        },

        userBoxDataText: {

            width: '90%',
            fontSize: 14,
            color: 'black',
            textAlign: 'left',
        }
    };
};


const selectUserBoxStyle = ({

    styles,
    index,
    isOwn
    
}) => {

    if( isOwn ) {

        return styles.ownUserBox;
    }

    return (

        (index % 2) === 0
        
    ) ? styles.userBox : styles.altUserBox;
};


export default ({

    data,
    ownSpecialId,

}) => {

    const styles = getStyles();

    const userListItems = getSortByUserProcessedData({

        data,
        ownSpecialId,

    }).map(
        
        ( choiceDatum, index ) => {

            const isOwn = choiceDatum.own;

            // do get box style, consider own too

            return e(
                Box,
                {
                    style: selectUserBoxStyle({

                        styles,
                        index,
                        isOwn
                    })
                },
                e(
                    Typography,
                    {
                        style: styles.userBoxTicketText,
                    },
                    isOwn ? `${ choiceDatum.name } (self)` : choiceDatum.name,
                ),
                e(
                    Typography,
                    {
                        style: styles.userBoxDataText,
                    },
                    choiceDatum.choices.join( ', ' )
                )    
            );
        }
    );

    return e(
        Box,
        {
            style: styles.metaContainer
        },
        ...userListItems
    );
};