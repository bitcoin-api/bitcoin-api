import React, { createElement as e } from 'react';
import { getState, setState } from '../../reduxX';
import { story } from '../../constants';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import About from './About';
import FAQ from './FAQ';
import DepositsBastion from './DepositsBastion';
import Withdraws from './Withdraws';
import ViewTransactions from './ViewTransactions';
import ReferralIdInfo from './ReferralIdInfo';
import {
    AboutCoinFlip,
    AboutDestinyRaffle,
    AboutSlot
} from './games';
// import MuiDialogActions from '@material-ui/core/DialogActions';


const getUseStyles = ({

    backgroundColor = 'beige',

}) => makeStyles((theme) => ({
    appBar: {
        // position: 'fixed',
        backgroundColor
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        color: 'black'
    },
}));


const Transition = React.forwardRef( function Transition( props, ref ) {

    return e(
        Slide,
        Object.assign(
            {
                direction: 'up',
                ref,
            },
            props
        )
    );
});


const handleClose = () => {

    const isLoading = getState( 'isLoading' );
    
    if( !isLoading ) {

        setState(
            [ 'dialogMode' ],
            story.dialogModes.none,
        );
    }
};


const getDialogData = ({
    
    dialogMode,
    isDialogDesktopMode

}) => {

    switch( dialogMode ) {

        case story.dialogModes.about: {

            return {
                
                title: 'About',
                contents: e( About )
            };
        }
        case story.dialogModes.faq: {

            return {
                
                title: 'FAQ',
                contents: e( FAQ )
            };
        }
        case story.dialogModes.games.aboutCoinFlip: {

            return {
                
                title: `The Dragon's Talisman`,
                contents: e( AboutCoinFlip ),
                customHeaderBackgroundColor: 'lightgreen',
            };
        }
        case story.dialogModes.games.aboutDestinyRaffle: {

            return {
                
                title: 'Thousand Petal Lotus',
                contents: e( AboutDestinyRaffle ),
                customHeaderBackgroundColor: 'beige',
            };
        }
        case story.dialogModes.games.aboutSlot: {

            return {
                
                title: 'About Slot',
                contents: e( AboutSlot ),
                customHeaderBackgroundColor: 'beige',
            };
        }
        case story.dialogModes.depositsBastion: {

            return {
                
                title: 'Deposit',
                contents: e(
                    
                    DepositsBastion,
                    {
                        isDialogDesktopMode
                    }
                ),
                // customHeaderBackgroundColor: 'beige',
            };
        }
        case story.dialogModes.withdraws: {

            return {
                
                title: 'About Withdraws',
                contents: e( Withdraws ),
                // customHeaderBackgroundColor: 'beige',
            };
        }
        case story.dialogModes.viewTransactions: {

            return {
                
                title: 'Transactions',
                contents: e( ViewTransactions ),
                // customHeaderBackgroundColor: 'beige',
            };
        }
        case story.dialogModes.referralIdInfo: {

            return {
                
                title: 'About Your Referral ID',
                contents: e( ReferralIdInfo ),
                // customHeaderBackgroundColor: 'beige',
            };
        }
        default:
            return {

                title: '',
                contents: null,
            };
    }
};


const DialogTitle = ({
    
    title,

}) => {
    //   <MuiDialogTitle disableTypography className={classes.root} {...other}>
    //     <Typography variant="h6">{children}</Typography>
    //     {onClose ? (
    //       <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
    //         <CloseIcon />
    //       </IconButton>
    //     ) : null}
    //   </MuiDialogTitle>

    const isLoading = getState( 'isLoading' );

    return e(
        MuiDialogTitle,
        {
            disableTypography: true,
            style: {

                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor: 'green',
                padding: 0,
            }
        },
        e(
            Typography,
            {
                // variant: 'h6'
                style: {
                    // width: 200,
                    // backgroundColor: 'pink',
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginLeft: 10,
                }
            },
            title
        ),
        e(
            IconButton,
            {
                disabled: isLoading,
                'aria-label': 'close',
                style: {

                    marginRight: 2,
                    // width: 200,
                    // backgroundColor: 'purple',
                },
                onClick: () => {

                    handleClose();
                }
            },
            e( CloseIcon )
        )
    );
};


export default () => {

    const dialogMode = getState( 'dialogMode' );

    const windowWidth = getState( 'windowWidth' );

    const isDialogDesktopMode = windowWidth >= 650;

    const {
        
        title,
        contents,
        customHeaderBackgroundColor,

    } = getDialogData({
        
        dialogMode,
        isDialogDesktopMode,
    });

    const classes = getUseStyles({

        backgroundColor: customHeaderBackgroundColor,
    })();

    if( isDialogDesktopMode ) {

        return e(
            Dialog,
            {
                open: !!dialogMode,
                scroll: 'body',
                onClose: () => {
                 
                    handleClose();  
                },
            },
            e(
                DialogTitle,
                {
                    title,
                }
            ),
            e(
                MuiDialogContent,
                {
                    dividers: true
                },
                contents
            )
        );
    }

    const dialogElements = [
        e(
            AppBar,
            {
                className: classes.appBar,
                // position: 'fixed',
                // position: 'sticky',
                position: 'sticky',
                // position: 'absolute',
            },
            e(
                Toolbar,
                {},
                e(
                    Typography,
                    {
                        variant: 'h6',
                        className: classes.title
                    },
                    title
                ),
                e(
                    IconButton,
                    {
                        // edge: 'end',
                        style: {
                            color: 'black'
                        },
                        onClick: handleClose,
                        'aria-label': 'close',
                    },
                    e( CloseIcon )
                )
            )
        ),
        contents
    ];


    return e(
        Dialog,
        {
            fullScreen: true,
            open: !!dialogMode,
            // onClose: () => {
                
            // },
            TransitionComponent: Transition,
        },
        ...dialogElements
    );
};
