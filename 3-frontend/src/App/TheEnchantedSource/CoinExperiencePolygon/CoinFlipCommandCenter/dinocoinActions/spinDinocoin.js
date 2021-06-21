import { delay } from '../../../../utils';

const win = 'win';

let operationQueue = Promise.resolve({

    previousAction: win,
});


const doAction = async ({

    action,
    previousAction,

}) => {

    await delay({ timeout: 50 });
    
    const box = document.querySelector( '.TheDinocoin-Box' );
    
    while( box.classList.length > 1 ) {

        box.classList.remove( box.classList[ box.classList.length - 1 ] );
    }

    if( previousAction !== win ) {

        box.classList.add( 'action-reset-back' );
    }
    else {

        box.classList.add( 'action-reset' );
    }

    await delay({ timeout: 500 });

    box.classList.add( `action-${ action }` );
    
    await delay({ timeout: 3100 });

    return { previousAction: action };
};


export default ({

    action,

}) => {

    operationQueue = operationQueue.then( async ({

        previousAction,

    }) => {

        try {

            const doActionResults = await doAction({
            
                action,
                previousAction,
            });

            return {

                previousAction: doActionResults.previousAction,
            };
        }
        catch( err ) {

            console.log( 'error in doing spin action:', err );

            return {

                previousAction: win,
            };
        }
    });
};