'use strict';

const testnetToken = process.env.TESTNET_TOKEN;

if( !testnetToken ) {

    throw new Error( 'missing TESTNET_TOKEN environment variable' );
}


module.exports = Object.freeze({

    testnetToken,
});