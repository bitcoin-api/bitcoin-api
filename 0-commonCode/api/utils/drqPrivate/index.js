'use strict';

const uuidv4 = require( 'uuid' ).v4;

const getRedisClient = require( 'get-redis-client' );

const {
    obliterateOperationFromQueue,
    constants: {
        TIMEOUT,
        OPERATION_TIMEOUT
    }
} = require( './tools' );

const doOperationInQueueCore = require( './doOperationInQueueCore' );

const timeout = TIMEOUT;
const operationTimeout = OPERATION_TIMEOUT;


module.exports = Object.freeze( async ({

    queueId,
    operation = () => Promise.resolve(),
    operationArgs = [],

}) => {

    const doOperation = operation;
    const doOperationArgs = operationArgs;

    if( !queueId ) {

        throw new Error( 'error in doOperationInQueue: missing queueId' );
    }

    const operationId = uuidv4();

    const redisClient = getRedisClient();

    console.log( '🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒' );
    console.log( `🐴Running do Operation "${ operationId }" in Queue🐴` );
    console.log( '🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒' );

    try {

        const doOperationInQueueCoreResults = await doOperationInQueueCore({

            redisClient,
            operationId,
            doOperation,
            doOperationArgs,
            queueId,
            timeout,
            operationTimeout,
        });

        redisClient.quit();

        console.log( '🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓' );
        console.log(
            `🦄Do Operation "${ operationId }" ` +
            `in Queue Executed Successfully🦄`
        );
        console.log( '🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓' );

        return doOperationInQueueCoreResults;
    }
    catch( err ) {

        console.log( '🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀' );
        console.log(
            '🐺error in doOperationInQueue🐺:',
            `err: ${ err } - \n`,
            `operationId: "${ operationId }"`
        );
        console.log( '🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀' );
        console.log(
            'obliterating operation from queue ' +
            'and destorying the client before finally throwing the error'
        );

        try {

            await obliterateOperationFromQueue({
                redisClient,
                queueId,
                operationId,
                errorMessage: err.message || 'doOperationError'
            });
        }
        catch( obliterateOperationFromQueueErr ) {

            console.log(
                '🦆really weird error, error in obliterating operation ' +
                `"${ operationId }" from queue after other ` +
                `error ${ err } occurred, here is the obliteration error: ` +
                obliterateOperationFromQueueErr
            );
        }
     
        redisClient.quit();

        throw err;
    }
});