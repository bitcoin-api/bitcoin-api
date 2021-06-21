import { google } from '../../constants';
import delay from '../delay';

const timeBetweenTries = 50;
const maxNumberOfTries = 40;


const hideGrecaptcha = async ({

    iterationCount = 0, 
    shouldOnlyTryOnce = false

} = {
    
    iterationCount: 0,
    shouldOnlyTryOnce: false

}) => {

    const captcha = document.getElementsByClassName(
        google.grecapcha.badgeClassName
    )[0];

    if(
        !!captcha &&
        (captcha.style.visibility !== 'hidden')
    ) {

        captcha.style.visibility = 'hidden';

        return;
    }
    else if(
        shouldOnlyTryOnce ||
        (iterationCount > maxNumberOfTries)
    ) {

        return;
    }

    await delay({ timeout: timeBetweenTries });

    return await hideGrecaptcha({

        iterationCount: iterationCount + 1, 
    });
};


export default hideGrecaptcha;