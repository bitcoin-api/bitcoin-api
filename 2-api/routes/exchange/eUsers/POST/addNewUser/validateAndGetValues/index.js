'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    validation: {
        getIfEmailIsValid
    },
    formatting: {
        getFormattedEmail
    },
    constants: {
        google: {
            captcha: {
                actions: {
                    signUp
                }
            }
        }
    }
} = require( '../../../../../../utils' );

const {
    validation: {
        getIfPasswordIsValid
    }
} = require( '../../../../../../exchangeUtils' );

const verifyGoogleCode = require( './verifyGoogleCode' );

// const emailWhitelist = Object.freeze([

//     'bitcoin.api.io@gmail.com',
//     'e.x.t.r.e.m.e.l.y.monkey@gmail.com',
//     'm.stecky.efantis@gmail.com',
//     'support@lessonshop.net'
// ]);


module.exports = Object.freeze( async ({

    rawEmail,
    rawPassword,
    rawGoogleCode,
    ipAddress
    
}) => {

    console.log(
        `running validateAndGetValues
            with the following values - ${ stringify({
                email: rawEmail,
                password: rawPassword,
                googleCode: rawGoogleCode,
                ipAddress
            })
        }`
    );

    const emailIsInvalid = !getIfEmailIsValid({
        
        email: rawEmail,
    });
    
    if( emailIsInvalid ) {

        const err = new Error( 'invalid email provided' );
        err.bulltrue = true;
        err.statusCode = 400;
        throw err;
    }

    // if( !emailWhitelist.includes( rawEmail ) ) {

    //     const err = new Error(
    //         `Email address "${ rawEmail }" is not invited yet -
    //         please email support@dynastybitcoin.com to be invited!`
    //     );
    //     err.bulltrue = true;
    //     err.statusCode = 400;
    //     throw err;
    // }

    const passwordIsInvalid = !getIfPasswordIsValid({

        password: rawPassword
    });
    
    if( passwordIsInvalid ) {

        const err = new Error( 'invalid password provided' );
        err.bulltrue = true;
        err.statusCode = 400;
        throw err;
    }

    const {
        
        isHumanScore,
        isHumanTime,

    } = await verifyGoogleCode({

        rawGoogleCode,
        ipAddress,
        expectedAction: signUp,
    });

    const displayEmail = rawEmail.toLowerCase();

    const email = getFormattedEmail({

        rawEmail
    });

    const validValues = {
        email,
        displayEmail,
        password: rawPassword,
        isHumanScore,
        isHumanTime,
    };

    console.log(
        
        'validateAndGetValues executed successfully - got values ' +
        stringify( validValues )
    );

    return validValues;
});
