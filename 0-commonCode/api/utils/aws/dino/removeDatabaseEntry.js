'use strict';

const { database } = require( '../aws' );

const {
    
    aws: { database: { tableNameToKey, tableNameToSortKey } }

} = require( '../../../constants' );

const stringify = require( '../../stringify' );


module.exports = Object.freeze( ({

    tableName,
    sortValue,
    key,
    value,
    sortKey,

}) => {

    key = key || tableNameToKey[ tableName ];

    const TableName = tableName;

    const Key = {

        [ key ]: value,
    };

    if( !!sortValue ) {

        sortKey = sortKey || tableNameToSortKey[ tableName ];

        Key[ sortKey ] = sortValue;
    }

    const params = { TableName, Key };

    console.log(

        'Running database.removeDatabaseEntry with the following values: ' +
        stringify( params )
    );

    return new Promise( (
        resolve,
        reject
    ) => database.delete( params, err => {

        if( !!err ) {

            console.log(

                'Error in database.removeDatabaseEntry ' +
                'with the following values: ' +
                stringify( params )
            );

            return reject( err );
        }

        console.log(

            'database.removeDatabaseEntry successfully executed'
        );

        resolve();
    }));
});
