import { grecaptcha } from '../utils';
import setUpNavigation from './setUpNavigation';
// import processQueryString from './processQueryString';
import goToRightUrlIfNecessary from './goToRightUrlIfNecessary';
import processPath from './processPath';
import keepTrackOfWindowSize from './keepTrackOfWindowSize';
import runChronicTasks from './runChronicTasks';
import loadGrecaptcha from './loadGrecaptcha';



export default () => {

    goToRightUrlIfNecessary();

    setUpNavigation();

    loadGrecaptcha();

    grecaptcha.hideGrecaptcha();

    processPath();

    keepTrackOfWindowSize();

    runChronicTasks();
};
