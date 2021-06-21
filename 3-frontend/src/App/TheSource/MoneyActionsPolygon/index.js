import { createElement as e, useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
import { getState } from '../../reduxX';
import TitleBar from './TitleBar';
import NullBox from './NullBox';
import Juice from './Juice';
import componentDidMount from './componentDidMount';


const getStyles = ({

    dialogMode,

}) => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    const {

        outerContainerHeight,
        outerContainerBackgroundColor,
        outerContainerMaxWidth,

    } = dialogMode ? {

        outerContainerHeight: '100%',
        outerContainerBackgroundColor: 'white',
        outerContainerMaxWidth: '100%',

    } : {

        outerContainerHeight: 320,
        outerContainerBackgroundColor: 'beige',
        outerContainerMaxWidth: 620,
    };

    return {

        outerContainer: {
            // backgroundColor: mainStyleObject.backgroundColor,
            backgroundColor: outerContainerBackgroundColor,
            width: '100%',
            maxWidth: outerContainerMaxWidth,
            height: outerContainerHeight,

            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
    };
};


const getTheJuice = ({

    errorValue,
    moneyActions,
    dialogMode,

}) => {

    if( !!errorValue ) {

        return e(

            Box,
            {
                style: {
                    marginBottom: 244,
                    color: 'red'
                }                
            },
            'Error in loading transactions.'
        );
    }

    if( !moneyActions || (moneyActions.length === 0) ) {

        return e(

            NullBox,
            {
                dialogMode,
                moneyActions,
            }
        );
    } 

    return e(

        Juice,
        {
            dialogMode,
            moneyActions,
        }
    ); 
};


export default ({
    
    dialogMode = false,

}) => {

    const [ errorValue, setErrorValue ] = useState( false );

    useEffect( () => {

        Promise.resolve().then( async () => {

            try {

                await componentDidMount();
            }
            catch( err ) {

                console.log( 'error in loading transactions occurred:', err );

                setErrorValue( true );
            }
        });

    }, [] );

    const styles = getStyles({

        dialogMode,
    });

    const moneyActions = getState(

        'transactionsPolygon',
        'moneyActions'
    );

    const theJuice = getTheJuice({
        
        errorValue,
        moneyActions,
        dialogMode,
    });

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        dialogMode ? null : e( TitleBar ),
        theJuice
    );
};
