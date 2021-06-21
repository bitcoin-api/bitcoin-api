'use strict';

const getIfEnvValueIsTruthful = require( './getIfEnvValueIsTruthful' );


module.exports = Object.freeze( ({

    envKeys

}) => {

    envKeys.forEach( envKey => {

        if( !getIfEnvValueIsTruthful({ envKey }) ) {

            throw new Error(

                `🧞‍♀️env value "${ envKey }" not set🧞‍♀️`
            );
        }
    });
});
