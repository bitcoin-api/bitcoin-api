'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const bluebird = require( 'bluebird' );

const {
    constants: {
        timeNumbers: { minute }
    },
} = require( '../../../../../utils' );

const {
    exchangeUsers: {
        getHiddenGhostId
    }
} = require( '../../../../../exchangeUtils' );

const validateAndGetValues = require( './validateAndGetValues' );
const getRaffleFullData = require( './getRaffleFullData' );
const getCryptoPotData = require( '../../../../../sacredElementals/probability/raffles/getCryptoPotData' );
const getRaffleDataForExchangeUser = require( './getRaffleDataForExchangeUser' );

const optionalKeys = Object.freeze([

    'winRaffleDrawId',
    'winHour',
    'winChoice',
    'previousRaffleEndHour',
    'winCryptoPayout'
]);


module.exports = Object.freeze( async ({

    exchangeUserId,
    rawLastKey,
    rawLastTime,

}) => {

    console.log(
        
        `running getRaffleData with the following values - ${ stringify({

            exchangeUserId,
            rawLastKey,
            rawLastTime,

        }) }`
    );

    const {

        lastKey,
        lastTime,
        
    } = validateAndGetValues({

        rawLastKey,
        rawLastTime,
    });

    const raffleData = [];

    const {
        
        rawRaffleData,
        lastValues

    } = await getRaffleFullData({

        lastKey,
        lastTime,
    });

    await bluebird.map( rawRaffleData, async rawRaffleDatum => {

        const raffleId = rawRaffleDatum.key;

        const raffleDatum = {

            raffleId,
            raffleStartTime: rawRaffleDatum.creationDate,
            raffleType: rawRaffleDatum.lotteryType,
            ticketCryptoPrice: rawRaffleDatum.ticketCryptoPrice,
            raffleNumber: rawRaffleDatum.raffleNumber,
            houseCut: rawRaffleDatum.houseCut,
        };
        
        for( const key of optionalKeys ) {

            if( !!rawRaffleDatum[ key ] ) {

                raffleDatum[ key ] = rawRaffleDatum[ key ];
            }
        }

        if( !!rawRaffleDatum.winnerExchangeUserIds ) {

            raffleDatum.numberOfWinners = (
                
                rawRaffleDatum.winnerExchangeUserIds.length
            );
        }

        const getDataOperations = {

            cryptoPotData: getCryptoPotData({

                raffleId,
                shouldGetAbsoluteValueOfTheCryptoPot: true
            }),
        };

        if(
            !!rawRaffleDatum.winRaffleDrawId &&
            !!rawRaffleDatum.winHour
        ) {

            const endTime = rawRaffleDatum.winHour + (10 * minute);

            getDataOperations.raffleDataForExchangeUser = (
                getRaffleDataForExchangeUser({
                    
                    exchangeUserId,
                    startTime: raffleDatum.raffleStartTime,
                    endTime,
                    raffleId: raffleDatum.raffleId,
                })
            );
        }
        else {

            getDataOperations.raffleDataForExchangeUser = (
                getRaffleDataForExchangeUser({
                    
                    exchangeUserId,
                    startTime: raffleDatum.raffleStartTime,
                    endTime: Date.now(),
                    raffleId: raffleDatum.raffleId,
                })
            );
        }

        const { 
            
            cryptoPotData: {

                cryptoPot
            },

            raffleDataForExchangeUser: {

                choices,
                winData
            },

        } = await bluebird.props( getDataOperations );

        Object.assign(
            
            raffleDatum,
            {
                cryptoPot,
                choices,
                winData,
            }
        );

        raffleData.push( raffleDatum );

    }, { concurrency: 3 } );

    const responseValue = {
        
        raffleData,
        lastValues,
    };

    if( !lastKey && !lastTime ) {

        responseValue.ownSpecialId = getHiddenGhostId({

            exchangeUserId,
        });
    }
    
    console.log(
        
        `getRaffleData executed successfully, returning values - ${ stringify({

            ['number of raffle datas']: raffleData.length,
            ['Response Value Object Keys']: Object.keys( responseValue ),
        }) }`
    );

    return responseValue;
});
