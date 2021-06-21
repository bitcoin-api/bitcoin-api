'use strict';

const {

    utils: {
        stringify,
    },

} = require( '@bitcoin-api/full-stack-api-private' );

const execa = require( 'execa' );


module.exports = Object.freeze( async ({

    log,
    tempTigerPath,
    trueTigerLobby,

}) => {

    log(
        '📸📝running copyAndPasteToTrueTiger - ' +
        stringify({
            tempTigerPath,
            trueTigerLobby
        })
    );

    await execa(

        'cp',
        [  
            '-r', 
            tempTigerPath,
            trueTigerLobby
        ]//,
        // {}
    );

    log( '📸📝copyAndPasteToTrueTigerPath executed successfully' );
});
