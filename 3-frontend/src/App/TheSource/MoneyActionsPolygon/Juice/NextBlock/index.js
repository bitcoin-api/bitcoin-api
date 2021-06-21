import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { getState, setState } from '../../../../reduxX';
import getMoreMoneyActions from './getMoreMoneyActions';


const getStyles = ({

    dialogMode,
    isLoading,

}) => {
    
    const {

        backgroundColor,
        color,

    } = dialogMode ? {

        backgroundColor: 'black',
        color: 'white',

    } : {

        backgroundColor: 'beige',
        color: 'black',
    };

    return {

        outerContainer: {
            // backgroundColor: mainStyleObject.backgroundColor,
            backgroundColor: isLoading ? 'grey' : backgroundColor,
            // width: '94%',
            width: 550,
            maxWidth: '94%',
            // height: 60,

            height: 60,

            marginTop: 10,
            marginBottom: 10,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

            cursor: 'pointer',
        },

        textBox: {

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        text: {

            textAlign: 'center',
            color,
            userSelect: 'none',
        },
    };
};


export default ({

    dialogMode,

}) => {

    const isLoading = getState( 'isLoading' );

    const styles = getStyles({

        dialogMode,
        isLoading,
    });

    return e(
        Box,
        {
            style: styles.outerContainer,
            disabled: isLoading,
            onClick: async () => {

                if( isLoading ) {

                    return;
                }

                try {

                    setState( 'isLoading', true );

                    await getMoreMoneyActions();
                    
                    setState( 'isLoading', false );
                }
                catch( err ) {

                    setState( 'isLoading', false );

                    alert(            
                        `Error in getting more transactions: ${
                            
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
        e(
            Box,
            {
                style: styles.textBox,
            },
            e(
                Typography,
                {
                    style: styles.text,
                },
                'Load More Transactions'
            )
        )
    );
};
