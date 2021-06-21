'use strict';

const { argv } = require( 'yargs' );

const {

    constants: {
        deployCommands,
        deployCommandList
    }

} = require( '@bitcoin-api/giraffe-utils' );


module.exports = Object.freeze( () => {

    const command = argv.command || argv.c || deployCommands.feeDataBot;

    if( deployCommandList.includes( command ) ) {

        console.log(`
            
            ☢️🐑 The Deploy Command: ${ command } 🍀
        
        `);

        return command;
    }

    throw new Error( 'invalid deploy command:', command );
});
