import { default as validateAndGetInitializationValues } from './validateAndGetInitializationValues';
import { default as makeApiCall } from '../makeApiCall';
import { http } from '../../constants';


export default class BitcoinExchange {

    constructor( initializationValues ) {

        Object.assign(

            this,
            validateAndGetInitializationValues( initializationValues )
        );
    }

    async createUser({

        email,
        password,
        googleCode

    }) {

        return await makeApiCall({

            resource: 'exchange-users',
            method: 'POST',
            headers: {
                email,
                password,
                [http.headers.grecaptchaGoogleCode]: googleCode,
            }
            // body: {
            //     email,
            //     password,
            //     // googleCode,
            // },
        });
    }

    async verifyEmail({

        email,
        password,
        verifyEmailCode,
        googleCode,
        
    }) {

        return await makeApiCall({

            resource: 'verify-user',
            method: 'POST',
            headers: {
                email,
                password,
                [http.headers.grecaptchaGoogleCode]: googleCode,
                [http.headers.verifyEmailCode]: verifyEmailCode,
            }
        });
    }

    async login({

        email,
        password,
        googleCode,

    }) {

        return await makeApiCall({

            resource: 'login',
            method: 'POST',
            headers: {
                email,
                password,
                [http.headers.grecaptchaGoogleCode]: googleCode,
            },
        });
    }

    async initializeResetPassword({

        email,
        googleCode,

    }) {

        return await makeApiCall({

            resource: 'login/password',
            method: 'POST',
            headers: {
                email,
                [http.headers.grecaptchaGoogleCode]: googleCode,
            },
        });
    }

    async resetPasswordDo({

        passwordResetCode,
        newPassword,
        googleCode,

    }) {

        return await makeApiCall({

            resource: 'login/password',
            method: 'PATCH',
            headers: {
                [http.headers.grecaptchaGoogleCode]: googleCode,
                [http.headers.newPassword]: newPassword,
                [http.headers.passwordResetCode]: passwordResetCode,
            },
        });
    }

    async getUser({

        userId,
        loginToken,

    }) {

        return await makeApiCall({

            resource: `exchange-users/${ userId }`,
            method: 'GET',
            headers: {

                'login-token': loginToken,
                'user-id': userId,
            },
        });
    }

    async addAddress({

        userId,
        loginToken,
        googleCode,

    }) {

        return await makeApiCall({

            resource: 'addresses',
            method: 'POST',
            headers: {

                [ http.headers.userId ]: userId,
                [ http.headers.loginToken ]: loginToken,
                [ http.headers.grecaptchaGoogleCode ]: googleCode,
            },
        });
    }

    async withdraw({

        userId,
        amount,
        address,
        loginToken,
        fullWithdraw,
        googleCode

    }) {

        return await makeApiCall({

            resource: 'withdraws',
            method: 'POST',
            body: {
                amount,
                address,
                fullWithdraw,
            },
            headers: {

                'login-token': loginToken,
                'user-id': userId,
                [ http.headers.grecaptchaGoogleCode ]: googleCode,
            },
        });
    }

    async signOut({

        userId,
        loginToken

    }) {

        return await makeApiCall({

            resource: 'logout',
            method: 'POST',
            body: {},
            headers: {

                'login-token': loginToken,
                'user-id': userId,
            },
        });
    }

    async deleteUser({

        userId,
        loginToken

    }) {

        return await makeApiCall({

            resource: `exchange-users/${ userId }`,
            method: 'DELETE',
            headers: {

                'login-token': loginToken,
                'user-id': userId,
            },
        });
    }

    async vote({

        userId,
        loginToken,
        amount,
        voteId,
        choice,

    }) {

        return await makeApiCall({

            resource: `votes/${ voteId }`,
            method: 'POST',
            headers: {
                'login-token': loginToken,
                'user-id': userId,
            },
            body: {
                amount,
                choice,
            },
        });
    }

    async getVote({

        userId,
        loginToken,
        voteId,

    }) {

        return await makeApiCall({

            resource: `votes/${ voteId }`,
            method: 'GET',
            headers: {
                'login-token': loginToken,
                'user-id': userId,
            },
        });
    }

    async getRaffleData({

        userId,
        loginToken,
        lastKey,
        lastTime,

    }) {

        let queryString = ``;

        if( !!lastTime && !!lastKey ) {

            queryString += `?lastTime=${ lastTime }&lastKey=${ lastKey }`;
        }

        const resource = `raffles${ queryString }`;

        return await makeApiCall({

            resource,
            method: 'GET',
            headers: {
                'login-token': loginToken,
                'user-id': userId,
            },
        });
    }

    async getRaffleDraws({

        userId,
        loginToken,
        raffleId,
        lastTime,
        lastKey,
        startTime,
        endTime

    }) {

        let queryString = `?startTime=${ startTime }&endTime=${ endTime }`;

        if( !!lastTime && !!lastKey ) {

            queryString += `&lastTime=${ lastTime }&lastKey=${ lastKey }`;
        }

        return await makeApiCall({

            resource: `raffle-draws/${ raffleId }${ queryString }`,
            method: 'GET',
            headers: {
                'login-token': loginToken,
                'user-id': userId,
            },
        });
    }

    async getRaffleTickets({

        userId,
        loginToken,
        raffleId,
        time,
        powerId,
        specialId,

    }) {

        return await makeApiCall({

            resource: (!!time && !!powerId && !!specialId) ? (
                
                `raffle-tickets/${ raffleId }?time=${ time }&powerId=${ powerId }&specialId=${ specialId }`

            ) : (

                `raffle-tickets/${ raffleId }`
            ),
            method: 'GET',
            headers: {
                'login-token': loginToken,
                'user-id': userId,
            },
        });
    }

    async exchange({

        userId,
        loginToken,
        amountWantedInCryptos,
        amountWantedInBitcoin,
        googleCode,

    }) {

        const values = {

            resource: 'exchanges',
            method: 'POST',
            headers: {

                'login-token': loginToken,
                'user-id': userId,
                [http.headers.grecaptchaGoogleCode]: googleCode,
            },
            body: {}
        };

        if( !!amountWantedInCryptos ) {

            Object.assign(

                values.body,
                {
                    type: 'btcToCrypto',
                    data: {
                        amountInCryptoWanted: Number( amountWantedInCryptos ),
                    }
                }
            );
        }
        else {

            Object.assign(

                values.body,
                {
                    type: 'cryptoToBTC',
                    data: {
                        amountInBitcoinWanted: Number( amountWantedInBitcoin ),
                    }
                }
            );
        }
    
        return await makeApiCall( values );
    }

    async enchantedLuck({

        userId,
        loginToken,
        // mode,
        amount,
        googleCode,
    }) {

        return await makeApiCall({

            resource: 'dreams',
            method: 'POST',
            headers: {

                'login-token': loginToken,
                'user-id': userId,
                [http.headers.grecaptchaGoogleCode]: googleCode,
            },
            body: {
                amount: amount,
                // mode
            }
        });
    }

    async enchantedSlot({

        userId,
        loginToken,
        googleCode,
    }) {

        return await makeApiCall({

            resource: 'dreams-slot',
            method: 'POST',
            headers: {

                'login-token': loginToken,
                'user-id': userId,
                [http.headers.grecaptchaGoogleCode]: googleCode,
            },
            body: {}
        });
    }

    async enchantedLuckJackpot({

        userId,
        loginToken,
        // mode,
        amount,
        googleCode,
    }) {

        return await makeApiCall({

            resource: 'dreams-lotus',
            method: 'POST',
            headers: {

                'login-token': loginToken,
                'user-id': userId,
                [http.headers.grecaptchaGoogleCode]: googleCode,
            },
            body: {
                amount: amount,
                // mode
            }
        });
    }

    async getJackpotData({

        userId,
        loginToken,
        // googleCode,

    }) {

        return await makeApiCall({

            resource: 'dreams-lotus',
            method: 'GET',
            headers: {

                'login-token': loginToken,
                'user-id': userId,
                // [http.headers.grecaptchaGoogleCode]: googleCode,
            },
            // body: {
            //     amount: amount,
            //     // mode
            // }
        });
    }

    async postRaffleTicket({

        userId,
        loginToken,
        raffleId,
        numbers,
        action,
        googleCode
    }) {

        return await makeApiCall({

            resource: `raffles/${ raffleId }`,
            method: 'POST',
            headers: {

                'login-token': loginToken,
                'user-id': userId,
                [http.headers.grecaptchaGoogleCode]: googleCode,
            },
            body: {
                numbers,
                action,
            }
        });
    }

    async getFeeData() {

        return await makeApiCall({

            resource: 'fee-data',
            method: 'GET',
            headers: {},
            // body: {
            //     amount: amount,
            //     // mode
            // }
        });
    }

    async getTransactions({

        userId,
        loginToken,
        lastTransactionId,
        lastTime,
        smallBatch = false,

    }) {

        let query = '';

        if( !!lastTransactionId && !!lastTime ) {

            query += (
                `?lastTransactionId=${ lastTransactionId }` +
                `&lastTime=${lastTime}`
            );
        }
        
        if( smallBatch ) {

            if( !query ) {

                query += '?';
            }
            else {

                query += '&';
            }

            query += 'smallBatch=true';
        }

        return await makeApiCall({

            resource: `transactions${ query }`,
            method: 'GET',
            headers: {

                [http.headers.userId]: userId,
                [http.headers.loginToken]: loginToken,
                
            }
        });
    }
}