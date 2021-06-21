'use strict';

const {
    utils: {
        redis: {
            doRedisFunction
        },
        stringify
    },
    constants: {
        environment: {
            isProductionMode
        }
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    
    // getFormattedEvent,
    getResponse,
    handleError,
    // beginningDragonProtection,
    business: {
        getIfApiIsActive,
        getIfApiIsOnData
    }

} = require( '../../utils' );

const getFeeData = require( '../fee_data/GET/getFeeData' );


exports.handler = Object.freeze( async () => {
    
    console.log( 'running the / - GET function' );

    try {

        const {

            fee,
            apiIsActive,
            bitcoinApiIsOn,
            bitcoinApiIsOffReason
            
        } = await doRedisFunction({

            functionName: 'getApiActiveStatus',
            performFunction: async ({

                redisClient
    
            }) => {

                const [
            
                    {
                        fee                        
                    },
                    apiIsActive,
                    {
                        bitcoinApiIsOn,
                        bitcoinApiIsOffReason
                    }
                    
                ] = await Promise.all([
                    
                    getFeeData(),
                    getIfApiIsActive({
        
                        redisClient
                    }),
                    getIfApiIsOnData({

                        redisClient
                    })
                ]);
        
                return {

                    fee,
                    apiIsActive,
                    bitcoinApiIsOn,
                    bitcoinApiIsOffReason
                };
            },
        });

        const apiOn = apiIsActive && bitcoinApiIsOn;

        const values = {

            serviceInformation: {
                name: (
                    `Bitcoin-API${ isProductionMode ? '' : ' (testnet mode)' }`
                ),
                description: 'API for Bitcoin',
                github: 'https://github.com/bitcoin-api',
                apiIsActive: apiOn,
                currentFee: fee
            }
        };

        if(
            apiIsActive &&
            !bitcoinApiIsOn &&
            bitcoinApiIsOffReason
        ) {

            values.serviceInformation.notice = bitcoinApiIsOffReason;
        }

        if( !isProductionMode ) {

            values.serviceInformation.metadata = {

                'Be Bitcoin Happy with': 'Bitcoin-API!😇🖖✌️🤙'
            };
        }

        console.log(
        
            '/ - GET function executed successfully, ' +
            'returning values: ' +
            stringify( values )
        );

        return getResponse({ body: values });
    }
    catch( err ) {

        console.log( `error in / - GET function: ${ err }` );

        return handleError( err );
    }
});