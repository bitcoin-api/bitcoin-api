import { createElement as e, useEffect, lazy, Suspense } from 'react';
import { actions } from '../../../utils';
import Box from '@material-ui/core/Box';
import TopPaper from './TopPaper';
import GamesSection from './GamesSection';
// import TwitterFeedSection from './TwitterFeedSection';
import MoreInfo from './MoreInfo';
import Footer from './Footer';
import Divider from '@material-ui/core/Divider';
import LoadingPage from '../../../TheSource/LoadingPage';
const TwitterFeedSection = lazy(() => import('./TwitterFeedSection'));


const StandardSuspense = ({ children }) => {

    return e(
        Suspense,
        {
            fallback: e( LoadingPage ),
        },
        children
    );
};


const getStyles = () => {

    return {

        outerContainer: {
            // backgroundColor: 'beige',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 20,
        },

        theBottomLine: {

            width: '80%',
            marginTop: 12,
            maxWidth: 585,
            minWidth: 300,
            backgroundColor: 'beige',
            // marginTop: 20,
            // marginBottom: 20,
        },

        theBottomLine2: {

            width: '80%',
            // marginTop: 35,
            maxWidth: 585,
            minWidth: 300,
            backgroundColor: 'beige',
            // marginTop: 20,
            // marginBottom: 20,
        }
    };
};


export default () => {

    useEffect( () => {

        actions.scroll();

    }, [] );
    
    const styles = getStyles();
    // const classes = getClasses();

    return e(
        Box,
        {
            style: styles.outerContainer,
            // className: classes.root,
        },
        e( TopPaper ),
        e( GamesSection ),
        e(
            Divider,
            {
                style: styles.theBottomLine,
            }
        ),
        e(
            StandardSuspense,
            {},
            e( TwitterFeedSection )
        ),
        e(
            Divider,
            {
                style: styles.theBottomLine2,
            }
        ),
        e( MoreInfo ),
        // e(
        //     Divider,
        //     {
        //         style: styles.theBottomLine2,
        //     }
        // ),
        e( Footer )
    );
};
