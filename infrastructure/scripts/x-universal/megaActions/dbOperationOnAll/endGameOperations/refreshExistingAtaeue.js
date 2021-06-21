'use strict';

// const argv = require( 'yargs' ).argv;

const {
    utils: {
        stringify,
    },
    // constants: {
    //     aws: { database: { tableNames: { BALANCES, WITHDRAWS } } }
    // }
} = require( '@bitcoin-api/full-stack-api-private' );


module.exports = Object.freeze( async ({

    allItems,

}) => {

    console.log(
        'running refreshExistingAtaeue endGameOperation ' +
        'with the following values:',
        stringify({ 'allItems.length': allItems.length })
    );
});
