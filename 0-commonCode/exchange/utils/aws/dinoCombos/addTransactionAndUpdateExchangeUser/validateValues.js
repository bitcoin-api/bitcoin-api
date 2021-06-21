'use strict';

const {
    utils: {
        stringify,
        bitcoin: {
            validation
        },
    },
    // constants: {
    //     environment: {
    //         isProductionMode
    //     }        
    // }
} = require( '@bitcoin-api/full-stack-api-private' );

const {
    transactions,
    exchanges,
    dreams,
    votes,
    raffles,
    identityTransactions,
    alien,
} = require( '../../../../constants' );

const exactMath = require( '../../../exactMath' );


module.exports = Object.freeze( ({

    type,
    data,
    exchangeUser,

}) => {

    console.log(
        '-- validateValues 4 addTransactionAndUpdateExchangeUser --' +
        'running validateValues for addTransactionAndUpdateExchangeUser ' +
        `with the following values: ${ stringify({
            exchangeUser,
            type,
            data,
        })}`
    );

    if( !transactions.types[ type ] ) {

        throw new Error(
            `invalid transaction type provided: ${ type }` 
        );
    }

    if(
        !(
            (type === transactions.types.identity) &&
            (data.identityType === identityTransactions.types.refresh)
        ) &&
        (
            !exchangeUser.existingAtaueu ||
            !exchangeUser.existingAtaueu.oracleGhost ||
            !exchangeUser.existingAtaueu.oracleGhost.theOracleOfDelphiDefi ||
            !exchangeUser.existingAtaueu.oracleGhost.withdrawIdToData
        )
    ) {
        throw new Error(
            'ATAEUE Safeguard error: ' +
            'no existing valid existingAtaueu - ' +
            'possible legacy exchange user: ' +
            stringify( exchangeUser )
        );
    }

    switch( type ) {
        case transactions.types.identity:
            switch( data.identityType ) {
                case identityTransactions.types.pure:
                case identityTransactions.types.recalculate:
                case identityTransactions.types.refresh:
                    break;
                default:
                    // safeguard: should not be able to get here in normal operation
                    throw new Error(
                        'weird error 3432432sfsfdsfdsfehhjfhnnb - ' +
                        'invalid identity transaction type: ' +
                        JSON.stringify( data )
                    );
            }
            break;

        case transactions.types.addBitcoin:

            const bitcoinMoneyData = (
        
                !!exchangeUser.moneyData &&
                !!exchangeUser.moneyData.bitcoin &&
                exchangeUser.moneyData.bitcoin
        
            ) || null;

            if( !bitcoinMoneyData ) {

                throw new Error(
                
                    'validateValues 4 addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `trying to add transaction on user ${
                        exchangeUser.exchangeUserId
                    } ` +
                    'when that user does not have any bitcoin money data' 
                );
            }

            if( 
                (
                    !data.amount &&
                    (data.amount !== 0)
                ) ||
                (
                    !data.address ||
                    !validation.getIsValidAddress( data.address )
                ) || (

                    bitcoinMoneyData.filter(

                        ({ address }) => (address === data.address)

                    ).length !== 1
                )
            ) {

                throw new Error(
                
                    'validateValues 4 addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid data: ${ JSON.stringify( data ) }`
                );
            }
            break;

        case transactions.types.withdrawBitcoin:
            if( 
                !data.amount ||
                (
                    !data.fee &&
                    (data.fee !== 0)
                ) ||
                !data.withdrawId ||
                !data.address ||
                !Object.keys( transactions.bitcoinWithdrawTypes ).includes(
                    data.bitcoinWithdrawType
                )
            ) {

                throw new Error(
                
                    'validateValues 4 addTransactionAndUpdateExchangeUser' +
                    'error: ' +
                    `invalid data: ${ JSON.stringify( data ) }`
                );
            }
            break;

        case transactions.types.exchange:

            switch( data.exchangeType ) {
                
                case exchanges.types.btcToCrypto:
                    if( 
                        !data.amountInCryptoWanted ||
                        (typeof data.amountInCryptoWanted !== 'number') ||
                        !data.amountInBTCNeeded ||
                        (typeof data.amountInBTCNeeded !== 'number')
                    ) {
                        throw new Error(
                        
                            'validateValues 4 ' +
                            'addTransactionAndUpdateExchangeUser ' +
                            'error: ' +
                            `invalid data: ${ JSON.stringify( data ) }`
                        );
                    }
                    break;
            
                case exchanges.types.cryptoToBTC:
                    if( 
                        !data.amountInBitcoinWanted ||
                        (typeof data.amountInBitcoinWanted !== 'number') ||
                        !data.amountInCryptoNeeded ||
                        (typeof data.amountInCryptoNeeded !== 'number')
                    ) {
                        throw new Error(
                        
                            'validateValues 4 ' +
                            'addTransactionAndUpdateExchangeUser ' +
                            'error: ' +
                            `invalid data: ${ JSON.stringify( data ) }`
                        );
                    }
                    break;

                default:
                    // safeguard: should not be able to get here in normal operation
                    throw new Error(
                        'weird error hngvSkJdsgfh92G385472gefger - ' +
                        'invalid exchange transaction data: ' +
                        JSON.stringify( data )
                    );
            }
            break;
    
        case transactions.types.dream:
            switch( data.dreamType ) {
                case dreams.types.coin:
                case dreams.types.lotus:
                case dreams.types.slot:
                    if(
                        !(
                            (typeof data.amount === 'number') &&
                            !Number.isNaN( data.amount )
                        )
                    ) {
                        throw new Error(
                        
                            'validateValues 4 ' +
                            'addTransactionAndUpdateExchangeUser ' +
                            'error: ' +
                            `invalid data: ${ JSON.stringify( data ) }`
                        );
                    }
                    break;
                default:
                    // safeguard: should not be able to get here in normal operation
                    throw new Error(
                        'weird error jjDfJxXcpPWeLaKNriT29935XCSGmkFka816 - ' +
                        'invalid dream transaction data: ' +
                        JSON.stringify( data )
                    );
            }
            break;

        /*
            {
                type: vote,
                data: {
                    voteId: 'usaElection',
                    amount: 123.232,
                    voteType: 'vote' || 'payout',
                    choice,
                    eventSeriesId
                }
            }
        */
        case transactions.types.vote: {

            if(
                !data.voteId ||
                (typeof data.voteId !== 'string')
            ) {

                throw new Error(
                
                    'validateValues 4 ' +
                    'addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid voteId in vote data: ${
                        JSON.stringify( data )
                    }`
                );
            }
            else if( !votes.types[ data.voteType ] ) {

                throw new Error(
                
                    'validateValues 4 ' +
                    'addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid voteType in vote data: ${
                        JSON.stringify( data )
                    }`
                );
            }
            else if(
                !(
                    (typeof data.amount === 'number') &&
                    !Number.isNaN( data.amount )
                )
            ) {
                throw new Error(
                
                    'validateValues 4 ' +
                    'addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid amount in vote data: ${
                        JSON.stringify( data )
                    }`
                );
            }

            if( data.voteType === votes.types.doVote ) {

                if( data.amount === 0 ) {

                    if( data.choice !== null ) {

                        throw new Error(
                        
                            'validateValues 4 ' +
                            'addTransactionAndUpdateExchangeUser ' +
                            'error: ' +
                            `invalid choice in vote data: ${
                                JSON.stringify( data )
                            }`
                        );
                    }
                }
                else if(
                    !data.choice ||
                    (typeof data.choice !== 'string')
                ) {

                    throw new Error(
                
                        'validateValues 4 ' +
                        'addTransactionAndUpdateExchangeUser ' +
                        'error: ' +
                        `invalid choice in vote data: ${
                            JSON.stringify( data )
                        }`
                    );
                }
            }
            else if( data.choice !== null ) { 

                throw new Error(
                
                    'validateValues 4 ' +
                    'addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid choice in vote data: ${
                        JSON.stringify( data )
                    }`
                );
            }

            if(
                !data.eventSeriesId ||
                (typeof data.eventSeriesId !== 'string')
            ) {

                throw new Error(
                
                    'validateValues 4 ' +
                    'addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid eventSeriesId in vote data: ${
                        JSON.stringify( data )
                    }`
                );
            }
            break;
        }

        /*
            {
                type: raffle,
                data: {
                    searchId: 'raffle_20232032030',
                    amount: 4,
                    raffleType: 'putTicket' || 'payout',
                    choice || raffleDrawId
                    action || N/A
                }
            }
        */
       
       case transactions.types.raffle: {

            if(
                !data.searchId ||
                (typeof data.searchId !== 'string')
            ) {

                throw new Error(
                
                    'validateValues 4 ' +
                    'addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid searchId in raffle data: ${
                        JSON.stringify( data )
                    }`
                );
            }
            else if( !raffles.types[ data.raffleType ] ) {

                throw new Error(
                
                    'validateValues 4 ' +
                    'addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid raffleType in raffle data: ${
                        JSON.stringify( data )
                    }`
                );
            }
            else if(
                !(
                    (typeof data.amount === 'number') &&
                    !Number.isNaN( data.amount )
                )
            ) {
                throw new Error(
                
                    'validateValues 4 ' +
                    'addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid amount in raffle data: ${
                        JSON.stringify( data )
                    }`
                );
            }
            else if(
                (data.raffleType === raffles.types.putTicket) &&
                (
                    (
                        !data.choice ||
                        (typeof data.choice !== 'string')
                    ) ||
                    (
                        !data.action ||
                        (typeof data.action !== 'string')
                    )
                )
            ) {

                throw new Error(
            
                    'validateValues 4 ' +
                    'addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid choice in raffle data: ${
                        JSON.stringify( data )
                    }`
                );
            }
            else if(
                (data.raffleType === raffles.types.payout) &&
                (
                    !data.raffleDrawId ||
                    (typeof data.raffleDrawId !== 'string')
                )
            ) {

                throw new Error(
            
                    'validateValues 4 ' +
                    'addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid choice in raffle data: ${
                        JSON.stringify( data )
                    }`
                );
            }

            break;
        }

        case transactions.types.bonus: {

            if(
                !data.searchId ||
                (typeof data.searchId !== 'string')
            ) {
                throw new Error(
                    'validateValues 4 ' +
                    'addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid searchId in bonus data: ${
                        JSON.stringify( data )
                    }`
                );
            }
            else if(
                !(
                    (typeof data.bitcoinAmount === 'number') &&
                    !Number.isNaN( data.bitcoinAmount )
                )
            ) {
                throw new Error(
                
                    'validateValues 4 ' +
                    'addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid bitcoinAmount in bonus data: ${
                        JSON.stringify( data )
                    }`
                );
            }
            else if(
                !(
                    (typeof data.cryptoAmount === 'number') &&
                    !Number.isNaN( data.cryptoAmount )
                )
            ) {
                throw new Error(
                
                    'validateValues 4 ' +
                    'addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid cryptoAmount in bonus data: ${
                        JSON.stringify( data )
                    }`
                );
            }

            break;
        }

        /*
            {
                "currency": "CUSTYSUM",
                "amount": 20.22,
                "type": "setAlienBalance",
                "address": "bsc_1_hudfgdhsufdhsadsfn",
                "creationDate": 1617404700000,
                "exchangeUserId": "exchange_user_1c5f8ad1162e463d84bdeee485e1de36",
                "lastUpdated": 1617404700000,
                "transactionId": "transaction_42f0d1d62fba4670a3129346b835bcee_1617404776685",
            };
        */
        case transactions.types.setAlienBalance: {

            if( !alien.currencies[ data.currency ] ) {
                throw new Error(
                    'validateValues 4 ' +
                    'addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid currency in setAlienBalance data: ${
                        JSON.stringify( data )
                    }`
                );
            }
            else if( typeof data.address !== 'string' ) {
                throw new Error(
                    'validateValues 4 ' +
                    'addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid address in setAlienBalance data: ${
                        JSON.stringify( data )
                    }`
                );
            }
            else if( typeof data.action !== 'string' ) {
                throw new Error(
                    'validateValues 4 ' +
                    'addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid action in setAlienBalance data: ${
                        JSON.stringify( data )
                    }`
                );
            }
            else if( typeof data.amount !== 'string' ) {
                throw new Error(
                    'validateValues 4 ' +
                    'addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid amount in setAlienBalance data: ${
                        JSON.stringify( data )
                    }`
                );
            }
            try {
                exactMath.add( data.amount, 0 );
            }
            catch( err ) {
                console.log(
                    'validateValues 4 ' +
                    'addTransactionAndUpdateExchangeUser ' +
                    'IDENTITY (x + 0 = x) AMOUNT ADD NUMBER TEST FAILED'
                );
                throw new Error(
                    'validateValues 4 ' +
                    'addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid amount in setAlienBalance data: ${
                        JSON.stringify( data )
                    }`
                );
            }
            break;
        }

        default:
            // safeguard: should not be able to get here in normal operation
            throw new Error( 'monkey error 37826yzxadga39sdjfk?!' );
    }

    console.log(
        '-- validateValues 4 addTransactionAndUpdateExchangeUser -- ' +
        'executed successfully'
    );
});