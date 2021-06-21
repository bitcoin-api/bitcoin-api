import { createElement as e } from 'react';
import { getState, setState } from '../../../../reduxX';
import Paper from '@material-ui/core/Paper';

const getStyles = ({

	choiceInput,
	cardIcon,
	defaultColor,
    isLoading,

}) => {

    return {

        card: {
            height: 200,
            width: '45%',
            borderRadius: 30,
            backgroundColor: isLoading ? (

                'darkgrey'

            ) : (

                (choiceInput === cardIcon) ? 'black' : defaultColor
            ),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
            marginBottom: 5,
            // color: 'white',
            // marginTop: 10,
        },

        image: {

            width: '100%',
        }
    };
};


export default ({

    choiceInput,
    cardIcon = 'trump',
    defaultColor = 'blue',
    choiceToChoiceData,

}) => {

    const isLoading = getState( 'isLoading' );

    const styles = getStyles({

    	choiceInput,
    	cardIcon,
    	defaultColor,
        isLoading,
    });
    
    const { image } = choiceToChoiceData[ cardIcon ];

    return e(

        Paper,
        {
            style: styles.card,
            elevation: 3,
            onClick: () => {

                if( isLoading ) {

                    return;
                }

            	const choiceInput = getState(
    				[ 'presidentialVote2020', 'choiceInput' ],
    				cardIcon
    			);

    			if( !!choiceInput && (choiceInput === cardIcon) ) {

    				setState(
	    				[ 'presidentialVote2020', 'choiceInput' ],
	    				null
	    			);
    			}
    			else {

    				setState(
	    				[ 'presidentialVote2020', 'choiceInput' ],
	    				cardIcon
	    			);	
    			}
            }             
        },
        e(
            'img',
            {
                style: styles.image,
                src: image,
            }   
        )
    );
};
