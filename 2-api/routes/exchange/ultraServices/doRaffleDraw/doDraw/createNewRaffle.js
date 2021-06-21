'use strict';

const {
    utils: {
        aws: {
            dino: {
                updateDatabaseEntry
            }
        },
        stringify,
    },
    constants: {
        aws: {
            database: {
                tableNameToKey,
                tableNames: { METADATA },
            }
        },
        metadata: {
            types: {
                raffle
            }
        }
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    raffle: { getRaffleId },
    constants: { raffle: { lotteryTypes: { twoNumber } } },
} = require( '../../../../../enchantedUtils' );

/*
    {
        "creationDate": 1602141854902,
        "cryptoPot": -22,
        "key": "raffle_1602141854902",
        "lotteryType": "twoNumber",
        "ticketCryptoPrice": 2,
        "type": "raffle"

        // "lastUpdated": 1603777527342,
    }
*/

const defaultCryptoTicketPrice = 1;



module.exports = Object.freeze( async ({

    ticketCryptoPrice = defaultCryptoTicketPrice,
    previousRaffleId,
    previousRaffleNumber,
    previousRaffleEndHour,
    houseCut

}) => {

    console.log(
        
        'running createNewRaffle ' +
        'with the following values: ' +
        stringify({
            ticketCryptoPrice,
            previousRaffleId,
            previousRaffleNumber,
            previousRaffleEndHour,
            houseCut,
        })
    );

    const raffleData = {

        [ tableNameToKey[ METADATA] ]: getRaffleId(), 
        cryptoPot: 0,
        lotteryType: twoNumber,
        ticketCryptoPrice: ticketCryptoPrice,
        type: raffle,
        creationDate: Date.now(),
        previousRaffleId,
        raffleNumber: previousRaffleNumber + 1,
        previousRaffleEndHour,
        houseCut,
    };

    await updateDatabaseEntry({

        tableName: METADATA,
        entry: raffleData,
    });

    console.log( 'createNewRaffle executed successfully' );
});
