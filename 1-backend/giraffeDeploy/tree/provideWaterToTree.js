'use strict';

const {

    utils: {
        delay,
        javascript: {
            getIfEnvValuesAreValid
        }
    },

    // constants: {
    //     redis: {
    //         streamIds
    //     }
    // }

} = require( '@bitcoin-api/full-stack-api-private' );

const {

    listenForEventsAndExecuteActions,
    sendErrorToDeployStreamOnControlC

} = require( '@bitcoin-api/giraffe-utils' );

const waitUntilGiraffeLicksLeaf = require( './waitUntilGiraffeLicksLeaf' );
const getDoPostInitializationAction = require( './getDoPostInitializationAction' );
const getPerformActionBasedOnDeployEvent = require( './getPerformActionBasedOnDeployEvent' );

const oneSecond = 1000;
const fiveSeconds = 5 * oneSecond;

getIfEnvValuesAreValid([
    {
        type: getIfEnvValuesAreValid.envValidationTypes.string,
        key: 'TREE_TIGER_HOME'
    },
    {
        type: getIfEnvValuesAreValid.envValidationTypes.string,
        key: 'REDIS_URL'
    }
]);


const provideWaterToTreeForever = Object.freeze( async () => {

    console.log( 'running provideWaterToTreeForever🌲' );

    const {

        deployId,
        operationExpiry,
        deployCommand,
        forceDeploy

    } = await waitUntilGiraffeLicksLeaf();

    const doPostInitializationAction = getDoPostInitializationAction({

        deployId,
        deployCommand
    });

    const performActionBasedOnDeployEvent = getPerformActionBasedOnDeployEvent({

        forceDeploy
    });

    const {
        
        anErrorOccurred

    } = await listenForEventsAndExecuteActions({

        deployId,
        operationExpiry,
        isGiraffe: '🌴',
        performActionBasedOnDeployEvent,
        doPostInitializationAction,
    });

    console.log(
        
        'provideWaterToTreeForever executed successfully🎄' +
        `running again in ${ fiveSeconds / oneSecond } seconds - ` +
        `
         💦provide water results🌴:
            an error occurred: ${ anErrorOccurred ? 'yes': 'no' }
        `
    );

    await delay( fiveSeconds );

    return await provideWaterToTreeForever();
});


module.exports = Object.freeze( async () => {

    console.log( '💦running provide water to tree🌲' );

    sendErrorToDeployStreamOnControlC({

        isGiraffe: '🌴'
    });

    try {

        await provideWaterToTreeForever();
    }
    catch( err ) {

        console.log(
            
            '⛔️💦☹️error in providing water to tree🌲:', err,
            `running again in ${ fiveSeconds / oneSecond } seconds`
        );

        await delay( fiveSeconds );

        return await provideWaterToTreeForever();
    }
});
