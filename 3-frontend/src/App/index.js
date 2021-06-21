import { createElement as e, useState, useEffect, Suspense, lazy } from 'react';
// import Amplify from 'aws-amplify';
// import aws_exports from './aws-exports';
import { setUpReduxX, getState } from './reduxX';
import { story } from './constants';
import componentDidMount from './componentDidMount';
// import Dialog from './TheSource/Dialog';
// import PrivacyPolicyRealm from './TheSource/zanzibarRealms/ArgonRealms/PrivacyPolicyRealm';
// import TermsOfServiceRealm from './TheSource/zanzibarRealms/ArgonRealms/TermsOfServiceRealm';
import Box from '@material-ui/core/Box';
// const componentDidMount = lazy(() => import('./componentDidMount'));
// import TheActualApp from './TheActualApp';
import LoadingPage from './TheSource/LoadingPage';
const PrivacyPolicyRealm = lazy(() => import('./TheSource/zanzibarRealms/ArgonRealms/PrivacyPolicyRealm'));
const TermsOfServiceRealm = lazy(() => import('./TheSource/zanzibarRealms/ArgonRealms/TermsOfServiceRealm'));
const Dialog = lazy(() => import('./TheSource/Dialog'));
const TheActualApp = lazy(() => import('./TheActualApp'));
// import Dialog from './TheSource/Dialog';

// Amplify.configure( aws_exports );

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
            // backgroundColor: 'orange',
            // width: '100%',
            // height: '100%',
            width: '100%',
            // height: 500,

            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: 'white',
        },

        // spiritual: {

        //     width: 300,
        //     height: 600,
        //     backgroundColor: 'beige',  
        // }
    };
};


/*

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
        </List>
      </Dialog>
*/


export default ({

    websiteName = 'DynastyBitcoin.com',
    websiteAbbreviation = 'DB',
    supportEmail = 'support@dynastybitcoin.com',
    safeMode = false,
    
}) => {
    
    useEffect( () => {

        componentDidMount();

    }, [] );

    setUpReduxX( useState );

    const styles = getStyles();

    const metaMode = getState( 'metaMode' );

    const createElementArguments = [
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            StandardSuspense,
            {},
            e( Dialog )
        ),
        // TODO: add snack
    ];

    if( metaMode === story.metaModes.privacyPolicy ) {

        createElementArguments.push(
            e(
                Suspense,
                {
                    fallback: e( 'div' ),
                },
                e(
                    PrivacyPolicyRealm,
                    {
                        websiteName,
                        websiteAbbreviation,
                        supportEmail
                    }
                )
            )
        );
    }
    else if( metaMode === story.metaModes.termsOfService ) {

        createElementArguments.push(
            e(
                Suspense,
                {
                    fallback: e( 'div' ),
                },
                e(
                    TermsOfServiceRealm,
                    {
                        websiteName,
                        websiteAbbreviation,
                        supportEmail
                    }
                )
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
                    TheActualApp,
                    {
                        websiteName,
                        safeMode
                    }
                )
            )
        );
    }

    return e( ...createElementArguments );
};
