'use strict';

const {
    utils: {
        stringify,
        aws: {
            dino: {
                conversionTools: {
                    getDinoClientDino
                }
            }
        }
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    constants: {
        transactions: {
            types: {
                // raffle,
                dream 
            }
        },
        // raffles: {
        //     types: {
        //         putTicket
        //     }
        // },
        dreams: {
            types: {
                lotus
            }
        }
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

// const handleRafflePutTicket = require( './handleRafflePutTicket' );
const handleDreamsLotusLose = require( './handleDreamsLotusLose' );

const INSERT = 'INSERT';


// const getIfIsRafflePutTicket = Object.freeze( ({

//     dino

// }) => {

//     const isRafflePutTicket = (
//         (dino.type === raffle) &&
//         (dino.raffleType === putTicket)
//     );

//     return isRafflePutTicket;
// });


const getIfIsDreamsLotusLose = Object.freeze( ({

    dino

}) => {

    const isDreamsLotusLose = (
        (dino.type === dream) &&
        (dino.dreamType === lotus) &&
        !dino.happyDream
    );

    return isDreamsLotusLose;
});


module.exports = Object.freeze( async ({

    event,

}) => {

    const records = event.Records;

    console.log(
        'running handleTransactions with ' +
        `${ records.length } records`
    );

    for( const record of records ) {

        if( record.eventName === INSERT ) {

            const dynamoDino = record.dynamodb.NewImage;

            const dino = getDinoClientDino({
                dynamoDino,
            });

            // if( getIfIsRafflePutTicket({ dino }) ) {
                
            //     console.log(
            //         'handling raffle putTicket record: ' +
            //         stringify( record )
            //     );
                
            //     await handleRafflePutTicket({

            //         dino
            //     });
            // }
            // else
            if( getIfIsDreamsLotusLose({ dino }) ) {

                console.log(
                    'handling dreams lotus lose record: ' +
                    stringify( record )
                );
                
                await handleDreamsLotusLose({

                    dino
                });
            }
        }
    }

    console.log( 'handleTransactions executed successfully👩🏿‍💻👨🏻‍💻👩🏼‍💻👨🏾‍💻👏🏿👏🏽👏' );
});