'use strict';

const handleTransactions = require( './handleTransactions' );


exports.handler = Object.freeze( async event => {

    console.log( '💦Running handleTransactionsStream' );

    try {

        await handleTransactions({

            event,
        });
        
        console.log(            
            '💦🐉handleTransactionsStream executed successfully'
        );
    }
    catch( err ) {

        console.log( '💦🍣error in handleTransactionsStream:', err );
    }
});
