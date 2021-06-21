'use strict';

const { argv } = require( 'yargs' );

const mode = argv.mode || argv.m || 's';

const values = {

    apiUrl: null,
    exchangeApiUrl: null,
    token: null,
    withdrawAddress: null,
};

const getEnvKey = Object.freeze( ({

    prefix,
    key

}) => {

    return `${ prefix }${ key }`;
});


const getEnvironmentValues = Object.freeze( ({

    prefix,

}) => {

    return {
        apiUrl: process.env[ getEnvKey({ prefix, key: 'API_URL' }) ],
        exchangeApiUrl: process.env[ getEnvKey({ prefix, key: 'EXCHANGE_API_URL' }) ],
        token: process.env[ getEnvKey({ prefix, key: 'TOKEN' }) ],
        withdrawAddress: process.env[ getEnvKey({ prefix, key: 'WITHDRAW_ADDRESS' }) ],
    };
});


switch( mode ) {

    case 's':
    case 'staging':
    case 'i':
    case 'ireland': {

        Object.assign(
            values,
            getEnvironmentValues({ prefix: 'IRELAND_' })
        );
        
        break;
    }
    case 'p':
    case 'production':
    case 'c':
    case 'canada': {

        Object.assign(
            values,
            getEnvironmentValues({ prefix: 'CANADA_' })
        );

        break;
    }
    default:

        throw new Error( `invalid mode: ${ mode }` );
}


module.exports = Object.freeze( values );
