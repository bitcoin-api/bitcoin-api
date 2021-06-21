'use strict';

const {
    utils: {
        delay
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const getSafeWriteError = require( './getSafeWriteError' );
const signalOnStatusToCommandCenter = require( './signalOnStatusToCommandCenter' );
const runGiraffeEvolutionProcedure = require( './runGiraffeEvolutionProcedure' );


module.exports = Object.freeze(({

    serviceName,
    spiritual,
    retryTimeInSeconds = 10,

}) => new Promise( async ( resolve, reject ) => {

    const safeWriteError = getSafeWriteError({ moduleName: serviceName });

    const retryTime = retryTimeInSeconds * 1000;
    
    const runFunctionRecursion = async () => {

        try {

            await spiritual();

            await signalOnStatusToCommandCenter({

                serviceName,
            });
        
            await runGiraffeEvolutionProcedure({
        
                serviceName,
            });
        }
        catch( err ) {

            safeWriteError( err );

            return reject( err );
        }

        console.log(

            'running ☢️🐑⚡️spirit function again in ' +
            `${ retryTimeInSeconds } seconds`
        );

        await delay( retryTime );

        runFunctionRecursion();
    };

    runFunctionRecursion();
}));