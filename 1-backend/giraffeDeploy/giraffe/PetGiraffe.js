#!/usr/bin/env node
'use strict';

const argv = require( 'yargs' ).argv;

if( argv.mode === 'production' ) {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../../productionCredentials/giraffe/.env`
    });
}
else {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../../stagingCredentials/giraffe/.env`
    });
}


const giraffeDeploy = require( './giraffeDeploy' );


giraffeDeploy();

/*
    MAKE GIRAFFE UTILS NPM
    ------

    LINUX SCRIPT
        * setup folder structure for temp tigers (temp tiger path TTP)

    1. G: create lick file
    2. G: send lick file
    3. L: receives lick file
    4. G: send tigers to TTP
    4/5. L/T: send telepathy to tiger to enlighten (or enlighen by force)
    6: L: cancel pm2, delete TP, copy TTP to TP, npm i, run special function, pm2 start, send serviceIsGood
*/