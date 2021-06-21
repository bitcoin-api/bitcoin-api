'use strict';


module.exports = Object.freeze( ({

    awsAccountNumber,
    instancePrefix,
    stageSuffix,
    awsRegion,

}) => {

    const policyData = [

        // {
        //     name: 'role_lambda_api_get',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "VisualEditorxxxtentacion",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:GetItem"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }`
        //                 ]
        //             }
        //         ]
        //     },
        // },

        // {
        //     name: 'user_megaActions_dbOperationOnAll',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "MonkeyEditor",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:Scan",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`
        //             },
        //         ]
        //     }
        // },

        // {
        //     name: 'user_megaActions_dbOperations',
        //     // ATAUEU
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "Sid1",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:GetItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`
        //             },
        //         ]
        //     }
        // },

        // {
        //     name: 'user_feeDataBot',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "Sid1",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:PutItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }`
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'user_withdrawsBot',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "MonkeyEditor",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:Query",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_withdraws${ stageSuffix }/index/state-creationDate-index`
        //             },
        //             {
        //                 "Sid": "VisualMonkeyEditor2323",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:GetItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_withdraws${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "UltraMonkeyEditor",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:Query",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_withdraws${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "UltraMonkeyEditorGorilla",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:PutItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_withdraws${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "MonkeyEditorOfBananaTown",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:GetItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_balances${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "TrustedMegaMonkeyEditor",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:PutItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_balances${ stageSuffix }`
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'user_depositsBot',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "VisualEditor0",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:Query",
        //                     "dynamodb:GetItem",
        //                     "dynamodb:PutItem",
        //                     "dynamodb:DeleteItem"
        //                 ],
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_addresses${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "VisualEditor3",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:GetItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_balances${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "VisualEditor4",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:PutItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_balances${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "VisualEditor5",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:Query",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_addresses${ stageSuffix }/index/address-index`
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'eFunction_addTransactionAndUpdateExchangeUser',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "Sid1",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:PutItem"
        //                 ],
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_transactions${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "Sid2",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:Query",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_transactions${ stageSuffix }/index/exchangeUserId-creationDate-index`
        //             },
        //             {
        //                 "Sid": "Sid3",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:GetItem",
        //                     "dynamodb:PutItem"
        //                 ],
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`
        //             }
        //         ]
        //     }
        // },
        // {
        //     name: 'user_deployApiFunctions',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "VisualEditor1",
        //                 "Effect": "Allow",
        //                 "Action": "iam:PassRole",
        //                 "Resource": [
        //                     `arn:aws:iam::${ awsAccountNumber }:role/bitcoin_api_lambda_infrastructure_emptyLambda`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_api_get${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_api_tokens_post${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_api_tokens_get${ stageSuffix }`,
        //                     `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_api_tokens_put${ stageSuffix }`,
        //                     `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_api_addresses_post${ stageSuffix }`,
        //                     `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_api_feeData_get${ stageSuffix }`,
        //                     `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_api_withdraws_post${ stageSuffix }`,
        //                     `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_service_cacheOnAndOffStatus${ stageSuffix }`
        //                 ]
        //             },
        //             {
        //                 "Sid": "VisualEditor2",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "lambda:GetFunction",
        //                     "lambda:CreateFunction",
        //                     "lambda:UpdateFunctionCode",
        //                     "lambda:UpdateFunctionConfiguration"
        //                 ],
        //                 "Resource": [
        //                     // `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:bitcoin_api_infrastructure_emptyLambda`,
                            // `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }api_get${ stageSuffix }`,
                            // `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }api_tokens_post${ stageSuffix }`,
        //                     `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }api_tokens_patch${ stageSuffix }`,
        //                     `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }api_tokens_get${ stageSuffix }`,
        //                     `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }api_tokens_put${ stageSuffix }`,
        //                     `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }api_addresses_post${ stageSuffix }`,
        //                     `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }api_feeData_get${ stageSuffix }`,
        //                     `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }api_withdraws_post${ stageSuffix }`,
        //                     `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }service_cacheOnAndOffStatus${ stageSuffix }`,
        //                 ]
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'user_deployExchangeFunctions',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "VisualEditor1",
        //                 "Effect": "Allow",
        //                 "Action": "iam:PassRole",
        //                 "Resource": [
        //                     `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_eUsers_post${ stageSuffix }`,
        //                     `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_eUsers_eUserId_get${ stageSuffix }`,
        //                     `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_eUsers_eUserId_delete${ stageSuffix }`,
        //                     `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_verifyUser_post${ stageSuffix }`,
        //                     `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_login_post${ stageSuffix }`,
        //                     `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_login_password_post${ stageSuffix }`,
        //                     `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_login_password_patch${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_withdraws_post${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_transactions_get${ stageSuffix }`,
        //                     `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_logout_post${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_exchanges_post${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_dreams_post${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_dreamsLotus_post${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_dreamsLotus_get${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_dreamsSlot_post${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_addresses_post${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_votes_voteId_post${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_votes_voteId_get${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_raffles_get${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_raffles_raffleId_post${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_raffleDraws_raffleId_get${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eApi_raffleTickets_raffleId_get${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eService_handleEEDRs${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eService_handleTransactionsStream${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eService_manageRafflePutTicketEvents${ stageSuffix }`,
                            // `arn:aws:iam::${ awsAccountNumber }:role/${ instancePrefix }lambda_eService_doRaffleDraw${ stageSuffix }`
        //                 ]
        //             },
        //             {
        //                 "Sid": "VisualEditor2",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "lambda:GetFunction",
        //                     "lambda:CreateFunction",
        //                     "lambda:UpdateFunctionCode",
        //                     "lambda:UpdateFunctionConfiguration"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_eUsers_post${ stageSuffix }`,
        //                     `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_eUsers_eUserId_get${ stageSuffix }`,
        //                     `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_eUsers_eUserId_delete${ stageSuffix }`,
        //                     `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_verifyUser_post${ stageSuffix }`,
                            // `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_login_post${ stageSuffix }`,
                            // `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_login_password_post${ stageSuffix }`,
                            // `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_login_password_patch${ stageSuffix }`,
        //                     `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_withdraws_post${ stageSuffix }`,
                            // `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_transactions_get${ stageSuffix }`,
        //                     `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_logout_post${ stageSuffix }`,
        //                     `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_exchanges_post${ stageSuffix }`,
                            // `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_dreams_post${ stageSuffix }`,
                            // `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_dreamsLotus_post${ stageSuffix }`,
                            // `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_dreamsLotus_get${ stageSuffix }`,
                            // `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_dreamsSlot_post${ stageSuffix }`,
                            // `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_addresses_post${ stageSuffix }`,
        //                     `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_votes_voteId_post${ stageSuffix }`,
        //                     `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_votes_voteId_get${ stageSuffix }`,
        //                     `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_raffles_get${ stageSuffix }`,
                            // `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_raffles_raffleId_post${ stageSuffix }`,
                            // `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_raffleDraws_raffleId_get${ stageSuffix }`,
                            // `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eApi_raffleTickets_raffleId_get${ stageSuffix }`,
        //                     `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eService_handleEEDRs${ stageSuffix }`,
                            // `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eService_handleTransactionsStream${ stageSuffix }`,
                            // `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eService_manageRafflePutTicketEvents${ stageSuffix }`,
                            // `arn:aws:lambda:${ awsRegion }:${ awsAccountNumber }:function:${ instancePrefix }eService_doRaffleDraw${ stageSuffix }`
        //                 ]
        //             }
        //         ]
        //     },
        // },

        // {
        //     name: 'eFunction_mongolianBeginningDragonProtection',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "VisualEditor0",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:Query",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_loginTokens${ stageSuffix }`,
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_api_tokens_post',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "VisualEditorxxxtentacion",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:PutItem"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_users${ stageSuffix }`
        //                 ]
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_api_tokens_get',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "Sid2",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:GetItem"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_users${ stageSuffix }`,
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_balances${ stageSuffix }`,
        //                 ]
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_api_tokens_put',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "Sid2",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:GetItem"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_users${ stageSuffix }`,
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }`
        //                 ]
        //             },
        //             {
        //                 "Sid": "TRUSTEDMONKEYDIRECTIVE",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:PutItem"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_users${ stageSuffix }`
        //                 ]
        //             }
        //         ]
        //     },
        // },

        // {
        //     name: 'role_lambda_api_addresses_post',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "Sid2",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:GetItem"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_users${ stageSuffix }`,
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`
        //                 ]
        //             },
        //             {
        //                 "Sid": "Sid3",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:Query"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_addresses${ stageSuffix }`
        //                 ]
        //             },
        //             {
        //                 "Sid": "Sid3xxx",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:PutItem"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_addresses${ stageSuffix }`,
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_users${ stageSuffix }`,
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_balances${ stageSuffix }`,
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`
        //                 ]
        //             }
        //         ]
        //     },
        // },

        // {
        //     name: 'role_lambda_api_feeData_get',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "VisualEditorxxxtentacion",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:GetItem"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }`
        //                 ]
        //             }
        //         ]
        //     },
        // },

        // {
        //     name: 'role_lambda_api_withdraws_post',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "Sid2",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:GetItem"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_users${ stageSuffix }`,
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }`,
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_balances${ stageSuffix }`
        //                 ]
        //             },
        //             {
        //                 "Sid": "Sid3",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:PutItem"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_withdraws${ stageSuffix }`,
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_balances${ stageSuffix }`,
        //                 ]
        //             }
        //         ]
        //     }
        // },
        
        // {
        //     name: 'role_lambda_service_cacheOnAndOffStatus',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "Sid2",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:GetItem"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }`,
        //                 ]
        //             }
        //         ]
        //     },
        // },
        // {
        //     name: 'role_lambda_eApi_eUsers_eUserId_get',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "VisualEditor0",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:Query",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_loginTokens${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "VisualEditor1",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:GetItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_eApi_eUsers_post',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "VisualEditor0",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:Query",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }/index/email-index`
        //             },
        //             {
        //                 "Sid": "VisualEditorYYZ",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:Query",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeEmailDeliveryResults${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "VisualEditor1",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:PutItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "VisualEditor2",
        //                 "Effect": "Allow",
        //                 "Action": "ses:SendEmail",
        //                 "Resource": "*"
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_eApi_eUsers_eUserId_delete',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "VisualEditor0",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:GetItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "VisdfgdfsgacxzzxualEditor0",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:PutItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "VisualEditodsfsdf",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:PutItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_loginTokens${ stageSuffix }`
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_eApi_verifyUser_post',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "VisualEditor0",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:Query",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }/index/email-index`
        //             },
        //             {
        //                 "Sid": "VisualEditor1",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:PutItem",
        //                     "dynamodb:GetItem"
        //                 ],
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "VisualEditor2",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:PutItem",
        //                     "dynamodb:GetItem"
        //                 ],
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`
        //             },
                    // {
                    //     "Sid": "VisualEditorYYZ",
                    //     "Effect": "Allow",
                    //     "Action": "dynamodb:Query",
                    //     "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeEmailDeliveryResults${ stageSuffix }`
                    // }
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_eApi_addresses_post',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "Sid2",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:GetItem"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`
        //                 ]
        //             },
        //             {
        //                 "Sid": "Sid3xxx",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:PutItem"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_addresses${ stageSuffix }`,
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`
        //                 ]
        //             }
        //         ]
        //     },
        // },

        // {
        //     name: 'role_lambda_eApi_transactions_get',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "Sid3xxx",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:Query"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_transactions${ stageSuffix }/index/exchangeUserId-creationDate-index`
        //                 ]
        //             }
        //         ]
        //     },
        // },

        // {
        //     name: 'role_lambda_eApi_login_post',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "VisualEditor0",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:Query",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }/index/email-index`
        //             },
        //             {
        //                 "Sid": "VisualEditor1",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:PutItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_loginTokens${ stageSuffix }`
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_eApi_login_password_post',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "VisualEditor0",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:Query",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }/index/email-index`
        //             },
        //             {
        //                 "Sid": "VisualEditor1",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:PutItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "VisualEditorQYZ",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:GetItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "VisualEditorYYZ",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:Query",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeEmailDeliveryResults${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "VisualEditorEMAIL",
        //                 "Effect": "Allow",
        //                 "Action": "ses:SendEmail",
        //                 "Resource": "*"
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_eApi_login_password_patch',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "VisualEditorQYZ",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:GetItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "VisualEditor1",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:PutItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "VisualEditorsdsd",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:Query",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }/index/email-index`
        //             },
        //             {
        //                 "Sid": "VisualEditor1zxcxzc",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:PutItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_loginTokens${ stageSuffix }`
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_eApi_logout_post',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "VisualEditor1",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:PutItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_loginTokens${ stageSuffix }`
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_eApi_dreamsLotus_post',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "VisualEditorxxx",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:GetItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "VisualEditor1",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:UpdateItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }`
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_eApi_dreamsLotus_get',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "VisualEditorxxx",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:GetItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }`
        //             },
        //         ]
        //     }
        // },
        
        {
            name: 'role_lambda_eApi_dreamsSlot_post',
            policy: {
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Sid": "VisualEditorxxx",
                        "Effect": "Allow",
                        "Action": "dynamodb:GetItem",
                        "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`
                    },
                ]
            }
        },

        // {
        //     name: 'role_lambda_eApi_withdraws_post',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "Sid2",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:GetItem"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }`,
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`
        //                 ]
        //             },
        //             {
        //                 "Sid": "Sid123",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:PutItem"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_withdraws${ stageSuffix }`
        //                 ]
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_eApi_votes_voteId_get',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "Sid2",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:Query"
        //                 ],
        //                 "Resource": [
        //                      `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_transactions${ stageSuffix }/index/exchangeUserId-creationDate-index`
        //                 ]
        //             },
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_eApi_votes_voteId_post',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "Sid2",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:GetItem"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }`,
        //                 ]
        //             },
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_eApi_raffles_get',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "Sid2",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:Query"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }/index/type-creationDate-index`,
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_transactions${ stageSuffix }/index/exchangeUserId-creationDate-index`,
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_transactions${ stageSuffix }/index/searchId-creationDate-index`
        //                 ]
        //             },
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_eApi_raffleDraws_raffleId_get',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "SidXyz",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:Query"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }/index/type-creationDate-index`,
        //                 ]
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_eApi_raffleTickets_raffleId_get',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "SidXyz",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:Query"
        //                 ],
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_transactions${ stageSuffix }/index/searchId-creationDate-index`
        //                 // "Resource": [
        //                 //     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }/index/type-creationDate-index`,
        //                 // ]
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_eApi_raffles_raffleId_post',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "SidXyz",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:GetItem"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }`,
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeUsers${ stageSuffix }`,
        //                 ]
        //             },
        //             {
        //                 "Sid": "SidWin",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:Query"
        //                 ],
        //                 "Resource": [
        //                     `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_transactions${ stageSuffix }/index/exchangeUserId-creationDate-index"`
        //                 ]
        //             },
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_eService_handleEEDRs',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "VisualEditor1",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:PutItem"
        //                 ],
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_exchangeEmailDeliveryResults${ stageSuffix }`
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_eService_handleTransactionsStream',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "VisualEditor122",
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "dynamodb:UpdateItem"
        //                 ],
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }`
        //             },
        //             // {
        //             //     "Sid": "VisualEditor1",
        //             //     "Effect": "Allow",
        //             //     "Action": [
        //             //         "dynamodb:PutItem"
        //             //     ],
        //             //     "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }`
        //             // }
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_eService_manageRafflePutTicketEvents',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "Sid1",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:Query",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }/index/type-creationDate-index`
        //             },
        //             {
        //                 "Sid": "Sid2",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:Query",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_transactions${ stageSuffix }/index/searchId-creationDate-index`
        //             },
        //             {
        //                 "Sid": "Sid2pointFive",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:GetItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "Sid3",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:PutItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "Sid4xxx",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:DeleteItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }`
        //             }
        //         ]
        //     }
        // },

        // {
        //     name: 'role_lambda_eService_doRaffleDraw',
        //     policy: {
        //         "Version": "2012-10-17",
        //         "Statement": [
        //             {
        //                 "Sid": "Sid1",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:Query",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }/index/type-creationDate-index`
        //             },
        //             {
        //                 "Sid": "Sid2",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:Query",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_transactions${ stageSuffix }/index/searchId-creationDate-index`
        //             },
        //             {
        //                 "Sid": "Sid2pointFive",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:GetItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }`
        //             },
        //             {
        //                 "Sid": "Sid3",
        //                 "Effect": "Allow",
        //                 "Action": "dynamodb:PutItem",
        //                 "Resource": `arn:aws:dynamodb:${ awsRegion }:${ awsAccountNumber }:table/bitcoin_api_metadata${ stageSuffix }`
        //             }
        //         ]
        //     }
        // },
    ];

    return policyData;
});