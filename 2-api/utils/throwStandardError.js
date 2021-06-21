'use strict';

const {
    utils: {
        stringify
    },
} = require( '@bitcoin-api/full-stack-api-private' );


module.exports = Object.freeze( ({

    logMessage = '',
    message = 'Internal server error',
    statusCode = 400,
    bulltrue = false,

}) => {

    console.log(
        
        '‼️🛎🌊 An error occurred: ' +
        logMessage || message,
        stringify({
            errorMessage: message,
            statusCode,
            bulltrue,
        })
    );

    const userDoesNotExistError = new Error(
        message
    );

    Object.assign(

        userDoesNotExistError,
        {
            statusCode,
            bulltrue
        }
    );

    throw userDoesNotExistError;
});