'use strict';

const updateAlienBalanceData = require( './updateAlienBalanceData' );


exports.handler = Object.freeze( async () => {

    console.log( '🆙👾⚖️📀 Running updateAlienBalanceData' );

    try {

        await updateAlienBalanceData();
        // await addCacheOnAndOffStatusToRhino( cacheOnAndOffStatus );

        console.log( '🆙👾⚖️📀 updateAlienBalanceData executed successfully' );
    }
    catch( err ) {

        console.log( '🆙👾⚖️📀 error in updateAlienBalanceData:', err );
    }

    // trigger next lambda function no matter what
});
