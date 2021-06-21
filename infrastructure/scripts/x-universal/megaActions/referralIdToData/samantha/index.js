'use strict';

const crypto = require( 'crypto' );
const algorithm = 'aes-256-cbc';

const yargs = require( 'yargs' );
const isProductionMode = yargs.argv.mode === 'production';

const encryptionId = isProductionMode ? process.env.PRODUCTION_EXCHANGE_SAMANTHA_ENCRYPTION_ID : process.env.STAGING_EXCHANGE_SAMANTHA_ENCRYPTION_ID;
const encryptionPassword = isProductionMode ? process.env.PRODUCTION_EXCHANGE_SAMANTHA_ENCRYPTION_PASSWORD : process.env.STAGING_EXCHANGE_SAMANTHA_ENCRYPTION_PASSWORD;
const brickworksEncryptTag = '__bw__';

const encryptionIdToEncryptionPassword = {

    [encryptionId]: encryptionPassword,
};


module.exports = Object.freeze( ({
    
    text,

}) => {

    const splitText = text.split( brickworksEncryptTag );

    if( splitText.length !== 2 ) {

        const errorMessage = `invalid text to decrypt: ${ text }`;

        throw new Error( errorMessage );
    }

    const [ encryptionId, textToDecrypt ] = splitText;
    
    const decryptPassword = encryptionIdToEncryptionPassword[ encryptionId ];

    if( !decryptPassword ) {

        const errorMessage = `invalid encryptionId: ${ encryptionId }`;

        throw new Error( errorMessage );
    }

    const textParts = textToDecrypt.split(':');
    const iv = Buffer.from( textParts.shift(), 'hex' );
    const encryptedText = Buffer.from( textParts.join(':'), 'hex' );
    const decipher = crypto.createDecipheriv(
        
        algorithm,
        Buffer.from( decryptPassword ),
        iv
    );
    const decrypted = decipher.update( encryptedText );
    const decryptedFinalForm = Buffer.concat(
        
        [ decrypted, decipher.final() ]
    );

    const decryptedText = decryptedFinalForm.toString();

    return decryptedText;
});
