import ReduxX, { v } from 'react-state-management';
import {
    mainStyles,
    mainStyleToMainStyleObject,
    story,
    games,
    gameData
    // story
} from './constants';

const initialMainStyleObject = mainStyleToMainStyleObject[ mainStyles.dark ];


export const {
 
    setUpReduxX,
    setState,
    getState,
 
    /* Optional Exports: */
    resetReduxX,
    // getGlobalUseState,
    // oldeFashionedStateManagement,
 
} = ReduxX({
 
    initialState: {

        mainStyleObject: v( initialMainStyleObject ),

        // metaMode: v( story.metaModes.zeroPointEnergy ),
        metaMode: v( null ),
        // metaMode: v( 'termsOfService' ),
        // metaMode: v( 'verifyUserMode' ),

        dialogMode: v( story.dialogModes.none ),
        // dialogMode: v( story.dialogModes.faq ),
        // dialogMode: v( story.dialogModes.withdraws ),
        // dialogMode: v( story.dialogModes.depositsBastion ),
        // dialogMode: v( story.dialogModes.games.aboutCoinFlip ),
        // dialogMode: v( story.dialogModes.games.aboutDestinyRaffle ),
        // dialogMode: v( story.dialogModes.viewTransactions ),
        
        // isLoading: v( false ),
        // isLoading: v( false ),
        isLoading: v( false ),

        windowWidth: v( window.innerWidth ),

        auth: {

            userId: v( null ),
            loginToken: v( null ),
            // userId: v( 'exchange_user_8027206ba0724b97a17a8e1870b907b8' ),
            // loginToken: v( 'login_token-13fa669da4c0494892d86021f781ed31cdc7d739d975437cac430ee12f6310959e6b8681c62848408413fe72e96229e6' ),
        },

        signUpPolygon: {

            emailInput: v( '' ),
            passwordInput: v( '' ),
            reTypePasswordInput: v( '' ),
            agreeToTermsOfService: v( false ),
            agreeToPrivacyPolicy: v( false ),

            // emailInput: v( 'e.x.t.r.e.m.e.l.y.monkey@gmail.com' ),
            // passwordInput: v( 'password' ),
            // reTypePasswordInput: v( 'password' ),
            // agreeToTermsOfService: v( true ),
            // agreeToPrivacyPolicy: v( true ),
        },

        verifyEmailPolygon: {

            emailInput: v( '' ),
            passwordInput: v( '' ),
            // passwordInput: v( 'password' ),
            verifyEmailCodeInput: v( '' ),
            // verifyEmailCodeInput: v( '2321231231232132121' ),
        },

        loginPolygon: {

            // emailInput: v( '' ),
            // emailInput: v( 'john@smith.com' ),
            emailInput: v( '' ),
            passwordInput: v( '' ),
            // passwordInput: v( 'password' ),
        },

        getUserPolygon: {

            userIdInput: v( '' ),
            loginTokenInput: v( '' ),
        },

        withdrawPolygon: {

            amount: v( '0' ),
            address: v( '' ),
            fee: v( '0' ),
            fullWithdraw: v( false ),
        },

        exchangePolygon: {

            amountWantedInCryptos: v( '' ),
            amountWantedInBitcoin: v( '' ),
        },

        transactionsPolygon: {
            moneyActions: v( null ),
            lastTransactionId: v( null ),
            lastTime: v( null ),
            // lastTransactionId: v( 'xyz_abc' ),
            // lastTime: v( 34312438726 ),
        },

        forgotMyPasswordPolygon: {

            emailInput: v( '' ),
            // emailInput: v( 'm.stecky.efantis@gmail.com' ),
            successEmail: v( null ),
            // successEmail: v( 'm.stecky.efantis@gmail.com' ),
        },

        notLoggedInMode: {

            // mainMode: v( null ),
            mainMode: v( story.NotLoggedInMode.mainModes.initialChoiceMode ),
            // mainMode: v( 'afterSignUpMode' )
            // mainMode: v( 'signUpMode' ),
            // mainMode: v( story.NotLoggedInMode.mainModes.loginMode ),
            // mainMode: v( story.NotLoggedInMode.mainModes.forgotMyPasswordMode ),
            // mainMode: v( story.NotLoggedInMode.mainModes.passwordResetMode ),
            // mainMode: v( story.NotLoggedInMode.mainModes.verifyUserMode ),
            
            freeGame: v( null ),
            // freeGame: v( 'theDragonsTalisman' ),
            // freeGame: v( 'destinyRaffle' ),

            freeGameModeBalance: v( 0.07 ),
            // freeGameModeBalance: v( 55555.55555 ),

            coinFlip: {

                selectedAmount: v( '0.0003' ),
            },

            passwordReset: {

                passwordInput: v( '' ),
                repeatPasswordInput: v( '' ),
                email: v( '' ),
                passwordResetCode: v( null ),

                // email: v( 'mikeysteckyefantis@gmail.com' ),
                // passwordInput: v( 'abcdefgh' ),
                // repeatPasswordInput: v( 'abcdefgh' ),
                // passwordResetCode: v( 'prc-exchange_user_fake_eu90-kdasdhkasj-99999999999999' ),
            },
        },

        loggedInMode: {

            userData: v( null ),

            mode: v( story.LoggedInMode.modes.base ),
            // mode: v( story.LoggedInMode.modes.exchange ),
            // mode: v( story.LoggedInMode.modes.vote ),
            // mode: v( story.LoggedInMode.modes.withdraw ),
            // mode: v( story.LoggedInMode.modes.coinFlip ),
            // mode: v( story.LoggedInMode.modes.destinyRaffle ),

            drawerIsOpen: v( false ),

            coinFlip: {

                selectedAmount: v( '0.0003' ),
                mode: v(
                    gameData[ games.theDragonsTalisman ].modes.jackpot
                ),
                jackpotAmount: v( null ),
                // jackpotAmount: v( 69123.12345 ),
                
                startedGettingJackpotDataForFirstTime: v( false ),
                hasGottenJackpotDataForFirstTime: v( false ),
            },

            slot: {

                slotNumber1: v( 1 ),
                slotNumber2: v( 2 ),
                slotNumber3: v( 3 ),

                slotNumberImageIndices: v([
                    0,
                    1,
                    2,
                ])
            }
        },

        ultraTools: {

            fastMessageData: v( null ),
            // fastMessageData: v({

            //     message: 'this is the mega test message for monkeys and for people but for monkeys.🙊',
            //     timeout: 20000,
            //     noX: true
            // }),

            // fastMessageData: v({
            //     message: (
            //         `To login, please check your email: ${ 'test' } ` +
            //         'for a verification code link. Thank you!'
            //     ),
            //     // timeout: 999999,
            //     timeout: 5000,
            //     noX: true
            // })
        },

        // coinExperiencePolygon: {

        //     amount: v( 0 ),
        // },

        destinyRaffle: {

            loadError: v( null ),
            data: v( null ),
            selectedNumberOne: v( '' ),
            selectedNumberTwo: v( '' ),
            raffleIdToDrawData: v( {} ),
            raffleIdToTicketData: v( {} ),
            lastKey: v( null ),
            lastTime: v( null ),
            ownSpecialId: v( null ),
        },

        presidentialVote2020: {

            // choice: v( 'trump' ),
            localError: v( null ),
            choiceInput: v( null ),
            amountInput: v( '0' ),
            currentAmount: v( null ),
            currentChoice: v( null ),
            currentVoteType: v( null ),
            currentMetadata: v( {} ),
        }
    }
});