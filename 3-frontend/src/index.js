import { createElement as e, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
// import 'fontsource-roboto';
// import App from './App';
// import goToRightUrlIfNecessary from './goToRightUrlIfNecessary';
import LoadingPage from './App/TheSource/LoadingPage';
// import 'fontsource-roboto';
const App = lazy(() => import('./App'));


// ReactDOM.render( e('div'), document.getElementById('root'));
const TheMeta = () => {

    // useEffect( () => {

    //     goToRightUrlIfNecessary();

    // }, [] );
    
    return e(
        Suspense,
        {
            fallback: e( LoadingPage, { fullDogeStyle: true } ),
        },
        e(
            App,
            {
                safeMode: true,
            }
        )
    );
};


ReactDOM.render(
    
    e( TheMeta ),
    document.getElementById( 'root' )
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
