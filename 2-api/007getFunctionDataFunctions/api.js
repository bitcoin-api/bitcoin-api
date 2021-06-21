'use strict';


module.exports = ({

    // isProductionMode,
    environmentVariables: {

        WALHALLA_ADDRESS_MODE_SECRET,
        EXCHANGE_TOKEN_USER_ID,
        // MAINTENANCE_MODE_CODE,
    },

}) => [

    {
        nickname: 'GET/',
        name: 'api_get',
        handler: 'routes/GET/index.handler',
        pathsToInclude: [

            './routes/GET',
            './routes/fee_data/GET/getFeeData.js'
        ],
        environmentVariables: {}
    },

    {
        nickname: 'POST/tokens',
        name: 'api_tokens_post',
        handler: 'routes/tokens/POST/index.handler',
        pathsToInclude: [

            './routes/tokens/POST'
        ],
        environmentVariables: {
            MAINTENANCE_MODE_CODE: 'ksdkjf4hbiAsdsdsdsdsdasddsadadsWewrnW76XTSkghssssssrtfgthyrtyrtyrtyrtdsfghGGdkjgi',
            // MAINTENANCE_MODE_MESSAGE: 'This Bitcoin-API.io API endpoint is unavailable at the moment.',
        }
    },

    {
        nickname: 'GET/tokens',
        name: 'api_tokens_get',
        handler: 'routes/tokens/GET/index.handler',
        pathsToInclude: [

            './routes/tokens/GET'
        ],
        environmentVariables: {
            MAINTENANCE_MODE_CODE: 'ksdkjfh343bsdsdsdasdas7t3276XTSE4tSS8jtdtyiue58wsaqa76tq8w7ryguaHshGGdkjbdkahdgi',
        },
    },

    {
        nickname: 'PUT/tokens',
        name: 'api_tokens_put',
        handler: 'routes/tokens/PUT/index.handler',
        pathsToInclude: [
            './routes/tokens/PUT'
        ],
        environmentVariables: {
            MAINTENANCE_MODE_CODE: 'rsdkjfhbiAWe235346645656756wrnWW7t3276XT4234SE4tSS876tq8w7ryguaHshGGdkjbdkahdgi',
        },
    },

    {
        nickname: 'POST/addresses',
        name: 'api_addresses_post',
        handler: 'routes/addresses/POST/index.handler',
        pathsToInclude: [

            './routes/addresses/POST',
            './exchangeUtils'
        ],
        environmentVariables: {
            WALHALLA_ADDRESS_MODE_SECRET,
            EXCHANGE_TOKEN_USER_ID,
            MAINTENANCE_MODE_CODE: 'zzrsdkjfhbiAWewrdsdsdssnWW7t3276XTSE4tSS876tq8w7ryguaHshGGdkjbdkahdgi',
        }
    },

    {
        nickname: 'GET/fee-data',
        name: 'api_feeData_get',
        handler: 'routes/fee_data/GET/index.handler',
        pathsToInclude: [

            './routes/fee_data/GET'
        ],
        environmentVariables: {},
    },

    {
        nickname: 'POST/withdraws',
        name: 'api_withdraws_post',
        handler: 'routes/withdraws/POST/index.handler',
        pathsToInclude: [

            './routes/withdraws/POST'
        ],
        environmentVariables: {
            MAINTENANCE_MODE_CODE: 'ttzzrsdkjfhbiAWewrnWdsasdasasdW7t3276XTSE4tSS876tq8w7ryguaHshGGdkjbdkahdgi',
        }
    },

    {
        nickname: 'service/cacheOnAndOffStatus',
        name: 'service_cacheOnAndOffStatus',
        handler: 'routes/ultraServices/cacheOnAndOffStatus/index.handler',
        pathsToInclude: [
            './routes/ultraServices/cacheOnAndOffStatus',
        ],
        environmentVariables: {
            MAINTENANCE_MODE_CODE: 'zzeettzzrsdkjfhbisdsdadsAWewrnWW7t3276XTSE4tSS876tq8w7ryguaHshGGdkjbdkahdgi',
        }
    },
];
