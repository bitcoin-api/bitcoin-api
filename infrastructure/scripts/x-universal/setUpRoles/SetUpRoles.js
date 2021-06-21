'use strict';

const AWS = require( 'aws-sdk' );

const yargs = require( 'yargs' );

const isProductionMode = (yargs.argv.mode === 'production');

if( isProductionMode ) {

    console.log( '☢︎🐑 is production mode' );

    require( 'dotenv' ).config({

        path: `${ __dirname }/productionCredentials/.env`
    });

    process.env.ENV = 'production';
}
else {

    console.log( '🐲🐉 is staging mode' );

    require( 'dotenv' ).config({

        path: `${ __dirname }/stagingCredentials/.env`
    });

    process.env.ENV = 'staging';
}

const {

    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    AWS_ACCOUNT_NUMBER,
    INSTANCE_PREFIX,

} = process.env;

AWS.config.update({

    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
});

const iam = new AWS.IAM();

const stageSuffix = isProductionMode ? '' : '_staging';

const lambdaAssumeRolePolicyDocument = JSON.stringify({

    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": [
                    "lambda.amazonaws.com"
                ]
            },
            "Action": [ "sts:AssumeRole" ]
        }
    ]
});


const roleData = [
    
    // {
    //     roleName: 'lambda_api_get',
    //     policyNames: [
    //         'role_lambda_api_get'
    //     ]
    // },

    // {
    //     roleName: 'lambda_api_tokens_post',
    //     policyNames: [
    //         'role_lambda_api_tokens_post'
    //     ]
    // },

//     {
//         roleName: 'lambda_api_tokens_get',
//         policyNames: [
//             'role_lambda_api_tokens_get'
//         ]
//     },

//     {
//         roleName: 'lambda_api_tokens_put',
//         policyNames: [
//             'role_lambda_api_tokens_put'
//         ]
//     },

//     {
//         roleName: 'lambda_api_addresses_post',
//         policyNames: [
//             'role_lambda_api_addresses_post'
//         ]
//     },
    
//     {
//         roleName: 'lambda_api_feeData_get',
//         policyNames: [
//             'role_lambda_api_feeData_get'
//         ]
//     },
    
//     {
//         roleName: 'lambda_service_cacheOnAndOffStatus',
//         policyNames: [
//             'role_lambda_service_cacheOnAndOffStatus'
//         ]
//     },

//     {
//         roleName: 'lambda_api_withdraws_post',
//         policyNames: [
//             'role_lambda_api_withdraws_post'
//         ]
//     },

//     {
//         roleName: 'lambda_eApi_eUsers_post',
//         policyNames: [
//             'role_lambda_eApi_eUsers_post'
//         ]
//     },
//     {
//         roleName: 'lambda_eApi_eUsers_eUserId_get',
//         policyNames: [
//             'eFunction_mongolianBeginningDragonProtection',
//             'role_lambda_eApi_eUsers_eUserId_get'
//         ]
//     },
//     {
//         roleName: 'lambda_eApi_eUsers_eUserId_delete',
//         policyNames: [
//             'eFunction_mongolianBeginningDragonProtection',
//             'role_lambda_eApi_eUsers_eUserId_delete'
//         ]   
//     },
//     {
//         roleName: 'lambda_eApi_verifyUser_post',
//         policyNames: [
//             'role_lambda_eApi_login_post',
//             'role_lambda_eApi_verifyUser_post'
//         ] 
//     },

    // {
    //     roleName: 'lambda_eApi_addresses_post',
    //     policyNames: [
    //         'eFunction_mongolianBeginningDragonProtection',
    //         'role_lambda_eApi_addresses_post'
    //     ]
    // },

    // {
    //     roleName: 'lambda_eApi_transactions_get',
    //     policyNames: [
    //         'eFunction_mongolianBeginningDragonProtection',
    //         'role_lambda_eApi_transactions_get'
    //     ]
    // },

//     {
//         roleName: 'lambda_eApi_login_post',
//         policyNames: [
//             'role_lambda_eAPI_login_post'
//         ]
//     },

    // {
    //     roleName: 'lambda_eApi_login_password_post',
    //     policyNames: [
    //         'role_lambda_eAPI_login_password_post'
    //     ]
    // },

    // {
    //     roleName: 'lambda_eApi_login_password_patch',
    //     policyNames: [
    //         'role_lambda_eAPI_login_password_patch'
    //     ]
    // },
//     {
//         roleName: 'lambda_eApi_withdraws_post',
//         policyNames: [
//             'role_lambda_eApi_withdraws_post',
//             'eFunction_addTransactionAndUpdateExchangeUser',
//             'eFunction_mongolianBeginningDragonProtection',
//         ]
//     },
//     {
//         roleName: 'lambda_eApi_logout_post',
//         policyNames: [
//             'eFunction_mongolianBeginningDragonProtection',
//             'role_lambda_eApi_logout_post',
//         ]
//     },
//     {
//         roleName: 'lambda_eApi_exchanges_post',
//         policyNames: [
//             'eFunction_addTransactionAndUpdateExchangeUser',
//             'eFunction_mongolianBeginningDragonProtection',
//         ],
//     },
    // {
    //     roleName: 'lambda_eApi_dreams_post',
    //     policyNames: [
    //         'eFunction_addTransactionAndUpdateExchangeUser',
    //         'eFunction_mongolianBeginningDragonProtection',
    //     ],
    // },

    // {
    //     roleName: 'lambda_eApi_dreamsLotus_post',
    //     policyNames: [
    //         'eFunction_addTransactionAndUpdateExchangeUser',
    //         'eFunction_mongolianBeginningDragonProtection',
    //         'role_lambda_eApi_dreamsLotus_post',
    //     ],
    // },

    // {
    //     roleName: 'lambda_eApi_dreamsLotus_get',
    //     policyNames: [
    //         'eFunction_mongolianBeginningDragonProtection',
    //         'role_lambda_eApi_dreamsLotus_get',
    //     ],
    // },

    {
        roleName: 'lambda_eApi_dreamsSlot_post',
        policyNames: [
            'eFunction_addTransactionAndUpdateExchangeUser',
            'eFunction_mongolianBeginningDragonProtection',
            'role_lambda_eApi_dreamsSlot_post',
        ],
    },
    
//     {
//         roleName: 'lambda_eApi_votes_voteId_get',
//         policyNames: [
//             'eFunction_mongolianBeginningDragonProtection',
//             'role_lambda_eApi_votes_voteId_get',
//         ],
//     },

    // {
    //     roleName: 'lambda_eApi_votes_voteId_post',
    //     policyNames: [
    //         'eFunction_mongolianBeginningDragonProtection',
    //         'eFunction_addTransactionAndUpdateExchangeUser',
    //         'role_lambda_eApi_votes_voteId_post',
    //     ],
    // },

    // {
    //     roleName: 'lambda_eApi_raffles_get',
    //     policyNames: [
    //         'eFunction_mongolianBeginningDragonProtection',
    //         'role_lambda_eApi_raffles_get',
    //     ],
    // },

    // {
    //     roleName: 'lambda_eApi_raffles_raffleId_post',
    //     policyNames: [
    //         'eFunction_mongolianBeginningDragonProtection',
    //         'eFunction_addTransactionAndUpdateExchangeUser',
    //         'role_lambda_eApi_raffles_raffleId_post',
    //     ],
    // },

    // {
    //     roleName: 'lambda_eApi_raffleDraws_raffleId_get',
    //     policyNames: [
    //         'eFunction_mongolianBeginningDragonProtection',
    //         'role_lambda_eApi_raffleDraws_raffleId_get',
    //     ],
    // },

    // {
    //     roleName: 'lambda_eApi_raffleTickets_raffleId_get',
    //     policyNames: [
    //         'eFunction_mongolianBeginningDragonProtection',
    //         'role_lambda_eApi_raffleTickets_raffleId_get',
    //     ],
    // },

    // {
    //     roleName: 'lambda_eService_handleEEDRs',
    //     policyNames: [
    //         'role_lambda_eService_handleEEDRs',
    //     ],
    // },

    // {
    //     roleName: 'lambda_eService_handleTransactionsStream',
    //     policyNames: [
    //         'role_lambda_eService_handleTransactionsStream',
    //     ],
    //     isDynamoStreamLambda: true, 
    // },
    
    // {
    //     roleName: 'lambda_eService_manageRafflePutTicketEvents',
    //     policyNames: [
    //         'role_lambda_eService_manageRafflePutTicketEvents',
    //     ],
    // },

    // {
    //     roleName: 'lambda_eService_doRaffleDraw',
    //     policyNames: [
    //         'role_lambda_eService_doRaffleDraw',
    //         'eFunction_addTransactionAndUpdateExchangeUser',
    //     ],
    // },
];

const getFullRoleName = Object.freeze( ({ roleName }) => (

    `${ INSTANCE_PREFIX }${ roleName }${ stageSuffix }`
));

const createRole = Object.freeze( ({

    roleName,

}) => {

    return new Promise( ( resolve, reject ) => {

        const params = {

            AssumeRolePolicyDocument: lambdaAssumeRolePolicyDocument, /* required */
            RoleName: roleName,
        };

        console.log(
                
            'creating role with params: ' +
            JSON.stringify( params, null, 4 )
        );

        iam.createRole( params, ( err, data ) => {

            if( !!err ) {

                console.log( 'error in creating role:', err );
                
                return reject( err );
            }

            console.log(
                
                'successfully created role: ' +
                JSON.stringify({
                    name: roleName,
                    responseData: data
                }, null, 4 )
            );

            resolve( data );
        });
    });
});


const attachPolicy = Object.freeze( ({

    roleName,
    policyName,
    overridePolicyArn,

}) => {

    return new Promise( ( resolve, reject ) => {

        const policyArn = overridePolicyArn || `arn:aws:iam::${ AWS_ACCOUNT_NUMBER }:policy/${ INSTANCE_PREFIX }${ policyName }${ stageSuffix }`;

        const params = {

            PolicyArn: policyArn, /* required */
            RoleName: roleName,
        };

        console.log(
                
            'attaching policy to role with params: ' +
            JSON.stringify( params, null, 4 )
        );

        iam.attachRolePolicy( params, ( err, data ) => {

            if( !!err ) {

                console.log( 'error in attaching policy to role:', err );
                
                return reject( err );
            }

            console.log(
                
                'successfully attached policy to role: ' +
                JSON.stringify({
                    roleName,
                    policyName,
                    overridePolicyArn,
                    responseData: data
                }, null, 4 )
            );

            resolve( data );
        });
    });
});


(async () => {

    try {

        console.log( 'setting up roles' );

        for( const roleDatum of roleData ) {

            const fullRoleName = getFullRoleName({
                
                roleName: roleDatum.roleName
            });

            try {

                await createRole({

                    roleName: fullRoleName,
                });
            }
            catch( err ) {

                console.log(
                    `error creating role "${ fullRoleName }": ` +
                    err.message
                );

                if( err.code !== 'EntityAlreadyExists' ) {

                    throw err;
                }
            }

            for( const policyName of roleDatum.policyNames ) {

                await attachPolicy({

                    roleName: fullRoleName,
                    policyName
                });
            }

            await attachPolicy({

                roleName: fullRoleName,
                overridePolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'
            });

            if( roleDatum.isDynamoStreamLambda ) {

                await attachPolicy({

                    roleName: fullRoleName,
                    overridePolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaDynamoDBExecutionRole',
                });
            }
        }

        console.log( 'set up roles successfully executed' );
    }
    catch( err ) {

        console.log(
            'an error occurred in setting up roles:',
            err
        );
    }
})();
