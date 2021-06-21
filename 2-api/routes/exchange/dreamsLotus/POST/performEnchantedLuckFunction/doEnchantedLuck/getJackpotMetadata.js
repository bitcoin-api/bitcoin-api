'use strict';

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    METADATA
                },
            }
        },
    },
    utils: {
        stringify,
        aws: {
            dino: {
                getDatabaseEntry
            },
        },
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    constants: {
        aws: {
            database: {
                metadataKeys: {
                    dreamLotus
                }
            }
        },
    },
} = require( '@bitcoin-api/full-stack-exchange-private' );


module.exports = Object.freeze( async () => {

    console.log(

        'running getJackpotMetadata with the following values: ' +
        stringify({})
    );

    const jackpotMetadata = await getDatabaseEntry({

        tableName: METADATA,
        value: dreamLotus,
    });
    
    if( !jackpotMetadata ) {
        // safeguard
        throw new Error( 'weird error: missing jackpot metadata' );
    }

    console.log(

        'getJackpotMetadata executed successfully: ' +
        stringify({
            responseKeys: Object.keys( jackpotMetadata )
        })
    );

    return jackpotMetadata;
});
