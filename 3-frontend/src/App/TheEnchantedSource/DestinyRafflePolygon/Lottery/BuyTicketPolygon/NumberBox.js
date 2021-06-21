import { createElement as e } from 'react';
import { getState, setState } from '../../../../reduxX';
// import {
//     usefulComponents,
//     // POWBlock,
// } from '../../TheSource';
import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


const getStyles = () => {
    
    return {

        outerContainer: {

            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            maxWidth: 300,
        },
    };
};


const getNumberSelectStyles = () => {
    
    return {

        numberSelectContainer: {

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: 'white',
            borderRadius: '50%',
            width: 65,
            height: 65,
        },

        numberSelect: {

            backgroundColor: 'white',
            // width: 30,
            margin: 10,
            textAlign: 'center'
        },
    };
};


const NumberSelect = ({

    stateKey,

}) => {

    const styles = getNumberSelectStyles();

    const selectedNumberOne = getState(
        'destinyRaffle',
        stateKey
    );

    const isLoading = getState( 'isLoading' );

    return e(
        Box,
        {
            style: styles.numberSelectContainer,
        },
        e(
            TextField,
            {
                disabled: isLoading,
                style: styles.numberSelect,
                value: selectedNumberOne,
                // type: 'number',
                inputProps: {
                    style: {
                        textAlign: 'center'
                    }
                },
                onChange: event => {

                    const newValue = event.target.value;
                    const newValueAsNumber = Number( newValue );

                    if( newValue === '' ) {

                        setState({
                            keys: [
                                'destinyRaffle',
                                stateKey
                            ],
                            value: '',
                        });
                    }
                    else if(
                        Number.isInteger( newValueAsNumber ) &&
                        (newValueAsNumber >= 1) &&
                        (newValueAsNumber <= 36)
                    ) {

                        setState(
                            {
                                keys: [
                                    'destinyRaffle',
                                    stateKey
                                ],
                                value: newValueAsNumber,
                            }
                        );
                    }
                },
            }
        )
    );
};


export default () => {

    const styles = getStyles();

    return e(

        Box,
        {
            style: styles.outerContainer,
        },
        e(
            NumberSelect,
            {
                stateKey: 'selectedNumberOne',
            }
        ),
        e(
            NumberSelect,
            {
                stateKey: 'selectedNumberTwo',
            }
        )
    );
};
