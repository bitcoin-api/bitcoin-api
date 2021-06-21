'use strict';

const Web3 = require('web3');

// // mainnet
// const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
// // testnet
// const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');

// const bscForReal = async () => {

//     const web3 = new Web3( 'http://127.0.0.1:9545/' );

//     // const accounts = await web3.eth.getAccounts();

//     // console.log( 'the accounts:', accounts );

//     const balance = await web3.eth.getBalance(
//         // '0x29622cBC450182728b852C9B06428a5Eb4bDF190'
//         '0xb37b05768686220fff33e6be9fd5aed2fd0f19d0'
//     );

//     console.log( 'balance:', balance );
// };

const a1 = '0x29622cBC450182728b852C9B06428a5Eb4bDF190';
const a2 = '0xb37b05768686220fff33e6be9fd5aed2fd0f19d0';


const bscForReal = async () => {

    const web3 = new Web3( 'http://127.0.0.1:9545/' );

    /*
        web3.eth.sendTransaction({from: '0x123...', data: '0x432...'})
            .once('sending', function(payload){ ... })
            .once('sent', function(payload){ ... })
            .once('transactionHash', function(hash){ ... })
            .once('receipt', function(receipt){ ... })
            .on('confirmation', function(confNumber, receipt, latestBlockHash){ ... })
            .on('error', function(error){ ... })
            .then(function(receipt){
                // will be fired once the receipt is mined
            });

            Object - The transaction object to send:
            from - String|Number: The address for the sending account. Uses the web3.eth.defaultAccount property, if not specified. Or an address or index of a local wallet in web3.eth.accounts.wallet.
            to - String: (optional) The destination address of the message, left undefined for a contract-creation transaction.
            value - Number|String|BN|BigNumber: (optional) The value transferred for the transaction in wei, also the endowment if it’s a contract-creation transaction.
            gas - Number: (optional, default: To-Be-Determined) The amount of gas to use for the transaction (unused gas is refunded).
            gasPrice - Number|String|BN|BigNumber: (optional) The price of gas for this transaction in wei, defaults to web3.eth.gasPrice.
            data - String: (optional) Either a ABI byte string containing the data of the function call on a contract, or in the case of a contract-creation transaction the initialisation code.
            nonce - Number: (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.
    */


    console.log( 'sendTransaction wow omega' );

    await web3.eth.sendTransaction({

        from: a2,
        to: a1,
        value: '5000000000000000000000',
        // gas: 5000000,
        // gasPrice: 18e9,
        // data
    })
    .once(
        'sending',
        payload => {

            console.log( 'THIS IS DA sending PAYLOAD:', payload );
        }
    )
    .once(
        'sent',
        payload => {

            console.log( 'THIS IS DA sent PAYLOAD:', payload );
        }
    )
    .once(
        'transactionHash',
        hash => {

            console.log( 'THIS IS DA HASHI CORP:', hash );
        }
    ).once(
        'receipt',
        receipt => {

            console.log( 'THIS IS DA RECEIPT:', receipt );
        }
    ).on(
        'confirmation',
        ( confNumber, receipt ) => {

            console.log( 'THIS IS DA confirmation confNumber:', confNumber );
            console.log( 'THIS IS DA confirmation receipt:', receipt );
        }
    ).on(
        'error',
        error => {
            
            console.log( 'THIS IS DA error:', error );
        }
        
    ).then( receipt => {

        console.log( 'THIS IS DA FINAL RECEIPT:', receipt );
    });

    // web3.eth.sendTransaction({
    //     from: holder,
    //     to: '0x0B75fbeB0BC7CC0e9F9880f78a245046eCBDBB0D',
    //     value: '1000000000000000000',
    //     gas: 5000000,
    //     gasPrice: 18e9,
    // }, function(err, transactionHash) {
    //   if (err) {
    //     console.log(err);
    //     } else {
    //     console.log(transactionHash);
    //    }
    // });

    // const accounts = await web3.eth.getAccounts();

    // console.log( 'the accounts:', accounts );

    // console.log( 'balance:', balance );
};


(async () => {

    try {
        
        console.log( 'Running BSC Function' );
        
        await bscForReal();

        console.log( 'BSC Function Executed Successfully' );
    }
    catch( err ) {
        
        console.log( 'the error:', err );
    }
})();
