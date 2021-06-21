'use strict';

const {
    utils: {
        stringify,
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    validation: {
        getIfTimeIsValid,
    }
} = require( '../../../../../utils' );

const {
    validation: {
        getIfTransactionIdIsValid,
    }
} = require( '../../../../../exchangeUtils' );


module.exports = Object.freeze( ({

    rawLastTime,
    rawLastTransactionId,

}) => {
    
    console.log(
        
        `running validateAndGetValues with values: ${ stringify({
            rawLastTime,
            rawLastTransactionId,
        }) }`
    );

    const rawNumberLastTime = Number( rawLastTime );

    const values = {};

    if( !!rawLastTime ) {

        if( !getIfTimeIsValid({ time: rawNumberLastTime }) ){

            const validationError = new Error(

                `invalid lastTime: ${ rawLastTime }`
            );
            validationError.bulltrue = true;
            validationError.statusCode = 400;
            throw validationError;
        }
        else if( !rawLastTransactionId ) {

            const validationError = new Error(

                'both lastTime and lastTransactionId are required'
            );
            validationError.bulltrue = true;
            validationError.statusCode = 400;
            throw validationError;
        }

        values.lastTime = rawNumberLastTime;
    }
    
    if( !!rawLastTransactionId ) {

        if(
            !getIfTransactionIdIsValid({
                transactionId: rawLastTransactionId,
            })
        ) {
            const validationError = new Error(

                `invalid transactionId: ${ rawLastTransactionId }`
            );
            validationError.bulltrue = true;
            validationError.statusCode = 400;
            throw validationError;
        }
        else if( !rawLastTime ) {
            
            const validationError = new Error(

                'both lastTime and lastTransactionId are required'
            );
            validationError.bulltrue = true;
            validationError.statusCode = 400;
            throw validationError;
        }

        values.lastTransactionId = rawLastTransactionId;
    }

    console.log(
        
        'validateAndGetValues executed successfully, ' +
        'here are the values: ' +
        stringify( values )
    );

    return values;
});
