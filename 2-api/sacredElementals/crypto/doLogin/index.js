'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    loginTokens: {
        createLoginToken
    },
    exchangeUsers: {
        getExchangeUserByEmail,
    },
    javascript: {
        getHashedPassword
    }
} = require( '../../../exchangeUtils' );

const {
    constants: {
        // google: {
        //     captcha
        // },
        http: {
            headers: {
                grecaptchaGoogleCode
            }
        }
    }
} = require( '../../../utils' );

const validateAndGetValues = require( './validateAndGetValues' );
const flamingoCrescentDecrypt = require( '../flamingoCrescentDecrypt' );
// const bitcoinApi = require( '../exchangeBitcoinApi' );


module.exports = Object.freeze( async ({

    event,
    ipAddress,
    needGoogleCode = false,

}) => {

    const rawEmail = event.headers.email;
    const rawPassword = event.headers.password;
    const rawGoogleCode = event.headers[ grecaptchaGoogleCode ] || null;

    console.log(
        
        `running doLogin with the following values: ${ stringify({

            email: rawEmail,
            password: rawPassword,
            needGoogleCode,
            googleCode: rawGoogleCode,
        })}`
    );

    const {

        email,
        password
        
    } = await validateAndGetValues({

        rawEmail,
        rawPassword,
        needGoogleCode,
        rawGoogleCode,
        ipAddress,
    });

    const exchangeUser = await getExchangeUserByEmail({

        email,
    });

    if( !exchangeUser ) {

        const err = new Error( 'invalid email provided' );
        err.bulltrue = true;
        err.statusCode = 404;
        throw err;
    }

    const { exchangeUserId } = exchangeUser;

    const hashedPassword = getHashedPassword({ password });

    const anIncorrectPasswordHasBeenProvided = (
        
        flamingoCrescentDecrypt({
        
            text: exchangeUser.hashedPassword
         
        }) !== hashedPassword
    );

    if( anIncorrectPasswordHasBeenProvided ) {

        const err = new Error( 'wrong password provided' );
        err.bulltrue = true;
        err.statusCode = 403;
        throw err;
    }

    // const userDoesNotHaveABitcoinAddressAlready = !(

    //     !!exchangeUser.moneyData &&
    //     !!exchangeUser.moneyData.bitcoin &&
    //     (exchangeUser.moneyData.bitcoin.length > 0)
    // );

    // if( userDoesNotHaveABitcoinAddressAlready ) {

    //     console.log(

    //         'user does not already have a bitcoin address ' +
    //         'associated with them, adding an address🏡'
    //     );

    //     try {

    //         await bitcoinApi.createOrGetAddress({

    //             walhallaAddressMode: process.env.WALHALLA_ADDRESS_MODE_SECRET,
    //             exchangeUserId,
    //         });

    //         console.log(

    //             'bitcoin add address operation performed successfully😃⏫🏡'
    //         );
    //     }
    //     catch( err ) {

    //         console.log(
    //             'error in creating walhalla address', err
    //         );
    //     }
    // }

    const {

        loginToken

    } = await createLoginToken({

        exchangeUserId,
        ipAddress
    });

    const doLoginResults = {

        loginToken,
        userId: exchangeUserId,
    };

    console.log(
        
        'doLogin executed successfully - returning results ' +
        stringify( doLoginResults )
    );

    return doLoginResults;
});

/*
    -> after: to ensure user is logged in
        -> get all in valid by date
        -> go in order to make sure token is not logged out and not active login token limit exceeded
*/