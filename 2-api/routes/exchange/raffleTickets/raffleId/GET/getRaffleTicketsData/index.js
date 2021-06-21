'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const validateAndGetValues = require( './validateAndGetValues' );
const getTicketsData = require( './getTicketsData' );


module.exports = Object.freeze( async ({

    rawRaffleId,
    rawTime,
    rawPowerId,
    rawSpecialId

}) => {

    console.log(
        
        `running getRaffleTicketsData with the following values - ${
            stringify({
                rawRaffleId,
                rawTime,
                rawPowerId,
                rawSpecialId,
            })
        }`
    );

    const {

        raffleId,
        time,
        transactionId,
        specialId,

    } = validateAndGetValues({

        rawRaffleId,
        rawTime,
        rawPowerId,
        rawSpecialId,
    });

    const ticketsData = await getTicketsData({

        raffleId,
        time,
        transactionId,
        specialId,
    });

    console.log(

        `getRaffleTicketsData executed successfully -
            returning raffle tickets: ${
                stringify({
                    'number of tickets': ticketsData.tickets.length,
                    'page info': ticketsData.pageInfo
                })
        }`
    );

    return ticketsData;
});