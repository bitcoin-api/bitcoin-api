'use strict';

const {
    utils: {
        stringify
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    aws: {
        ses: {
            sendEmail
        }
    },
    constants: {
        urls: {
            exchangeUrl,
        }
    },
    
} = require( '../../../../../../../exchangeUtils' );

const {
    validation: {
        getIfEmailIsValid
    }
} = require( '../../../../../../../utils' );

const getEmailHtml = require( './getEmailHtml' );


module.exports = Object.freeze( async ({

    email,
    displayEmail,
    passwordResetCode,
    
}) => {

    console.log(
        `running sendPasswordResetEmail
            with the following values - ${
                stringify({
                    email,
                    displayEmail,
                    passwordResetCode,
                })
        }`
    );

    if( !exchangeUrl ) {

        throw new Error(
            
            '🤖set up error: missing exchangeUrl ' +
            'This error was thrown in ' +
            `"${ __dirname }" "${ __filename }".`
        );
    }

    const passwordResetCodeLink = (
      
        `${ exchangeUrl }/` +
        'mode/password_reset/' +
        `password_reset_code/${ passwordResetCode }/` +
        `email/${ displayEmail }`
    );

    console.log(
        
        '🦒here is the password reset code link: ' +
        passwordResetCodeLink
    );

    const html = getEmailHtml({

        passwordResetCodeLink,
        appName: process.env.EXCHANGE_APP_NAME,
    });

    const text = (

        'Your password reset link is ' + 
        `"${ passwordResetCodeLink }".`
    );

    const fromEmailAddress = process.env.EXCHANGE_MANAGEMENT_EMAIL;

    if( !getIfEmailIsValid({ email: fromEmailAddress }) ) {

        throw new Error(
            
            '🤖set up error: missing environment variable ' +
            '"EXCHANGE_MANAGEMENT_EMAIL". This error was thrown in ' +
            `"${ __dirname }" "${ __filename }".`
        );
    }

    const {
        
        emailMessageId,

    } = await sendEmail({

        subject: 'Password Reset',
        html,
        text,
        toEmailAddress: displayEmail,
        fromEmailAddress,
    });

    const sendPasswordResetEmailResults = {

        emailMessageId,
    };

    console.log(
        'sendPasswordResetEmail executed successfully - ' +
        `results: ${    
            stringify( sendPasswordResetEmailResults )
        }`
    );
});
