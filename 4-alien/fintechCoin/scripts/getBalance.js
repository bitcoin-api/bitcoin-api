'use strict';

const BEP20 = artifacts.require( 'BEP20' );

const a2 = '0xb37b05768686220fff33e6be9fd5aed2fd0f19d0';


module.exports = function( callback ) {

    console.log( 'running script' );

    return (new Promise( async ( resolve, reject ) => {

        try {

            const instance = await BEP20.deployed();

            const balance = await instance.balanceOf( a2 );

            console.log( 'here is the balance:', balance.words[0] );

            resolve();
        }
        catch( err ) {

            reject( err );
        }

    })).then( () => {

        console.log( 'script executed successfully' );

        callback();

    }).catch( err => {

      console.log( 'error in script:', err );

      callback( err );
    });
};
