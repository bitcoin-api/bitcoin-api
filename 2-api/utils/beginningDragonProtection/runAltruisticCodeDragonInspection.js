'use strict';

const crypto = require( 'crypto' );
// const stringify = require( '../stringify' );

const {
    utils: {
        redis: {
            doRedisRequest,
            streams: {
                getOperationTime,
                getIncrementedTimeKeyData
            }
        },
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    utils: {
        getPowerQueueId
    },
    constants: {
        altruisticCodeRateLimiterQueueId,
        dragonErrorStatusCode,
        maxRateLimiterStreamLength
    }
} = require( './localTools' );

const getIfThisElementIsAllowedToPerformThisRequest = require(
    './getIfThisElementIsAllowedToPerformThisRequest'
);


module.exports = Object.freeze( async ({

    redisClient,
    altruisticCode,
    queueName,

    maxRate,
    timeRange,

}) => {

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
        'running runAltruisticCodeDragonInspection - ' +
        `altruisticCode: ${ altruisticCode }`
    );

    if( typeof altruisticCode !== 'string' ) {

        const error = new Error(
            'Too many requests, please try again later.'
        );

        error.bulltrue = true;
        error.statusCode = dragonErrorStatusCode;

        throw error;
    }

    const hashedAltruisticCode = (
        crypto
            .createHash( 'md5' )
            .update( altruisticCode )
            .digest( 'hex' )
    );

    const powerQueueId = getPowerQueueId({

        queueName,
        hashedElement: hashedAltruisticCode,
    });

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
        'adding hashed altruistic code to queue - ' +
        `altruistic powerQueueId to add: ${ powerQueueId }`
    );

    const operationTimeKey = await doRedisRequest({

        client: redisClient,
        command: 'xadd',
        redisArguments: [
            altruisticCodeRateLimiterQueueId,
            'MAXLEN',
            '~',
            maxRateLimiterStreamLength,
            '*',
            'powerQueueId',
            powerQueueId
        ],
    });

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
        'runAltruisticCodeDragonInspection - ' +
        'hashed altruistic code added to queue'
    );

    const veryPreviousOperationTimeKey = getIncrementedTimeKeyData({

        timeKey: operationTimeKey,
        add: false
    });

    const thePowerOfNow = getOperationTime({ operationTimeKey });

    const thisAltruisticCodeIsAllowedToPerformThisRequest = (

        await getIfThisElementIsAllowedToPerformThisRequest({

            elementalQueueId: altruisticCodeRateLimiterQueueId,
            maxRate,
            timeRange,
            redisClient,
            powerQueueId,
            thePowerOfNow,
            veryPreviousOperationTimeKey
        })
    );

    if( !thisAltruisticCodeIsAllowedToPerformThisRequest ) {

        console.log(
            '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
            'runAltruisticCodeDragonInspection - ' +
            'This altruistic code is not allowed to make this request, ' +
            'YOU ARE BANISHED!🐲🔥🔥🔥🔥🔥'
        );

        const error = new Error(
            'Too many requests, please try again later.'
        );

        error.bulltrue = true;
        error.statusCode = dragonErrorStatusCode;

        throw error;
    }

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
        'runAltruisticCodeDragonInspection successfully executed'
    );
});
