'use strict';

const {

    utils: {
        aws: { dino: { updateDatabaseEntry } },
        database: {
            metadata: {
                getFeeData
            }
        }
    },
    constants: {
        aws: {
            database: {
                // tableNameToKey,
                tableNames: { METADATA },
                // metadataPartitionKeyValues: { feeData }
            }
        },
        environment: {
            isProductionMode
        }
    }

} = require( '@bitcoin-api/full-stack-api-private' );

const {
    
    doBitcoinRequest,
    constants: {
        megaServerId
    }
} = require( '@bitcoin-api/full-stack-backend-private' );

const feeMultiplier = isProductionMode ? 0.15 : 1;
// const feeMultiplier = isProductionMode ? 0.008 : 1;
const defaultFeeRate = 0.0002;
// const blessingFee = 0.00000100;
// const trinityFee = 0;
// const sacramentFee = 0;
/*
0.0002 feerate equals 1.07 Canadian Dollar default
[for a 1kB transaction (supposedly default is 250kB)]
Mar. 25, 2:04 a.m. UTC
*/
// update march 26 2021: the above was from 2020


module.exports = Object.freeze( () => {

    console.log( 'running updateFee, YES🐺💰💰💰💰' );

    const args = [
        'estimatesmartfee',
        '6'
    ];

    return doBitcoinRequest({ args }).then( results => {

        const parsedBitcoinRequestResults = JSON.parse( results );

        const rawFeerateValue = parsedBitcoinRequestResults.feerate;
        const rawFeerateValueAsNumber = Number( rawFeerateValue );

        const fee = Number.isNaN( rawFeerateValueAsNumber ) ? (
            defaultFeeRate
        ) : rawFeerateValueAsNumber;

        const tableName = METADATA;

        const entry = getFeeData({

            fee,
            feeMultiplier,
            businessFeeData: {

                // can customize fee values here
                // payroll: {
                    
                //     amount: 0.00001,
                // },

                // insurance: {
                    
                //     amount: 0.00002,
                // },

                // commission: {
                    
                //     amount: 0.00003,
                // },
            },

            megaServerId
        });

        return updateDatabaseEntry({

            tableName,
            entry,
        });

    }).then( () => {

        console.log(`

            updateFee executed successfully, YES YES YES🐺💰💰💰💰

        `);
    });
});
