'use strict';

const {
    utils: {
        stringify,
    },
    constants: {
        withdraws: {
            limits: {
                maximumWithdrawAmount
            }
        }
    }
} = require( '@bitcoin-api/full-stack-api-private' );

// const {
//     constants: {
//         votes
//     }
// } = require( '@bitcoin-api/full-stack-exchange-private' );

const {
    errors: { ValidationError },
} = require( '../../../../../../utils' );

const {
    crypto: { getCryptoAmountNumber },
    validation: { getIfVoteIdIsValid },
} = require( '../../../../../../exchangeUtils' );

const minimumVoteAmount = 0;
const maximumVoteAmount = maximumWithdrawAmount;


const getIfAmountIsValid = Object.freeze( ({ amount }) => {

    const amountIsValid = (
        (typeof amount === 'number') &&
        !Number.isNaN( amount ) &&
        (amount >= minimumVoteAmount) &&
        (amount <= maximumVoteAmount)
    );

    return amountIsValid;
});


const getIfChoiceIsValid = Object.freeze( ({ choice }) => {

    const choiceIsValid = (
        !!choice &&
        (typeof choice === 'string') &&
        (choice.length > 0) &&
        (choice.length <= 100)
    );

    return choiceIsValid;
});


module.exports = Object.freeze( ({

    rawAmount,
    rawChoice,
    rawVoteId,

}) => {
    
    console.log(
        
        `running validateAndGetValues with values: ${ stringify({

            rawAmount,
            rawChoice,
            rawVoteId,
        })}`
    );

    if( !getIfVoteIdIsValid({ voteId: rawVoteId }) ) {

        const validationError = new ValidationError(
            `invalid voteId value: ${ rawVoteId }`
        );
        validationError.bulltrue = true;
        throw validationError;  
    }
    else if( !getIfAmountIsValid({ amount: rawAmount }) ) {
        const validationError = new ValidationError(
            `invalid amount value: ${ rawAmount }`
        );
        validationError.bulltrue = true;
        throw validationError;  
    }

    if( rawAmount === 0 ) {
        
        if( rawChoice !== null ) {

            const validationError = new ValidationError(
                'cannot provide choice if cancelling bet'
            );
            validationError.bulltrue = true;
            throw validationError;
        }
    }
    else if( !getIfChoiceIsValid({ choice: rawChoice }) ) {

        const validationError = new ValidationError(
            `invalid choice provided: ${ rawChoice }`
        );
        validationError.bulltrue = true;
        throw validationError;
    }

    const values = {

        amount: -getCryptoAmountNumber( rawAmount ),
        voteId: rawVoteId,
        choice: rawChoice,
    };

    console.log(
        
        'validateAndGetValues executed successfully, ' +
        'here are the values: ' +
        stringify( values )
    );

    return values;
});
