'use strict';

const {

    runSpiritual,

} = require( '@bitcoin-api/full-stack-backend-private' );

const {
    constants: {
        computerServerServiceNames: {
            refreshingDrank     
        }
    },
    utils: {
        javascript: {
            getIfEnvValuesAreValid
        }
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const updateFee = require( './updateFee' );

const NORMAL_RETRY_TIME_IN_SECONDS = 10;

const serviceName = refreshingDrank;

getIfEnvValuesAreValid([
    {
        type: getIfEnvValuesAreValid.envValidationTypes.string,
        key: 'AWS_ACCESS_KEY_ID'
    },
    {
        type: getIfEnvValuesAreValid.envValidationTypes.string,
        key: 'AWS_SECRET_ACCESS_KEY'
    },
    {
        type: getIfEnvValuesAreValid.envValidationTypes.string,
        key: 'AWS_REGION'
    },
    {
        type: getIfEnvValuesAreValid.envValidationTypes.string,
        key: 'ID_OF_CURRENT_MEGA_SERVER'
    },
    {
        type: getIfEnvValuesAreValid.envValidationTypes.string,
        key: 'REDIS_URL'
    }
]);


const runUpdateFeeDataWorker = Object.freeze( () => {

    return runSpiritual({

        spiritual: updateFee,
        retryTimeInSeconds: NORMAL_RETRY_TIME_IN_SECONDS,
        serviceName,
        
    }).catch( err => {

        const errorMessage = (

            `error in bitcoin runUpdateFeeDataWorker: ${ err }`
        );

        console.log( errorMessage );
    });
});


module.exports = runUpdateFeeDataWorker;
