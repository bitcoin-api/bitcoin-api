'use strict';

const {

    utils: {
        stringify,
    },
    constants: {
        environment: {
            isProductionMode,
        }
    }

} = require( '@bitcoin-api/full-stack-api-private' );

const execa = require( 'execa' );

const start = 'start';


const getExecaArgs = Object.freeze( ({

    mainFileName,

}) => {

    const args = [

        start,
        mainFileName,
    ];

    if( isProductionMode ) {

        args.push(
            '--',
            '--mode=production'
        );
    }

    return args;
});


module.exports = Object.freeze( async ({

    log,
    trueTigerPath,
    mainFileName,

}) => {

    log(
        '🌠🐈🐈running startPmTiger - ' +
        stringify({
            trueTigerPath
        })
    );

    await execa(

        'pm2',
        getExecaArgs({
            mainFileName
        }),
        {
            cwd: trueTigerPath
        }
    );

    log( '🌠🐈🐈startPm2 executed successfully' );
});
