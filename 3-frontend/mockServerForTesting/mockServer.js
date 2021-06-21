'use strict';

require( 'dotenv' ).config();
const express = require( 'express' );
const cors = require( 'cors' );
const data = require( './data' );
const app = express();
const port = process.env.PORT;

app.use( cors() );
app.use( express.json() );

const stringify = message => JSON.stringify( message, null, 4 );

const toFixedConstant = 5;
const amountMultiplier = 100000;

const getCryptoAmountNumber = Object.freeze( amount => {

    const cryptoAmount = Number(
        (
            Math.round(
                Number(amount) * amountMultiplier
            ) / amountMultiplier
        ).toFixed( toFixedConstant )
    );

    return cryptoAmount;
});


app.get( '/', ( req, res, next ) => {

	// const error = new Error( 'testError' );
	// error.statusCode = 420;
	// next( error );
	
	res.send({ test: '123' });
});


app.post( '/login', ( req, res, next ) => {

	console.log(

		'request to /login - POST with the following value:',
		stringify({

			body: req.body,
		})
	);

	res.send({


        loginToken: 'fake-exchange-user-login-token',
        userId: 'exchange_user_fake_user_id_123'
	});
});

app.post( '/login/password', ( req, res, next ) => {

	console.log(

		'request to /login/password - POST with the following value:',
		stringify({

			headers: req.headers,
			body: req.body,
		})
	);

	res.send({

        passwordResetHasBeenSuccessfullyInitialized: true,
	});
});

app.patch( '/login/password', ( req, res, next ) => {

	console.log(

		'request to /login/password - PATCH with the following value:',
		stringify({

			headers: req.headers,
			body: req.body,
		})
	);

	res.send({

        loginToken: 'fake-exchange-user-login-token',
        userId: 'exchange_user_fake_user_id_123'
	});
});

app.post( '/logout', ( req, res, next ) => {

	console.log(

		'request to /logout - POST with the following value:',
		stringify({

			body: req.body,
		})
	);

	res.send({});
});

app.post( '/exchange-users', ( req, res, next ) => {

	console.log(

		'request to /exchange-users - POST with the following value:',
		stringify({

			body: req.body,
		})
	);

	res.send({});
});


app.get( '/exchange-users/:exchangeUserId', ( req, res, next ) => {

	console.log(

		'request to /exchange-users/:exchange-user-id - GET with the following value:',
		stringify({

			param: req.params,
			headerUserId: req.headers[ 'user-id' ],
			headerLoginToken: req.headers[ 'login-token' ],
		})
	);

	res.send({

        userId: 'exchange_user_fake_user_id_123',
        email: 'john@smith.com',
        balanceData: {

    		bitcoin: {

    			totalAmount: 6.9,
    			depositAddress: null,
    			// depositAddress: 'bc1qkqjlhde0uhl37wyvmnwwwpkn6eych5xndc7hsh',
    		},

    		bitcoinWithdraws: {

                totalAmount: 2,
                currentState: 'test state',
            },

            crypto: {
                totalAmount: 0,
            },

            exchange: {
                bitcoin: {
                    totalAmount: 42.0,
                },
                crypto: {
                    totalAmount: 420,
                },
            },

            vote: {
				crypto: {
	            	totalAmount: 100,
            	},
            },

            summary: {

    	       	bitcoin: {
		            totalAmount: 5
		        },
		        crypto: {
		            totalAmount: 3
		        },
            }
    	},
	});
});

app.post( '/verify-user', ( req, res, next ) => {

	console.log(

		'request to /verify-user - POST with the following value:',
		stringify({

			body: req.body,
		})
	);

	res.send({


        loginToken: 'fake-exchange-user-login-token',
        userId: 'exchange_user_fake_user_id_123'
	});
});

app.post( '/addresses', ( req, res, next ) => {

	console.log(

		'request to /addresses - POST with the following value:',
		stringify({

			headers: req.headers,
			body: req.body,
		})
	);

	res.send({

        addressPostOperationSuccessful: true,
	});
});

app.post( '/votes/:voteId', ( req, res, next ) => {

	console.log(

		'request to /votes - POST with the following value:',
		stringify({

			body: req.body,
			voteId: req.params.voteId,
		})
	);

	res.send({});
});

app.get( '/votes/:voteId', ( req, res, next ) => {

	console.log(

		'request to /votes/:voteId - GET with the following value:',
		stringify({

			voteId: req.params.voteId,
		})
	);

	// res.send({
    //     "choice": null,
    //     "voteType": null,
    //     "amount": 0,
    //     "metadata": {
	// 		"time": 1600611813756
    //     }
    // });

	res.send({
        "choice": 'trump',
        "voteType": "doVote",
        "amount": 0.2,
        "metadata": {
			"time": 1600611813756
        }
    });

	// res.send({
    //     "choice": null,
    //     "voteType": "payout",
    //     "amount": 0.5,
    //     "metadata": {
	// 		"time": 1600611813756,
	// 		"resultAmount": 3.5,
	// 		"resultChoice": 'trump'
    //     }
	// });
	
	// res.send({
    //     "choice": null,
    //     "voteType": "payout",
    //     "amount": 0.5,
    //     "metadata": {
	// 		"time": 1600611813756,
	// 		"resultAmount": 0,
	// 		"resultChoice": 'biden'
    //     }
    // });
});

let dreamsWin = false; 

app.post( '/dreams', ( req, res, next ) => {

	dreamsWin = !dreamsWin;

	console.log(

		'request to /dreams - POST with the following value:',
		stringify({

			body: req.body,
			voteId: req.params.voteId,
		}),
		'returning win result:',
		dreamsWin
	);

	res.send({
		happyDream: dreamsWin,		
	});
});


app.post( '/dreams-lotus', ( req, res, next ) => {

	dreamsWin = !dreamsWin;

	console.log(

		'request to /dreams-lotus - POST with the following values:',
		stringify({

			body: req.body,
		}),
		'returning win result:',
		dreamsWin
	);

	res.send({
		happyDream: dreamsWin,		
	});
});

app.post( '/dreams-slot', ( req, res, next ) => {

	dreamsWin = !dreamsWin;

	console.log(

		'request to /dreams-slot - POST with the following values:',
		stringify({

			body: req.body,
		}),
		'returning win result:',
		dreamsWin
	);

	res.send({
		happyDream: dreamsWin,
		hasTied: false,
		resultValues: {
			slotNumbers: [
				1,
				2,
				3
			]
		}
	});
});


let lotusDreamsJackpotAmount = 0;

app.get( '/dreams-lotus', ( req, res, next ) => {

	lotusDreamsJackpotAmount += 0.00008;	

	console.log(

		'request to /dreams-lotus - GET with the following values:',
		stringify({}),
		'returning lotus dreams jackpot data:',
		lotusDreamsJackpotAmount
	);

	res.send({
		
		jackpotAmount: getCryptoAmountNumber( lotusDreamsJackpotAmount ),		
	});
});


app.get( '/raffles', ( req, res, next ) => {

	console.log(

		'request to /raffles - GET with the following values:',
		stringify({

			query: req.query,
		}),
	);
	
	if( !!req.query.lastTime && !!req.query.lastKey ) {

		const responseData = {
			"raffleData": [
				{
					"raffleId": "raffle_1602141854902",
					"cryptoPot": 28,
					"raffleStartTime": 1602141854902,
					"raffleType": "twoNumber",
					"ticketCryptoPrice": 2,
					raffleNumber: 1,
					winRaffleDrawId: 'raffle_draw_210dsds-23vdvd222_21039123021',
					winHour: 1603857600000,
					previousRaffleEndHour: 1603774800000,
					'winChoice': '3-36',
					numberOfWinners: 2,
					houseCut: 0.1,
					winCryptoPayout: 11.2,
					"choices": [
						{
							"choice": "1-36",
							"amount": -2,
							lastCancelTime: Date.now() + (1000 * 60 * 60),
						},
						{
							"choice": "2-36",
							"amount": -2,
							lastCancelTime: Date.now() + (1000 * 60 * 60),
						},
						{
							"choice": "3-36",
							"amount": -2,
							lastCancelTime: Date.now() - (1000 * 60 * 60),
						},
						{
							"choice": "4-36",
							"amount": -2,
							lastCancelTime: Date.now() - (1000 * 60 * 60),
						},
						{
							"choice": "5-36",
							"amount": -2,
							lastCancelTime: Date.now() - (1000 * 60 * 60),
						}
					],
					"winData": {
						"hasWon": true,
						"amount": 11.2
					},
					
				},
			],
			lastValues: {
	
				lastKey: null,
				lastTime: null,
			}
		};
	
		console.log(
	
			'request to /raffles - GET with the following value:',
			stringify({
				query: req.query
			}),
			'returning raffle data:',
			stringify({
				responseData
			}),
		);
	
		res.send( responseData );
		return;
	}

	const responseData = {
        "raffleData": [
            {
                "raffleId": "raffle_c16ffeef-c677-4b0d-b335-bd8960ed1597_1603860480457",
				raffleNumber: 2,
                "cryptoPot": 0,
				"raffleStartTime": 1603860480457,
				previousRaffleEndHour: 1603857600000,
				houseCut: 0.1,
                "raffleType": "twoNumber",
                "ticketCryptoPrice": 2,
                "choices": [],
                "winData": {
                    "hasWon": false,
                    "amount": 0
                }
            },
		],
		lastValues: {

			lastKey: 'raffle_1602141854902',
			lastTime: 69696969,
		}
	};

	console.log(

		'request to /raffles - GET with the following value:',
		stringify({
			query: req.query
		}),
		'returning raffle data:',
		stringify({
			responseData
		}),
	);

	res.send( responseData );
});


app.get( '/raffle-draws/:raffleId', ( req, res, next ) => {

	console.log(

		'request to /raffle-draws/:raffleId - GET with the following value:',
		stringify({

			// body: req.body,
			raffleId: req.params.raffleId,
			query: req.query,
		}),
	);

	const m = !req.query.lastTime ? 0 : 9;

	const results = {

		draws: [
            {
                "time": 1604124000000 - ((1 + m) * 1000 * 60 * 60),
                "choice": `${ (1 + m) }-36`,
                "win": true
			},
			{
                "time": 1604124000000 - ((2 + m) * 1000 * 60 * 60),
                "choice": `${ (2 + m) }-36`,
			},
			{
                "time": 1604124000000 - ((3 + m) * 1000 * 60 * 60),
                "choice": `${ (3 + m) }-36`,
			},
			{
                "time": 1604124000000 - ((4 + m) * 1000 * 60 * 60),
                "choice": `${ (4 + m) }-36`,
			},
			{
                "time": 1604124000000 - ((5 + m) * 1000 * 60 * 60),
                "choice": `${ (5 + m) }-36`,
			},
			{
                "time": 1604124000000 - ((6 + m) * 1000 * 60 * 60),
                "choice": `${ (6 + m) }-36`,
			},
			{
                "time": 1604124000000 - ((7 + m) * 1000 * 60 * 60),
                "choice": `${ (7 + m) }-36`,
			},
			{
                "time": 1604124000000 - ((8 + m) * 1000 * 60 * 60),
                "choice": `${ (8 + m) }-36`,
			},
		],

        "pageInfo": (m === 0) ? {
			
			"lastTime": 1604125263055

		} : null
		
	};

	if(
		(m === 0) // || true
	) {

		results.draws.push({
			"time": 1604124000000 - ((9 + m) * 1000 * 60 * 60),
			"choice": `${ (9 + m) }-36`,
		});
	}
	
	res.send( results );
});


app.get( '/raffle-tickets/:raffleId', ( req, res, next ) => {

	console.log(

		'request to /raffle-tickets/:raffleId - GET with the following value:',
		stringify({

			// body: req.body,
			raffleId: req.params.raffleId,
			query: req.query,
		}),
	);

	const noQsValuesAreProvided = !(

		!!req.query.time &&
		!!req.query.powerId &&
		!!req.query.specialId
	);

	const results = {

		tickets: noQsValuesAreProvided ? [
            {
                "choice": "1-36",
                "time": 1,
                "specialId": "exchange_user_abce12",
                "action": "buy"
            },
            {
                "choice": "2-36",
                "time": 2,
                "specialId": "exchange_user_abce12",
                "action": "buy"
            },
            {
                "choice": "3-36",
                "time": 3,
                "specialId": "exchange_user_bf967",
                "action": "buy"
			}
			
		] : [
            {
                "choice": "1-36",
                "time": 4,
                "specialId": "exchange_user_ce420",
                "action": "buy"
            },
            {
                "choice": "2-36",
                "time": 5,
                "specialId": "exchange_user_abce12",
                "action": "cancel"
            },
            {
                "choice": "3-36",
                "time": 6,
                "specialId": "exchange_user_ce420",
                "action": "buy"
			},
			{
                "choice": "3-36",
                "time": 7,
                "specialId": "exchange_user_ce420",
                "action": "cancel"
			},
			{
                "choice": "3-36",
                "time": 8,
                "specialId": "exchange_user_ce420",
                "action": "buy"
			},
			{
                "choice": "4-36",
                "time": 9,
                "specialId": "exchange_user_ce420",
                "action": "buy"
            }
		],

        "pageInfo": noQsValuesAreProvided ? {
			
			"time": 3,
            "powerId": "2xxx_323322",
			"specialId": "exchange_user_6"
			
        } : null
	};

	res.send( results );
});


app.get( '/fee-data', ( req, res, next ) => {

	console.log(

		'request to /fee-data - GET with the following value:',
		stringify({

			// body: req.body,
			raffleId: req.params.raffleId,
			query: req.query,
		}),
	);

	res.send({

		fee: 0.00005
	});
});


app.get( '/transactions', ( req, res, next ) => {

	console.log(

		'request to /transactions - GET with the following value:',
		stringify({

			// body: req.body,
			raffleId: req.params.raffleId,
			query: req.query,
		}),
	);

	if( !!req.query.lastTime && !!req.query.lastTransactionId ) {

		console.log(

			'request to /transactions - GET second POWER-API-Attack!!!'
		);

		return res.send({

			moneyActions: data.moneyActions.secondBatchOfMoneyActions,
			lastTransactionId: null,
			lastTime: null,
		});
	}

	res.send({

		moneyActions: data.moneyActions.firstBatchOfMoneyActions,
		lastTransactionId: 'fake_slash_transactions_transactions_id',
		lastTime: 123456789,
	});
});


app.listen( port, err => {

	if( err ) {

		console.log( 'an error occurred in listening:', err );

		return;
	}

 	console.log( `Example app listening at http://localhost:${port}` );
});
