'use strict';

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
                tableNames: {
                    METADATA
                },
                secondaryIndex: {
                    typeCreationDateIndex,
                }
            }
        },
        metadata: {
            types: {
                raffle
            }
        }
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
     
        type: '#type',
        key: '#key',
        cryptoPot: '#cryptoPot',
        creationDate: '#creationDate',
        lotteryType: '#lotteryType',
        ticketCryptoPrice: '#ticketCryptoPrice',
    }),

    nameValues: f({
     
        type: 'type',
        // key: 'key',
        // cryptoPot: 'cryptoPot',
        // creationDate: 'creationDate',
        // lotteryType: 'lotteryType',
        // ticketCryptoPrice: 'ticketCryptoPrice',
    }),

    valueKeys: f({

        type: ':type',
    }),

    valueValues: f({

        type: raffle,
    })
});


module.exports = Object.freeze( async () => {

    console.log(
        
        'running getMostRecentRaffleData ' +
        `with the following values - ${ stringify({}) }`
    );

    // {
    //     "creationDate": 1602141854902,
    //     "cryptoPot": 0,
    //     "key": "raffle_1602141854902",
    //     "lotteryType": "twoNumber",
    //     "ticketCryptoPrice": 2,
    //     "type": "raffle"
    // }

    const searchParams = {

        TableName: METADATA,
        IndexName: typeCreationDateIndex,
        ScanIndexForward: false,
        // ProjectionExpression: [
        //     attributes.nameKeys.creationDate,
        //     attributes.nameKeys.cryptoPot,
        //     attributes.nameKeys.key,
        //     attributes.nameKeys.lotteryType,
        //     attributes.nameKeys.ticketCryptoPrice,
        // ].join( ', ' ),
        Limit: 1,
        KeyConditionExpression: (
            `${ attributes.nameKeys.type } = ` +
            `${ attributes.valueKeys.type }`
        ),
        ExpressionAttributeNames: {
            [attributes.nameKeys.type]: attributes.nameValues.type,
            // [attributes.nameKeys.key]: attributes.nameValues.key,
            // [attributes.nameKeys.cryptoPot]: attributes.nameValues.cryptoPot,
            // [attributes.nameKeys.creationDate]: attributes.nameValues.creationDate,
            // [attributes.nameKeys.lotteryType]: attributes.nameValues.lotteryType,
            // [attributes.nameKeys.ticketCryptoPrice]: attributes.nameValues.ticketCryptoPrice,
        },
        ExpressionAttributeValues: {
            [attributes.valueKeys.type]: attributes.valueValues.type,
        },
    };

    const allRaffleData = (await searchDatabase({
        searchParams,
    })).ultimateResults;

    console.log(
        `getMostRecentRaffleData, got ${ allRaffleData.length } ` +
        'raffleDatas'
    );

    if( allRaffleData.length === 0 ) {

        throw new Error(

            'getMostRecentRaffleData error, ' +
            'unable to locate any raffle data'
        );
    }
    else if( allRaffleData.length > 1 ) {
        
        // safeguard
        throw new Error(
            'getMostRecentRaffleData error - ' +
            'got multiple raffleData when search ' +
            'was only supposed to get one'
        );
    }

    const raffleData = allRaffleData[0];

    console.log(
        'getMostRecentRaffleData executed successfully, ' +
        `returning raffleData ${ stringify( raffleData ) }`
    );

    return raffleData;
});