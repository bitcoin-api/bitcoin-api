'use strict';

const {
    utils: {
        stringify
    }
} = require( '@bitcoin-api/full-stack-api-private' );


const getParsedBodySafely = Object.freeze( ({

    rawEvent

}) => {

    try {
        
        const body = JSON.parse( rawEvent.body );

        return body;
    }
    catch( err ) {
        
        console.log( 'getParsedBodySafely - error parsing body:', err );

        return {};
    }
});


module.exports = Object.freeze( ({
    
    rawEvent,
    shouldGetBodyFromEvent = false,
    shouldGetPathParametersFromEvent = false,
    shouldGetQueryStringParametersFromEvent = false

}) => {
    
    console.log( 'running getExchangeEvent' );

    const exchangeEvent = {

        headers: rawEvent.headers,
        data: {

            ipAddress: rawEvent.requestContext.http.sourceIp,
        },
        isProbablyCrypto: (
            !!rawEvent.headers.origin &&
            rawEvent.headers.origin.includes( 'probablycrypto.com' )
        ),
    };

    if( shouldGetBodyFromEvent ) {

        exchangeEvent.body = getParsedBodySafely({ rawEvent });
    }

    if( shouldGetPathParametersFromEvent ) {

        exchangeEvent.pathParameters = rawEvent.pathParameters;
    }

    if( shouldGetQueryStringParametersFromEvent ) {

        exchangeEvent.queryStringParameters = (
            
            rawEvent.queryStringParameters || {}
        );
    }

    console.log(
        
        'getExchangeEvent executed successfully, got exchangeEvent:',
        stringify( exchangeEvent )
    );

    return exchangeEvent;
});
