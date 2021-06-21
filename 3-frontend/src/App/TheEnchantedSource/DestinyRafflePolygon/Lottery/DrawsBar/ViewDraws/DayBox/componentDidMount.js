import { getState, setState } from '../../../../../../reduxX';
import { bitcoinExchange } from '../../../../../../utils';


export default async ({

    raffleDatum,

}) => {

    const { raffleId } = raffleDatum;

    const drawData = getState(
        
        'destinyRaffle',
        'raffleIdToDrawData'

    )[ raffleId ];

    if( !drawData || (drawData.allDraws.length === 0) ) {

        const userId = getState( 'auth', 'userId' );
        const loginToken = getState( 'auth', 'loginToken' );
    
        // await delay({ timeout: 3000 });

        // get startTime and endTime and store in state

        const startTime = raffleDatum.raffleStartTime;

        const isWinningRaffle = (
            !!raffleDatum.winData &&
            raffleDatum.winData.hasWon
        );

        const endTime = isWinningRaffle ? raffleDatum.winHour : Date.now();
        
        // console.log(`
        
        
        //     MEGA LOG: ${ JSON.stringify( {


        //         isWinningRaffle,
        //         endTime,
        //         raffleDatum

        //     }, null, 4 ) }
        
        
        // `);

        const {

            draws,
            pageInfo

        } = await bitcoinExchange.getRaffleDraws({
    
            userId,
            loginToken,
            raffleId,
            startTime,
            endTime,
        });

        // const pageInfo = null;

        const raffleIdToDrawData = getState(
        
            'destinyRaffle',
            'raffleIdToDrawData'
        );

        const newRaffleIdToDrawData = Object.assign(

            {},
            raffleIdToDrawData,
            {
                [raffleId]: {

                    // allDraws: [

                    //     (() => {

                    //         const data = [];

                    //         for( let i = 1; i <= 100; i++ ) {

                    //             data.push({

                    //                 time: i * 1000 * 60 * 60,
                    //                 choice: `${ i }-${ 2 * i }`,
                    //                 win: false
                    //             });
                    //         }

                    //         return data;
                    //     })(),
                    //     (() => {

                    //         const data = [];

                    //         for( let i = 101; i <= 200; i++ ) {

                    //             data.push({

                    //                 time: i * 1000 * 60 * 60,
                    //                 choice: `${ i }-${ 2 * i }`,
                    //                 win: false
                    //             });
                    //         }

                    //         return data;

                    //     })(),
                    // ],
                    // lastTime: null,

                    allDraws: [
                        draws//,
                        // []
                    ],
                    lastTime: !pageInfo ? null : pageInfo.lastTime,
                    index: 0,
                    startTime,
                    endTime,          
                }
            }
        );

        if( !!pageInfo ) {

            Object.assign(

                newRaffleIdToDrawData[ raffleId ],
                {
                    lastTime: pageInfo.lastTime,
                    lastKey: pageInfo.lastKey,
                }
            );
        }

        setState(

            [ 'destinyRaffle', 'raffleIdToDrawData' ],
            newRaffleIdToDrawData
        );
    } 
};
