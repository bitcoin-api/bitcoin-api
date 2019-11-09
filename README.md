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

## Endpoints


### /v2/mega_codes (get Mega Code)

#### POST

This endpoint creates a mega code (will be changed to `token` in v3).
A mega code is used with the other endpoints
to access and to perform operations with your bitcoins.


##### Request Body:
```
{}
```

##### Response:
``` .json
{        
    "megaCode": "qwerrtjhgfdjhi...."
}
```
The `megaCode` is a very long string, such as:

`69c9938f02684337b75a4d2d101260ba07f978886dcb41198bea1c13b07ca28727970dbc9b8541dea78c5aa19268b29704743cfe70524f70b52864fac9d6c5568608a7744def42d7ae23279c3ee1d7daab8e97ed07d44d20a26e55f1c184751cf0f5ad1e37f64308ae99ca513f9d18189d0553fb3bbf4ca8ba03e79de0746a500d065c0a07c2495c89eeebcbb179a75e3a4f9fe623084baeaf4b845ecb4803bc5b65b4795cc448f399bccd2c82722c7d4e9c133f901b4a50ba112865ac994db6163aafc1d0034122bdc5e2520ba7a9feb09c1431418746329b2b7720df0ebeb0adb91656f9bd43e889b460afad94403a04a47a479f5a4164b69f39e44378f4afc009375e276c4c65bc153adf42e23d4a05d9f55bf57340e8b9f0cc084364d1e52b96b9a8aa314390bb422e2b75972a36db9a95173d2a44b4b2cb400d1354c98599bbc504ce4245e2a97eae41a6883420`
**This is like a username and a password in one - it provides access to your bitcoins and it is your responsibility for keeping this mega code safe.**


### /v2/fee_data (get fee estimate)

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

## Errors

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
