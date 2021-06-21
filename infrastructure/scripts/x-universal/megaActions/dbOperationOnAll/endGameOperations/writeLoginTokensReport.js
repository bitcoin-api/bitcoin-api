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


module.exports = Object.freeze( async ({

    allItems,

}) => {

    console.log(
        'running writeLoginTokensReport with the following values:',
        stringify({
            numberOfItems: allItems.length,
        })
    );

    allItems.sort( ( itemA, itemB ) => {

        return itemB.lastUpdated - itemA.lastUpdated;
    });

    const loginTokensReport = stringify({

        loginTokensReport: {

            numberOfItems: allItems.length,
            itemData: allItems.map( loginTokenData => {

                return {

                    exchangeUserId: loginTokenData.exchangeUserId,
                    lastUpdatedCool: (new Date( loginTokenData.lastUpdated )).toLocaleString(),
                };
            })
        }
    });
    
    writeFile(
        `${ __dirname }/loginTokensReport.json`,
        loginTokensReport
    );

    console.log(
        'writeLoginTokensReport executed successfully'
    );
});
