'use strict';

const fs = require( 'fs' );

const withdrawReportsPath = process.env.WITHDRAW_REPORTS_PATH;

const reportsPath = `${ withdrawReportsPath }/currentWithdrawReports.txt`;

const writeReportToFile = Object.freeze( ({

    withdrawReport

}) => {

    const stream = fs.createWriteStream(
        
        reportsPath,
        {
            flags: 'a'
        }
    );

    stream.write(
        `==--==--==--==--==--==--==--==--==--==--==--==--==\n` +
        `Withdraw Occurred - ${ (new Date()).toLocaleString() }\n` +
        `${ JSON.stringify( withdrawReport, null, 4 ) },\n` +
        `==--==--==--==--==--==--==--==--==--==--==--==--==\n`
    );

    stream.end();
});


module.exports = Object.freeze( ({

    withdrawReport

}) => {

    console.log( 'running safeWriteReportToFile' );

    try {

        writeReportToFile({ withdrawReport });

        console.log( 'safeWriteReportToFile executed successfully' );
    }
    catch( err ) {

        console.log(
            'an error occur in writing safeWriteReportToFile:', err
        );
    }
});
