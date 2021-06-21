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
        '🔽⏬running installNodeModules - ' +
        stringify({
            trueTigerPath
        })
    );

    await execa(

        'npm',
        [   
            'install',
            '--only=prod'
        ],
        {
            cwd: trueTigerPath
        }
    );

    log( '🔽⏬installNodeModules executed successfully' );
});
