import { createElement as e, useEffect } from 'react';
import CloseButton from './CloseButton';
import MainContents from './MainContents';
import { actions } from '../../../../utils';
// import { getState/*, setState*/ } from '../../reduxX';
// import { bitcoinExchange } from '../../utils';
// import LuluLemonButton from './LuluLemonButton';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            width: '100%',
            maxWidth: 620,
            // height: '100%',
            backgroundColor: 'green',
            borderRadius: 4,
            // marginTop: 25,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            // marginBottom: 30,
        },

        topBar: {
            width: '83%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

            marginTop: 16,
        },

        titleText: {
            fontSize: 26,
            color: 'white',
            textAlign: 'left',
        },

        secondBar: {
            width: '83%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        secondText: {
            
            width: '100%',
            textAlign: 'left',
            fontSize: 16,
            color: 'white',
        },
    };
};


export default ({

    title,
    titleContentsAndMore,
    lastUpdatedDate,

}) => {

    const styles = getStyles();

    useEffect( () => {

        actions.scroll();

    }, [] );

    return e(
        Paper,
        {
            style: styles.outerContainer,
        },
        e(
            Box,
            {
                style: styles.topBar,
            },
            e(
                Typography,
                {
                    style: styles.titleText,
                },
                title
            ),
            e( CloseButton )
        ),
        e(
            Box,
            {
                style: styles.secondBar,
            },
            e(
                Typography,
                {
                    style: styles.secondText,
                },
                `Last Updated: ${ lastUpdatedDate }`
            )
        ),
        e(
            MainContents,
            {
                titleContentsAndMore,
            }
        )
    );
};
