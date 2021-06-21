'use strict';

const { argv } = require( 'yargs' );

const mode = argv.mode || argv.m || 's';

const environmentData = [
    {
        name: 'apiUrl',    
        key: 'API_URL',    
    },
    {
        name: 'exchangeApiUrl',    
        key: 'EXCHANGE_API_URL',    
    },
    {
        name: 'token',    
        key: 'TOKEN',    
    },
    {
        name: 'withdrawAddress',    
        key: 'WITHDRAW_ADDRESS',    
    },
    {
        name: 'email',    
        key: 'EMAIL',    
    },
    {
        name: 'password',    
        key: 'PASSWORD',    
    },
    {
        name: 'newPassword',    
        key: 'EXCHANGE_NEW_PASSWORD',    
    },
    {
        name: 'passwordResetCode',    
        key: 'EXCHANGE_PASSWORD_RESET_CODE',    
    },
    {
        name: 'loginToken',    
        key: 'EXCHANGE_LOGIN_TOKEN',    
    },
    {
        name: 'verifyEmailCode',    
        key: 'EXCHANGE_VERIFY_EMAIL_CODE',    
    },
    {
        name: 'exchangeUserId',    
        key: 'EXCHANGE_USER_ID',    
    },
    {
        name: 'voteId',    
        key: 'EXCHANGE_VOTE_ID',    
    },
    {
        name: 'raffleId',    
        key: 'EXCHANGE_RAFFLE_ID',    
    },
    {
        name: 'raffleGetDrawsStartTime',    
        key: 'EXCHANGE_RAFFLE_GET_DRAWS_START_TIME',    
    },
    {
        name: 'raffleGetDrawsEndTime',    
        key: 'EXCHANGE_RAFFLE_GET_DRAWS_END_TIME',    
    },
    {
        name: 'raffleGetDrawsLastTime',    
        key: 'EXCHANGE_RAFFLE_GET_DRAWS_LAST_TIME',    
    },
    {
        name: 'grecaptchaBypassHeaderKeyValue',    
        key: 'EXCHANGE_GRECAPTCHA_BYPASS_HEADER_KEY_VALUE',    
    },
];


const values = {};


const getEnvKey = Object.freeze( ({

    prefix,
    key

}) => {

    return `${ prefix }${ key }`;
});


const getEnvironmentValues = Object.freeze( ({

    prefix,

}) => {

    const environmentValues = {};

    environmentData.forEach( ({ name, key }) => {

        const envKey = getEnvKey({ prefix, key });

        environmentValues[ name ] = process.env[ envKey ];
    });

    return environmentValues;
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
        
        process.env.REDIS_URL = process.env.IRELAND_REDIS_URL;

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

        process.env.REDIS_URL = process.env.CANADA_REDIS_URL;

        break;
    }
    default:

        throw new Error( `invalid mode: ${ mode }` );
}


module.exports = Object.freeze( values );
