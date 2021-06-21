'use strict';

const {
    utils: {
        aws: {
            dino: {
                updateDatabaseEntry
            }
        },
        stringify
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    EXCHANGE_USERS
                },
            }
        }
    },
    utils: {
        exchangeUsers: {
            getTheOracleOfDelphiDefi
        }
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

const flamingoCrescent = require( '../../../../../sacredElementals/crypto/flamingoCrescent/index' );

const {

    javascript: {
        getHashedPassword,
        // getExchangeUserIdData,
        // verificationCodeTools: {
        //     getVerificationCode
        // }
    },

} = require( '../../../../../exchangeUtils' );


module.exports = Object.freeze( async ({

    email,
    displayEmail,
    password,
    ipAddress,
    exchangeUserId,
    emailMessageId,
    verifyEmailCode,
    isHumanScore,
    isHumanTime,
    
}) => {

    console.log(
        `running addNewUserToDatabase
            with the following values - ${
                stringify({
                    email,
                    displayEmail,
                    password,
                    exchangeUserId,
                    emailMessageId,
                    verifyEmailCode,
                    isHumanScore,
                    isHumanTime,
                })
        }`
    );

    // const {
        
    //     exchangeUserId,
    //     baseId

    // } = getExchangeUserIdData();

    const hashedPassword = getHashedPassword({

        password,
    });

    const flamingoHashedPassword = flamingoCrescent({

        text: hashedPassword
    });

    // const verifyEmailCode = getVerificationCode({

    //     baseId,
    // });

    const userObject = {

        displayEmail,
        exchangeUserId,
        emailMessageId,
        verifyEmailCode,
        emailToVerify: email,
        hashedPassword: flamingoHashedPassword,
        metadata: {
            creation: {
                date: Date.now(),
                ipAddress,
                isHumanScore,
                isHumanTime,
            }
        },
        transactionCount: 0,
        existingAtaueu: {
            oracleGhost: {
                theOracleOfDelphiDefi: getTheOracleOfDelphiDefi(),
                withdrawIdToData: {},
            },
        }
    };

    await updateDatabaseEntry({

        tableName: EXCHANGE_USERS,
        entry: userObject,
    });

    const responseObject = {};

    console.log(

        'addNewUserToDatabase executed successfully - ' +
        `returning values: ${ stringify( responseObject ) }`
    );

    return responseObject;
});
