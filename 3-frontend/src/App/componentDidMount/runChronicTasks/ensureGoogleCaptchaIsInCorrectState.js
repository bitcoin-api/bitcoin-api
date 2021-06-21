import { getState } from '../../reduxX';
import { grecaptcha, actions } from '../../utils';
import { story } from '../../constants';


export default async () => {

    if( !actions.getIsLoggedIn() ) {

        const notLoggedInMainMode = getState( 'notLoggedInMode', 'mainMode' );

        const shouldShowGrecaptcha = [

            story.NotLoggedInMode.mainModes.signUpMode,
            story.NotLoggedInMode.mainModes.loginMode,
            story.NotLoggedInMode.mainModes.verifyUserMode,
            story.NotLoggedInMode.mainModes.forgotMyPasswordMode,
            story.NotLoggedInMode.mainModes.passwordResetMode,

        ].includes( notLoggedInMainMode );

        // console.log(`
        
        
        //     MEGA LOG: ${ JSON.stringify( {

        //         s: [

        //             story.NotLoggedInMode.mainModes.signUpMode,
        //             story.NotLoggedInMode.mainModes.loginMode,
        
        //         ],
        //         notLoggedInMainMode,
        //         shouldShowGrecaptcha

                
        //     }, null, 4 ) }
        
        
        // `);
        

        if( shouldShowGrecaptcha ) {

            grecaptcha.showGrecaptcha();

            return;
        }
    }
    // else {

    //     const loggedInMode = getState( 'loggedInMode', 'mode' );

    //     const shouldShowGrecaptcha = [

    //         story.LoggedInMode.modes.exchange,
    //         story.LoggedInMode.modes.coinFlip,
    //         story.LoggedInMode.modes.destinyRaffle,
    //         story.LoggedInMode.modes.withdraw,

    //     ].includes( loggedInMode );

    //     if( shouldShowGrecaptcha ) {

    //         grecaptcha.showGrecaptcha();

    //         return;
    //     } 
    // }

    await grecaptcha.hideGrecaptcha({

        shouldOnlyTryOnce: true
    });
};
