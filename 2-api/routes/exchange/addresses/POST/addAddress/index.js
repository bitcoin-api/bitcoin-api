'use strict';

const {

    utils: {
        stringify
    }

} = require( '@bitcoin-api/full-stack-api-private' );

const validateAndGetValues = require( './validateAndGetValues' );
const runAsgardAddressMode = require( './runAsgardAddressMode' );


module.exports = Object.freeze( async ({

    exchangeUserId,
    rawGoogleCode,
    ipAddress,

}) => {
    
    console.log(
        
        '🦝🦝🦝running addAddress🦝🦝🦝 ' +
        `with the following values: ${ stringify({

            exchangeUserId,
            rawGoogleCode,
            ipAddress
        }) }`
    );

    await validateAndGetValues({

        rawGoogleCode,
        ipAddress,
    });

    await runAsgardAddressMode({

        exchangeUserId,
    });

    const addAddressResults = {

        addressPostOperationSuccessful: true,
    };
    
    console.log(
        
        '🍕🦝🍔🦝🍱🦝addAddress executed successfully🍕🦝🍔🦝🍱🦝  ' +
        `returning the following values: ${ stringify( addAddressResults ) }`
    );

    return addAddressResults;
});