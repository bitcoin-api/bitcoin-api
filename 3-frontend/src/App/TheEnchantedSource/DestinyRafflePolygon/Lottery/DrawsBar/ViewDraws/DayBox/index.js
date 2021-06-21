import { createElement as e, useEffect } from 'react';
import { getState } from '../../../../../../reduxX';
// import {
//     usefulComponents,
//     // POWBlock,
// } from '../../TheSource';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import componentDidMount from './componentDidMount';
import { getViewDrawsContainerId } from '../viewDrawsTools';


const getIfTimeIsSpecial = ({ time }) => {

    const date = new Date( time );

    const pureTime = date.getTime();

    const dayStartDate = new Date(

        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );

    const dayStartTime = dayStartDate.getTime();

    // const threeTime = (new Date(

    //     date.getFullYear(),
    //     date.getMonth(),
    //     date.getDate(),
    //     3
    // )).getTime();

    // const sixTime = (new Date(

    //     date.getFullYear(),
    //     date.getMonth(),
    //     date.getDate(),
    //     6
    // )).getTime();

    // const nineTime = (new Date(

    //     date.getFullYear(),
    //     date.getMonth(),
    //     date.getDate(),
    //     9
    // )).getTime();

    // const twelveTime = (new Date(

    //     date.getFullYear(),
    //     date.getMonth(),
    //     date.getDate(),
    //     12
    // )).getTime();

    // const fifteenTime = (new Date(

    //     date.getFullYear(),
    //     date.getMonth(),
    //     date.getDate(),
    //     15
    // )).getTime();

    // const eighteenTime = (new Date(

    //     date.getFullYear(),
    //     date.getMonth(),
    //     date.getDate(),
    //     18
    // )).getTime();

    // const twentyOneTime = (new Date(

    //     date.getFullYear(),
    //     date.getMonth(),
    //     date.getDate(),
    //     21
    // )).getTime();

    // const specialTimes = [
        
    //     dayStartTime,
    //     // threeTime,
    //     // sixTime,
    //     // nineTime,
    //     // twelveTime,
    //     // fifteenTime,
    //     // eighteenTime,
    //     // twentyOneTime
    // ];

    // const timeIsSpecial = specialTimes.includes( pureTime );
    const timeIsSpecial = pureTime === dayStartTime;

    return timeIsSpecial;
};


const getFullTimeString = ({ time }) => {

    const pureTimeString = (new Date( time )).toLocaleString();

    const splitTime = pureTimeString.split( ', ' );

    const fullTimeString = `${ splitTime[ 1 ] }, ${ splitTime[ 0 ] }`;

    return fullTimeString;
};


const getChoiceStyle = ({

    alt = false

} = { alt: false }) => {

    return {

        backgroundColor: alt ? '#F4F5DB' : '#FDFEF4',
        // height: 22,
        width: '100%',
        minHeight: 22,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    };
};


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        dayBox: {

            marginTop: 10,
            width: '100%',
            // minWidth: 0,
            maxWidth: 340,
            marginBottom: 10,

            backgroundColor: '#D0D2A8',
            // backgroundColor: 'beige',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        dayBoxBottomSpacer: {

            height: 15,
            width: 5,
        },

        // dayBoxTimeText: {

        //     marginTop: 10,
        //     color: 'black',
        // },

        choiceElementsMetaHolder: {

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',

            height: 200,
        },
        
        choiceElementsHolder: {

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',

            width: '100%',
            // height: '85%',
            height: '100%',
            overflowY: 'scroll',
            WebkitOverflowScrolling: 'touch',
        },

        choice: getChoiceStyle(),

        altChoice: getChoiceStyle({ alt: true }),

        choiceTextLeft: {

            // width: '75%',
            // height: 22,
            textAlign: 'left',
            color: 'black',
            marginLeft: 5,
            fontSize: 12,
        },

        choiceTextRight: {

            // height: 22,
            // width: '25%',
            textAlign: 'right',
            color: 'black',
            marginRight: 5,
        },
    };
};


const ChoiceElementsHolder = ({

    styles,
    choiceElements,
    isLocalLoading,
    drawData,
    raffleId,

}) => {

    return e(
        Box,
        {
            id: getViewDrawsContainerId({ raffleId }),
            style: styles.choiceElementsHolder,
        },
        (choiceElements.length > 0) ? choiceElements : e(

            Box,
            {
                style: Object.assign(
                    
                    {},
                    styles.choice,
                    {
                        marginTop: 30,
                        width: '90%'
                    }
                ),
            }//,
            // !isLocalLoading && e(
            //     Typography,
            //     {
            //         style: styles.choiceTextLeft,
            //     },
            //     (drawData.index === 0) ? (
            //         'No draws yet, please check again later, ' +
            //         'thank you!'
            //     ) : '◀️'
            // )
        ),
    );
};


export default ({
    // startTime,
    raffleDatum,
    isLocalLoading,
    setIsLocalLoading,

}) => {

    const { raffleId } = raffleDatum;

    useEffect( () => {

        Promise.resolve().then( async () => {

            setIsLocalLoading( true );

            try {
                
                await componentDidMount({
                    
                    raffleDatum
                });

                setIsLocalLoading( false );
            }
            catch( err ) {

                setIsLocalLoading( false );
                
                console.log( 'an error occurred:', err );
            }
        });

    }, [ raffleDatum, setIsLocalLoading ] );

    const styles = getStyles();

    const drawData = getState(
        
        'destinyRaffle',
        'raffleIdToDrawData'

    )[ raffleId ] || {

        allDraws: [ [] ],
        lastTime: null,
        index: 0,  
    };

    const choiceElements = (
        
        drawData.allDraws[ drawData.index ]

    ).map( ( choiceDatum, index ) => {

        const timeIsSpecial = getIfTimeIsSpecial({

            time: choiceDatum.time
        });

        return e(

            Box,
            {
                style: ( index % 2 === 0 ) ? styles.choice : styles.altChoice,
                key: `${ choiceDatum.choice }-${ index }`,
            },
            e(
                Typography,
                {
                    style: styles.choiceTextLeft,
                },
                timeIsSpecial ? (
                    
                    getFullTimeString({

                        time: choiceDatum.time,
                    })

                ) : (new Date( choiceDatum.time )).toLocaleTimeString(),
            ),
            e(
                Typography,
                {
                    style: styles.choiceTextRight,
                },
                choiceDatum.choice,
            )
        );
    });

    return e(
        Box,
        {
            style: styles.dayBox,
        },
        e(
            Box,
            {
                style: styles.choiceElementsMetaHolder,
            },
            e(
                ChoiceElementsHolder,
                
                {
                    styles,
                    choiceElements,
                    isLocalLoading,
                    drawData,
                    raffleId
                }
            )
        )
    );
};
