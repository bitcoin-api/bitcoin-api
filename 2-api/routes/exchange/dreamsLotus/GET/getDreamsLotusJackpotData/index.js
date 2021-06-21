'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    utils: {
        crypto: {
            getCryptoAmountNumber
        }
    },
} = require( '@bitcoin-api/full-stack-exchange-private' );

const {
    dream: {
        getJackpotMetadata,
    }
} = require( '../../../../../enchantedUtils' );


module.exports = Object.freeze( async ({

    // event,
    // ipAddress,
    exchangeUserId
    
}) => {
    
    console.log(
        
        `running 😎 getDreamsLotusJackpotData 😎
            with the following values - ${
                
                stringify({

                    exchangeUserId,
                    // ipAddress,
                    // rawAmount,
                    // rawGoogleCode,
                })
        }`
    );

    const jackpotMetadata = await getJackpotMetadata();

    const rawJackpotAmount = jackpotMetadata.jackpotAmount;

    const jackpotAmount = getCryptoAmountNumber( rawJackpotAmount );

    const jackpotData = {
        jackpotAmount,
    };

    console.log(
        
        `😎 getDreamsLotusJackpotData 😎
            executed successfully -
                returning the following values - ${
                    stringify( jackpotData )
        }`
    );

    return jackpotData;
});
