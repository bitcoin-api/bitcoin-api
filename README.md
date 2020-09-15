# Bitcoin-API

[![npm version](https://badge.fury.io/js/bitcoin-api.svg)](https://badge.fury.io/js/bitcoin-api)

<a href="#">
    <img
        src="https://bitcoin-api.s3.amazonaws.com/images/visual_art/so-splush-bee-and-lamby-build-your-own-world-banner-24.png"
    />
</a>

### NodeJS Driver and Documentation for Bitcoin-API

<br>

**Also, check out:**

<a href="https://github.com/bitcoin-api/bitcoin-api-full-stack">
    <img
        src="https://bitcoin-api.s3.amazonaws.com/images/visual_art/so-splush-bee-and-lamby-full-stack-banner-41.png"
        width="320"
    />
</a>


**[`Bitcoin-API-Full-Stack` - open source full stack Livenet versions of the Bitcoin-API API, exchange, and game platform code on GitHub](https://github.com/bitcoin-api/bitcoin-api-full-stack)**


## Contents
* [NodeJS Driver](#nodejs-driver)
* [API](#api)

## About
The NPM module `bitcoin-api` lets you add Bitcoin functionality to your websites and apps. Using a [token](#tokens), you can incorporate Bitcoin deposit and withdraw functionality into your tech.

# NodeJS Driver

## Table of Contents
* [Example](#example)
* [Install](#install)
* [Setup](#setup)
* [Usage](#usage)
    * [.createToken](#createtoken)
    * [.getTokenInfo](#gettokeninfo)
    * [.createOrGetAddress](#createorgetaddress)
    * [.getFeeData](#getfeedata)
    * [.withdraw](#withdraw)


## Example
```.js
'use strict';

const BitcoinAPI = require( 'bitcoin-api' );


const bitcoinAPI = new BitcoinAPI({

    token: 'token goes here',
    baseUrl: 'https://my-bitcoin-api-full-stack-instance-url.com'
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
```.js
'use strict';

const BitcoinAPI = require( 'bitcoin-api' );


const bitcoinAPI = new BitcoinAPI({

    token: 'xxcsddfksdjaksld', 
    // required

    baseUrl: 'https://my-bitcoin-api-full-stack-instance-url.com',
    /*
        required: provide your custom base url,
            to be used in combination with
            https://github.com/bitcoin-api/bitcoin-api-full-stack
    */            
});
```


## Usage
### .createToken
```.js
(async () => {

    const createTokenResults = await BitcoinAPI.createToken({
               
        baseUrl: 'https://my--bitcoin-api-full-stack-instance.com',
    });

    console.log(
        'Create token results:',
        JSON.stringify( createTokenResults, null, 4  )
    );

    /*
        Logs:

            Create token results: {
                "token": "6bda5fe7949b470fa4e11e..."
            }

        Note:

            unlike the other methods of BitcoinAPI
            .createToken is accessed through the BitcoinAPI class itself,
            not a bitcoinAPI instance of the class
    */
})();
```


### .getTokenInfo
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


### .createOrGetAddress
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


### .getFeeData
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


### .withdraw
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
                the amount specified will be donated to
                help protect our environment🌲🌳☮️
    */
})();
```


# API

## Table of Contents
* [Requests](#requests)
    * [API Url](#api-url)
    * [Public Endpoints](#public-endpoints)
    * [Tokens](#tokens)
* [Resources](#resources) 
    * [/tokens](#tokens-1)
    * [/addresses](#addresses)
    * [/fee-data](#fee-data)
    * [/withdraws](#withdraws)


## Requests

### API Url

Use the GitHub code repository [Bitcoin-API-Full-Stack](https://github.com/bitcoin-api/bitcoin-api-full-stack) to create your own Bitcoin API!👩🏽‍🔬


### Public Endpoints
**Public Endpoints** can be accessed using HTTPS requests with the following header:

```.js
// HTTP header to add to make requests to Public Endpoints
{
    "Content-Type": "application/json"
}
```

### Tokens
**Tokens** are used to make authorized requests to your Bitcoin-API API.
These authorized requests allow you to access
and to control your Bitcoin.
A token is a key that gives you access to your Bitcoin,
Bitcoin addresses, withdraws,
and any other resources associated with that token.
**It is very important that you keep your token
secret and secure in order
to protect your Bitcoins
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
Tokens provide access to your Bitcoins and associated resources
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
be used to deposit Bitcoins. A new address will be generated
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

**EnviroWithdraw** - an option that allows you to contribute
Bitcoin to our environment🌲🌳🌎!
This contribution is added to your withdraw fee.

---

### Contribute

Bitcoin-API is open source. Pull requests, GitHub issues, or any other feedback or suggestions are welcome and are greatly appreciated.
