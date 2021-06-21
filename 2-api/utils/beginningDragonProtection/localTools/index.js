'use strict';

const {
    constants: {
        redis: {
            streamIds,
        },
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const localStreamIds = Object.freeze({
    altruisticCodeRateLimiterQueueId: 'altruisticCodeRateLimiterQueueId',
});


const getPowerQueueId = Object.freeze( ({

    queueName,
    hashedElement,

}) => {
    
    return `${ queueName }-${ hashedElement }`;
});


module.exports = Object.freeze({

    utils: Object.freeze({

        getPowerQueueId,
        getDragonDirective: require( './getDragonDirective' )
    }),
    
    constants: Object.freeze({

        ipAddressRateLimiterQueueId: streamIds.ipAddressRateLimiterQueueId,
        advancedCodeRateLimiterQueueId: streamIds.advancedCodeRateLimiterQueueId,
        altruisticCodeRateLimiterQueueId: localStreamIds.altruisticCodeRateLimiterQueueId,
        dragonErrorStatusCode: 403,
        maxRateLimiterStreamLength: 200000
    }),
});
