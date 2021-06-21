import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const getStyles = () => {
    
    return {

        outerContainer: {

            width: '100%',
            // marginTop,
            // marginBottom,
            backgroundColor: 'beige',
            // borderRadius: 4,
            // padding: 6,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // padding: 5,
        },
        
        headingText: {

            width: '95%',
            textAlign: 'left',
            wordBreak: 'break-word',
            color: 'black',
            // padding: 20,
            // padding: 5,
            fontSize: 20,
            // marginLeft: 17,
            // paddingLeft: 17,
            // paddingTop: 5,
            // paddingBottom: 2,
        },

        text: {

            width: '92%',
            textAlign: 'left',
            wordBreak: 'break-word',
            color: 'black',
            // padding: 20,
            // margin: 20,
            fontSize: 16,
            // paddingLeft: 15,
            // marginLeft: 17,
            // paddingTop: 3,
            // paddingLeft: 17,
            // paddingRight: 5,
            // paddingBottom: 3,
        }
    };
};


export default ({

    heading,
    lines = [],
    // marginTop = 0,
    // marginBottom = 0,

}) => {

    const styles = getStyles();

    const lineElements = lines.map( ( line, index ) => {

        if( typeof line === 'string' ) {

            return e(
                Typography,
                {
                    key: `lineKey${ index }`,
                    style: styles.text,
                },
                line
            );
        }

        return line;
    });

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            Typography,
            {
                style: styles.headingText,
            },
            heading
        ),
        lineElements
    );
};