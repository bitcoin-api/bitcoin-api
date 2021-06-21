'use strict';

const {
    transactions: {
        types,
        bitcoinWithdrawTypes,
    },
    exchanges,
    dreams,
    votes,
} = require( '../../../../../constants' );


module.exports = Object.freeze( ({

    transactions,
    theOracleOfDelphiDefi,
    withdrawIdToData,
    voteIdToData,

}) => {

    for( const transaction of transactions ) {

        const {

            type,

        } = transaction;

        switch( type ) {

            case types.addBitcoin: {

                const addressToData = theOracleOfDelphiDefi[
                    types.addBitcoin
                ].addressToData;

                if( !addressToData[ transaction.address ] ) {

                    addressToData[ transaction.address ] = {

                        amount: transaction.amount,
                        creationDate: transaction.creationDate,
                    };
                }
                else if(

                    transaction.creationDate >
                    addressToData[ transaction.address ].creationDate

                ) {

                    addressToData[ transaction.address ] = {

                        amount: transaction.amount,
                        creationDate: transaction.creationDate,
                    };
                }

                break;
            }

            case types.withdrawBitcoin: {
                switch( transaction.bitcoinWithdrawType ) {
                    case bitcoinWithdrawTypes.start:
                        
                        const startAmount = (
                            transaction.amount + transaction.fee
                        );

                        theOracleOfDelphiDefi[
                            types.withdrawBitcoin
                        ].totalAmount += startAmount;
                        
                        withdrawIdToData[ transaction.withdrawId ] = {

                            startAmount
                        };

                        break;

                    case bitcoinWithdrawTypes.success:

                        const data2 = withdrawIdToData[
                            transaction.withdrawId
                        ] || {};

                        if(
                            !data2.startAmount &&
                            (data2.startAmount !== 0)
                        ) {

                            throw new Error(
                                'invalid transaction ' +
                                JSON.stringify( transaction )
                            );
                        }

                        const successAmount = (
                            transaction.amount + transaction.fee
                        );

                        theOracleOfDelphiDefi[
                            types.withdrawBitcoin
                        ].totalAmount += (
                            - data2.startAmount + successAmount
                        );

                        delete withdrawIdToData[ transaction.withdrawId ];

                        break;

                    case bitcoinWithdrawTypes.failed:

                        const data3 = withdrawIdToData[
                            transaction.withdrawId
                        ] || {};

                        if(
                            !data3.startAmount &&
                            (data3.startAmount !== 0)
                        ) {

                            throw new Error(
                                'invalid transaction ' +
                                JSON.stringify( transaction )
                            );
                        }

                        theOracleOfDelphiDefi[
                            types.withdrawBitcoin
                        ].totalAmount += (
                            - data3.startAmount
                        );

                        delete withdrawIdToData[ transaction.withdrawId ];

                        break;

                    default:
                        // safeguard: should not get here in normal operation
                        throw new Error(
                            'oracleHallucination error: ' +
                            'got withdraw transaction with ' +
                            `invalid withdraw type: ${
                                transaction.bitcoinWithdrawType
                            }`
                        );
                }
                break;
            }

            case types.exchange: {
                switch( transaction.exchangeType ) {
                    case exchanges.types.btcToCrypto:
                        
                        theOracleOfDelphiDefi[
                            types.exchange
                        ].totalBitcoinAmount -= (
                            
                            transaction.amountInBTCNeeded
                        );

                        theOracleOfDelphiDefi[
                            types.exchange
                        ].totalCryptoAmount += (
                            
                            transaction.amountInCryptoWanted
                        );
                        
                        break;

                    case exchanges.types.cryptoToBTC:

                        theOracleOfDelphiDefi[
                            types.exchange
                        ].totalBitcoinAmount += (
                            
                            transaction.amountInBitcoinWanted
                        );

                        theOracleOfDelphiDefi[
                            types.exchange
                        ].totalCryptoAmount -= (
                            
                            transaction.amountInCryptoNeeded
                        );

                        break;

                    default:
                        // safeguard: should not get here in normal operation
                        throw new Error(
                            'oracleHallucination error: ' +
                            'got exchange transaction with ' +
                            `invalid exchange type: ${
                                transaction.exchangeType
                            }`
                        );
                }
                break;
            }
            
            case types.dream: {
                switch( transaction.dreamType ) {
                    case dreams.types.coin:
                    case dreams.types.lotus:
                    case dreams.types.slot:
                        
                        theOracleOfDelphiDefi[
                            types.dream
                        ].totalCryptoAmount += (
                            
                            transaction.amount
                        );

                        break;

                    default:
                        // safeguard: should not get here in normal operation
                        throw new Error(
                            'oracleHallucination error: ' +
                            'got dream transaction with ' +
                            `invalid dream type: ${
                                transaction.dreamType
                            }`
                        );
                }
                break;
            }

            case types.vote: {

                const {

                    voteId,
                    amount,
                    voteType
                
                } = transaction;

                // console.log(

                //     'A ORACLE HALLUCINATION TEMPORARY LOG:',
                //     JSON.stringify({
                //         voteId,
                //         voteIdToData,
                //         theOracleOfDelphiDefi,
                //     }, null, 4 )
                // );

                /* v1 -5
                    CIA -5 = -v0 + v1 = -0 + -5 = -5, TOTAL -5
                    v2 -3
                    CIA = -v1 + v2 = --5 + -3 = +2, TOTAL -3
                    v3 -6
                    CIA = -v1 + v2 = --3 + -6 = -3, TOTAL -6
                */

                if( !voteIdToData[ voteId ] ) {

                    voteIdToData[ voteId ] = {
                        
                        amount: 0,
                    };

                    // console.log(

                    //     'FIRST ORACLE HALLUCINATION TEMPORARY LOG:',
                    //     JSON.stringify({
                    //         voteId,
                    //         voteIdToData,
                    //         theOracleOfDelphiDefi,
                    //     }, null, 4 )
                    // );
                }

                // console.log(

                //     'ULTRA ORACLE HALLUCINATION TEMPORARY LOG:',
                //     JSON.stringify({
                //         voteId,
                //         amount,
                //         voteType,
                //         voteIdToData,
                //     }, null, 4 )
                // );

                const changeInAmount = (   
                    -voteIdToData[ voteId ].amount + amount
                );

                theOracleOfDelphiDefi[
                    types.vote
                ].totalCryptoAmount += changeInAmount;

                if( voteType !== votes.types.payout ) {
                    
                    voteIdToData[ voteId ].amount = amount;
                    
                    // console.log(

                    //     'C ORACLE HALLUCINATION TEMPORARY LOG:',
                    //     JSON.stringify({
                    //         voteId,
                    //         voteIdToData,
                    //         theOracleOfDelphiDefi,
                    //     }, null, 4 )
                    // );
                }
                else {

                    delete voteIdToData[ voteId ];

                    // console.log(

                    //     'E ORACLE HALLUCINATION TEMPORARY LOG:',
                    //     JSON.stringify({
                    //         voteId,
                    //         voteIdToData,
                    //         theOracleOfDelphiDefi,
                    //     }, null, 4 )
                    // );
                }

                break;
            }

            case types.raffle: {

                const {

                    amount,
                
                } = transaction;

                theOracleOfDelphiDefi[
                    types.raffle
                ].totalCryptoAmount += amount;

                break;
            }

            case types.bonus: {

                const {

                    bitcoinAmount,
                    cryptoAmount
                
                } = transaction;

                theOracleOfDelphiDefi[
                    types.bonus
                ].totalBitcoinAmount += bitcoinAmount;

                theOracleOfDelphiDefi[
                    types.bonus
                ].totalCryptoAmount += cryptoAmount;

                break;
            }

            case types.setAlienBalance: {

                theOracleOfDelphiDefi[
                    types.setAlienBalance
                ][
                    transaction.currency
                ].totalCryptoAmount = transaction.amount;

                break;
            }

            case types.identity: {
                break;
            }
            default:
                // safeguard: should not get here in normal operation
                throw new Error(
                    'oracleHallucination error: got transaction with ' +
                    `invalid type: ${ type }`
                );
        }
    }
});