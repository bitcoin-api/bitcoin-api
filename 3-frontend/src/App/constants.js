export const isLivenetMode = (process.env.NODE_ENV === 'production');

export const fonts = {
    
    standard: {
     
        regular: 'ArialHebrew',
        bold: 'ArialHebrew-Bold',
    },
};

export const colours = {

    apiRoyalBlue: '#019BE5',
    black: '#000000',
    white: '#ffffff',

    lightTechBlue: '#01537B',
    
    bitcoin: {
        blue: '#61B3BE',
        orange: '#FE8834',
        grey: '#656776',
        darkGrey: '#1A2836',
    },
};

export const mainStyles = {

    dark: 'dark',
    light: 'light',
};

const mainStyleToMainStyleObject = {

    [mainStyles.dark]: {

        color: colours.white,
        backgroundColor: colours.black,
        alternateBackgroundColor: colours.lightTechBlue,
        alternateColor: colours.white,
    },
    [mainStyles.light]: {

        color: colours.black,
        backgroundColor: colours.white,
        alternateBackgroundColor: colours.lightTechBlue,
        alternateColor: colours.white,
    }
};

for( const mainStyle of Object.keys( mainStyleToMainStyleObject ) ) {

    const mainStyleObject = mainStyleToMainStyleObject[ mainStyle ];

    mainStyleObject.mainStyle = mainStyle;
}

export { mainStyleToMainStyleObject };

export const story = {

    metaModes: {

        zeroPointEnergy: 'zeroPointEnergy',
        privacyPolicy: 'privacyPolicy',
        termsOfService: 'termsOfService',
    },

    dialogModes: {

        none: null,
        about: 'about',
        faq: 'faq',
        depositsBastion: 'depositsBastion',
        withdraws: 'withdraws',
        viewTransactions: 'viewTransactions',
        games: {
            aboutCoinFlip: 'aboutCoinFlip',
            aboutSlot: 'aboutSlot',
            aboutDestinyRaffle: 'aboutDestinyRaffle',
        },
        referralIdInfo: 'referralIdInfo',
    },

    LoggedInMode: {

        modes: {

            base: 'base',
            vote: 'vote',
            coinFlip: 'coinFlip',
            slot: 'slot',
            destinyRaffle: 'destinyRaffle',
            exchange: 'exchange',
            withdraw: 'withdraw',
            settings: 'settings',
        }
    },

    NotLoggedInMode: {

        mainModes: {

            initialChoiceMode: 'initialChoiceMode',
            signUpMode: 'signUpMode',
            afterSignUpMode: 'afterSignUpMode',
            loginMode: 'loginMode',
            verifyUserMode: 'verifyUserMode',
            forgotMyPasswordMode: 'forgotMyPasswordMode',
            passwordResetMode: 'passwordResetMode',
        }
    },
};


export const games = {

    theDragonsTalisman: 'theDragonsTalisman',
    slot: 'slot',
    destinyRaffle: 'destinyRaffle',
};


export const gameData = {

    [games.theDragonsTalisman]: {

        modes: {

            jackpot: 'jackpot',
            standard: 'standard',
        },
        diamondMin: 0.00001,
        diamondMax: 0.00008,
        diamondStepCount: 8,
        jackpotMin: 0.00001,
        jackpotMax: 0.001,
        jackpotStepCount: 10,
    },

    [games.slot]: {

        baseImageUrl: 'https://s3.ca-central-1.amazonaws.com/dynastybitcoin.com/site/images',
        loadingImageUrl: 'https://s3.ca-central-1.amazonaws.com/dynastybitcoin.com/site/images/loading-frog-1.png',
        slotImageNames: [
            'btc_logo_1.png',
            'doge_logo_1.png',
            'eth_logo_1.png',
            'bnb_logo_1.png',
            'barmy_logo_2.png',
            'tron_logo_1.png',
            'btt_logo_1.png',
            'cake_logo_1.png',
        ],
    },

    [games.destinyRaffle]: {

        sortByUser: 'sortByUser',
        sortByTicket: 'sortByTicket',
    },
};


export const google = {

    grecapcha: {

        badgeClassName: 'grecaptcha-badge',
        siteKey: process.env.REACT_APP_EXCHANGE_GRECAPTCHA_SITE_KEY,
        actions: {

            signUp: 'signUp',
            login: 'login',
            verifyUser: 'verifyUser',
            coinFlip: 'coinFlip',
            slotSpin: 'slotSpin',
            lotusCoinFlip: 'lotusCoinFlip',
            addAddress: 'addAddress',
            destinyRaffleTicketPut: 'destinyRaffleTicketPut',
            withdraw: 'withdraw',
            exchange: 'exchange',
            resetPasswordInitialization: 'resetPasswordInitialization',
            resetPasswordDo: 'resetPasswordDo',
        },
    },
};


export const queryStringModes = {

    account_verification: 'account_verification',
};


export const pathValues = {

    mode: 'mode',
    account_verification: 'account_verification',
    verification_code: 'verification_code',
    email: 'email',
    password_reset: 'password_reset',
    password_reset_code: 'password_reset_code',
};

export const votes = {

    types: {
        doVote: 'doVote',
        payout: 'payout',
    }
};

export const raffles = {

    actions: {
        buy: 'buy',
        cancel: 'cancel'
    }
};

export const enchantedLuck = {

    modes: {
        a: 'a',
    }
};


export const apiUrl = process.env.REACT_APP_EXCHANGE_API_BASE_URL;


export const pages =  {
    loggedInMode: {
        base: 'base',
        exchange: 'exchange',
        withdraw: 'withdraw',
        coinFlip: 'coinFlip',
        slot: 'slot',
        destinyRaffle: 'destinyRaffle',
    }
};


export const http = {

    headers: {

        grecaptchaGoogleCode: 'grecaptcha-google-code',
        verifyEmailCode: 'verify-email-code',
        newPassword: 'new-password',
        userId: 'user-id',
        loginToken: 'login-token',
        passwordResetCode: 'password-reset-code',
    }
};


export const moneyActions = {

    types: {
        regal: {
            addressAmountUpdate: 'bitcoinAddressAmountUpdate',
            exchange: {
                btcToCrypto: 'exchangeBtcToCrypto',
                cryptoToBTC: 'exchangeCryptoToBTC',
            },
            withdraw: {
                start: 'withdrawStart',
                success: 'withdrawSuccess',
                failed: 'withdrawFailed',
            },
            bonus: 'bonus',
        },
        game: {
            talismanFlip: 'talismanFlip',
            talismanLotus: 'talismanLotus',
            slot: 'slot',
            lotus: {
                pickPetal: 'lotusPickPetal',
                unpickPetal: 'lotusUnpickPetal',
                flowerPotPayout: 'lotusFlowerPotPayout',
            },
        },
    }
};