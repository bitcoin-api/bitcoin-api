# bitcoin-api
[![npm version](https://badge.fury.io/js/bitcoin-api.svg)](https://badge.fury.io/js/bitcoin-api)

### NodeJS Driver and Documentation for the Bitcoin-Api.io API for Bitcoin - Currently Testnet Only

<br>

**Also, check out:**

# [Bitcoin-Api-Full-Stack](https://github.com/bitcoin-api/bitcoin-api-full-stack)

## [➡️➡️➡️ Click This Link to Go to the Open Source Full Stack Livenet Versions of the Bitcoin-Api.io Bitcoin API, Exchange, and Game Platform Code on GitHub 😎🧐🤠😃✌️☮️🕊💘👁](https://github.com/bitcoin-api/bitcoin-api-full-stack) 


## Contents
* [NodeJS Driver](#nodejs-driver)
* [API](#api)
* [Business](#business)

## About
The [Bitcoin-Api.io](https://bitcoin-Api.io)
professional grade API lets
you easily add bitcoin to
your websites and apps. Using a [token](#tokens), you can effortlessly
incorporate bitcoin deposit and withdraw functionality
into your tech.

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

const BitcoinApi = require( 'bitcoin-api' );

const bitcoinApi = new BitcoinApi({

    testnetToken: 'testnet token goes here'
});


(async () => {

    try {

        const {
            
            balanceData: { amount }
            
        } = await bitcoinApi.getTokenInfo();

        // logs current balance
        console.log( 'Balance:', amount ); 

        // withdraws 0.00004 BTC
        await bitcoinApi.withdraw({

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

const BitcoinApi = require( 'bitcoin-api' );

const bitcoinApi = new BitcoinApi({

    livenetMode: false,
    // optional: defaults to false
    
    testnetToken: 'xxcsddfksdjaksld', 
    livenetToken: 'yycsddfksdjaksld'
    // one of testnetToken or livenetToken is required
});
```


## Usage
### .createToken
```.js
(async () => {

    const createTokenResults = await BitcoinApi.createToken();

    console.log(
        'Create token results:',
        JSON.stringify( createTokenResults, null, 4  )
    );

    /*
        Logs:

            Create token results: {
                "token": "6bda5fe7949b470fa4e11e..."
            }

        ---

        Note:

            unlike the other methods of BitcoinApi
            .createToken is accessed through the BitcoinApi class itself,
            not a bitcoinApi instance of the class
            which requires a token to be instantiated
    */
})();
```

### .getTokenInfo
```.js
(async () => {

    const tokenInfo = await bitcoinApi.getTokenInfo();

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

    const addressData = await bitcoinApi.createOrGetAddress();

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

    const feeData = await bitcoinApi.getFeeData();

    console.log( 'Fee Data:', JSON.stringify( feeData, null, 4 ) );
    
    /*
        
        Logs:

            Fee Data: {
                "fee": 0.0000001
            }
    */
})();
```


### .withdraw
```.js
(async () => {

    await bitcoinApi.withdraw({

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
    * [Base Url](#base-url)
    * [Public Endpoints](#public-endpoints)
    * [Tokens](#tokens)
    * [General-Token Endpoints](#general-token-endpoints)
    * [Activated-Token Endpoints](#activated-token-endpoints)
* [Responses](#responses) 
    * [Successful Responses](#successful-responses)
    * [Error Responses](#error-responses)
* [Resources](#resources) 
    * [/tokens](#tokens-1)
    * [/addresses](#addresses)
    * [/fee-data](#fee-data)
    * [/withdraws](#withdraws)
* [Glossary](#glossary)


## Requests

### Base Url

##### Testnet:
`https://api-bitcoin.io/v3`

##### Livenet:
`https://bitcoin-api.io/v3` (not active - testnet mode only)


### Public Endpoints
**Public Endpoints** can be accessed using HTTPS requests with the following headers:

```.js
// HTTP headers to add to make requests to Public Endpoints
{
    "Content-Type": "application/json"
}
```

### Tokens
**Tokens** are used to make authorized requests to the Bitcoin-Api.io API.
These authorized requests allow you to access
and to control your bitcoin.
A token is a key that gives you access to your bitcoin,
bitcoin addresses, withdraws,
and any other resources associated with that token.
**It is very important that you keep your token
secret and secure in order
to protect your bitcoins
and any token-associated data.**


### General-Token Endpoints
**General-Token Endpoints** are endpoints that must be accessed
using a token in the header.
You first acquire a token by making a request to the [/tokens POST public endpoint](#post---create-token).

Once you have a token,
you can add it to your HTTPS request header
like below to make authorized requests to
General-Token Endpoints:
```.js
// HTTP headers to add to make requests to General-Token Endpoints
{
    "Content-Type": "application/json",
    "Token": "YOUR_TOKEN_GOES_HERE_INSTEAD_OF_THIS_TEXT"
}
```


### Activated-Token Endpoints
As the name suggests, an **Activated-Token Endpoint**
can only be accessed using an **Activated-Token**.
To activate your token, use the appropriate link below:

Activate your tokens with the following link:

### [Testnet Token Activator (for Api-Bitcoin.io)](https://api-bitcoin.io/token-activator)  

Once you have an Activated-Token,
you can add it to your HTTPS request header
like below to make authorized requests to token-only endpoints:
```.js
{
    "Content-Type": "application/json",
    "Token": "YOUR_ACTIVATED-TOKEN_GOES_HERE_INSTEAD_OF_THIS_TEXT"
}
```


## Responses
**All responses, success or error,
should always respond with a 200 status code
in the actual HTTPS response.**

This implies that any non-200 status code responses
should be considered unexpected internal server errors
or the request itself was invalid
(e.g. accidentally using the wrong HTTP method).


### Successful Responses
Requests that executed successfully will return a
response in the following form:
```.js
{
    
    "statusCode": 200, // number (200-299)
    
    "body": { 

        "key_1": "value_1",
        "key_2": "value_2",
        "key_3": "value_3",
        ...,
        "key_i": "value_i",
        ...,
        "key_n": "value_n"

    }, // object
}
```

### Error Responses
Assuming the request was properly formed
and there were no internal server errors,
as explained above,
the HTTPS request itself will respond with a 200 status code although
the contents of that response will be in the following form:
```.js
{

    "statusCode": 400 || 500, // number (400-599)

    "isError": true,
    
    "message": "the error message will be here instead of this text", // string
}
```



## Resources


### /tokens

#### POST - Create Token
Create a new token.
Tokens provide access to your bitcoins and associated resources
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
    "statusCode": 200,
    "body": {
        "token": "asjfhnsdlkjfhdskljhfskdljfhsdjkfsdkjfhnsdlsdf..."
    }
}
```


#### GET - Get Token Info
This endpoint gets info associated with a token.

##### Authorization 
General-Token Endpoint

##### Response Body Example
```.js
{
    "statusCode": 200,
    "body": {
        "isActivated": false,
        "balanceData": {
            "amount": 0.0005,
            "status": "normal"
        }
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
General-Token Endpoint


##### Request Body Example
```.js
{}
```

##### Response Body Example
```.js
{
    "statusCode": 200,
    "body": {
        "token": "2asjfhnsdlkjfhdskljhfskdljfhsdjkfsdkjfhnsdlsdf..."
    }
}
```


### /addresses

#### POST - Create or Get Bitcoin Address
This endpoint creates a new bitcoin address that can
be used to deposit bitcoins. A new address will be generated
once the old one has bitcoin sent to it.
If the address value is `null`,
there are currently no new addresses available and you
must try again later.


##### Authorization 
Activated-Token Endpoint

##### Request Body Example
```.js
{}
```

##### Response Body Example
```.js
{
    "statusCode": 200,
    "body": {
        "address": "3AfV9QQQTgtCH6YEjBpDTyH5sswgGD5MLp"
    }
}
```

##### More Info:
The balance associated with your token
will be automatically updated after your
bitcoin deposit transaction has
at least 6 confirmations on the bitcoin network.
You can retrieve your bitcoin balance using the
[/tokens GET General-Token Endpoint](#get---get-token-info).


### /fee-data

#### GET - Get Fee Data
This endpoint gets an estimate of the current fee that's
added to the withdraw amount.
**This fee is only used to cover the bitcoin network fees.**


##### Authorization 
Public Endpoint

##### Response Body Example
```.js
{
    "statusCode": 200,
    "body": {
        "fee": 0.000002
    }
}
```

##### More Info:
This fee estimate is subject
to change according to the bitcoin network.
This fee estimate provides
an estimation of the maximum amount of bitcoin
that will be used by the bitcoin network
to send bitcoin to the desired address.
If the actual fee demanded by
the bitcoin network is less
than the current fee estimate, whatever fee is not used
while performing a withdraw will be refunded shorty
after the withdraw has been performed.

### /withdraws

#### POST - Do Withdraw
This endpoint withdraws bitcoin associated with your token.

##### Authorization 
Activated-Token Endpoint

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
{
    "statusCode": 200,
    "body": {}
}
```

**EnviroWithdraw** - an option that allows you to contribute
bitcoin to our environment🌲🌳🌎!
This donation is added to your withdraw fee
(which is only the bitcoin network fee).
More info on this in the future in terms of how the bitcoin will
be used specifically.  



Bitcoin-Api is open to suggestions for good ways to
help the environment using the bitcoin collected from
EnviroWithdraws.
Leave a note in a Github Issue, or email us at
support@bitcoin-api.io
☮️✌🏿✌🏾✌🏽✌🏼✌🏻🕊


## Glossary
* **Activated-Token Endpoint:** an API endpoint that requires an
Activated-Token set in the request headers
in order to authorize the request.
See the [Activated-Token Endpoint](#activated-token-endpoints) request section for details on
how to make Activated-Token requests.

* **API:** an application programming interface (API),
in the context of Bitcoin-Api,
refers to a collection of access points (called API endpoints) which are used to
access and control your bitcoins.
Check out [this article on bitcoin APIs and regular APIs](https://bitcoin-api.io/articles/bitcoin-api)
for a more detailed explanation of what bitcoin APIs and regular APIs
are and how they function.

* **Endpoint (or API Endpoint):** an endpoint is a url with an
HTTP method (e.g. GET, POST) that can be accessed via HTTPS requests.
Endpoints are the main communication channel of
Bitcoin-Api and form the basis for all operations in the API.

* **Public Endpoint:** an API endpoint that is accessible for everyone
without any token authorization required.
See the [Public Endpoint Request](#public-endpoints) section for details on how to make
public endpoint requests.


# Business

### Terms of Service and Privacy Policy
* [Terms of Service](https://bitcoin-api.io/terms-of-service)
* [Privacy Policy](https://bitcoin-api.io/privacy-policy)

### Technical Support
**email:** support@bitcoin-api.io


### Livenet Usage
Currently not active. Testnet mode only.

---

[Bitcoin-Api.io](https://bitcoin-api.io) - Bitcoin as a service

> "#BaaS is #Bitcoin #API."

#### Be bitcoin happy with Bitcoin-Api!😄