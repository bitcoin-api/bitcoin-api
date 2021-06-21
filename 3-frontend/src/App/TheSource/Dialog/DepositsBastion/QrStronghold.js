import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
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

        theQrImage: {
            marginTop: 20,
            marginBottom: 20,
        },

        theAddressTextMetaBox: {
            // width: 620,
            width: 320,
            backgroundColor: 'black',
            borderRadius: 5,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
        },

        theAddressTextBox: {
            width: 318,
            height: '90%',
            backgroundColor: 'white',
            borderRadius: 4,
            marginTop: 2,
            marginBottom: 2,
            // padding: 15,
        },

        theAddressText: {
            color: 'black',
            // wordWrap: 'break-word',
            width: '100%',
            paddingTop: 20,
            paddingBottom: 20,
            // paddingLeft: 5,
            // paddingRight: 5,
            fontSize: 12,
            // overflowX: 'scroll',
            textAlign: 'center',
        }
    };
};

const qrCodeBaseUrl = (
    
    process.env.REACT_APP_QR_CODES_BASE_URL ||
    'https://s3.ca-central-1.amazonaws.com/dynastybitcoin.com/qr_codes'    
);


export default ({

    address,

}) => {

    const styles = getStyles();

    const qrCodeUrl = `${ qrCodeBaseUrl }/${ address }.jpg`;

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            'img',
            {
                src: qrCodeUrl,
                style: styles.theQrImage,                
            }
        ),
        e(
            Box,
            {
                style: styles.theAddressTextMetaBox,
            },
            e(
                Box,
                {
                    style: styles.theAddressTextBox,
                },
                e(
                    Typography,
                    {
                        style: styles.theAddressText,
                    },
                    address
                )
            )
        )
    );
};
