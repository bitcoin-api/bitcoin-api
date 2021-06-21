'use strict';

const uuidv4 = require( 'uuid/v4' );

const {
    utils: {
        doOperationInQueue,
        stringify,
        javascript: {
            getQueueId
        },
    }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    utils: {
        aws: {
            dinoCombos: {
                addTransactionAndUpdateExchangeUser,
                getExchangeUser,
            }
        }
    },
    constants: {
        transactions: {
            types,
        },
        aws: {
            database: {
                tableNames: {
                    EXCHANGE_USERS
                }
            }
        },
        votes
    }
} = require( '@bitcoin-api/full-stack-exchange-private' );

const {
    exchangeUsers: {
        getBalanceData
    }
} = require( '../../../../../../exchangeUtils' );

const validateAndGetValues = require( './validateAndGetValues' );
const getMetadataVoteData = require( './getMetadataVoteData' );
const getMostRecentVoteTransaction = require( '../../../../../../sacredElementals/probability/votes/getMostRecentVoteTransaction' );

/*
    basic validation
        amount
        choice
        voteId
    get metadata vote data
        if DNE
            BAD
        use metadata to validate
            is still running
            choice
    get last transaction to get last amount spent
    get user
        make sure ((user crypto) + (last amount spent)) - (requested amount) >= 0
    add vote
*/

const doVoteCore = Object.freeze( async ({

    exchangeUserId,
    amount,
    choice,
    voteId,

}) => {

    // const metadataVoteData = await getMetadataVoteData({
    const metadataVoteData = getMetadataVoteData({

        voteId,
    });

    if( !metadataVoteData ) {

        console.log( 'error in doVote: invalid voteId specified' );

        const error = new Error(
            `Bad Request: invalid voteId specified - ${ voteId }`
        );
        error.statusCode = 400;
        throw error;
    }
    else if( Date.now() >= metadataVoteData.votingEndTime ) {

        console.log( 'error in doVote: voting period is over' );

        const error = new Error(
            'Bad Request: voting period is over'
        );
        error.statusCode = 400;
        throw error;
    }
    else if(
        !!choice &&
        !metadataVoteData.choices.includes( choice )
    ) {

        console.log( `error in doVote: invalid choice ${ choice }` );

        const error = new Error(

            `Bad Request: invalid choice ${ choice }`
        );
        error.statusCode = 400;
        throw error;
    }

    const [

        exchangeUser,
        rawMostRecentVoteTransaction,

    ] = await Promise.all([
        
        getExchangeUser({
            exchangeUserId,
        }),

        getMostRecentVoteTransaction({

            exchangeUserId,
            voteId,
            shouldGetEventSeriesId: true,
        }),
    ]);

    const mostRecentVoteTransaction = rawMostRecentVoteTransaction || {

        voteType: votes.types.doVote,
        amount: 0,
        choice: null,
        eventSeriesId: uuidv4(),
    };

    if( mostRecentVoteTransaction.voteType !== votes.types.doVote ) {
        // safeguard, should get here in normal operation

        throw new Error(
            'invalid mostRecentTransaction: ' +
            JSON.stringify( mostRecentVoteTransaction ) +
            ', not performing vote'
        );
    }

    const balanceData = getBalanceData({
        exchangeUser,
    });

    const mostRecentVoteTransactionAmount = -mostRecentVoteTransaction.amount;

    const totalAmountUserHasToVote = (
        balanceData.summary.crypto.totalAmount +
        mostRecentVoteTransactionAmount
    );

    const desiredAmountToVote = -amount; 

    const userIsAllowedToVote = (
        
        totalAmountUserHasToVote >= desiredAmountToVote
    );

    console.log(

        'seeing if user has enough money to vote:',
        stringify({
            ['Total amount user has']: balanceData.summary.crypto.totalAmount,
            ['Most recent vote transaction amount']: mostRecentVoteTransactionAmount,
            ['Total amount user has to vote']: totalAmountUserHasToVote,
            ['Desired amount to vote']: desiredAmountToVote,
            ['(Total amount user has to vote) ≥ (Desired amount to vote)']: userIsAllowedToVote
        })
    );

    if( !userIsAllowedToVote ) {
        
        const error = new Error(

            `user does not have ${ desiredAmountToVote } Crypto, user cannot vote`
        );
        error.bulltrue = true;
        error.statusCode = 400;
        throw error;
    }

    await addTransactionAndUpdateExchangeUser({

        noLocka: true,
        exchangeUserId,
        type: types.vote,
        data: {

            voteType: votes.types.doVote,
            amount,
            voteId,
            choice,
            eventSeriesId: mostRecentVoteTransaction.eventSeriesId,
        },
    });

    const doVoteResults = {};

    console.log(
        `doVote - successfully executed - returning values: ${
            stringify( doVoteResults )
        }`
    );

    return doVoteResults;
});


module.exports = Object.freeze( async ({

    exchangeUserId,
    rawVoteId,
    event,
    // ipAddress,
    
}) => {
    
    const requestBody = event.body;

    const rawAmount = (
        requestBody.amount
    );
    const rawChoice = (
        requestBody.choice
    );

    console.log(
        
        `running doVote with the following values - ${ stringify({

            exchangeUserId,
            rawAmount,
            rawChoice,
            rawVoteId,
        }) }`
    );

    const {

        amount,
        choice,
        voteId,

    } = validateAndGetValues({

        rawAmount,
        rawChoice,
        rawVoteId,
    });

    const doWithdrawResults = await doOperationInQueue({
        queueId: getQueueId({ type: EXCHANGE_USERS, id: exchangeUserId }),
        doOperation: async () => {

            return await doVoteCore({

                exchangeUserId,
                amount,
                choice,
                voteId,
            });
        }
    });

    console.log(
        `doVote executed successfully - returning values ${
            stringify( doWithdrawResults )
        }`
    );

    return doWithdrawResults;
});
