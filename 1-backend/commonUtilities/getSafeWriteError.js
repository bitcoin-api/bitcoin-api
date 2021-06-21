'use strict';

const fs = require( 'fs' );


const safeWriteErrorToFile = Object.freeze( ({

    safeErrorReport,
    safeErrorsPath

}) => {

    const stream = fs.createWriteStream(
        
        safeErrorsPath,
        {
            flags: 'a'
        }
    );

    stream.write(
        `==--==--==--==--==--==--==--==--==--==--==--==--==\n` +
        `Safe Error Occurred - ${ (new Date()).toLocaleString() }\n` +
        `${ JSON.stringify( safeErrorReport, null, 4 ) }\n` +
        `==--==--==--==--==--==--==--==--==--==--==--==--==\n`
    );

    stream.end();
});


module.exports = Object.freeze( (

    { moduleName = __dirname } = { moduleName: __dirname }

) => {
   
    if( !process.env.SAFE_WRITE_ERROR_FILE_PATH ) {

        throw new Error( 'missing SAFE_WRITE_ERROR_PATH env value' );
    }
    
    const safeErrorsPath = (
        `${ process.env.SAFE_WRITE_ERROR_FILE_PATH }/safeErrors.txt`
    );

    const safeWriteError = Object.freeze( err => {

        console.log( 'running safeWriteError with err:', err );
        console.log( 'safeErrorsPath:', safeErrorsPath );

        try {

            const now = new Date();
            
            const safeErrorReport = {
                
                moduleName,
                moduleDirname: __dirname,
                moduleFilename: __filename,
                name: err.name,
                className: err.className,
                class: err.class,
                status: err.status,
                statusCode: err.statusCode,
                code: err.code,
                message: err.message,
                stack: err.stack,
                type: err.type,
                typeOf: typeof err,
                instanceOfError: err instanceof Error,
                powerOfNow: now.getTime(),
                powerOfNowString: now.toLocaleString(),
                shortMessage: err.shortMessage,
                command: err.command,
                exitCode: err.exitCode,
                signal: err.signal,
                signalDescription: err.signalDescription,
                stdout: err.stdout,
                stderr: err.stderr,
                failed: err.failed,
                timedOut: err.killed,
                isCanceled: err.isCanceled,
                killed: err.killed
            };

            safeWriteErrorToFile({
                safeErrorReport,
                safeErrorsPath
            });

            console.log( 'safeWriteError executed successfully' );
        }
        catch( errInWritingSafeError ) {

            console.log(
                'an error occur in writing safe error:', errInWritingSafeError
            );
        }
    });

    return safeWriteError;
});
