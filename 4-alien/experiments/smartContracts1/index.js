#!/usr/bin/env node
'use strict';


const Web3 = require( 'web3' );


const main = async () => {

    const web3 = new Web3( 'https://bsc-dataseed1.binance.org:443' );
    
    // const loader = setupLoader({ provider: web3 }).web3;

    const account = web3.eth.accounts.create();

    
    console.log(`
    
    
        MEGA LOG: ${ JSON.stringify( {


            account
            
        }, null, 4 ) }
    
    
    `);
};


(async () => {

    try {

        await main();
    }
    catch( err ) {

        console.log( 'an error occurred:', err );
    }
})();
