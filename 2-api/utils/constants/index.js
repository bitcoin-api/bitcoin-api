'use strict';

const {

    aws,
    MEGA_SEPARATOR,
    users,
    withdraws,
    urls

} = require( '@bitcoin-api/full-stack-api-private' ).constants;

const millisecond = 1;
const second = 1000 * millisecond;
const minute = 60 * second; 
const hour = 60 * minute; 
const day = 24 * hour; 
const week = 7 * day; 


module.exports = Object.freeze({

    aws,
    MEGA_SEPARATOR,
    users,
    withdraws,

    addressDataGroups: {

        MAX_NUMBER_OF_ADDRESSES_PER_ADDRESS_DATA_GROUP: (
            
            process.env.MAX_NUMBER_OF_ADDRESSES_PER_ADDRESS_DATA_GROUP
        ),
    },

    urls,

    google: {

        captcha: {

            verifyUrl: 'https://www.google.com/recaptcha/api/siteverify',
            actions: {

                signUp: 'signUp',
                login: 'login',
                verifyUser: 'verifyUser',
                coinFlip: 'coinFlip',
                lotusCoinFlip: 'lotusCoinFlip',
                slotSpin: 'slotSpin',
                exchange: 'exchange',
                destinyRaffleTicketPut: 'destinyRaffleTicketPut',
                withdraw: 'withdraw',
                resetPasswordInitialization: 'resetPasswordInitialization',
                resetPasswordDo: 'resetPasswordDo',
                addAddress: 'addAddress',
            },
            bypassHeaderKeyValue: process.env.EXCHANGE_GRECAPTCHA_BYPASS_HEADER_KEY_VALUE,
        },
    },

    timeNumbers: {
        millisecond,
        second,
        minute,
        hour,
        day,
        week
    },

    http: {

        headers: {
    
            grecaptchaGoogleCode: 'grecaptcha-google-code',
            verifyEmailCode: 'verify-email-code',
            newPassword: 'new-password',
            passwordResetCode: 'password-reset-code',
            loginToken: 'login-token',
            userId: 'user-id',
        }
    },

    moneyActions: {

        types: {
            regal: {
                addressAmountUpdate: 'bitcoinAddressAmountUpdate',
                exchange: {
                    btcToCrypto: 'exchangeBtcToCrypto',
                    cryptoToBTC: 'exchangeCryptoToBTC',
                },
                withdraw: {
                    start: 'withdrawStart',
                    success: 'withdrawSuccess',
                    failed: 'withdrawFailed',
                },
                bonus: 'bonus',
            },
            game: {
                talismanFlip: 'talismanFlip',
                talismanLotus: 'talismanLotus',
                slot: 'slot',
                lotus: {
                    pickPetal: 'lotusPickPetal',
                    unpickPetal: 'lotusUnpickPetal',
                    flowerPotPayout: 'lotusFlowerPotPayout',
                },
            },
        }
    },
});