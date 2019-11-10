# bitcoin-api

## API for Handling Bitcoins by Bitcoin-Api.io

# API V1/V2 [![npm version](https://badge.fury.io/js/bitcoin-api.svg)](https://badge.fury.io/js/bitcoin-api)

- preliminary versions - is working and is production ready
- some endpoint paths and methods are temporary (i.e. using POST in place of GET will be changed to GET)
- `mega_codes` will be changed to `tokens`

### Base url
The base url is bitcoin-api.io. For example, to get a fee
estimate for withdraws, a POST request needs to be made to the
`https://bitcoin-api.io/v2/fee_data` endpoint.


### Headers

All requests to Bitcoin-Api must be JSON and must contain the following HTTP header:
``` .js
{
    "Content-Type": "application/json"
}
```

## Endpoints


### /v1/mega_codes (get Mega Code)

#### POST

This endpoint creates a mega code (will be changed to `token` in v3).
A mega code is used with the other endpoints
to access and to perform operations with your bitcoins.


##### Request Body:
```
{}
```

##### Response:
``` .js
{        
    "megaCode": "qwerrtjhgfdjhi...."
}
```
The `megaCode` is a very long string, such as:

`69c9938f02684337b75a4d2d101260ba07f9 ... 83420` (abbreviated)
**This is like a username and a password in one - it provides access to your bitcoins and it is your responsibility for keeping this mega code safe.**


### /v1/addresses (get deposit address)

#### POST
Gets an unused address you can use to deposit bitcoins.
Will return the same address if called again until the address
becomes used (receives bitcoins).

May return `null`, if that's the case then no fresh addresses are
available at the moment and you must try again later.

##### Request Body:
```
{
    "megaCode": "qwerrtjhgfdjhi...."
}
```

##### Response:
``` .js
{        
    "address": "3HPxYpriHZSSgT93kMAt67tiLfaEp1oXRr",
    "timeOfExpiry": 1570976393545
}
```
##### Address Expiry
If an address is **NOT** used before the `timeOfExpiry` (which is
now set to 100 days after the address it first gotten),
the address will be returned to bitcoin-api to be redistributed.
This is eco friendly - it prevents wasted server space and usage.🌳🌲

Note: Bitcoin-Api.io will never redistribute addresses
that have received bitcoins.


### /v2/fee_data (get fee estimate)

#### POST

Get a fee estimate for making withdraws.

##### Request Body:
``` .js
{}
```
##### Response:
``` .js
{
    "fee": 0.00010234
}
```
used to estimate the fee.

the formula for the amount the user pays to make the withdraw is:
```
amountUserPays = (amount user inputs) + fee
```
> IMPORTANT NOTE: The `amountInBtcWithoutFee` value for the
`/v2/withdraws` endpoint is the amount the user wants to withdraw
**without the fee, the fee will be added automatically.**

Part of the fee will go to the environment🌲🌳, with every withdraw you
make a small amount of satoshis (currently 100 satoshis) will go to an environmental initiative savings wallet.
The money accumulated in this wallet will go to an environmental
intiative chosen by Bitcoin-Api.io users.

### /v1/deposits (view deposits)

#### PATCH
Get the deposits that have been made in the addresses associated with
a user (i.e. the addresses associated with a mega code).

* order is from recent deposit to the oldest deposit


##### Request Body:
``` .js
{
    "megaCode": "qwerrtjhgfdjhi....", // required
    "startTime": 1559193500000, // required
    "endTime": 1559798300000, // required

    "keyToGetMoreValues": "uihwejrhihh" // optional, see explanation below
}
```
##### Response:
``` .js
{
    "deposits": [
        {
            "amountDeposited": 1.0563,
            "time": 1234192134,
            "confirmations": 420,
            "id": "23823u7283",
        },
        ...
    ],
    "keyToGetMoreValues": "uihwejrhihh"
}
```
If the `keyToGetMoreValues` property exists,
then there are more deposits to retrieve within the specified time period.
Pass that value in the body of the same request you just made to get the
next values.

The time range between the start and the end dates must be between
one minute and one month.



### /v1/balances (get balance)

#### POST
Get balance associated with a user. If the balance is in the
`transformation` state,
that means a withdraw is currently being processed and the
balance is not yet finalized.

##### Request Body:
``` .js
{
    "megaCode": "qwerrtjhgfdjhi...."
}
```
##### Response:
``` .js
{
    "balance": 42.69420,
    "state": "normal" | "transformation"
}
```


### /v1/withdraws (do withdraw)

#### POST

##### Request Body:
```
{
    "megaCode": "qwerrtjhgfdjhi....",
    "amountInBtcWithoutFee": 0.19,
    "address": "3HPxYpriHZSSgT93kMAt67tiLfaEp1oXRr"
}
```
**Note:**
minimum amount: 0.00004 BTC
maxiumum amount: 69 BTC


##### Response:
``` .js
{}
```


### /v1/withdraws (view withdraws)

#### PATCH

View withdraws associated with a user.
* order is from recent withdraw to the oldest withdraw

##### Request Body:
``` .js
{
    "megaCode": "qwerrtjhgfdjhi....",
    "startTime": 1559193500000,
    "endTime": 1559798300000,
    "keyToGetMoreValues": "uihwejrhihh"
}
```

##### Response:
``` .js
{
    "withdraws": [
        {
            "time": 3483743824231,
            "status": "loading" | "error" | "good",
            "address": "3HPxYpriHZSSgT93kMAt67tiLfaEp1oXRr",
            "amountWithdrew": 0.003,
            "fee": 0.0000001,
        },
        ...
    ],
    "keyToGetMoreValues": "wow43r8534"
}
```

If the `keyToGetMoreValues` property exists,
then there are more withdraws to retrieve within the specified time period.
Pass that value in the body of the same request you just made to get the
next values.

The time range between the start and the end dates must be between
one minute and one month.


## Errors

#### Standard Format - 200 Response
``` .js
{
    "isError": true,
    "statusCode": 500,
    "message": "The error message"
}
```

---


### Versioning Rules
if you have version x.y.z:

- x increase means changes to `bitcoin-api` that could potentially break your code
- y increase means functionality change that won't break your code
- z increase means safe to update, no functionality changes at all (e.g. security or readme update)



![https://the-watchful-eye.s3.amazonaws.com/images/the-watchful-eye_small.png](https://the-watchful-eye.s3.amazonaws.com/images/the-watchful-eye_small.png)

> 👁**The Watchful Eye of Bitcoin-Api:** "Be bitcoin happy with Bitcoin-Api!"🔻
---

## Limited Edition Official Authentic Bespoken Artisanal Genuine Hipster T-Shirt - 0.00420 BTC
![Official T-Shirt](https://bitcoin-api.s3.amazonaws.com/merch/tshirts/Bitcoin-Api.io_tShirt_v1.jpeg "Official T-Shirt")
email bitcoin.api.io@gmail.com to purchase


---
Part of the profits will go to the environment🌲🌳 -- The Bitcoin-Api.io Promise
