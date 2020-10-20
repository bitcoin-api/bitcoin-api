'use strict';

const f = Object.freeze;


module.exports = f({
    
    endpointTypes: f({

        public: 'public',
        generalToken: 'General-Token',
        activatedToken: 'Activated-Token',
    }),

    urls: f({
        
        defaultBaseUrl: process.env.BITCOIN_API_BASE_URL || 'https://bitcoin-api.io',
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
