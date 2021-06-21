'use strict';

const {

    utils: {
        redis: {
            doRedisFunction,
        },
        stringify,
    },

} = require( '@bitcoin-api/full-stack-api-private' );

const {

    giraffeAndTreeStatusUpdate,
    constants

} = require( '@bitcoin-api/giraffe-utils' );

const resetTotalTempTigerDomain = require( './resetTotalTempTigerDomain' );


const log = Object.freeze( ( ...args ) => {
    
    console.log( '🎄📫doPostInitializationAction (tree🌴) - ', ...args );
});


module.exports = Object.freeze( ({

    deployId,
    deployCommand

}) => async () => {
    
    log(
        'running leaf feel tongue doPostInitializationAction function ' +
        'with the following values:',
        stringify({

            deployId,
            deployCommand
        })
    );

    await resetTotalTempTigerDomain({

        log,
    });

    await doRedisFunction({

        performFunction: async ({

            redisClient

        }) => {

            await giraffeAndTreeStatusUpdate({
    
                redisClient,
                eventName: constants.eventNames.leaf.tongueFeel,
                // eventName: constants.eventNames.giraffe.lick,
                information: {
                    deployId,
                    eventOrder: 1,
                    deployCommand
                }
            });
        },

        functionName: 'leaf feel tongue'
    });

    log(
        'leaf feel tongue doPostInitializationAction function ' +
        'executed successfully'
    );
});
