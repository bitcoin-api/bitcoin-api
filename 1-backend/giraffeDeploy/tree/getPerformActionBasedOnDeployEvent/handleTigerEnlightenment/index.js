'use strict';

const {

    utils: {
        stringify,
        redis: {
            doRedisFunction,
        },
    },

} = require( '@bitcoin-api/full-stack-api-private' );

const {

    giraffeAndTreeStatusUpdate,
    constants: {
        deployCommands,
        eventNames,
    }

} = require( '@bitcoin-api/giraffe-utils' );

const stopPmTiger = require( './stopPmTiger' );
const deleteTrueTigerPath = require( './deleteTrueTigerPath' );
const copyAndPasteToTrueTiger = require( './copyAndPasteToTrueTiger' );
const installNodeModules = require( './installNodeModules' );
const startPmTiger = require( './startPmTiger' );
const performTigerEnlightenmentSpecialFunction = require( './performTigerEnlightenmentSpecialFunction' );

const treeTigerHome = process.env.TREE_TIGER_HOME;

const log = Object.freeze( ( ...args ) => {
    
    console.log( '🐯🔦handleTigerEnlightenment - ', ...args );
});

const f = Object.freeze;

const deployCommandToTigerSpotData = f({

    [deployCommands.feeDataBot]: f({
        
        tigerFolder: 'feeDataBot',
        mainFileName: 'UpdateFeeDataWorker.js',
    }),

    [deployCommands.withdrawsBot]: f({
        
        tigerFolder: 'withdrawsBot',
        mainFileName: 'WithdrawMoneyDoer.js',
    }),

    [deployCommands.depositsBot]: f({
        
        tigerFolder: 'depositsBot',
        mainFileName: 'UpdateDepositData.js',
    }),
});


module.exports = Object.freeze( async ({
    information: {
        deployId,
        deployCommand,
    }
}) => {
    
    log( `running handleTigerEnlightenment - ${ stringify({

        deployCommand
        
    })}` );

    const {

        tigerFolder,
        mainFileName

    } = deployCommandToTigerSpotData[ deployCommand ];

    const tempTigerPath = `${ treeTigerHome }/tempTigerScript/${ tigerFolder }`;
    const trueTigerLobby = `${ treeTigerHome }/tigerScript`;
    const trueTigerPath = `${ trueTigerLobby }/${ tigerFolder }`;

    log( 'pm2 stopping then starting:', stringify({

        tempTigerPath,
        trueTigerPath,
        mainFileName
    }) );

    await stopPmTiger({

        log,
        trueTigerPath,
        mainFileName
    });

    await deleteTrueTigerPath({

        log,
        trueTigerPath,
    });

    await copyAndPasteToTrueTiger({

        log,
        tempTigerPath,
        trueTigerLobby,
    });

    await installNodeModules({

        log,
        trueTigerPath,
    });

    await performTigerEnlightenmentSpecialFunction({

        log,
        deployCommand,
    });

    await startPmTiger({

        log,
        trueTigerPath,
        mainFileName
    });

    const aMessage = eventNames.leaf.serviceIsGood;

    log(
        'successfully stopped and started the ' +
        'further enlightened tiger🌊🐅 ' +
        `now creating a message ${ aMessage } for everyone💌`
    );

    await doRedisFunction({

        performFunction: ({

            redisClient

        }) => giraffeAndTreeStatusUpdate({
    
            redisClient,
            eventName: aMessage,
            information: {
                deployId,
                eventOrder: 5,
                deployCommand,
            }
        }),

        functionName: '🌲tree engages with summoned tiger telepathically🐅'
    });

    log(
        `successfully sent message ${ aMessage } for everyone💌`
    );

    log( '🐅💁‍♀️handleTigerEnlightenment executed successfully' );
});
