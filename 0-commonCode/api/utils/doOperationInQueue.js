'use strict';

const drqPrivate = require( './drqPrivate' );


module.exports = Object.freeze( async ({

    queueId,
    doOperation,
    doOperationArgs,

}) => {

    return await drqPrivate({

        queueId,
        operation: doOperation,
        operationArgs: doOperationArgs,
    });
});
