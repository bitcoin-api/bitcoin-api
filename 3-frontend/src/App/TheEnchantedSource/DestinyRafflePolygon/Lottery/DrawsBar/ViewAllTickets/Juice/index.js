import { createElement as e, useEffect } from 'react';
// import { getState } from '../../../../reduxX';
// import {
//     usefulComponents,
//     // POWBlock,
// } from '../../TheSource';
// import {
//     usefulComponents
// } from '../../../../../TheSource';
import Box from '@material-ui/core/Box';
import SortSelector from './SortSelector';
import DisplayBox from './DisplayBox';
import componentDidMount from './componentDidMount';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';


const getStyles = () => {
    
    return {

        metaContainer: {

            width: '100%',
            
            // height: 69,
            backgroundColor: '#FDFEF4',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',

            marginTop: 10,
            marginBottom: 13,
        },
    };
};


export default ({
    
    raffleDatum,
    isLocalLoading,
    setIsLocalLoading,

}) => {

    // component did mount -> raffleIdToTicketData
    // get data, get own special id
    const { raffleId } = raffleDatum;

    useEffect( () => {

        Promise.resolve().then( async () => {

            setIsLocalLoading( true );

            try {
                
                await componentDidMount({
                    
                    raffleId,
                });

                setIsLocalLoading( false );
            }
            catch( err ) {

                setIsLocalLoading( false );
                
                console.log( 'an error occurred:', err );
            }
        });

    }, [ raffleId, setIsLocalLoading ] );

    const styles = getStyles();

    return e(
        Box,
        {
            style: styles.metaContainer
        },
        e(
            SortSelector,
            {
                raffleDatum,
                isLocalLoading,
            }
        ),
        e(
            DisplayBox,
            {
                raffleDatum
            }
        )
    );
};