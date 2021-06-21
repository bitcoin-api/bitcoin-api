'use strict';

require( 'dotenv' ).config();
const yargs = require( 'yargs' );
const isProductionMode = yargs.argv.mode === 'production';

const samanthaDecrypt = require( './samantha' );


const exchangeUserIdData = [

    isProductionMode ? {

        publicId: yargs.argv.r || process.env.PRODUCTION_PUBLIC_ID,
    } : {
        
        publicId: yargs.argv.r || process.env.STAGING_PUBLIC_ID,
    },
];


const getExchangeUserIdFromPublicId = ({

    publicId

}) => {

    const exchangeUserIdRaw1 = Buffer.from(
        
        publicId.substring(
            'DynastyBitcoin_Ref_ID_'.length
        ).replace( /^\_$/g, '=' ),
        'base64'

    ).toString( 'ascii' );

    const exchangeUserId = samanthaDecrypt({

        text: exchangeUserIdRaw1
    });

    console.log({
        publicId,
        modifiedPublicIdLength: `DynastyBitcoin_Ref_ID_${ publicId }`.length,
        exchangeUserId
    });
};



(() => {

    for( const exchangeUserIdDatum of exchangeUserIdData ) {

        getExchangeUserIdFromPublicId({

            publicId: exchangeUserIdDatum.publicId,
        });
    }
})();