'use strict';

const envSetNames = {

    grecaptchaEnv: 'grecaptchaEnv',
    passwordEnv: 'passwordEnv',
    loginTokenEnv: 'loginTokenEnv',
    emailEnv: 'emailEnv',
    passwordResetCodeEnv: 'passwordResetCodeEnv',
    exchangeBitcoinApiTokenEnv: 'exchangeBitcoinApiTokenEnv',
    encryptedExchangeUserId: 'encryptedExchangeUserId',
};

const {
    grecaptchaEnv,
    passwordEnv,
    loginTokenEnv,
    emailEnv,
    passwordResetCodeEnv,
    exchangeBitcoinApiTokenEnv,
    encryptedExchangeUserId
} = envSetNames;


module.exports = ({

    // isProductionMode,
    environmentVariables: {

        EXCHANGE_FLAMINGO_ENCRYPTION_ID,
        EXCHANGE_FLAMINGO_ENCRYPTION_PASSWORD,
        EXCHANGE_XOOVO_ENCRYPTION_ID,
        EXCHANGE_XOOVO_ENCRYPTION_PASSWORD,
        EXCHANGE_TESSA_ENCRYPTION_ID,
        EXCHANGE_TESSA_ENCRYPTION_PASSWORD,
        EXCHANGE_SAMANTHA_ENCRYPTION_ID,
        EXCHANGE_SAMANTHA_ENCRYPTION_PASSWORD,
        // EXCHANGE_BITCOIN_API_TOKEN,
        // WALHALLA_ADDRESS_MODE_SECRET,
        // API_BASE_URL,
        EXCHANGE_TOKEN_USER_ID,
        EXCHANGE_GRECAPTCHA_SECRET_KEY,
        EXCHANGE_URL,
        EXCHANGE_MANAGEMENT_EMAIL,
        EXCHANGE_APP_NAME,
        EXCHANGE_GRECAPTCHA_BYPASS_HEADER_KEY_VALUE,
        ORACLE_HALLUCINATION_SEARCH_LIMIT,
        
        EXCHANGE_WOLF_ON_WALL_STREET_USER_ID,
    },

}) => { 

    const envSets = {

        [grecaptchaEnv]: {

            EXCHANGE_GRECAPTCHA_BYPASS_HEADER_KEY_VALUE,
            EXCHANGE_GRECAPTCHA_SECRET_KEY,
        },
    
        [passwordEnv]: {
    
            EXCHANGE_FLAMINGO_ENCRYPTION_ID,
            EXCHANGE_FLAMINGO_ENCRYPTION_PASSWORD,
        },
    
        [loginTokenEnv]: {
            EXCHANGE_XOOVO_ENCRYPTION_ID,
            EXCHANGE_XOOVO_ENCRYPTION_PASSWORD,
        },
    
        [emailEnv]: { // currently valid for all email functions 
    
            EXCHANGE_URL, 
            EXCHANGE_MANAGEMENT_EMAIL,
            EXCHANGE_APP_NAME,
        },

        [passwordResetCodeEnv]: {

            EXCHANGE_TESSA_ENCRYPTION_ID,
            EXCHANGE_TESSA_ENCRYPTION_PASSWORD,
        },

        [exchangeBitcoinApiTokenEnv]: {

            EXCHANGE_TOKEN_USER_ID,
        },

        [encryptedExchangeUserId]: {

            EXCHANGE_SAMANTHA_ENCRYPTION_ID,
            EXCHANGE_SAMANTHA_ENCRYPTION_PASSWORD,
        },
    };
    
    const rawFunctionData = [

        {
            nickname: 'ePOST/eUsers',
            name: 'eApi_eUsers_post',
            handler: 'routes/exchange/eUsers/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/eUsers/POST',
                './sacredElementals/crypto/flamingoCrescent',
            ],
            environmentVariables: {},
            envSets: [
                emailEnv,
                grecaptchaEnv,
                passwordEnv
            ]
        },

        {
            nickname: 'eGET/eUsers/eUserId',
            name: 'eApi_eUsers_eUserId_get',
            handler: 'routes/exchange/eUsers/eUserId/GET/index.handler',
            pathsToInclude: [
                './routes/exchange/eUsers/eUserId/GET',
                './sacredElementals/crypto/xoOvoDecrypt',
                './sacredElementals/crypto/getEncryptedExchangeUserId'
            ],
            environmentVariables: {},
            envSets: [
                loginTokenEnv,
                encryptedExchangeUserId,
            ]
        },

        {
            nickname: 'ePOST/addresses',
            name: 'eApi_addresses_post',
            handler: 'routes/exchange/addresses/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/addresses/POST',
                './sacredElementals/crypto/xoOvoDecrypt',
            ],
            environmentVariables: {},
            envSets: [
                loginTokenEnv,
                grecaptchaEnv,
                exchangeBitcoinApiTokenEnv
            ],
        },

        {
            nickname: 'eDELETE/eUsers/eUserId',
            name: 'eApi_eUsers_eUserId_delete',
            handler: 'routes/exchange/eUsers/eUserId/DELETE/index.handler',
            pathsToInclude: [
                './routes/exchange/eUsers/eUserId/DELETE',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {},
            envSets: [
                loginTokenEnv,
            ],
        },

        {
            nickname: 'ePOST/verifyUser',
            name: 'eApi_verifyUser_post',
            handler: 'routes/exchange/verify_user/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/verify_user/POST',
                './sacredElementals/crypto/flamingoCrescentDecrypt',
                './sacredElementals/crypto/doLogin',
                './sacredElementals/crypto/xoOvo'
            ],
            environmentVariables: {},
            envSets: [
                passwordEnv,
                loginTokenEnv,
                grecaptchaEnv,
            ]
        },

        {
            nickname: 'ePOST/login',
            name: 'eApi_login_post',
            handler: 'routes/exchange/login/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/login/POST',
                './sacredElementals/crypto/flamingoCrescentDecrypt',
                './sacredElementals/crypto/xoOvo',
                './sacredElementals/crypto/doLogin'
            ],
            environmentVariables: {},
            envSets: [
                passwordEnv,
                loginTokenEnv,
                grecaptchaEnv,
            ],
        },

        {
            nickname: 'ePOST/login/password',
            name: 'eApi_login_password_post',
            handler: 'routes/exchange/login/password/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/login/password/POST',
                './sacredElementals/crypto/tessa',
            ],
            environmentVariables: {},
            envSets: [
                passwordResetCodeEnv,
                emailEnv,
                grecaptchaEnv,
            ],
        },

        {
            nickname: 'ePATCH/login/password',
            name: 'eApi_login_password_patch',
            handler: 'routes/exchange/login/password/PATCH/index.handler',
            pathsToInclude: [
                './routes/exchange/login/password/PATCH',
                './sacredElementals/crypto/tessaDecrypt',
                './sacredElementals/crypto/flamingoCrescent',
                './sacredElementals/crypto/flamingoCrescentDecrypt',
                './sacredElementals/crypto/xoOvo',
                './sacredElementals/crypto/doLogin'
            ],
            environmentVariables: {},
            envSets: [
                passwordResetCodeEnv,
                passwordEnv,
                loginTokenEnv,
                grecaptchaEnv,
            ],
        },

        {
            nickname: 'ePOST/logout',
            name: 'eApi_logout_post',
            handler: 'routes/exchange/logout/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/logout/POST',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {},
            envSets: [
                loginTokenEnv,
            ],
        },

        {
            nickname: 'ePOST/withdraws',
            name: 'eApi_withdraws_post',
            handler: 'routes/exchange/withdraws/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/withdraws/POST',
                './sacredElementals/crypto/xoOvoDecrypt',
                './routes/withdraws/POST/withdrawMoney/getFeeData.js',
                './routes/withdraws/POST/withdrawMoney/doWithdrawMoney/getMagnaFeeData.js',
            ],
            environmentVariables: {},
            envSets: [
                exchangeBitcoinApiTokenEnv,
                loginTokenEnv,
                grecaptchaEnv,
            ],
            memory: 512,
        },

        {
            nickname: 'ePOST/exchanges',
            name: 'eApi_exchanges_post',
            handler: 'routes/exchange/exchanges/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/exchanges/POST',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {
                ORACLE_HALLUCINATION_SEARCH_LIMIT
            },
            envSets: [
                loginTokenEnv,
                grecaptchaEnv,
            ],
            memory: 512,
        },

        {
            nickname: 'eGET/transactions',
            name: 'eApi_transactions_get',
            handler: 'routes/exchange/transactions/GET/index.handler',
            pathsToInclude: [
                './routes/exchange/transactions/GET',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {},
            envSets: [
                loginTokenEnv,
            ]
        },

        {
            nickname: 'ePOST/dreams',
            name: 'eApi_dreams_post',
            handler: 'routes/exchange/dreams/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/dreams/POST',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {
                EXCHANGE_WOLF_ON_WALL_STREET_USER_ID
            },
            envSets: [
                loginTokenEnv,
                grecaptchaEnv,
            ],
            memory: 512,
        },

        {
            nickname: 'ePOST/dreamsLotus',
            name: 'eApi_dreamsLotus_post',
            handler: 'routes/exchange/dreamsLotus/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/dreamsLotus/POST',
                './enchantedUtils',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {},
            envSets: [
                loginTokenEnv,
                grecaptchaEnv,
            ],
            memory: 512,
        },

        {
            nickname: 'eGET/dreamsLotus',
            name: 'eApi_dreamsLotus_get',
            handler: 'routes/exchange/dreamsLotus/GET/index.handler',
            pathsToInclude: [
                './routes/exchange/dreamsLotus/GET',
                './enchantedUtils',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {},
            envSets: [
                loginTokenEnv,
                grecaptchaEnv,
            ],
            // memory: 512,
        },

        {
            nickname: 'ePOST/dreamsSlot',
            name: 'eApi_dreamsSlot_post',
            handler: 'routes/exchange/dreamsSlot/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/dreamsSlot/POST',
                // './enchantedUtils',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {},
            envSets: [
                loginTokenEnv,
                grecaptchaEnv,
            ],
            memory: 512,
        },

        {
            nickname: 'eService/handleEEDRs',
            name: 'eService_handleEEDRs',
            handler: 'routes/exchange/ultraServices/handleEEDRs/index.handler',
            pathsToInclude: [
                './routes/exchange/ultraServices/handleEEDRs',
            ],
            environmentVariables: {}
        },

        {
            nickname: 'eService/handleTransactionsStream',
            name: 'eService_handleTransactionsStream',
            handler: 'routes/exchange/ultraServices/handleTransactionsStream/index.handler',
            pathsToInclude: [
                './routes/exchange/ultraServices/handleTransactionsStream',
            ],
            environmentVariables: {}
        },

        // CUT BELOW

        {
            nickname: 'eGET/raffles',
            name: 'eApi_raffles_get',
            handler: 'routes/exchange/raffles/GET/index.handler',
            pathsToInclude: [
                './enchantedUtils',
                './routes/exchange/raffles/GET',
                './sacredElementals/crypto/xoOvoDecrypt',
                './sacredElementals/probability/raffles/getCryptoPotData.js',
            ],
            environmentVariables: {},
            envSets: [
                loginTokenEnv,
            ],
        },

        {
            nickname: 'ePOST/raffles/raffleId',
            name: 'eApi_raffles_raffleId_post',
            handler: 'routes/exchange/raffles/raffleId/POST/index.handler',
            pathsToInclude: [
                './enchantedUtils',
                './routes/exchange/raffles/raffleId/POST',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {},
            envSets: [
                loginTokenEnv,
                grecaptchaEnv,
            ],
        },

        {
            nickname: 'eGET/raffleDraws/raffleId',
            name: 'eApi_raffleDraws_raffleId_get',
            handler: 'routes/exchange/raffleDraws/raffleId/GET/index.handler',
            pathsToInclude: [
                './enchantedUtils',
                './routes/exchange/raffleDraws/raffleId/GET',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {},
            envSets: [
                loginTokenEnv,
            ],
        },

        {
            nickname: 'eGET/raffleTickets/raffleId',
            name: 'eApi_raffleTickets_raffleId_get',
            handler: 'routes/exchange/raffleTickets/raffleId/GET/index.handler',
            pathsToInclude: [
                './enchantedUtils',
                './routes/exchange/raffleTickets/raffleId/GET',
                './sacredElementals/crypto/xoOvoDecrypt',
                // './sacredElementals/crypto/getEncryptedExchangeUserId'
            ],
            environmentVariables: {},
            envSets: [
                loginTokenEnv,
                // encryptedExchangeUserId
            ],
        },

        {
            nickname: 'eService/manageRafflePutTicketEvents',
            name: 'eService_manageRafflePutTicketEvents',
            handler: 'routes/exchange/ultraServices/manageRafflePutTicketEvents/index.handler',
            pathsToInclude: [
                './routes/exchange/ultraServices/manageRafflePutTicketEvents',
            ],
            environmentVariables: {}
        },

        {
            nickname: 'eService/doRaffleDraw',
            name: 'eService_doRaffleDraw',
            handler: 'routes/exchange/ultraServices/doRaffleDraw/index.handler',
            pathsToInclude: [
                './routes/exchange/ultraServices/doRaffleDraw',
                './sacredElementals/probability/raffles/getMostRecentRaffleData.js',
                './enchantedUtils',
            ],
            environmentVariables: {},
            timeout: 90,
        },
    ];

    for( const rawFunctionDatum of rawFunctionData ) {

        rawFunctionDatum.environmentVariables.IS_EXCHANGE = 'YES';
        rawFunctionDatum.pathsToInclude.push( './exchangeUtils' );

        if( !!rawFunctionDatum.envSets ) {

            rawFunctionDatum.envSets.forEach( envSetName => {

                const envSet = envSets[ envSetName ];

                Object.assign(
                    rawFunctionDatum.environmentVariables,
                    envSet
                );
            });
        }
    }
    
    return rawFunctionData;
};

