'use strict';

const {

    utils: {
        stringify,
        delay,
    },

} = require( '@bitcoin-api/full-stack-api-private' );

const getValidLickFileInfo = require( './getValidLickFileInfo' );

const treeTigerHome = process.env.TREE_TIGER_HOME;
const pathToLickFile = `${ treeTigerHome }/treeDeploy/lick_file.json`;

const oneSecond = 1000;
const fourSeconds = 4 * oneSecond;


module.exports = Object.freeze( async () => {

    console.log(
        
        '🦏running waitUntilGiraffeLicksLeaf🦏 - ' +
        `with the following values - ${ stringify({
            pathToLickFile
        }) }`
    );

    while( true ) {

        console.log(
            'waitUntilGiraffeLicksLeaf - attempting to get lickFile'
        );

        const lickFileInfo = await getValidLickFileInfo({

            pathToLickFile,
        });

        if( !lickFileInfo ) {

            console.log(
                'waitUntilGiraffeLicksLeaf - no lickFile ' +
                `trying again in ${ fourSeconds / 1000 } seconds`
            );

            await delay( fourSeconds );
        }
        else {

            console.log(
                'waitUntilGiraffeLicksLeaf ' +
                'executed successfully - ' +
                'here is the information: ' +
                stringify( lickFileInfo ) +
                ' the leaf has been licked 🦒👅🍁🌳 ~~~~'
            );
    
            return lickFileInfo;
        }
    }
});