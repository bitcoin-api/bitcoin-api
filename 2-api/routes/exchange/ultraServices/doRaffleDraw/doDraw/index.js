'use strict';

const {
    // utils: {
    //     stringify,
    // },
    constants: {
        aws: {
            database: {
                tableNameToKey,
                tableNames: { METADATA }
            }
        },
        environment: {
            isProductionMode
        }
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    raffle: {
        getChoiceFromNumbers,
        getRaffleDrawId
    }
} = require( '../../../../../enchantedUtils' );

const getCurrentHour = require( './getCurrentHour' );
const getMostRecentRaffleData = require( '../../../../../sacredElementals/probability/raffles/getMostRecentRaffleData' );
const getDrawnNumbers = require( './getDrawnNumbers' );
const getWinnerExchangeUserIds = require( './getWinnerExchangeUserIds' );
const putRaffleDrawEntry = require( './putRaffleDrawEntry' );
const getCryptoPotData = require( './getCryptoPotData' );
const getCryptoPayout = require( './getCryptoPayout' );
const payoutWinners = require( './payoutWinners' );
const updateCurrentRaffle = require( './updateCurrentRaffle' );
const createNewRaffle = require( './createNewRaffle' );

// const defaultHouseCut = 0.2;


module.exports = Object.freeze( async () => {

    console.log( 'running doDraw' );

    const currentHour = getCurrentHour();

    const raffleData = await getMostRecentRaffleData();

    if( !!raffleData.winRaffleDrawId ) {

        throw new Error(
            `most recent raffle (with raffleId "${ raffleData.raffleId }" ` +
            'has already finished'
        );
    }

    const numbers = getDrawnNumbers();

    // const choice = '2-22' || getChoiceFromNumbers({ numbers });
    // const choice = '3-36' || getChoiceFromNumbers({ numbers });
    const choice = isProductionMode ? (
        
        getChoiceFromNumbers({ numbers })

    ) : '3-36';
    // ) : '2-4';

    const raffleId = raffleData[ tableNameToKey[ METADATA ] ];

    const winnerExchangeUserIds = await getWinnerExchangeUserIds({

        raffleId,
        choice,
        currentHour,
    });

    if( winnerExchangeUserIds.length === 0 ) {

        console.log(
            
            'doDraw - no winners - ' +
            'putting raffle draw metadata database entry'
        );

        await putRaffleDrawEntry({

            raffleId,
            choice,
            currentHour,
        });

        return console.log( 'doDraw - executed successfully' );
    }

    console.log(
            
        `doDraw - there are ${ winnerExchangeUserIds.length } winners - ` +
        'paying out winners, putting raffle draw ' +
        'metadata database entry, and creating new draw'
    );

    const {

        cryptoPot

    } = await getCryptoPotData({

        raffleId,
        currentHour,
    });

    const { houseCut } = raffleData;

    const cryptoPayout = getCryptoPayout({

        cryptoPot,
        numberOfWinners: winnerExchangeUserIds.length,
        houseCut,
    });

    const raffleDrawId = getRaffleDrawId();

    await updateCurrentRaffle({

        raffleId,
        cryptoPot,
        winRaffleDrawId: raffleDrawId,
        winHour: currentHour,
        winChoice: choice,
        winnerExchangeUserIds,
        winCryptoPayout: cryptoPayout,
    });

    await payoutWinners({

        raffleId,
        cryptoPayout,
        winnerExchangeUserIds,
        raffleDrawId,
    });

    await putRaffleDrawEntry({

        raffleId,
        choice,
        currentHour,
        raffleDrawId,
        winData: {

            winnerExchangeUserIds,
            cryptoPayout,
            cryptoPot,
            houseCut,
        }
    });

    await createNewRaffle({

        ticketCryptoPrice: raffleData.ticketCryptoPrice,
        previousRaffleId: raffleId,
        previousRaffleNumber: raffleData.raffleNumber,
        previousRaffleEndHour: currentHour,
        houseCut
    });

    console.log( 'doDraw - executed successfully' );
});

/*
    actions:
        add win transactions
        add draw entry
        update raffle to won
        create new raffle

        what is the issue:
            
*/
