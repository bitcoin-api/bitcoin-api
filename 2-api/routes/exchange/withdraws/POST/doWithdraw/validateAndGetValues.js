'use strict';

const {
    utils: {
        stringify,
        business: {
            getIsValidWithdrawAmount
        },
        bitcoin: {
            validation: { getIsValidAddress },
            formatting: { getAmountNumber }
        }
    },
    constants: {
        // environment: {
        //     isProductionMode
        // }
        withdraws: {
            limits: {
                maximumWithdrawAmount,
                minimumWithdrawAmount
            }
        }
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    errors: { ValidationError },
    business: {
        verifyGoogleCode,
    },
    constants: {
        google: {
            captcha: {
                actions
            }
        }
    }
} = require( '../../../../../utils' );

// const minimumWithdrawAmount = 0.00004;


const validateAndGetEnviroWithdrawAmount = Object.freeze( ({

    rawEnviroWithdrawAmount

}) => {

    if( !rawEnviroWithdrawAmount ) {

        return 0;
    }

    if( typeof rawEnviroWithdrawAmount !== 'number' ) {
        
        const validationError = new ValidationError(
            `invalid enviroWithdrawAmount: ${ rawEnviroWithdrawAmount }`
        );

        validationError.bulltrue = true;

        throw validationError;
    }
    
    if(
        (rawEnviroWithdrawAmount < 0) ||
        (rawEnviroWithdrawAmount > 69)
    ) {

        const validationError = new ValidationError(
            `invalid enviroWithdrawAmount: ${ rawEnviroWithdrawAmount }`
        );

        validationError.bulltrue = true;

        throw validationError;
    }

    return rawEnviroWithdrawAmount;
});


module.exports = Object.freeze( async ({

    rawAmount,
    rawShouldIncludeFeeInAmount,
    rawAddress,
    rawEnviroWithdrawAmount,
    rawShouldDoFullWithdraw,
    ipAddress,
    rawGoogleCode,

}) => {
    
    console.log(
        
        `running validateAndGetValues with values: ${ stringify({
            rawAmount,
            rawShouldIncludeFeeInAmount,
            rawAddress,
            rawEnviroWithdrawAmount,
            rawShouldDoFullWithdraw,
            ipAddress,
            rawGoogleCode,
        })}`
    );

    const withdrawAmount = getAmountNumber( rawAmount );

    if(
        !rawAddress ||
        !getIsValidAddress( rawAddress )
    ) {

        const validationError = new ValidationError(

            `invalid withdraw address: ${ rawAddress }`
        );
        validationError.bulltrue = true;
        throw validationError;
    }
    else if( typeof rawShouldIncludeFeeInAmount !== 'boolean' ) {

        const validationError = new ValidationError(

            `invalid includeFeeInAmount value: ${
                rawShouldIncludeFeeInAmount
            }`
        );
        validationError.bulltrue = true;
        throw validationError;
    }
    else if( typeof rawShouldDoFullWithdraw !== 'boolean' ) {

        const validationError = new ValidationError(

            `invalid fullWithdraw value: ${
                rawShouldDoFullWithdraw
            }`
        );
        validationError.bulltrue = true;
        throw validationError;
    }

    const enviroWithdrawAmount = validateAndGetEnviroWithdrawAmount({

        rawEnviroWithdrawAmount
    });

    const results = {

        addressToSendTo: rawAddress,
        shouldIncludeFeeInAmount: rawShouldIncludeFeeInAmount,
        enviroWithdrawAmount,
        shouldDoFullWithdraw: rawShouldDoFullWithdraw,
    };

    if( !rawShouldDoFullWithdraw ) {

        const theWithdrawAmountIsInvalid = !getIsValidWithdrawAmount({

            withdrawAmount 
        });
    
        if( theWithdrawAmountIsInvalid ) {
    
            const validationError = new ValidationError(
                `invalid withdraw amount: ${ withdrawAmount }`
            );
            validationError.bulltrue = true;
            throw validationError;
        }

        if(
            (withdrawAmount < minimumWithdrawAmount) ||
            (withdrawAmount > maximumWithdrawAmount)
        ) {

            const validationError = new ValidationError(
                `Invalid withdraw amount: ${ withdrawAmount } BTC.`
            );
            validationError.bulltrue = true;
            throw validationError;
        }

        results.withdrawAmount = withdrawAmount;
    }

    await verifyGoogleCode({

        rawGoogleCode,
        ipAddress,
        expectedAction: actions.withdraw,
    });

    console.log(
        
        'validateAndGetValues executed successfully, ' +
        'here are the values: ' +
        stringify( results )
    );

    return results;
});
