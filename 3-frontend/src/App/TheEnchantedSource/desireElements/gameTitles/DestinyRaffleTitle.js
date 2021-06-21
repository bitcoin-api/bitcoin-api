import { createElement as e } from 'react';
import { story } from '../../../constants';
import { getState } from '../../../reduxX';
import GameTitle from '../GameTitle';


export default () => {

    const windowWidth = getState( 'windowWidth' );

    // const {

    //     type,

    // } = (windowWidth > 510) ? {


    //     type: 'Hourly Draw Probability Function',

    // } : {

    //     type: 'Hourly Draw',
    // }; 

    const type = (
        
        windowWidth > 510

    ) ? 'Hourly Draw Lottery': 'Hourly Draw';

    return e(

        GameTitle,
        {
            title: 'Thousand Petal Lotus',
            // type: 'Hourly Draw Probability Function',
            type,
            helpDialogMode: story.dialogModes.games.aboutDestinyRaffle,
            marginBottom: 20,
        }
    );
};
