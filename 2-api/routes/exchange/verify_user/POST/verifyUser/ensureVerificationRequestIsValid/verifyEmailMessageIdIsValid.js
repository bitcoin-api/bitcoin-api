'use strict';

const {
    utils: {
        aws: {
            dino: {
                searchDatabase,
            }
        },
        stringify,
    },
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    EXCHANGE_EMAIL_DELIVERY_RESULTS
                }
            }
        }
    },
} = require( '@bitcoin-api/full-stack-exchange-private' );

const {
    constants: {
        exchangeEmailDeliveryResults: {
            types: {
                success
            }
        },
        verificationCode
    }
} = require( '../../../../../../exchangeUtils' );

const searchLimit = 1000;

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
     
        email: '#email',
        emailMessageId: '#emailMessageId',
        creationDate: '#creationDate',
        type: '#type',
    }),

    nameValues: f({
     
        email: 'email',
        emailMessageId: 'emailMessageId',
        creationDate: 'creationDate',
        type: 'type',
    }),

    valueKeys: f({

        email: ':email',
        success: ':success',
        searchStartTime: ':searchStartTime',
        searchEndTime: ':searchEndTime',
    }),

    valueValues: f({

        success
    }),
});

const getIfMessageIdIsValidBasedOnCurrentResults = Object.freeze( ({

    exchangeEmailDeliverySuccessResults,
    emailMessageId

}) => {

    for( const eedr of exchangeEmailDeliverySuccessResults ) {

        if( eedr.emailMessageId === emailMessageId ) {

            const messageIdIsValidBasedOnCurrentResults = true;

            return messageIdIsValidBasedOnCurrentResults;
        }
    }

    const messageIdIsValidBasedOnCurrentResults = false;

    return messageIdIsValidBasedOnCurrentResults;
});


module.exports = Object.freeze( async ({

    email,
    emailMessageId,
    expiryDate,

}) => {

    console.log(
        
        'running verifyEmailMessageIdIsValid with the ' +
        `following values: ${ stringify({
            
            email,
            emailMessageId,
            expiryDate,
        })}`
    );

    const {

        nameKeys,
        nameValues,
        valueKeys,
        valueValues,

    } = attributes;

    let messageIdIsValid = false;
    const searchStartTime = expiryDate - verificationCode.expiryTime;
    const searchEndTime = expiryDate - 1;
    let paginationValueToUse = null;
    
    do {

        const searchParams = {

            TableName: EXCHANGE_EMAIL_DELIVERY_RESULTS,
            Limit: searchLimit,
            ScanIndexForward: false,
            ProjectionExpression: [
                nameKeys.emailMessageId,
            ].join( ', ' ),
            KeyConditionExpression: (
                `${ nameKeys.email } = ${ valueKeys.email } and ` +
                `${ nameKeys.creationDate } between ` +
                `${ valueKeys.searchStartTime } and ` +
                `${ valueKeys.searchEndTime }`
            ),
            FilterExpression: (
                `${ nameKeys.type } = ${ valueKeys.success }`
            ),
            ExpressionAttributeNames: {
                [nameKeys.email]: nameValues.email,
                [nameKeys.emailMessageId]: nameValues.emailMessageId,
                [nameKeys.type]: nameValues.type,
                [nameKeys.creationDate]: nameValues.creationDate,
            },
            ExpressionAttributeValues: {
                [valueKeys.email]: email,
                [valueKeys.success]: valueValues.success,
                [valueKeys.searchStartTime]: searchStartTime,
                [valueKeys.searchEndTime]: searchEndTime,
            },
            ExclusiveStartKey: paginationValueToUse || undefined,
        };

        const {

            ultimateResults,
            paginationValue

        } = await searchDatabase({

            searchParams,
        });

        const exchangeEmailDeliverySuccessResults = ultimateResults;

        const messageIdIsValidBasedOnCurrentResults = (
            getIfMessageIdIsValidBasedOnCurrentResults({

                exchangeEmailDeliverySuccessResults,
                emailMessageId,
            })
        );

        if( messageIdIsValidBasedOnCurrentResults ) {

            messageIdIsValid = true;
        }

        if( !messageIdIsValid && !!paginationValue ) {

            paginationValueToUse = paginationValue;
        }
        else {

            paginationValueToUse = null;
        }

    } while( !!paginationValueToUse );

    if( !messageIdIsValid ) {

        const error = new Error(
            'The provided email verification link has been expired. ' +
            'Please try creating your ' +
            'account again. Sorry for any inconvenience.'
        );
        error.statusCode = 400;
        error.bulltrue = true;
        throw error;
    }

    console.log(
        
        'verifyEmailMessageIdIsValid executed successfully -'
    );
});
