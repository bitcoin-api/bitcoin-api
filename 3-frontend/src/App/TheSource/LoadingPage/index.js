import { createElement as e } from 'react';

const LOADING_FROG_URL = 'https://s3.ca-central-1.amazonaws.com/dynastybitcoin.com/site/images/loading-frog-1.png';

const getStyles = () => {
    

    return {

        outerContainer: {
            // backgroundColor: '',
            // backgroundColor: 'pink',
            width: 300,
            height: 350,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        loadingFrogHolder: {

            width: 222,
            height: 231,
            // backgroundColor: 'pink',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        loadingFrog: {

        },

        // triangle: {
        //     width: 0,
        //     height: 0, 
        //     borderLeft: '90px solid transparent',
        //     borderRight: '90px solid transparent',
        //     borderTop: '150px solid green',
        // }
    };
};


const FullDogeStyle = () => {

    return e( 
        'div',
        {},
        e(
            'h1',
            {
                style: {
                    color: 'white',
                    fontFamily: 'Roboto',
                    textAlign: 'center',
                    marginTop: 140,
                    marginBottom: 70,
                }
            },
            'DynastyBitcoin.com'
        )
    );
};


export default ({

    fullDogeStyle = false

}) => {

    const styles = getStyles();

    return e(
        'div',
        {
            style: styles.outerContainer,
        },
        fullDogeStyle && e( FullDogeStyle ),
        e(
            'div',
            {
                style: styles.loadingFrogHolder,
            },
            e(
                'img',
                {
                    style: styles.loadingFrog,
                    src: LOADING_FROG_URL,
                }
            )
        )
    );
};
