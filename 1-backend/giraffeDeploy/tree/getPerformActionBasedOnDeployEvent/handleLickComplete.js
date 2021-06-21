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
        eventNames
    }

} = require( '@bitcoin-api/giraffe-utils' );

const log = Object.freeze( ( ...args ) => {
    
    console.log( '👅☑️handleLickComplete - ', ...args );
});


const handleLickCompleteCore = Object.freeze( async ({

    deployId,
    deployCommand,
    forceDeploy

}) => {

    log(
        '👅👅 next - ' +
        'telepathy message to tiger🌊🐅'
    );

    await doRedisFunction({

        performFunction: async ({

            redisClient

        }) => {

            await giraffeAndTreeStatusUpdate({
    
                redisClient,
                eventName: eventNames.leaf.tigerCommand,
                information: {
                    deployId,
                    eventOrder: 3,
                    deployCommand,
                    forceDeploy,
                }
            });

            if( !!forceDeploy ) {

                console.log(
                    'tree(🌲) is performing 🐅tigerEnlightenment⏫💁‍♀️ ' +
                    'because force deploy was requested'
                );

                await giraffeAndTreeStatusUpdate({
    
                    redisClient,
                    eventName: eventNames.tiger.tigerEnlightenment,
                    information: {
                        deployId,
                        eventOrder: 4,
                        deployCommand,
                    }
                }); 
            }
        },

        functionName: '🌲tree engages with summoned tiger telepathically🐅'
    });

    log(
        'telepathy message to tiger success🐅✅'
    );
});


module.exports = Object.freeze( async ({
    
    information: {
        deployId,
        deployCommand,
    },
    forceDeploy

}) => {
    
    log( `running handleLickComplete - ${ stringify({

        deployCommand,
        forceDeploy
        
    })}` );

    await handleLickCompleteCore({

        deployId,
        deployCommand,
        forceDeploy
    });

    log( 'handleLickComplete executed successfully' );
});
