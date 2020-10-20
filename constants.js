'use strict';

const f = Object.freeze;

const customBaseUrl = process.env.BITCOIN_API_BASE_URL;
const testnetDefaultBaseUrl = 'https://testnet.bitcoin-api.io';
const defaultBaseUrl = 'https://bitcoin-api.io';
const isTestnetMode = process.env.BITCOIN_API_MAINNET_MODE !== 'true';


const getDefaultBaseUrl = f( () => {

    if( !!customBaseUrl ) {

        return customBaseUrl;
    }
    else if( isTestnetMode ) {

        return testnetDefaultBaseUrl;
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
