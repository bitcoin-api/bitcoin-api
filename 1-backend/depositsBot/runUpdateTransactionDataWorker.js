'use strict';

const {
    runSpiritual,
    mongo,
    constants: {
        mongo: {
            collectionNames
        }
    },
    backgroundExecutor

} = require( '@bitcoin-api/full-stack-backend-private' );

const {
    constants: {
        computerServerServiceNames: {
            juiceCamel     
        }
    },
    utils: {
        javascript: {
            getIfEnvValuesAreValid
        }
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const getCanonicalAddressData = require( './getCanonicalAddressData' );
const updateAddressData = require( './updateAddressData' );
const updateUserBalanceData = require( './updateUserBalanceData' );
const serviceName = juiceCamel;

getIfEnvValuesAreValid([
    {
        type: getIfEnvValuesAreValid.envValidationTypes.string,
        key: 'MONGO_DB_URL'
    },
    {
        type: getIfEnvValuesAreValid.envValidationTypes.string,
        key: 'REDIS_URL'
    },
]);


const getSpiritual = Object.freeze( ({

    mongoConnectResults,

}) => Object.freeze( async () => {

    console.log(
        '***** Running updateTransactionData *****🐉🐉🐉🐉'
    );

    const mongoCollections = mongoConnectResults.collections;

    const canonicalAddressData = await getCanonicalAddressData();

    const {

        userIdToBitcoinNodeAmountIn

    } = await updateAddressData({
        
        canonicalAddressData,
        mongoCollections
    });

    await updateUserBalanceData({

        userIdToBitcoinNodeAmountIn,
        mongoCollections
    });

    console.log(
        '***** updateTransactionData ' +
        'executed successfully *****🐉🐉🐉🐉🔥🔥🔥🔥'
    );
}));


module.exports = Object.freeze( async () => {

    try {

        backgroundExecutor.start();

        const mongoConnectResults = await mongo.connect({
            collectionNames: [
    
                collectionNames.address_data,
                collectionNames.user_data,
            ]
        });

        const spiritual = getSpiritual({

            mongoConnectResults
        });

        await runSpiritual({

            spiritual,
            serviceName,
        });
    }
    catch( err ) {

        const errorMessage = (
            `error in bitcoin runUpdateTransactionDataWorker: ${ err }`
        );

        console.error( errorMessage );
        console.error( err.stack );
    }
});