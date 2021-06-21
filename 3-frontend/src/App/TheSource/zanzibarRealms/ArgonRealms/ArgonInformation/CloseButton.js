import { createElement as e } from 'react';
import { setState } from '../../../../reduxX';
import { story } from '../../../../constants';
// import LuluLemonButton from './LuluLemonButton';
import Button from '@material-ui/core/Button';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            width: 69,
            height: 40,
            backgroundColor: 'darkgreen',
            borderRadius: 4,
            // marginTop: 30,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
        },
    };
};


export default () => {

    const styles = getStyles();

    return e(
        Button,
        {
            style: styles.outerContainer,
            onClick: () => {

                setState( 'metaMode', story.metaModes.zeroPointEnergy );
            }
        },
        'Back'
    );
};
