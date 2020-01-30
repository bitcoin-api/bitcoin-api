# Bitcoin-Api.io 
### API Documentation [![npm version](https://badge.fury.io/js/bitcoin-api.svg)](https://badge.fury.io/js/bitcoin-api)


## Table of Contents
* [About](#about)
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
    * [/tokens](#tokens)
    * [/addresses](#addresses)
    * [/fee-data](#fee-data)
    * [/withdraws](#withdraws)
* [Glossary](#glossary)


## About

The [Bitcoin-Api.io](https://bitcoin-Api.io)
simple and quick-to-setup API lets
you easily add bitcoin to
your websites and apps.
Using a [token](#tokens), you can effortlessly
add bitcoin deposit and withdraw functionality to your
tech.


## Requests

### Base Url

##### Tesnet:
`https://api-bitcoin.io/v3`

##### Livenet:
`https://bitcoin-api.io/v3`  

(livenet API currently not enabled)


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

Activate your testnet token with the following link:

### [Testnet Token Activator (for Api-Bitcoin.io)](https://api-bitcoin.io/token-activator)  

Activate your livenet token with the following link:

### Livenet Token Activator (for Bitcoin-Api.io)

(not enabled: the livenet site will be active in the future)

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
        "tokenIsActivated": false,
        "tokenIsValid": true,
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


### /addresses

#### POST - Create Bitcoin Address
This endpoint creates a new bitcoin address that can
be used to deposit bitcoins. A new address will be generated
once the old one is has bitcoin sent to it.
If the address value is `null`,
there are currently no new addresses available and you
must try again later.


**Note:**
If you don't deposit bitcoin
to your address before it expires, that address will be
reclaimed by Bitcoin-Api meaning you will not be
able to access any bitcoin sent to that address.
Bitcoin-Api will never expire an address that already has
bitcoin sent to it.


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
        "address": "3AfV9QQQTgtCH6YEjBpDTyH5sswgGD5MLp",
        "timeOfExpiry": 1588611713247
    }
}
```

### /fee-data

#### GET - Get Fee Data
The endpoint gets the current fee that's added to the withdraw
amount. 000001 BTC goes to the environment🌲🌴🌳! (livenet only)

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


### /withdraws

#### POST - Do Withdraw
This endpoint withdraws bitcoin associated with your token.

##### Authorization 
Activated-Token Endpoint

##### Request Body Example
```.js
{
    amountInBtcWithoutFee: 0.00004, // min withdraw amount
    address: '3AfV9QQQTgtCH6YEjBpDTyH5sswgGD5MLp'
}
```

##### Response Body Example
```.js
{
    "statusCode": 200,
    "body": {}
}
```


## Glossary
* **API:** an application programming interface (API),
in the context of Bitcoin-Api,
refers to a collection of access points (called API endpoints) which are used to
access and control your bitcoins.
Check out [this article on bitcoin APIs and regular APIs](https://medium.com/@BitcoinApi/whats-an-api-what-s-a-bitcoin-api-6bfdaad40da0)
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

* **Activated-Token Endpoint:** an API endpoint that requires an
Activated-Token set in the request headers
in order to authorize the request.
See the [Activated-Token Endpoint](#activated-token-endpoints) request section for details on
how to make public endpoint requests.


---

[Bitcoin-Api.io](https://bitcoin-api.io) - Bitcoin as a service

> "#BaaS is #Bitcoin #API."

#### Be bitcoin happy with Bitcoin-Api!😄