# Bitcoin-API

[![npm version](https://badge.fury.io/js/bitcoin-api.svg)](https://badge.fury.io/js/bitcoin-api)

<a href="#">
    <img
        src="https://bitcoin-api.s3.amazonaws.com/images/visual_art/altso-splush-bee-and-lamby-build-your-own-world-banner-30.png"
    />
</a>

### Bitcoin API NodeJS Driver and Documentation 

## Contents
* [NodeJS Driver](#nodejs-driver)
* [API](#api)

## About
The GitHub repo and NPM module *bitcoin-api* lets you add Bitcoin functionality to your websites and apps. Using a [token](#tokens), you can incorporate Bitcoin deposit and withdraw functionality into your tech.

# NodeJS Driver

## Table of Contents
* [Example](#example)
* [Install](#install)
* [Setup](#setup)
* [Usage](#usage)
    * [.getTokenInfo](#bitcoinApigettokeninfo)
    * [.createOrGetAddress](#bitcoinApicreateorgetaddress)
    * [.getFeeData](#bitcoinApigetfeedata)
    * [.withdraw](#bitcoinApiwithdraw)


## Example
```.js
'use strict';

const BitcoinAPI = require( 'bitcoin-api' );


const bitcoinAPI = new BitcoinAPI({

    token: 'token goes here',
});


(async () => {

    try {

        const {
            
            balanceData: { amount }
            
        } = await bitcoinAPI.getTokenInfo();

        // logs current balance
        console.log( 'Balance:', amount ); 

        // withdraws 0.00004 BTC
        await bitcoinAPI.withdraw({

            amount: 0.00004,
            address: 'mgXi9VCAmwaEGszk5yhqkigptTVQM33uhx',
        });
    }
    catch( err ) {

        console.log( 'err:', err );
    }
})();
```

## Install
```
npm install bitcoin-api --save
```

## Setup

### BitcoinAPI.createToken
```.js
'use strict';

const BitcoinAPI = require( 'bitcoin-api' );

// process.env.BITCOIN_API_TESTNET_MODE = 'true'; // uncomment to enable testnet mode


(async () => {

    const createTokenResults = await BitcoinAPI.createToken();

    console.log(
        'Create token results:',
        JSON.stringify( createTokenResults, null, 4  )
    );

    /*
        Logs:

            Create token results: {
                "token": "6bda5fe7949b470fa4e11e..."
            }
    */
})();
```

### Initialize Instance
```.js
'use strict';

// process.env.BITCOIN_API_TESTNET_MODE = 'true'; // uncomment to enable testnet mode


const BitcoinAPI = require( 'bitcoin-api' );

const bitcoinAPI = new BitcoinAPI({

    token: 'asjfhnsdlkjfhdskljhfskdljfhsdjkfsdkjfhnsdlsdf...'
});
```


## Usage

### bitcoinAPI.getTokenInfo
```.js
(async () => {

    const tokenInfo = await bitcoinAPI.getTokenInfo();

    console.log( 'Token Info:', JSON.stringify( tokenInfo, null, 4  ) );

    /*
        Logs:

            Token Info: {
                "isActivated": true,
                "balanceData": {
                    "amount": 0.002,
                    "status": "normal"
                }
            }
    */ 
})();
```


### bitcoinAPI.createOrGetAddress
```.js
(async () => {

    const addressData = await bitcoinAPI.createOrGetAddress();

    console.log( 'Address Data:', JSON.stringify( addressData, null, 4 ) );
    
    /*

        Logs:

            Address Data: {
                
                "address": "3AfV9QQQTgtCH6YEjBpDTyH5sswgGD5MLp"
            }

        Note:

            createOrGetAddress will return null for the "address" value
                when no fresh addresses are available
    */
})();
```


### bitcoinAPI.getFeeData
```.js
(async () => {

    const feeData = await bitcoinAPI.getFeeData();

    console.log( 'Fee Data:', JSON.stringify( feeData, null, 4 ) );
    
    /*
        
        Logs:

            Fee Data: {
                "fee": 0.0000001
            }

        Note:
            This is a public method so it does not
            require a token to be activated
    */
})();
```


### bitcoinAPI.withdraw
```.js
(async () => {

    await bitcoinAPI.withdraw({

        amount: 0.002,
        address: '3AfV9QQQTgtCH6YEjBpDTyH5sswgGD5MLp',
        includeFeeInAmount: false,
    });
    
    /*
        This operation withdraws 0.002 BTC to 3AfV9QQQTgtCH6YEjBpDTyH5sswgGD5MLp

        Note:
        
            includeFeeInAmount is optional
                when set to true, the fee will automatically
                be deducted from the amount

            enviroWithdrawAmount is optional
                The contribution is added to the withdraw fee.
                This is an option that is used to allow
                users to contribute Bitcoin to the environment🌲🌎!
    */
})();
```


# API

## Table of Contents
* [Requests](#requests)
    * [API URL](#api-url)
    * [Public Endpoints](#public-endpoints)
    * [Tokens](#tokens)
* [Resources](#resources) 
    * [/tokens](#tokens-1)
    * [/addresses](#addresses)
    * [/fee-data](#fee-data)
    * [/withdraws](#withdraws)


## Requests

### API URL

Testnet Base URL:

`https://testnet.bitcoin-api.io`

Mainnet Base URL:

`https://bitcoin-api.io`

Example Usage:

A GET request to the `https://bitcoin-api.io/fee-data` endpoint gets the current fee data associated with doing withdraws. Learn more about the `/fee-data` endpoint [here](#fee-data).

### Public Endpoints
**Public Endpoints** can be accessed using HTTPS requests with the following header:

```.js
// HTTP header to add to make requests to Public Endpoints
{
    "Content-Type": "application/json"
}
```

### Tokens
**Tokens** are used to make authorized requests to the Bitcoin-API API.
These authorized requests allow you to access
and to control your Bitcoin.
A token is a key that gives you access to your Bitcoin,
Bitcoin addresses, withdraws,
and any other resources associated with that token.
**It is very important that you keep your token
secret and secure in order
to protect your Bitcoin
and any token-associated data.**


Tokens are used as follows:
```.js
// HTTP header to add to make requests to Token Endpoints
{
    "Content-Type": "application/json",
    "Token": "asidasidsdssdfjlkghnkrwthwuyietsahduyrrtjkertg"
}
```


## Resources

### /tokens

#### POST - Create Token
Create a new token.
Tokens provide access to your Bitcoin and associated resources
by authorizing token-only requests.


##### Authorization
Public Endpoint


##### Request Body Example
```.js
{}
```

##### Response Body Example
```.js
{
    "token": "asjfhnsdlkjfhdskljhfskdljfhsdjkfsdkjfhnsdlsdf..."
}
```


#### GET - Get Token Info
This endpoint gets info associated with a token.

##### Authorization 
Token Endpoint

##### Response Body Example
```.js
{
    "balanceData": {
        "amount": 0.0005,
        "status": "normal"
    }
}
```

* For the balance data (`body.balanceData`) returned in the response,
there is a `status` value associated with it.
The value will either be `"normal"` or `"transformation"`.
If the value is in the `"transformation"` state, that means a
withdraw is currently being processed.


#### PUT - Update Token Value
This endpoint updates your token's value.
Your old token's value becomes invalid
when you update that token's value.


##### Authorization
Token Endpoint


##### Request Body Example
```.js
{}
```

##### Response Body Example
```.js
{
    "token": "2asjfhnsdlkjfhdskljhfskdljfhsdjkfsdkjfhnsdlsdf..."
}
```


### /addresses

#### POST - Create or Get Bitcoin Address
This endpoint creates a new Bitcoin address that can
be used to deposit Bitcoin. A new address will be generated
once the old one has Bitcoin sent to it.
If the address value is `null`,
there are currently no new addresses available.


##### Authorization 
Token Endpoint

##### Request Body Example
```.js
{}
```

##### Response Body Example
```.js
{
    "address": "3AfV9QQQTgtCH6YEjBpDTyH5sswgGD5MLp"
}
```

##### More Info:
The balance associated with your token
will be automatically updated after your
Bitcoin deposit transaction has
at least 6 confirmations on the Bitcoin network.
You can retrieve your Bitcoin balance using the
[/tokens GET General-Token Endpoint](#get---get-token-info).


### /fee-data

#### GET - Get Fee Data
This endpoint gets an estimate of the current fee that's
added to the withdraw amount.


##### Authorization 
Public Endpoint

##### Response Body Example
```.js
{
    "fee": 0.000002
}
```

### /withdraws

#### POST - Do Withdraw
This endpoint withdraws Bitcoin associated with your token.

##### Authorization 
Token Endpoint

##### Request Body Example
```.js
{
    "amount": 0.00004, // 0.00004 is the min withdraw amount
    "address": "3AfV9QQQTgtCH6YEjBpDTyH5sswgGD5MLp",
    "includeFeeInAmount": false // optional, defaults to false
    "enviroWithdrawAmount": 0.00001 // optional, makes the withdraw an EnviroWithdraw!
}
```

##### Response Body Example
```.js
{}
```

**EnviroWithdraw** - an optional Bitcoin amount is used to allow users to contribute Bitcoin to the environment🌲🌎! This contribution is added to the withdraw fee. How much collected Bitcoin for the environment and how it will be used will be documented here. Open to suggestions for the best ways to use the collected Bitcoin to help the environment.

**Upcoming Feature**

Counter that shows the sum of all EnviroWithdrawAmount contributions ever made

Estimated Completion Date: late 2020, early 2021

---

### More Information

**Technical Support Email:** support@bitcoin-api.io

[Terms of Service](/TERMS_OF_SERVICE.md)

[Privacy Policy](/PRIVACY_POLICY.md)


### Contribute

Bitcoin-API is open source. Pull requests, GitHub issues, or any other feedback or suggestions are welcome and are greatly appreciated.
