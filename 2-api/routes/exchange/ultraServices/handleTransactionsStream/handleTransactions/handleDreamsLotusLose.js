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

const theMod = 200;


module.exports = Object.freeze( async ({

    dino,

}) => {

    console.log(
        'running handleDreamsLotusLose with the following values: ' +
        stringify({
            dino
        })
    );

    const amountToAdd = Math.abs(
        
        dino.amount / theMod
    );

    const results = await classicalUpdateDatabaseEntry({
    
        tableName: METADATA,
        value: dreamLotus,
        expressionAttributeNames: {
            '#unhappyDreamCount': 'unhappyDreamCount',
            '#jackpotAmount': 'jackpotAmount',
        },
        expressionAttributeValues: {
            ':amountToAdd': amountToAdd,
            ':unhappyDreamCountIncrementAmount': 1,
        },
        updateExpression: (
            'ADD #unhappyDreamCount :unhappyDreamCountIncrementAmount, #jackpotAmount :amountToAdd'
        ),
        returnValues: 'ALL_NEW',
    });

    const updatedJackpotData = results.Attributes;

    console.log(
        '✅handleDreamsLotusLose executed successfully ' +
        `here is the updated jackpot data: ${
            stringify( updatedJackpotData )
        }`
    );
});
