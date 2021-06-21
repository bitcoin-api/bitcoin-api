'use strict';

const doDraw = require( './doDraw' );

exports.handler = Object.freeze( async () => {

    console.log( '🎟Running doRaffleDraw' );

    try {

        await doDraw();

        console.log( '✅🎟doRaffleDraw executed successfully' );
    }
    catch( err ) {

        console.log( '❌🎟error in doRaffleDraw:', err );
    }
});
