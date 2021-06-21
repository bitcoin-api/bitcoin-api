'use strict';

const yargs = require( 'yargs' );

require( 'dotenv' ).config();

const isCanadaProductionMode = yargs.argv.mode === 'canada';

if( isCanadaProductionMode ) {

    process.env.BITCOIN_API_ENV = 'production';
}
else {

    process.env.BITCOIN_API_ENV = 'staging';
}


const getRedisUrl = () => {
       
    if( isCanadaProductionMode ) {

        const redisUrl = process.env.CANADA_REDIS_URL;
        process.env.REDIS_URL = redisUrl;

        return redisUrl;
    }
    else if( yargs.argv.mode === 'ireland' ) {

        const redisUrl = process.env.IRELAND_REDIS_URL;
        process.env.REDIS_URL = redisUrl;

        return redisUrl;
    }

    throw new Error( 'invalid mode' );
};

const redisUrl = getRedisUrl();


const {

    utils: {
        redis: {
            doRedisRequest,
            getClient,
        }
    },

} = require( 'api' );


const getIsArgumentValid = argument => (
    
    !!argument ||
    (argument === 0) ||
    (argument === '0') 
);


(async () => {

    const client = getClient({

        url: redisUrl
    });
    
    try {

        const {
            
            command,
            a,
            b,
            c,
            d,
            e

         } = yargs.argv;


        const redisArguments = [];

        if( getIsArgumentValid( a ) ) {

            redisArguments.push( a );
            
            if( getIsArgumentValid( b ) ) {

                redisArguments.push( b );
                
                if( getIsArgumentValid( c ) ) {

                    redisArguments.push( c );

                    if( getIsArgumentValid( d ) ) {

                        redisArguments.push( d );

                        if( getIsArgumentValid( e ) ) {

                            redisArguments.push( e );
                        }
                    }
                }
            }
        }

        const results = await doRedisRequest({
            client,
            command: command,
            redisArguments
        });

        console.log(`
        
            Redis Results: ${ JSON.stringify( {

                results,

            }, null, 4 ) }
        `);
    }
    catch( err ) {

        console.log(`
        
        
        
            DO COMMAND ERROR: ${ err }
        
        
        
        `);
    }

    client.quit();
})();