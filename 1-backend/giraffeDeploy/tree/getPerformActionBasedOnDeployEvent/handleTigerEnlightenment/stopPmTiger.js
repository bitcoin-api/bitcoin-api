'use strict';

const {

    utils: {
        stringify,
    },

} = require( '@bitcoin-api/full-stack-api-private' );

const execa = require( 'execa' );

const del = 'delete';


const getExecaArgs = Object.freeze( ({

    mainFileName,

}) => {

    const args = [

        del,
        mainFileName,
    ];
    return args;
});


module.exports = Object.freeze( async ({

    log,
    trueTigerPath,
    mainFileName

}) => {

    log(
        '🛑🐯running stopPmTiger - ' +
        stringify({
            trueTigerPath,
            mainFileName
        })
    );

    try {

        await execa(

            'pm2',
            getExecaArgs({
                mainFileName
            }),
            {
                cwd: trueTigerPath
            }
        );
    }
    catch( err ) {

        log(
            '🛑🐯stopPmTiger acceptable error',
            'in stopping pm2 instance:',
            err
        );
    }

    log( '🛑🐯stopPmTiger executed successfully' );
});
