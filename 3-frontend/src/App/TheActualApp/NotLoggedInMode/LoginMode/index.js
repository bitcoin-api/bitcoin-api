import { createElement as e, useEffect } from 'react';
import { getState, } from '../../../reduxX';
import { actions, grecaptcha } from '../../../utils';
import { LoginPolygon, TitlePolygon } from '../../../TheSource';
// import { story } from '../../../constants';


const getStyles = () => {
    
    const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: mainStyleObject.backgroundColor,
            width: 300,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: 'white',
        },
    };
};


export default () => {

    useEffect( () => {

        actions.scroll();
        grecaptcha.showGrecaptcha();

        return () => {

            Promise.resolve().then( async () => {

                try {

                    await grecaptcha.hideGrecaptcha();
                }
                catch( err ) {

                    console.log( 'error in hiding grecaptcha:', err );
                }
            });
        };
        
    }, [] );

    const styles = getStyles();

    // const isLoading = getState( 'isLoading' );

    const createElementArguments = [
        'div',
        {
            style: styles.outerContainer,
        },
        e(
            TitlePolygon,
            {
                shouldHaveHomeButton: true,
                marginBottom: 6,
            }
        ),
        e(
            LoginPolygon,
            {
                marginBottom: 25,
            }
        )
    ];

    return e( ...createElementArguments );
};
