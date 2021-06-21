'use strict';

const {
    constants: {
        exchanges
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

const {
    http: {
        headers
    }
} = require( '../utils/constants' );

const oneDay = 24 * 60 * 60 * 1000;


module.exports = Object.freeze({

    loginTokens: {

        expiryTime: oneDay,
        numberOfAllowedSignedInLoginTokens: 5,
    },

    headers,
    // headers: {

    //     loginToken: 'login-token',
    //     userId: 'user-id',
    // },

    verificationCode: {

        expiryTime: oneDay,
    },

    javascript: {

        styleSpacer: '__style__',
    },

    urls: {

        exchangeUrl: process.env.EXCHANGE_URL,
    },

    exchanges,

    exchangeEmailDeliveryResults: {

        snsNotificationTypes: {

            Delivery: 'Delivery',
            Bounce: 'Bounce',
            Complaint: 'Complaint',
        },

        types: {
            success: 'success',
            block: 'block',
            review: 'review',
        },
    },

    // IN FUTURE: can move to common code
    transactions: {

        transactionId: {

            prefix: 'transaction_',
            minLength: 3,
            maxLength: 120,
        },
    },

    exchangeUsers: {

        exchangeUserId: {

            prefix: 'exchange_user_',
            minLength: 3,
            maxLength: 100,
        },
    },

    passwordResetCode: {

        prc: 'prc',
    },
});