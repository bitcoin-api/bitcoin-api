'use strict';

const {
    utils: {
        stringify,
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const execa = require( 'execa' );

const treeTigerHome = process.env.TREE_TIGER_HOME;

const tempTigerPath = `${ treeTigerHome }/tempTigerScript`;


module.exports = Object.freeze( async ({

    log,

}) => {

    log(
        'running resetTotalTempTigerDomain - ' +
        stringify({
            tempTigerPath,
        }) 
    );

    await execa(
        'rm',
        [
            '-rf',
            tempTigerPath
        ]
    );

    await execa(
        'mkdir',
        [
            tempTigerPath
        ]
    );

    log( 'resetTotalTempTigerDomain executed successfully' );
});
