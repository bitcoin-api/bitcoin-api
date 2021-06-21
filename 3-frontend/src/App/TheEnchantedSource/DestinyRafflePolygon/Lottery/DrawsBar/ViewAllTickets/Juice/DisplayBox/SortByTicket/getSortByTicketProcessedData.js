import {
    enchanted
} from '../../../../../../../../utils';
import getNumbersAvsNumbersB from '../getNumbersAvsNumbersB';


const putOwnProcessedDataFirst = ({

    sortByTicketProcessedData
    
}) => {

    sortByTicketProcessedData.sort( ( datumA, datumB ) => {

        if( datumA.own && !datumB.own ) {

            return -1;
        }
        else if( !datumA.own && datumB.own ) {

            return 1;
        }

        return 0; 
    });
};


export default ({

    data,
    ownSpecialId

}) => {

    const choiceToData = {};

    for( const { time, choice, specialId } of data ) {

        if( !choiceToData[ choice ] ) {

            choiceToData[ choice ] = {

                numberOfTicketsPurchased: 1,
                mostRecentPurchaseTime: time,
                own: (specialId === ownSpecialId)
            };         
        }
        else {

            if( time > choiceToData[ choice ].mostRecentPurchaseTime ) {

                choiceToData[ choice ].mostRecentPurchaseTime = time;
            }

            if(
                (specialId === ownSpecialId) &&
                !choiceToData[ choice ].own
            ) {

                choiceToData[ choice ].own = true;
            }

            choiceToData[ choice ].numberOfTicketsPurchased++;
        }
    }

    const sortByTicketProcessedData = [];

    Object.keys( choiceToData ).forEach( choice => {

        const data = Object.assign(
            {},
            choiceToData[ choice ],
            {
                choice
            }
        );

        sortByTicketProcessedData.push( data );
    });

    sortByTicketProcessedData.sort( ( datumA, datumB ) => {

        const numbersA = enchanted.destinyRaffle.getNumbersFromChoice({

            choice: datumA.choice
        });

        const numbersB = enchanted.destinyRaffle.getNumbersFromChoice({

            choice: datumB.choice
        });

        return getNumbersAvsNumbersB({

            numbersA,
            numbersB
        });
    });

    sortByTicketProcessedData.sort( ( datumA, datumB ) => {

        return (
            datumB.numberOfTicketsPurchased -
            datumA.numberOfTicketsPurchased
        );
    });

    putOwnProcessedDataFirst({

        sortByTicketProcessedData,
    });

    return sortByTicketProcessedData;
};