'use strict';

const {

    utils: {
        stringify,
    },

} = require( '@bitcoin-api/full-stack-api-private' );

const execa = require( 'execa' );


module.exports = Object.freeze( async ({

    log,
    trueTigerPath,

}) => {

    log(
        '💎💎running deleteTrueTigerPath - ' +
        stringify({
            trueTigerPath
        })
    );

    await execa(

        'rm',
        [
            '-rf',
            trueTigerPath
        ],
        // {}
    );

    // await execa(

    //     'mkdir',
    //     [
    //         trueTigerPath
    //     ],
    //     // {}
    // );

    log( '💎💎deleteTrueTigerPath executed successfully' );
});
