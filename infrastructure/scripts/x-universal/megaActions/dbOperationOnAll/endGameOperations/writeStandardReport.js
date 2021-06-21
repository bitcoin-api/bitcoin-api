'use strict';

// const argv = require( 'yargs' ).argv;
const fs = require( 'fs' );
const util = require( 'util' );
const writeFile = util.promisify( fs.writeFile );

const {
    utils: {
        stringify,
    },
    // constants: {
    //     aws: { database: { tableNames: { BALANCES, WITHDRAWS } } }
    // }
} = require( '@bitcoin-api/full-stack-api-private' );

const getBalanceData = require( process.env.GET_BALANCE_DATA_PATH );


module.exports = Object.freeze( async ({

    allItems,

}) => {

    console.log(
        'running writeStandardReport with the following values:',
        stringify({
            numberOfItems: allItems.length,
        })
    );

    allItems.sort( ( itemA, itemB ) => {

        return itemB.lastUpdated - itemA.lastUpdated;
    });

    const standardReport = stringify({

        standardReport: {

            numberOfItems: allItems.length,
            itemData: allItems.map( exchangeUser => {

                const balanceData = getBalanceData({

                    exchangeUser
                });
            
                return {

                    email: exchangeUser.email,
                    exchangeUserId: exchangeUser.exchangeUserId,
                    transactionCount: exchangeUser.transactionCount,
                    lastUpdated: exchangeUser.lastUpdated,
                    lastUpdatedCool: (new Date( exchangeUser.lastUpdated )).toLocaleString(),
                    'Bitcoin Balance ': balanceData.summary.bitcoin.totalAmount,
                    'Crypto Balance': balanceData.summary.crypto.totalAmount,
                    'Total BTC Balance': (
                        Math.round(
                            (
                                balanceData.summary.bitcoin.totalAmount +
                                (balanceData.summary.crypto.totalAmount/1000)
                            ) * 100000000 ) / 100000000
                    ).toFixed(8),
                };
            })
        }
    });
    
    writeFile(
        `${ __dirname }/standardReport.json`,
        standardReport
    );

    console.log(
        'writeStandardReport executed successfully'
    );
});
