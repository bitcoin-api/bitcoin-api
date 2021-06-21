import { createElement as e } from 'react';
import GameTitle from '../desireElements/GameTitle';
import { story } from '../../constants';


export default () => {

    return e(
        GameTitle,
        {
            title: 'Satoshi Slot',
            type: 'Slot Game',
            helpDialogMode: story.dialogModes.games.aboutSlot,
            marginTop: 0,
            marginBottom: 0,
        },
    );
};
