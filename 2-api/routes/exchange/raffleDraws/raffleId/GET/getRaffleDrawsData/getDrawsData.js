'use strict';

const {
    utils: {
        aws: {
            dino: {
                searchDatabase
            }
        },
        stringify,
    },
    constants: {
        aws: {
            database: {
                tableNames: {
                    METADATA
                },
                tableNameToKey,
                secondaryIndex: {
                    typeCreationDateIndex
                }
            }
        },
        metadata: {
            types: {
                raffleDraw
            }
        },
        environment: {
            isProductionMode
        },
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    constants: {
        timeNumbers: {
            minute
        }
    }
} = require( '../../../../../../utils' );

// const searchLimit = 1;
const searchLimit = isProductionMode ? 100 : 3;
// const searchLimit = 20000;

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
        type: '#type',
        creationDate: '#creationDate',
        raffleId: '#raffleId',
    }),

    nameValues: f({
        type: 'type',
        raffleId: 'raffleId',
        creationDate: 'creationDate',
    }),

    valueKeys: f({
        type: ':type',
        startTime: ':startTime',
        endTime: ':endTime',
        raffleId: ':raffleId',
    }),
});

// const key = tableNameToKey[ METADATA ];


module.exports = Object.freeze( async ({

    raffleId,
    startTime,
    endTime,
    lastTime,
    lastKey,

}) => {

    console.log(

        'running getDrawsData with the following values: ' +
        stringify({

            raffleId,
            startTime,
            endTime,
            lastTime,
            lastKey,
        })
    );

    const collectedDraws = [];
    let thereAreMoreDrawsToGet = true;

    let lastTimeToUse = lastTime;
    let lastKeyToUse = lastKey;
    let iterationCount = 0;

    while( thereAreMoreDrawsToGet ) {

        iterationCount++;

        console.log( 

            'getDrawsData - running search iteration with values: ' + 
            stringify({

                iterationCount,
                lastTimeToUse,
                lastKeyToUse,
            })
        );

        const searchParams = {
            TableName: METADATA,
            IndexName: typeCreationDateIndex,
            Limit: searchLimit,
            ScanIndexForward: false,
            // ProjectionExpression: [
            //     attributes.nameKeys.amount,
            //     attributes.nameKeys.creationDate,
            //     attributes.nameKeys.action,
            // ].join( ', ' ), // TODO:
            KeyConditionExpression: (
                `${ attributes.nameKeys.type } = ${ attributes.valueKeys.type } and ` +
                `${ attributes.nameKeys.creationDate } between ` +
                `${ attributes.valueKeys.startTime } and ` +
                `${ attributes.valueKeys.endTime }`
            ),
            FilterExpression: (
                `${ attributes.nameKeys.raffleId } = ${ attributes.valueKeys.raffleId }`// +
                // `${ attributes.nameKeys.raffleType } = ${ attributes.valueKeys.raffleType } and ` +
                // `${ attributes.nameKeys.choice } = ${ attributes.valueKeys.choice }`
            ),
            ExpressionAttributeNames: {
                [attributes.nameKeys.type]: attributes.nameValues.type,
                [attributes.nameKeys.creationDate]: attributes.nameValues.creationDate,
                [attributes.nameKeys.raffleId]: attributes.nameValues.raffleId,
            },
            ExpressionAttributeValues: {
                [attributes.valueKeys.type]: raffleDraw,
                [attributes.valueKeys.startTime]: startTime,
                [attributes.valueKeys.endTime]: endTime + (10 * minute),
                [attributes.valueKeys.raffleId]: raffleId,
            },
            ExclusiveStartKey: (!!lastTimeToUse && !!lastKeyToUse) ? {
                
                [ tableNameToKey[ METADATA ] ]: lastKeyToUse,
                creationDate: lastTimeToUse,
                type: raffleDraw,
    
            } : undefined,
        };
    
        const {
    
            ultimateResults,
            paginationValue
    
        } = await searchDatabase({
    
            searchParams
        });

        const draws = ultimateResults.map( rawDraw => {
    
            const draw = {
    
                time: rawDraw.currentHour,
                choice: rawDraw.choice,
                win: !!rawDraw.winData,
                key: rawDraw.key,
                creationDate: rawDraw.creationDate,
            };
    
            return draw;
        });

        collectedDraws.push( ...draws );

        if( !paginationValue ) {

            thereAreMoreDrawsToGet = false;
            
            if( collectedDraws.length <= searchLimit ) {

                lastTimeToUse = null;
                lastKeyToUse = null;
            }
            else {

                collectedDraws.length = searchLimit;
                lastTimeToUse = collectedDraws[
                    collectedDraws.length - 1
                ].creationDate;
                lastKeyToUse = collectedDraws[
                    collectedDraws.length - 1
                ].key;
            }
        }
        else {
            
            if( collectedDraws.length <= searchLimit ) {

                lastTimeToUse = paginationValue.creationDate;
                lastKeyToUse = paginationValue.key;
            }
            else {

                thereAreMoreDrawsToGet = false;
                collectedDraws.length = searchLimit;
                lastTimeToUse = collectedDraws[
                    collectedDraws.length - 1
                ].creationDate;
                lastKeyToUse = collectedDraws[
                    collectedDraws.length - 1
                ].key;
            }
        }
    }

    const drawsData = {

        draws: collectedDraws.map( rawCollectedDraw => {
    
            const draw = {
    
                time: rawCollectedDraw.time,
                choice: rawCollectedDraw.choice,
                win: rawCollectedDraw.win,
                id: rawCollectedDraw.key,
            };
    
            return draw;
        }),
        pageInfo: (
            
            !!lastTimeToUse &&
            !!lastKeyToUse
            
        ) ? {
            
            lastKey: lastKeyToUse,
            lastTime: lastTimeToUse,

        } : null,
    };

    console.log(
        'getDrawsData executed successfully - got ' +
        `${ collectedDraws.length } draws - search limit is: ${ searchLimit }`
    );

    return drawsData;
});
