import { createElement as e } from 'react';
import { setState } from '../../../reduxX';
// import { story } from '../../constants';
// import {
    // usefulComponents,
    // POWBlock,
// } from '../../TheSource';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import getMore from './getMore';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            // backgroundColor: 'beige',
            width: '100%',

            maxWidth: 620,

            // height: 300,
            // backgroundColor: 'pink',

            marginTop: 20,
            marginBottom: 20,
            // borderRadius: '50%',
            // backgroundColor: 'pink',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        
        button: {

            width: '100%',
            backgroundColor: 'black',
            color: 'white'
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
            Button,
            {
                style: styles.button,
                onClick: async () => {

                    try {
    
                        setState( 'isLoading', true );
    
                        await getMore();

                        setState( 'isLoading', false );
                    }
                    catch( err ) {
    
                        setState( 'isLoading', false );

                        alert(            
                            `error in getting more Lotus Seasons: ${
                                
                                (
                                    !!err &&
                                    !!err.response &&
                                    !!err.response.data &&
                                    !!err.response.data.message &&
                                    err.response.data.message
                
                                ) || 'internal server error'
                            }`
                        );
                    }
                },
            },
            'More Lotus Seasons'
        )
    );
};
