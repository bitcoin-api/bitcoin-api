'use strict';

const {
    utils: {
        stringify
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    constants: {
        raffles: {
            actions
        }
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );


const getTransactionAmountCore = Object.freeze( ({

    ticketCryptoPrice,
    action,
    currentAmountForChoice,
    
}) => {

    const negativeTicketCryptoPrice = -ticketCryptoPrice;

    if( action === actions.buy ) {

        if( currentAmountForChoice !== 0 ) {

            const error = new Error(
        
                'cannot buy ticket, already ' +
                'bought ticket for selected numbers'
            );
            error.bulltrue = true;
            error.statusCode = 400;
            throw error;
        }

        return negativeTicketCryptoPrice;
    }

    if( currentAmountForChoice !== negativeTicketCryptoPrice ) {

        const error = new Error(
        
            'cannot cancel ticket, have ' +
            'not yet bought ticket for selected numbers'
        );
        error.bulltrue = true;
        error.statusCode = 400;
        throw error;
    }

    return ticketCryptoPrice;
});


module.exports = Object.freeze( ({

    ticketCryptoPrice,
    action,
    currentAmountForChoice,
    
}) => {

    console.log(
        
        `running getTransactionAmount
            with the following values - ${
            
            stringify({

                ticketCryptoPrice,
                action,
                currentAmountForChoice,
            })
        }`
    );

    const transactionAmount = getTransactionAmountCore({

        ticketCryptoPrice,
        action,
        currentAmountForChoice,
    });

    console.log(
        
        `getTransactionAmount executed successfully
            returning transaction amount: ${ transactionAmount } Cryptos`
    );

    return transactionAmount;
});