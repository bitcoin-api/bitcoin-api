'use strict';

const {

    runSpiritual

} = require( '@bitcoin-api/full-stack-backend-private' );

const {
    constants: {
        computerServerServiceNames: {
            monkeyPaw     
        }
    },
    utils: {
        javascript: {
            getIfEnvValuesAreValid
        }
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {

    backgroundExecutor

} = require( './utils' );

getIfEnvValuesAreValid([
    {
        type: getIfEnvValuesAreValid.envValidationTypes.string,
        key: 'WITHDRAW_REPORTS_PATH'
    },
    {
        type: getIfEnvValuesAreValid.envValidationTypes.string,
        key: 'REDIS_URL'
    },
]);

// const oneSecond = 1000;
// const tenSeconds = 10 * oneSecond;
// let lastOnStatusSignal = 0;

const getPendingWithdrawData = require( './getPendingWithdrawData' );

const doWithdraws = require( './doWithdraws' );

const serviceName = monkeyPaw;


const spiritual = Object.freeze( async () => {

    console.log(
        '***** Running withdrawBitcoins ***** 🐉🐉🐉🐉'
    );

    // if( 1 === 1 ) {

    //     await new Promise( resolve => setTimeout( resolve, 3000 ) );
        
    //     console.log(
    //         '***** withdrawBitcoins fake done ***** 🐉🐉🐉🐉'
    //     );

    //     return;
    // }

    const pendingWithdrawData = await getPendingWithdrawData();

    const {
        
        unexpectedError = null,

    } = (
        
        (
        
            await doWithdraws({ pendingWithdrawData })

        ) ||

        {
            unexpectedError: null
        }
    );

    if( !!unexpectedError ) {

        console.error(

            'An unexpected error occurred in withdrawBitcoins:',
            unexpectedError
        );

        throw unexpectedError;
        
        // TODO: if is redis error throw instead of forever error
        //          the task is to find redis errors

        // console.log( 'ending withdrawBitcoins, forever' );

        // return await deathFunction({

        //     name: serviceName
        // });
    }

    console.log(

        'withdrawBitcoins executed successfully, 🐉🐉🐉🐉🔥🔥🔥🔥'
    );
});


module.exports = Object.freeze( async () => {

    try {

        backgroundExecutor.start();

        await runSpiritual({

            serviceName,
            spiritual,
        });
    }
    catch( err ) {

        const errorMessage = (
            `error in withdrawBitcoinsForever: ${ err }`
        );

        console.error( errorMessage );
    }
});
