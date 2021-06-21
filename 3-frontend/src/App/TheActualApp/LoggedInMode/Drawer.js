import { createElement as e } from 'react';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { getState, setState } from '../../reduxX';
import { story } from '../../constants';
import { actions } from '../../utils';


const getStyles = () => {
    
    const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: mainStyleObject.backgroundColor,
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

        listItem: {

            width: 200
        },
    };
};


const UltraListItem = ({

    isLoading,
    style,
    mode,
    text,
    isDesktopMode = false

}) => {

    return e(
        ListItem,
        {
            disabled: isLoading,
            button: true,
            style,
            onClick: () => {

                const setStateArgs = [
                    {
                        keys: [
                            'loggedInMode',
                            'mode',
                        ],
                        value: mode
                    },
                ];

                if( !isDesktopMode ) {

                    setStateArgs.push({
                        keys: [
                            'loggedInMode',
                            'drawerIsOpen',
                        ],
                        value: false
                    });
                }

                setState( ...setStateArgs );
            },
        },
        e(
            ListItemText,
            {
                primary: text,
            }
        )
    );
};


export default Object.freeze( () => {

    const drawerIsOpen = getState(
        
        'loggedInMode',
        'drawerIsOpen'
    );

    const styles = getStyles();

    const isLoading = getState( 'isLoading' );

    // TODO: add close button in large mode
        
    const windowWidth = getState( 'windowWidth' );

    const isDesktopMode = (windowWidth > 1025);
    
    return e(
        
        Drawer,
        {
            variant: isDesktopMode ? 'persistent' : undefined,
            anchor: 'right',
            open: drawerIsOpen,
            onClose: () => {

                setState(
                    [
                        'loggedInMode',
                        'drawerIsOpen'
                    ],
                    false
                );
            },
        },
        e(
            UltraListItem,
            {
                isLoading,
                style: styles.listItem,
                mode: story.LoggedInMode.modes.base,
                isDesktopMode,
                text: 'Home',
            }
        ),
        e(
            UltraListItem,
            {
                isLoading,
                style: styles.listItem,
                mode: story.LoggedInMode.modes.exchange,
                isDesktopMode,
                text: 'Exchange',
            }
        ),
        e(
            UltraListItem,
            {
                isLoading,
                style: styles.listItem,
                mode: story.LoggedInMode.modes.coinFlip,
                isDesktopMode,
                text: 'Talisman Toss',
            }
        ),
        e(
            UltraListItem,
            {
                isLoading,
                style: styles.listItem,
                mode: story.LoggedInMode.modes.slot,
                isDesktopMode,
                text: 'Satoshi Slot',
            }
        ),
        e(
            UltraListItem,
            {
                isLoading,
                style: styles.listItem,
                mode: story.LoggedInMode.modes.withdraw,
                isDesktopMode,
                text: 'Withdraw',
            }
        ),
        e(
            UltraListItem,
            {
                isLoading,
                style: styles.listItem,
                mode: story.LoggedInMode.modes.destinyRaffle,
                isDesktopMode,
                text: 'Feed',
            }
        ),
        // e(
        //     UltraListItem,
        //     {
        //         isLoading,
        //         style: styles.listItem,
        //         mode: story.LoggedInMode.modes.settings,
        //         isDesktopMode,
        //         text: 'Settings',
        //     }
        // ),
        e(
            Divider,
            {
                style: {
                    backgroundColor: 'black'
                }
            }
        ),
        e(
            ListItem,
            {
                button: true,
                disabled: isLoading,
                style: styles.listItem,
                onClick: async () => {

                    await actions.signOut();
                },
            },
            e(
                ListItemText,
                {
                    primary: 'Logout',
                }
            )
        )
    );
});