import { setState } from '../../reduxX';
import { story } from '../../constants';


export default () => {

    setState(

        // actual page resets
        {
            keys: 'metaMode',
            value: null
        },
        {
            keys: [ 'notLoggedInMode', 'freeGame' ],
            value: null,
        },
        {
            keys: [ 'notLoggedInMode', 'mainMode' ],
            value: story.NotLoggedInMode.mainModes.initialChoiceMode,
        },
        {
            keys: [ 'loggedInMode', 'mode' ],
            value: story.LoggedInMode.modes.base,
        },

        // other relevant state changes
        {
            keys: [ 'forgotMyPasswordPolygon', 'successEmail' ],
            value: null,
        }
    );
};