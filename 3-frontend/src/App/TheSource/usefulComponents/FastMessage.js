import { createElement as e, useEffect } from 'react';
import { getState, setState } from '../../reduxX';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// 
const getStyles = ({

    marginTop,
    marginBottom,

}) => {

    return {

        outerContainer: {
            position: 'fixed',
            bottom: 0,

            backgroundColor: 'beige',
            marginTop,
            marginBottom,
            width: 300,
            
            // height: 100,

            borderRadius: 4,
            
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },

        topBar: {

            // backgroundColor: 'green',
            // marginTop: 5,
            // marginBottom: 5,
            // width: '15%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        exitCircle: {

            backgroundColor: 'teal',
            // marginTop: 5,
            // marginBottom: 5,
            width: 30,
            height: 30,
            borderRadius: '50%',

            marginRight: 7,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        xText: {

            color: 'white',
            textAlign: 'center',
        },

        textBox: {

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: 'teal',
            borderRadius: 4,
            // height: 100,
            margin: 5,
            wordBreak: 'break-word'
        },

        text: {

            textAlign: 'center',
            color: 'white',
            fontSize: 20,
            margin: 9,
        }
    };
};


export default ({

    marginTop = 0,
    marginBottom = 0,

} = {

    marginTop: 0,
    marginBottom: 0,

}) => {

    const fastMessageData = getState( 'ultraTools', 'fastMessageData' );

    useEffect( () => {

        if( !!fastMessageData && !!fastMessageData.timeout ) {

            setTimeout( () => {

                setState({
    
                    keys: [ 'ultraTools', 'fastMessageData' ],
                    value: null
                });
    
            }, fastMessageData.timeout );
        }

    }, [ fastMessageData ] );

    const styles = getStyles({

        marginTop,
        marginBottom,
    });

    // const fastMessageData = getState( 'ultraTools', 'fastMessageData' );

    if( !fastMessageData ) {

        return null;
    }

    return e(
        Paper,
        {
            style: styles.outerContainer,
        },
        e(
            Paper,
            {
                style: styles.textBox,
            },
            e(
                Typography,
                {
                    style: styles.text,
                },
                fastMessageData.message
            )
        ),
        !fastMessageData.noX && e(
            'div',
            {
                style: styles.topBar,
            },
            e(
                'div',
                {
                    style: styles.exitCircle,
                    onClick: () => {

                        setState({
    
                            keys: [ 'ultraTools', 'fastMessageData' ],
                            value: null
                        });
                    },
                },
                e(
                    'div',
                    {
                        style: styles.xText,
                    },
                    'X'
                )
            )
        )
    );
};
