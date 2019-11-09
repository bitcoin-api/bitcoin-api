# bitcoin-api

## API for Handling Bitcoins by Bitcoin-Api.io

# API V2 [![npm version](https://badge.fury.io/js/bitcoin-api.svg)](https://badge.fury.io/js/bitcoin-api)

- preliminary version - is working and is production ready
- some endpoint paths and methods are temporary (i.e. using POST in place of GET will be changed to GET)
- `mega_codes` will be changed to `tokens`

### Base url
The base url is bitcoin-api.io. For example, to get a fee
estimate for withdraws, a POST request needs to be made to the
`https://bitcoin-api.io/v2/fee_data` endpoint.


### Headers

All requests to Bitcoin-Api must be JSON and must contain the following HTTP header:
``` .json
{
    "Content-Type": "application/json"
}
```


## /v2/fee_data (get fee estimate)

#### POST

Get a fee estimate for making withdraws.

##### Request Body:
``` .json
{}
```
##### Response:
``` .json
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
make a small amount of satoshis will go to an environmental initiative savings wallet.
The money accumulated in this wallet will go to an environmental
intiative chosen by Bitcoin-Api.io users.

### Errors:

#### Standard Format - 200 Response
``` .json
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
