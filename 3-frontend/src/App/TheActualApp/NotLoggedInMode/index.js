import { createElement as e, lazy, Suspense } from 'react';
import { getState } from '../../reduxX';
import { story } from '../../constants';
// import InitialChoiceMode from './InitialChoiceMode';
import LoadingPage from '../../TheSource/LoadingPage';
const InitialChoiceMode = lazy(() => import('./InitialChoiceMode'));
const SignUpMode = lazy(() => import('./SignUpMode'));
const AfterSignUpMode = lazy(() => import('./AfterSignUpMode'));
const VerifyUserMode = lazy(() => import('./VerifyUserMode'));
const LoginMode = lazy(() => import('./LoginMode'));
const ForgotMyPasswordMode = lazy(() => import('./ForgotMyPasswordMode'));
const PasswordResetMode = lazy(() => import('./PasswordResetMode'));
const FreeGameMode = lazy(() => import('./FreeGameMode'));


const StandardSuspense = ({ children }) => {

    return e(
        Suspense,
        {
            fallback: e( 'div' ),
        },
        children
    );
};


const getStyles = () => {
    
    const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: mainStyleObject.backgroundColor,
            // backgroundColor: 'lightgreen',
            // width: 300,
            width: '100%',
            // height: 200,

            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: 'white',
        },
    };
};


export default ({

    websiteName
    
}) => {

    const styles = getStyles();

    const mainMode = getState( 'notLoggedInMode', 'mainMode' );
    const freeGame = getState( 'notLoggedInMode', 'freeGame' );

    const createElementArguments = [
        'div',
        {
            style: styles.outerContainer,
        }
    ];

    if( mainMode === story.NotLoggedInMode.mainModes.signUpMode ) {

        createElementArguments.push(

            e(
                StandardSuspense,
                {},
                e( SignUpMode )
            )
        );
    }
    else if( mainMode === story.NotLoggedInMode.mainModes.loginMode ) {

        createElementArguments.push(

            e(
                StandardSuspense,
                {},
                e( LoginMode )
            )
        );
    }
    else if( mainMode === story.NotLoggedInMode.mainModes.afterSignUpMode ) {

        createElementArguments.push(

            e(
                StandardSuspense,
                {},
                e(
                    AfterSignUpMode,
                    {
                        websiteName
                    }
                )
            )
        );
    }
    else if( mainMode === story.NotLoggedInMode.mainModes.verifyUserMode ) {

        createElementArguments.push(

            e(
                StandardSuspense,
                {},
                e( VerifyUserMode )
            )
        );
    }
    else if( mainMode === story.NotLoggedInMode.mainModes.forgotMyPasswordMode ) {

        createElementArguments.push(

            e(
                StandardSuspense,
                {},
                e( ForgotMyPasswordMode )
            )
        );
    }
    else if( mainMode === story.NotLoggedInMode.mainModes.passwordResetMode ) {

        createElementArguments.push(

            e(
                StandardSuspense,
                {},
                e( PasswordResetMode )
            )
        );
    }
    else if( !!freeGame ) {

        createElementArguments.push(

            e(
                StandardSuspense,
                {},
                e( FreeGameMode )
            )
        );  
    }
    else {

        createElementArguments.push(

            e(
                Suspense,
                {
                    fallback: e( LoadingPage, { fullDogeStyle: true } ),
                },
                e(
                    InitialChoiceMode,
                    {
                        websiteName
                    }
                )
            )
        );
    }

    return e( ...createElementArguments );
};
