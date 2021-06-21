'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const validateAndGetValues = require( './validateAndGetValues' );
const getData = require( './getData' );
const mappyMappyTransactions = require( './mappyMappyTransactions' );


module.exports = Object.freeze( async ({

    exchangeUserId,
    rawLastTransactionId,
    rawLastTime,
    smallBatch,

}) => {

    console.log(
        
        `running getMoneyActionData with the following values - ${
            stringify({
                exchangeUserId,
                rawLastTransactionId,
                rawLastTime,
                smallBatch,
            })
        }`
    );

    const {

        lastTime,
        lastTransactionId,

    } = validateAndGetValues({
        
        rawLastTransactionId,
        rawLastTime,
    });

    const data = await getData({

        exchangeUserId,
        lastTime,
        lastTransactionId,
        smallBatch,
    });

    const moneyActionData = {

        moneyActions: mappyMappyTransactions({
            
            transactions: data.transactions
        }),
        lastTime: data.lastTime,
        lastTransactionId: data.lastTransactionId
    };

    console.log(

        `getMoneyActionData executed successfully -
            returning moneyActionData: ${
                stringify( Object.keys( moneyActionData ) )
        }`
    );

    return moneyActionData;
});