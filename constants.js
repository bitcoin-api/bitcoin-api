'use strict';

const f = Object.freeze;

const testnetDefaultBaseUrl = 'https://testnet.bitcoin-api.io';
const defaultBaseUrl = 'https://bitcoin-api.io';
const isTestnetMode = process.env.BITCOIN_API_TESTNET_MODE === 'true';


const getDefaultBaseUrl = f( () => {

    if( isTestnetMode ) {

        return testnetDefaultBaseUrl;
    }
    else if( !!process.env.BITCOIN_API_BASE_URL ) {

        return process.env.BITCOIN_API_BASE_URL;
    }

    return defaultBaseUrl;
});


module.exports = f({
    
    endpointTypes: f({

        public: 'public',
        generalToken: 'General-Token',
        activatedToken: 'Activated-Token',
    }),

    urls: f({
        
        defaultBaseUrl: getDefaultBaseUrl(),
        github: 'https://github.com/bitcoin-api/bitcoin-api',
    }),

    headerKeys: f({

        token: 'Token'
    }),

    withdraws: f({

        minimumWithdrawAmount: 0.00004,
        maximumWithdrawAmount: 50,
    }),
});
