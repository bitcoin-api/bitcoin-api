import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
import { getState } from '../../../reduxX';
// import { actions } from '../../utils';
// import * as constants from '../../../constants';
// import { UltraDataContainer } from '../usefulComponents';
// import Divider from '@material-ui/core/Divider';
import ExcitingBlock from './ExcitingBlock';
import NextBlock from './NextBlock';


const getStyles = ({

    dialogMode

}) => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    const {

        outerContainerWidth,
        outerContainerHeight,
        outerContainerBackgroundColor,

    } = dialogMode ? {

        outerContainerWidth: '100%',
        outerContainerHeight: '100%',
        outerContainerBackgroundColor: 'white',

    } : {

        outerContainerWidth: '90%',
        outerContainerHeight: '80%',
        outerContainerBackgroundColor: 'black',
    };

    return {

        outerContainer: {
            // backgroundColor: mainStyleObject.backgroundColor,
            // backgroundColor: '#FF9900',
            backgroundColor: outerContainerBackgroundColor,
            width: outerContainerWidth,
            minWidth: 300,
            height: outerContainerHeight,

            marginBottom: 20,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        scrollSwagContainer: {
            // backgroundColor: mainStyleObject.backgroundColor,
            // backgroundColor: 'green',
            width: '100%',
            height: '100%',

            // borderRadius: 50,
            
            marginTop: 5,
            marginBottom: 5,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',

            overflowY: 'scroll',
        },
    };
};


const getExcitingBlocks = ({

    dialogMode,
    moneyActions,

}) => {
    
    const excitingBlocks = moneyActions.map( moneyAction => {

        return e(

            ExcitingBlock,
            {
                moneyAction,
                dialogMode,
            }
        );
    });

    return excitingBlocks;
};


export default ({

    dialogMode,
    moneyActions,

}) => {

    const styles = getStyles({

        dialogMode,
    });

    const lastTransactionId = getState(

        'transactionsPolygon',
        'lastTransactionId'
    );

    const lastTime = getState(

        'transactionsPolygon',
        'lastTime'
    );

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
         e(
            Box,
            {
                style: styles.scrollSwagContainer,
            },
            ...getExcitingBlocks({

                dialogMode,
                moneyActions
            }),
            (
                
                !!lastTransactionId &&
                !!lastTime

            ) ? e(
                NextBlock,
                {
                    dialogMode,
                }
            ) : null

        )
    );
};


/*
    ABOUT STATE

    transactionsPolygon: {
        moneyActions: [
            {},
            {},
            ...
        ],
        lastX,
        lastY,
        lastZ
    },        

    ABOUT APPEARANCE
        common elements
            type - time

    exciting blocks, with load more special exciting block
*/
