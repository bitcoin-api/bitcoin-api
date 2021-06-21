'use strict';

const {

    backgroundExecutor

} = require( '@bitcoin-api/full-stack-backend-private' );


module.exports = Object.freeze({

    backgroundExecutor,
    getFeeEstimateAmount: require( './getFeeEstimateAmount' ),
});