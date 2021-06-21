import {
    createElement as e
} from 'react';
import Box from '@material-ui/core/Box';
import { getState } from '../../../reduxX';
import { gameData, games } from '../../../constants';
// import { javascript } from '../../../utils';

const slotConstants = gameData[ games.slot ];

const baseImageUrl = slotConstants.baseImageUrl;
// const krogUrl = 'https://s3.ca-central-1.amazonaws.com/dynastybitcoin.com/site/images/loading-frog-1.png';
const krogUrl = slotConstants.loadingImageUrl;

// const slotNumberToSymbolImageName = Object.freeze({

//     1: slotConstants.slotImageNames[0],
//     2: slotConstants.slotImageNames[1],
//     3: slotConstants.slotImageNames[2],
// });
    
//     'doge_logo_1.png',
//     'eth_logo_1.png',
// ];

// const slotNumberToSymbolImageNameSet1 = Object.freeze({

//     1: 'btc_logo_1.png',
//     2: 'doge_logo_1.png',
//     3: 'eth_logo_1.png',
// });

// const slotNumberToSymbolImageNameSet2 = Object.freeze({

//     1: 'btc_logo_1.png',
//     2: 
//     3: 
// });

// const truthy = javascript.getRandomIntInclusive( 0, 1 );


export default ({

    slotNumber

}) => {

    const slotNumberImageIndices = getState(
        'loggedInMode',
        'slot',
        'slotNumberImageIndices'
    );

    const slotNumberToSymbolImageName = Object.freeze({

        1: slotConstants.slotImageNames[ slotNumberImageIndices[0] ],
        2: slotConstants.slotImageNames[ slotNumberImageIndices[1] ],
        3: slotConstants.slotImageNames[ slotNumberImageIndices[2] ],
    });
        

    // useEffect( () => {

    //     setInterval( () => {

    //         const isLoading = getState( 'isLoading' );
            
    //         setState( [ 'isLoading' ], !isLoading );

    //     }, 2000 );

    // }, [] );

    // const slotNumberToSymbolImageName = truthy ? (

    //     slotNumberToSymbolImageNameSet1

    // ) : slotNumberToSymbolImageNameSet2;

    const symbolImageName = slotNumberToSymbolImageName[ slotNumber ];

    const symbolImageUrl = `${ baseImageUrl }/${ symbolImageName }`;

    const isLoading = getState( 'isLoading' );

    return e(
        Box,
        {
            style: {

                // width: 180,
                // height: 180,
                maxWidth: '30%',
                // height: 100,
                height: '30vw',
                maxHeight: 182,

                // maxHeight: '20%',
                // height: 100,
                // backgroundColor: 'white',
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: 'white',

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',    
                borderRadius: 20
            },
        },
        e(
            Box,
            {
                style: {

                    width: '100%',
                    // height: '100%',
                    
                    // color: 'black',
                    // backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',

                    fontSize: 40,

                    borderRadius: 20,
                    // padding: 10,
                },

                
            },
            isLoading ? e(

                'img',
                {
                    className: 'xx',
                    style: {
                        userSelect: 'none',
                        width: '83%',
                        pointerEvents: 'none',
                        borderRadius: 20,
                    },
                    src: krogUrl,
                }
                
            ) : e(

                'img',
                {
                    style: {
                        width: '90%',
                        userSelect: 'none',
                        pointerEvents: 'none',
                    },
                    src: symbolImageUrl,
                }
            )
        )
    );
};
