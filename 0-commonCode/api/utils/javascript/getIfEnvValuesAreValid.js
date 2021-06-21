'use strict';

/*

    [
        {
            type: 'string',
            key: 'MONKEY_VALUE',
        }
    ]
*/
const {

    getIfUrlIsValid,
    getIfEmailIsValid,

} = require( '../validation' );

const envValidationTypes = Object.freeze({

    number: 'number',
    string: 'string',
    url: 'url',
    email: 'email',
});


const getIfEnvValuesAreValid = data => {

    console.log( 'running getIfEnvValuesAreValid' );

    for( const datum of data ) {

        if( !datum.undefinedAllowed ) {

            datum.undefinedAllowed = false;
        }

        if(
            !datum.key ||
            (typeof datum.key !== 'string') ||
            !envValidationTypes[ datum.type ]
        ) {

            throw new Error(
                'getIfEnvValuesAreValid error: invalid datum ' +
                JSON.stringify( datum )
            );
        }
        else if(
            !!datum.extraValidation &&
            (typeof datum.extraValidation !== 'function')
        ) {

            throw new Error(
                'getIfEnvValuesAreValid error: invalid datum ' +
                JSON.stringify( datum )
            );
        }

        const envValue = process.env[ datum.key ];

        if(
            !datum.undefinedAllowed &&
            (
                !envValue ||
                [
                    'undefined',
                    'null',
                    '""',
                    '"',
                    `''`,
                    `'`,
        
                ].includes( envValue )
            )
        ) {

            throw new Error(
                'getIfEnvValuesAreValid error: invalid datum ' +
                JSON.stringify( datum ) +
                ' - undefined not allowed'
            );
        }

        switch (datum.type ) {

            case envValidationTypes.string: {

                if( typeof envValue !== 'string' ) {

                    throw new Error(
                        'getIfEnvValuesAreValid error: invalid datum ' +
                        JSON.stringify( datum ) +
                        ' - env value not a string'
                    );
                }
                break;
            }

            case envValidationTypes.number: {

                const envValueAsNumber = Number( envValue );

                if(
                    (typeof envValueAsNumber !== 'number') ||    
                    Number.isNaN( envValueAsNumber )
                ) {

                    throw new Error(
                        'getIfEnvValuesAreValid error: invalid datum ' +
                        JSON.stringify( datum ) +
                        ' - env value not a number'
                    );
                }
                break;
            }

            case envValidationTypes.url: {

                if( !getIfUrlIsValid({ url: envValue }) ) {

                    throw new Error(
                        'getIfEnvValuesAreValid error: invalid datum ' +
                        JSON.stringify( datum ) +
                        ' - env value not a url'
                    );
                }
                break;
            }

            case envValidationTypes.email: {

                if( !getIfEmailIsValid({ email: envValue }) ) {

                    throw new Error(
                        'getIfEnvValuesAreValid error: invalid datum ' +
                        JSON.stringify( datum ) +
                        ' - env value not an email'
                    );
                }
                break;
            }

            default:

                throw new Error(
                    'getIfEnvValuesAreValid error: ' +
                    'weird switch case error'
                );
        }

        if( !!datum.extraValidation ) {

            try {
                
                datum.extraValidation( envValue );
            }
            catch( err ) {

                throw new Error(
                    'getIfEnvValuesAreValid error: invalid datum ' +
                    JSON.stringify( datum ) +
                    ' - did not pass extra validation - ' +
                    err.message
                );
            }
        }
    }

    console.log(
        'getIfEnvValuesAreValid executed successfully ' +
        'env values are valid'
    );
};


getIfEnvValuesAreValid.envValidationTypes = envValidationTypes;


module.exports = Object.freeze( getIfEnvValuesAreValid );
