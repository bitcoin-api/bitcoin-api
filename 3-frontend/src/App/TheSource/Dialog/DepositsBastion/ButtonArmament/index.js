import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
import { getState, setState } from '../../../../reduxX';
// import { story } from '../../../../constants';
import Button from '@material-ui/core/Button';
import addAddress from './addAddress';

// import Typography from '@material-ui/core/Typography';

const getStyles = () => {

    return {

        outerContainer: {

            // backgroundColor: 'pink',
            // width: '100%',
            // width: 300,
            // height: 230,
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'column',
            alignItems: 'center'
        },


        innerContainer: {

            // backgroundColor: mainStyleObject.backgroundColor,
            backgroundColor: 'black',
            width: '100%',
            maxWidth: 620,
            minWidth: 310,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,

            marginTop: 25,
        },

        button: {

            // backgroundColor: mainStyleObject.backgroundColor,
            backgroundColor: 'beige',
            width: '98%',
            maxWidth: 620,
            minWidth: 310,
            // height: '20%',
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 5,
            marginRight: 5,
        },
    };
};


export default () => {

    const styles = getStyles();

    const isLoading = getState( 'isLoading' );

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            Box,
            {
                style: styles.innerContainer,
            },
            e(
            
                Button,
                {
                    disabled: isLoading,
                    style: styles.button,
                    onClick: async () => {

                        try {
        
                            setState( 'isLoading', true );
        
                            await addAddress();
    
                            setState( 'isLoading', false );
                        }
                        catch( err ) {
        
                            setState( 'isLoading', false );
    
                            alert(            
                                `error in getting address: ${
                                    
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
                'Get Bitcoin Deposit Address'
            )
        )
    );
};

