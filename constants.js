'use strict';

const f = Object.freeze;


module.exports = f({
    
    endpointTypes: f({

        public: 'public',
        generalToken: 'General-Token',
        activatedToken: 'Activated-Token',
    }),

    urls: f({
        
        bitcoinApiIo: 'https://bitcoin-api.io/v3',
        apiBitcoinIo: 'https://api-bitcoin.io/v3',
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
