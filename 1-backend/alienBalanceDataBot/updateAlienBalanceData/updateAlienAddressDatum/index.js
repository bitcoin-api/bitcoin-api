'use strict';

/*
    RUN EVERY 15 minutes, function hasn't been run in past 15 minutes,
        then run again

    get lastPaginationValue from metadata update alien balance glyph
    if last update just happened
        or if no lastpagination value and it is still within 20 seconds

    get all alien addresses starting with address_bsc_1
        for each address
        get user balance
            if diff -> balanceUpdate ATAEUE

    run with next function
*/

const {
    utils: {
        aws: {
            dino: {
                searchDatabase,
            }
        },
        stringify,
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

const getIfThereIsAnAlienBalanceDiff = require( './getIfThereIsAnAlienBalanceDiff' );

// const {
// } = require( '@bitcoin-api/full-stack-exchange-private' );

// const {
//     crypto: {
//         getCryptoAmountNumber
//     }
// } = require( '../../../../../exchangeUtils' );

// const {
//     raffle: {
//         getChoiceTimeData
//     }
// } = require( '../../../../../enchantedUtils' );

const searchLimit = 1000;

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
     
        exchangeUserId: '#exchangeUserId',
    }),

    nameValues: f({
     
        exchangeUserId: 'exchangeUserId',
    }),

    valueKeys: f({

        exchangeUserId: ':exchangeUserId',
    }),

    // valueValues: f({

    //     type: raffle,
    // })
});

const alien = 'alien';


module.exports = Object.freeze( async alienAddressDatum => {

    console.log(
        
        'running updateAlienAddressDatum ' +
        `with the following values - ${ stringify( alienAddressDatum ) }`
    );


    // const  getIfThereIsAnAlienBalanceDiff

    


    /*
        1. get exchange user see if diff
        2. if diff
            in lock
                get exchange user see if diff
                    if diff ATAUEU



    */

    console.log(
        
        'updateAlienAddressDatum ' +
        `executed successfully - ${ stringify({


            
        }) }`
    );
});
