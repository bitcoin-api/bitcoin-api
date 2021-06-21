'use strict';

const {
    utils: {
        stringify,
        aws: {
            dino: {
                classicalUpdateDatabaseEntry
            }
        }
    },
    constants: {
        aws: {
            database: {
                tableNames: {
                    METADATA
                },
            }
        },
    },
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


module.exports = Object.freeze( async ({ 

    jackpotAmount,
    winAmount

}) => {

    /*
        1. update jackpotAmount to zero
        2. update unhappyDreamCount
    */

    const newAmount = jackpotAmount - winAmount;

    console.log(

        'running updateJackpotMetadata with the following values: ' +
        stringify({

            jackpotAmount,
            winAmount,
            'newAmount = jackpotAmount - winAmount =': newAmount,
        })
    );

    await classicalUpdateDatabaseEntry({
    
        tableName: METADATA,
        value: dreamLotus,
        expressionAttributeNames: {
            '#jackpotAmount': 'jackpotAmount',
            '#unhappyDreamCount': 'unhappyDreamCount',
        },
        expressionAttributeValues: {
            ':jackpotAmount' : newAmount,
            ':unhappyDreamCount': 0,
        },
        updateExpression: (
            'SET #jackpotAmount = :jackpotAmount, ' +
            '#unhappyDreamCount = :unhappyDreamCount'
        ),
    });

    console.log(

        'updateJackpotMetadata executed successfully: ' +
        stringify({
            responseKeys: Object.keys( {} )
        })
    );
});
