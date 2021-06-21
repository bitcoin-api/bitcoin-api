import { delay } from '../../../../utils';

// const win = 'win';

// let operationQueue = Promise.resolve({

//     previousAction: win,
// });


let i = 0;

export default async ({

    action,
    // previousAction,

}) => {

    const box = document.querySelector( '.TheDinocoin-Box' );

    if( i === 66 ) {

        // while( box.classList.length > 1 ) {

        //     box.classList.remove( box.classList[ box.classList.length - 1 ] );
        // }

        i++;

        return;
    }

    
    // await delay({ timeout: 1 });

    // await delay({ timeout: 1 });

    if( (i > 0) && (i % 2 === 1) ) {

        console.log( 'x2' );
        await delay({ timeout: 1 });

        box.classList.add( 'speed' );
        await delay({ timeout: 1 });

        while( box.classList.length > 2 ) {

            // console.log( 'x:', box.classList[ box.classList.length - 1 ] );
            console.log( 'xa:', box.classList[ 1 ] );

            if(
                box.classList[ 1 ] !== 'speed'
            ) {
                console.log( 'xb:', box.classList[ 1 ] );

                box.classList.remove( box.classList[ 1 ] );
            }
            // box.classList.remove( box.classList[ box.classList.length - 1 ] );
        }
        await delay({ timeout: 1 });

        console.log( 'xend:', box.classList );

        // box.classList.remove( box.classList[ 1 ] );

        i++;
        return;
    }


    if( (i > 0) && (i % 2 === 0) ) {

        console.log( 'x3' );
        await delay({ timeout: 1 });
        console.log( 'xend2:', box.classList[ 1 ] );
        box.classList.remove( box.classList[ 1 ] );

        await delay({ timeout: 1 });

        box.classList.add( 'action-testomega' );

        i++;
        return;
    }

    i++;

    // while( box.classList.length > 1 ) {

    //     console.log( 'x:', box.classList[ box.classList.length - 1 ] );

    //     box.classList.remove( box.classList[ box.classList.length - 1 ] );
    // }

    if( i === 2 ) {


    }

    // await delay({ timeout: 1 });

    // box.classList.add( 'action-reset' );

    await delay({ timeout: 1 });
    // if( previousAction !== win ) {

    //     box.classList.add( 'action-reset-back' );
    // }
    // else {

    //     box.classList.add( 'action-reset' );
    // }

    // await delay({ timeout: 500 });

    // box.classList.add( `action-${ action }` );
    box.classList.add( 'action-test1' );
    await delay({ timeout: 40 });

    // box.classList.remove( 'action-test1' );
    // await delay({ timeout: 1 });

    box.classList.add( 'action-test2' );

    await delay({ timeout: 40 });

    box.classList.add( 'action-test3' );

    await delay({ timeout: 40 });

    box.classList.add( 'action-test4' );

    // await delay({ timeout: 1001 });

    // box.classList.remove( 'action-test2' );

    // await delay({ timeout: 1001 });

    // box.classList.add( 'action-test1' );
    // box.classList.add( 'action-test3' );
    
    // await delay({ timeout: 3100 });

    // return { previousAction: action };
};


// export default ({

//     action,

// }) => {

//     operationQueue = operationQueue.then( async ({

//         previousAction,

//     }) => {

//         try {

//             const doActionResults = await doAction({
            
//                 action,
//                 previousAction,
//             });

//             return {

//                 previousAction: doActionResults.previousAction,
//             };
//         }
//         catch( err ) {

//             console.log( 'error in doing spin action:', err );

//             return {

//                 previousAction: win,
//             };
//         }
//     });
// };