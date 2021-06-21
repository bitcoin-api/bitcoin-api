'use strict';

require( 'dotenv' ).config();


const getIfEnvValuesAreValid = require( process.env.IRELAND_ULTRA_ENV_TEST_PATH );
const { envValidationTypes } = getIfEnvValuesAreValid;


(() => {

    try {

        getIfEnvValuesAreValid([

            {
                type: envValidationTypes.string,
                key: 'ENV_TEST_UNDEFINED',
                undefinedAllowed: true
            },

            {
                type: envValidationTypes.string,
                key: 'ENV_TEST_STRING',
            },

            {
                type: envValidationTypes.number,
                key: 'ENV_TEST_NUMBER',
            },

            {
                type: envValidationTypes.url,
                key: 'ENV_TEST_URL',
            },

            {
                type: envValidationTypes.string,
                key: 'ENV_TEST_EXTRA_VALIDATION',
                extraValidation: envValue => {

                    if( !envValue.includes( 'x' ) ) {

                        throw new Error( 'missing x' );
                    }
                },
            },
        ]);
    }
    catch( err ) {

        console.log( 'an error occurred:', err );
    }
})();