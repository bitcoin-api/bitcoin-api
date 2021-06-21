'use strict';

const {
    utils: {
        stringify,
        aws: {
            dino: {
                classicalUpdateDatabaseEntry,
            }
        }
    },
    constants: {
        aws: {
            database: {
                tableNames: {
                    METADATA
                }
            }
        },
    }
} = require( '@bitcoin-api/full-stack-api-private' );


const {
    constants: {
        aws: {
            database: {
                metadataKeys: {
                    dreamLotus
                },
            }
        },
    },
} = require( '@bitcoin-api/full-stack-exchange-private' );

const theMod = 50;


module.exports = Object.freeze( async ({

    dino,

}) => {

    console.log(
        'running handleDreamsLotusLose with the following values: ' +
        stringify({
            dino
        })
    );

    const results = await classicalUpdateDatabaseEntry({
    
        tableName: METADATA,
        value: dreamLotus,
        expressionAttributeNames: {
            '#unhappyDreamCount': 'unhappyDreamCount',
        },
        expressionAttributeValues: {
            ':unhappyDreamCountIncrementAmount': 1,
        },
        updateExpression: (
            'ADD #unhappyDreamCount :unhappyDreamCountIncrementAmount'
        ),
        returnValues: 'UPDATED_NEW',
    });

    const newUnhappyDreamCount = results.Attributes.unhappyDreamCount;

    const shouldIncrementJackpot = (newUnhappyDreamCount % theMod) === 0;

    console.log(
        'handleDreamsLotusLose: ' +
        'seeing if should increment jackpot: ' +
        stringify({

            newUnhappyDreamCount,
            theMod,
            shouldIncrementJackpot
        })
    );

    if( shouldIncrementJackpot ) {

        const amountToAdd = Math.abs( dino.amount );

        await classicalUpdateDatabaseEntry({
    
            tableName: METADATA,
            value: dreamLotus,
            expressionAttributeNames: {
                '#jackpotAmount': 'jackpotAmount',
            },
            expressionAttributeValues: {
                ':amountToAdd': amountToAdd
            },
            updateExpression: (
                'ADD #jackpotAmount :amountToAdd'
            ),
        });
    }

    console.log(
        '✅handleDreamsLotusLose executed successfully'
    );
});
