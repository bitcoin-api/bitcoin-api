'use strict';

const { database } = require( '../aws' );

const stringify = require( '../../stringify' );

const {
    
    aws: { database: { tableNameToKey, tableNameToSortKey } }

} = require( '../../../constants' );


module.exports = Object.freeze( ({
    
    tableName,
    value,
    
    // optional    
    key = null,
    sortValue = null,
    sortKey = null,
    attributeUpdates,
    conditionExpression,
    conditionalOperator,
    expected,
    expressionAttributeNames,
    expressionAttributeValues,
    returnConsumedCapacity,
    returnItemCollectionMetrics,
    returnValues,
    updateExpression,

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

    console.log(

        'Running database.classicalUpdateDatabaseEntry ' +
        'with the following values: ' +
        stringify({

            TableName,
            Key,
            AttributeUpdates: attributeUpdates,
            ConditionExpression: conditionExpression,
            ConditionalOperator: conditionalOperator,
            Expected: expected,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnConsumedCapacity: returnConsumedCapacity,//INDEXES | TOTAL | NONE,
            ReturnItemCollectionMetrics: returnItemCollectionMetrics, //SIZE | NONE,
            ReturnValues: returnValues,// NONE | ALL_OLD | UPDATED_OLD | ALL_NEW | UPDATED_NEW,
            UpdateExpression: updateExpression, //'STRING_VALUE'
        })
    );

    return new Promise(

        ( resolve, reject ) => database.update({

            TableName,
            Key,
            AttributeUpdates: attributeUpdates,
            ConditionExpression: conditionExpression,
            ConditionalOperator: conditionalOperator,
            Expected: expected,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnConsumedCapacity: returnConsumedCapacity,//INDEXES | TOTAL | NONE,
            ReturnItemCollectionMetrics: returnItemCollectionMetrics, //SIZE | NONE,
            ReturnValues: returnValues,// NONE | ALL_OLD | UPDATED_OLD | ALL_NEW | UPDATED_NEW,
            UpdateExpression: updateExpression, //'STRING_VALUE'

        }, ( err, data ) => {

            if( !!err ) {

                console.log(

                    'Error in database.classicalUpdateDatabaseEntry:',
                    err.message
                );

                return reject( err );
            }

            console.log(

                'database.classicalUpdateDatabaseEntry ' +
                'successfully executed: ' +
                `here is the data: ${ stringify( data ) }`
            );

            resolve( data );
        })
    );
});
