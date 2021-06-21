'use strict';

const {
    utils: {
        stringify,
        bitcoin: {
            formatting: { getAmountNumber },
        }
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {

    crypto: {
        getCryptoAmountNumber
    },

    constants: {
        exchanges
    }

} = require( '../../../../../exchangeUtils' );

const {
    errors: { ValidationError },
    business: {
        verifyGoogleCode,
    },
    constants: {
        google: {
            captcha
        }
    }
} = require( '../../../../../utils' );

// const doWithdraw = require( './doWithdraw' );


module.exports = Object.freeze( async ({

    rawType,
    rawData,
    rawGoogleCode,
    ipAddress,

}) => {

    console.log(
        
        'running validateAndGetValues with the following values:',
        stringify({

            rawType,
            rawData,
            rawGoogleCode: !!rawGoogleCode,
            ipAddress,
        })
    );

    const values = {};

    if(
        !rawType ||
        (typeof rawType !== 'string') ||
        !exchanges.types[ rawType ]
    ) {

        const error = new ValidationError( 'invalid type provided' );
        error.bulltrue = true;
        throw error;
    }

    values.type = rawType;
    
    if( values.type === exchanges.types.btcToCrypto ) {

        if(
            !rawData ||
            (typeof rawData !== 'object') ||
            !rawData.amountInCryptoWanted ||
            (typeof rawData.amountInCryptoWanted !== 'number') ||
            (rawData.amountInCryptoWanted > exchanges.bounds.crypto.max) ||
            (rawData.amountInCryptoWanted < exchanges.bounds.crypto.min)
        ) {

            const error = new ValidationError( 'invalid data provided' );
            error.bulltrue = true;
            throw error;
        }

        values.data = {
            amountInCryptoWanted: getCryptoAmountNumber(
                rawData.amountInCryptoWanted
            )
        };
    }
    else if( values.type === exchanges.types.cryptoToBTC ) {

        if(
            !rawData ||
            (typeof rawData !== 'object') ||
            !rawData.amountInBitcoinWanted ||
            (typeof rawData.amountInBitcoinWanted !== 'number') ||
            (rawData.amountInBitcoinWanted > exchanges.bounds.bitcoin.max) ||
            (rawData.amountInBitcoinWanted < exchanges.bounds.bitcoin.min)
        ) {

            const error = new ValidationError( 'invalid data provided' );
            error.bulltrue = true;
            throw error;
        }

        values.data = {
            amountInBitcoinWanted: getAmountNumber(
                rawData.amountInBitcoinWanted
            )
        };
    }

    await verifyGoogleCode({

        rawGoogleCode,
        ipAddress,
        expectedAction: captcha.actions.exchange,
    });

    console.log(
        'validateAndGetValues executed successfully - returning values: ' +
        stringify( values )
    );

    return values;
});