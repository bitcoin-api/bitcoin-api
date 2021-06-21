import {
    createElement as e,
} from 'react';
import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { getState, setState } from '../../../reduxX';
import { story } from '../../../constants';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            // backgroundColor: mainStyleObject.backgroundColor,
            // backgroundColor: 'pink',
            width: '100%',
            // height: 300,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        container: {

            // backgroundColor: mainStyleObject.backgroundColor,
            // backgroundColor: 'black',
            width: '92%',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'left',
            borderRadius: 4,
        },

        // text: {

        //     // backgroundColor: mainStyleObject.backgroundColor,
        //     backgroundColor: 'black',
        //     // width: '100%',
        //     // height: '20%',
        //     marginTop: 5,
        //     marginBottom:3,
        //     marginLeft: 5,
        //     marginRight: 5,
        // },


        innerContainer: {

            // backgroundColor: mainStyleObject.backgroundColor,
            backgroundColor: 'black',
            width: 260,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
        },

        button: {

            // backgroundColor: mainStyleObject.backgroundColor,
            backgroundColor: 'beige',
            width: 250,
            // height: '20%',
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 5,
            marginRight: 5,
        },
    };
};


export default (
//     {

//     balanceData,

// }
) => {

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
                style: styles.container
            },
            // e(
            //     Typography,
            //     {
            //         style: styles.text,
            //     },
            //     `Deposit Address:`
            // ),
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
                        onClick: () => {
    
                            setState(
                                'dialogMode',
                                story.dialogModes.depositsBastion,
                            );
                        },
                        // onClick: async () => {
    
                        //     try {
            
                        //         setState( 'isLoading', true );
            
                        //         await addAddress();
        
                        //         setState( 'isLoading', false );
                        //     }
                        //     catch( err ) {
            
                        //         setState( 'isLoading', false );
        
                        //         alert(            
                        //             `error in getting address: ${
                                        
                        //                 (
                        //                     !!err &&
                        //                     !!err.response &&
                        //                     !!err.response.data &&
                        //                     !!err.response.data.message &&
                        //                     err.response.data.message
                        
                        //                 ) || 'internal server error'
                        //             }`
                        //         );
                        //     }
                        // },
                    },
                    'Deposit Bitcoin'
    
                )
            )
        )
    );
};
