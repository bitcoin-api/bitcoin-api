'use strict';

const token = process.env.TOKEN;

if( !token ) {

    throw new Error( 'missing TOKEN environment variable' );
}


module.exports = Object.freeze({

    token,
    baseUrl: process.env.BASE_URL,
});
