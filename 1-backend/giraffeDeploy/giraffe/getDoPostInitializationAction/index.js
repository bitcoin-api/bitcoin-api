'use strict';

const {

    utils: {
        stringify,
    },

} = require( '@bitcoin-api/full-stack-api-private' );

const createLickFile = require( './createLickFile' );
const sendLickFile = require( './sendLickFile' );

const pathToLickFile = `${ __dirname }/lick_file.json`;


module.exports = Object.freeze( ({

    deployId,
    operationTime,
    operationExpiry,
    deployCommand,
    forceDeploy,

}) => Object.freeze( async () => {

    console.log(
        
        '🦏running doPostInitializationAction🦏 (giraffe🦒) - ' +
        `with the following values - ${ stringify({
            deployId,
            operationTime,
            operationExpiry,
            pathToLickFile,
            deployCommand,
            forceDeploy,
        }) }`
    );

    await createLickFile({

        deployId,
        operationTime,
        operationExpiry,
        pathToLickFile,
        deployCommand,
        forceDeploy,
    });

    await sendLickFile({

        pathToLickFile,
    });

    console.log(
        '🦏doPostInitializationAction (giraffe🦒) executed successfully🦏'
    );
}));