'use strict';

const { database } = require( '../aws' );

const stringify = require( '../../stringify' );


const scanDatabase = Object.freeze( ({
    
    scanParams,
    theResolve = null,
    theReject = null,

}) => {

    const ultraLimit = scanParams.Limit;

    if( !ultraLimit ) {

        return Promise.reject( new Error( 'missing ultraLimit' ) );
    }

    console.log(
        
        'Running database.scanDatabase with the following values: ' +
        stringify({ scanParams })
    );

    return new Promise( (
        resolve, reject
    ) => database.scan( scanParams, ( err, data = {} ) => {

        theResolve = theResolve || resolve;
        theReject = theReject || reject;

        if( !!err ) {

            console.log(
                'Error in database.scanDatabase ' +
                'with the following values: ' +
                stringify( scanParams )
            );
            
            return theReject( err );
        }

        const results = ( !!data.Items && data.Items ) || [];

        const ultimateResults = results.slice();

        if( !!data && !!data.LastEvaluatedKey ) {

            const paginationValue = Object.assign( {}, data.LastEvaluatedKey );

            console.log(
                'database.scanDatabase: ' +
                'the limit has been hit, returning the super response -- ' +
                `pagination value: ${ stringify( paginationValue ) }`
            );

            return theResolve({
                ultimateResults,
                paginationValue 
            });
        }

        console.log(
            'database.scanDatabase successfully executed, ' +
            `retrieved ${ ultimateResults.length } results`
        );
        
        theResolve({
            ultimateResults,
            paginationValue: null
        });
    }));
});


module.exports = scanDatabase;