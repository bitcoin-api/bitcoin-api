'use strict';

const { doBitcoinRequest } = require( '@bitcoin-api/full-stack-backend-private' );

const numberOfConfirmationsRequiredForValidity = 6;


module.exports = Object.freeze( async () => {

    console.log( 'running getCanonicalAddressData' );

    const args = [

        'listreceivedbyaddress',
        numberOfConfirmationsRequiredForValidity
    ];

    const unparsedAddressData = await doBitcoinRequest({ args });

    const freshAddressData = JSON.parse( unparsedAddressData );

    console.log(

        `retreived ${ Object.keys( freshAddressData ).length } addresses`
    );

    const canonicalAddressData = freshAddressData.map(

        ({

            address,
            amount

        }) => ({

            address,
            amount
        })
    );

    console.log( 'getCanonicalAddressData executed successfully' );

    return canonicalAddressData;
});
