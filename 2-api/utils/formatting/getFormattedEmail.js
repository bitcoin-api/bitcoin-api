'use strict';

const GMAIL_DOT_COM = 'gmail.com';


const getPureEmailFromGmail = Object.freeze( ({

    lowerCaseEmailFirstPart,

}) => {

    const emailFirstPartSplitWithPlus = (
        
        lowerCaseEmailFirstPart.split( '+' )
    );

    const pureEmailFirstPart = emailFirstPartSplitWithPlus[ 0 ];

    const pureEmailFirstPartNoDots = pureEmailFirstPart.replace( /\./g, '' );

    const pureEmail = `${ pureEmailFirstPartNoDots }@${ GMAIL_DOT_COM }`;

    return pureEmail;
});


// assumes email has been validated already
module.exports = Object.freeze( ({

    rawEmail
    
}) => {

    const lowerCaseEmail = rawEmail.toLowerCase();

    const lowerCaseEmailParts = lowerCaseEmail.split( '@' );

    if( lowerCaseEmailParts.length !== 2 ) {

        // NOTE: safeguard
        const err = new Error( 'invalid email provided' );
        err.bulltrue = true;
        err.statusCode = 400;
        throw err;
    }

    const isGoogleEmail = (

        lowerCaseEmailParts[ lowerCaseEmailParts.length - 1 ] ===
        GMAIL_DOT_COM
    );

    if( isGoogleEmail ) {

        return getPureEmailFromGmail({

            lowerCaseEmailFirstPart: lowerCaseEmailParts[0]
        });
    }

    return lowerCaseEmail;
});
