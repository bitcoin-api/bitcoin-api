'use strict';


const {
    utils: {
        aws: {
            dinoCombos: {
                getExchangeUser,
            }
        },
        stringify
    },
    constants: {
        aws: {
            database: {
                tableNames: { ADDRESSES },
                // addressesTable: {
                //     secondaryIndexNames: {
                //         addressIndex
                //     }
                // }
            }
        }
    }
} = require( '@bitcoin-api/full-stack-api-private' );


module.exports = Object.freeze( async alienAddressDatum => {

    console.log(
        
        'running updateAlienAddressDatum ' +
        `with the following values - ${ stringify( alienAddressDatum ) }`
    );

    const exchangeUser = await getExchangeUser({

        exchangeUserId,
    });



    console.log(
        
        'updateAlienAddressDatum ' +
        `executed successfully - ${ stringify({


            
        }) }`
    );
});
