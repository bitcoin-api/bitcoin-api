import { createElement as e } from 'react';
import { getState, setState } from '../../../reduxX';
// import { actions, grecaptcha } from '../../../utils';
// import { TitlePolygon } from '../../../TheSource';
import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
// import { story } from '../../../constants';


const getStyles = () => {

    return {

        outerContainer: {
            // backgroundColor: 'pink',
            width: '100%',
            marginTop: 28,
            // height: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        inputContainer: {
            
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'beige',
            borderRadius: 20,
        },

        input: {
            width: 250,
        },
    };
};


export default () => {

    const styles = getStyles();

    const isLoading = getState( 'isLoading' );
    const emailInput = getState( 'forgotMyPasswordPolygon', 'emailInput' );

    const inputIsDisabled = (

        isLoading
    );

    return e(
        Box,
        {
            style: styles.outerContainer,
        },
        e(
            Box,
            {
                style: styles.inputContainer,
            },
            e(
                TextField,
                {
                    disabled: inputIsDisabled,
                    style: styles.input,
                    value: emailInput,
                    type: 'email',
                    label: 'email',
                    autoComplete: 'email',
                    onSubmit: () => {},
                    onChange: event => {

                        const newText = event.target.value;

                        if( newText.length > 200 ) {

                            return;
                        }

                        setState(
                            [
                                'forgotMyPasswordPolygon',
                                'emailInput'
                            ],
                            newText.trim()
                        );
                    },
                }
            )
        )
    );
};
