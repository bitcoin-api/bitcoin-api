'use strict';

const samanthaEncrypt = require( './samantha' );


module.exports = ({

    exchangeUserId,
    
}) => {

    const encryptedExchangeUserId1 = samanthaEncrypt({

        text: exchangeUserId
    });

    // return encryptedExchangeUserId1;
    // Buffer.from("Hello World").toString('base64')
    const encryptedExchangeUserId2 = Buffer.from(
      
        encryptedExchangeUserId1
        
    ).toString( 'base64' );

    const encryptedExchangeUserId3 = (
     
        encryptedExchangeUserId2.replace(/\=/g, '_' )
    );

    return encryptedExchangeUserId3;
};
