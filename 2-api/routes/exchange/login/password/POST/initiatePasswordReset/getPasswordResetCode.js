'use strict';

const {

    utils: {
        stringify,
    },

} = require( '@bitcoin-api/full-stack-api-private' );

const {

    javascript: {
        getCoolCoolId
    },
    constants: {
        timeNumbers: {
            hour
        }
    }

} = require( '../../../../../../utils' );

const {

    constants: {
        passwordResetCode: {
            prc
        }
    }

} = require( '../../../../../../exchangeUtils' );


module.exports = Object.freeze( ({

    exchangeUserId,

}) => {

    console.log(
        'running getPasswordResetCode with the following values:',
        stringify({
            exchangeUserId
        })
    );

    const expiryTime = Date.now() + hour;

    const passwordResetCode = (

        `${ prc }-${ exchangeUserId }-${ getCoolCoolId() }-${ expiryTime }`
    );

    console.log(
        'getPasswordResetCode executed successfully,',
        `here's the passwordResetCode:`,
        passwordResetCode
    );

    return passwordResetCode;
});
