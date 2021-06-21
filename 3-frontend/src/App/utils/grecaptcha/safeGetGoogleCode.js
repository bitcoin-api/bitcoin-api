import { google } from '../../constants';


export default ({

    action,

}) => new Promise( (

    resolve

) => {

    try {

        window.grecaptcha.ready( async () => {

            try{
                
                const token = await window.grecaptcha.execute(
                
                    google.grecapcha.siteKey,
                    { action }
                );

                resolve( token );
            }
            catch( err ) {

                resolve();
            }
        });
    }
    catch( err ) {

        resolve();
    }
});