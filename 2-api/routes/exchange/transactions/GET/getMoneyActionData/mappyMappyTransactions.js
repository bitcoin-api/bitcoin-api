'use strict';

const fullStackApi = require( '@bitcoin-api/full-stack-api-private' );
const {
    utils: {
        stringify,
    },
} = fullStackApi;

const fullStackExchange = require(
    '@bitcoin-api/full-stack-exchange-private'
);
const transactionTypes = fullStackExchange.constants.transactions.types;
const exchangeTypes = fullStackExchange.constants.exchanges.types;
const bitcoinWithdrawTypes = fullStackExchange.constants.transactions.bitcoinWithdrawTypes;
const dreamTypes = fullStackExchange.constants.dreams.types;
const raffleTypes = fullStackExchange.constants.raffles.types;

const utils = require( '../../../../../utils' );

const moneyActionsTypes = utils.constants.moneyActions.types;


module.exports = Object.freeze( ({

    transactions,

}) => {

    console.log(
        
        `running 🗺mappyMappyTransactions🗺 with the following values - ${
            stringify({
                ['number of transactions']: transactions.length,
            })
        }`
    );

    const moneyActions = transactions.map( transaction => {

        const moneyAction = {
            
            time: transaction.creationDate,
            transactionId: transaction.transactionId,
        };

        switch( transaction.type ) {

            case( transactionTypes.addBitcoin ): {
                
                Object.assign(

                    moneyAction,
                    {
                        type: moneyActionsTypes.regal.addressAmountUpdate,
                        amount: transaction.amount,
                        address: transaction.address,
                    }
                );

                break;
            }
            case( transactionTypes.exchange ): {
                
                if( transaction.exchangeType === exchangeTypes.btcToCrypto ) {

                    Object.assign(

                        moneyAction,
                        {
                            type: moneyActionsTypes.regal.exchange.btcToCrypto,
                            amountInBTCNeeded: transaction.amountInBTCNeeded,
                            amountInCryptoWanted: transaction.amountInCryptoWanted,
                        }
                    );
                }
                else if( transaction.exchangeType === exchangeTypes.cryptoToBTC ) {

                    Object.assign(

                        moneyAction,
                        {
                            type: moneyActionsTypes.regal.exchange.cryptoToBTC,
                            amountInCryptoNeeded: transaction.amountInCryptoNeeded,
                            amountInBitcoinWanted: transaction.amountInBitcoinWanted,
                        }
                    );
                }
                else {

                    throw new Error(
                        'mappyMappyTransactions ' +
                        'invalid transaction exchangeType: ' +
                        transaction.exchangeType
                    );     
                }

                break;
            }
            case( transactionTypes.withdrawBitcoin ): {
                
                if( transaction.bitcoinWithdrawType === bitcoinWithdrawTypes.start ) {

                    Object.assign(

                        moneyAction,
                        {
                            type: moneyActionsTypes.regal.withdraw.start,
                            amount: transaction.amount,
                            address: transaction.address,
                            fee: transaction.fee,
                            feeIncludedInAmount: transaction.feeIncludedInAmount
                        }
                    );
                }
                else if( transaction.bitcoinWithdrawType === bitcoinWithdrawTypes.failed ) {

                    Object.assign(

                        moneyAction,
                        {
                            type: moneyActionsTypes.regal.withdraw.failed,
                            amount: transaction.amount,
                            address: transaction.address,
                            fee: transaction.fee,
                            feeIncludedInAmount: transaction.feeIncludedInAmount
                        }
                    );
                }
                else if( transaction.bitcoinWithdrawType === bitcoinWithdrawTypes.success ) {

                    Object.assign(

                        moneyAction,
                        {
                            type: moneyActionsTypes.regal.withdraw.success,
                            amount: transaction.amount,
                            address: transaction.address,
                            fee: transaction.fee,
                            feeIncludedInAmount: transaction.feeIncludedInAmount
                        }
                    );
                }
                else {

                    throw new Error(
                        'mappyMappyTransactions ' +
                        'invalid transaction bitcoinWithdrawType: ' +
                        transaction.bitcoinWithdrawType
                    );     
                }
                
                break;
            }
            case( transactionTypes.dream ): {
                
                if( transaction.dreamType === dreamTypes.coin ) {

                    Object.assign(

                        moneyAction,
                        {
                            type: moneyActionsTypes.game.talismanFlip,
                            amount: transaction.amount,
                        }
                    );
                }
                else if( transaction.dreamType === dreamTypes.lotus ) {

                    Object.assign(

                        moneyAction,
                        {
                            type: moneyActionsTypes.game.talismanLotus,
                            amount: transaction.amount,
                            winData: transaction.jackpotWinData,
                        }
                    );
                }
                else if( transaction.dreamType === dreamTypes.slot ) {

                    Object.assign(

                        moneyAction,
                        {
                            type: moneyActionsTypes.game.slot,
                            amount: transaction.amount,
                            happyDream: transaction.happyDream,
                            resultValues: transaction.resultValues,
                            hasTied: transaction.hasTied,
                        }
                    );
                }
                else {

                    throw new Error(
                        'mappyMappyTransactions ' +
                        'invalid dream type: ' +
                        transaction.dreamType
                    );     
                }
                
                break;
            }
            case( transactionTypes.raffle ): {
                
                if( transaction.raffleType === raffleTypes.putTicket ) {

                    if( transaction.amount < 0 ) {

                        Object.assign(

                            moneyAction,
                            {
                                type: moneyActionsTypes.game.lotus.pickPetal,
                                amount: transaction.amount,
                                choice: transaction.choice,
                                lotusSeasonId: transaction.searchId,
                            }
                        );
                    }
                    else {

                        Object.assign(

                            moneyAction,
                            {
                                type: moneyActionsTypes.game.lotus.unpickPetal,
                                amount: transaction.amount,
                                choice: transaction.choice,
                                lotusSeasonId: transaction.searchId,
                            }
                        );
                    }
                }
                else if( transaction.raffleType === raffleTypes.payout ) {

                    Object.assign(

                        moneyAction,
                        {
                            type: moneyActionsTypes.game.lotus.flowerPotPayout,
                            amount: transaction.amount,
                            lotusSeasonId: transaction.search,
                            petalDrawId: transaction.raffleDrawId,
                        }
                    );
                }
                else {

                    throw new Error(
                        'mappyMappyTransactions ' +
                        'invalid raffle transaction type: ' +
                        transaction.raffleType
                    );     
                }

                break;
            }
            case( transactionTypes.bonus ): {
                
                Object.assign(

                    moneyAction,
                    {
                        type: moneyActionsTypes.regal.bonus,
                        bitcoinAmount: transaction.bitcoinAmount,
                        cryptoAmount: transaction.cryptoAmount,
                        bonusNameId: transaction.searchId,
                    }
                );

                break;
            }
            default:

                throw new Error(
                    'mappyMappyTransactions ' +
                    `invalid transaction type: ${ transaction.type }`
                );
        }
        
        return moneyAction;
    });

    console.log( '🗺mappyMappyTransactions🗺 executed successfully' );

    return moneyActions;
});