import {
    enchanted
} from '../../../../../../../../utils';
import getNumbersAvsNumbersB from '../getNumbersAvsNumbersB';


const sortChoices = ({ choices }) => {

    choices.sort( ( choiceA, choiceB ) => {

        const numbersA = enchanted.destinyRaffle.getNumbersFromChoice({

            choice: choiceA,
        });

        const numbersB = enchanted.destinyRaffle.getNumbersFromChoice({

            choice: choiceB,
        });

        return getNumbersAvsNumbersB({

            numbersA,
            numbersB
        });
    });
};


const characterToName1 = {

    a: 'Darth',
    b: 'Ultra',
    c: 'Mega',
    d: 'Imperial',
    e: 'Shiny',
    f: 'Nebula',
    0: 'Prince',
    1: 'Advanced',
    2: 'Noble',
    3: 'Duke',
    4: 'Upper',
    5: 'Honorable',
    6: 'Righteous',
    7: 'Virtuous',
    8: 'Golden',
    9: 'Sovereign',
};

const characterToName2 = {

    a: 'Satoshi',
    b: 'Vader',
    c: 'Chaos',
    d: 'Apple',
    e: 'Sky',
    f: 'Ocean',
    0: 'Mountain',
    1: 'Tree',
    2: 'Paladin',
    3: 'Bird',
    4: 'Camel',
    5: 'Window',
    6: 'Oxygen',
    7: 'Rocket',
    8: 'Chef',
    9: 'Algebra',
};


const getName = ({

    specialId

}) => {

    // specialId = specialId.substring( 'exchange_user_'.length );

    const character1 = specialId[0];
    const character2 = specialId[1];
    // const character3 = specialId[2];

    const nameParts = [];

    if( !!characterToName1[ character1 ] ) {

        nameParts.push( characterToName1[ character1 ] );
    }
    else {

        nameParts.push( 'Crypto' );
    }

    if( !!characterToName2[ character2 ] ) {

        nameParts.push( characterToName2[ character2 ] );
    }
    else {

        nameParts.push( 'Gamer' );
    }

    const name = nameParts.join( ' ' );

    return name;
};


const putOwnProcessedDataFirst = ({

    sortByUserProcessedData
    
}) => {

    for( let i = 0; i < sortByUserProcessedData.length; i++ ) {

        if( sortByUserProcessedData[ i ].own ) {

            const ownUserData = sortByUserProcessedData[ i ];

            sortByUserProcessedData.splice( i, 1 );
            sortByUserProcessedData.unshift( ownUserData );

            return;
        }
    }
};


export default ({

    data,
    ownSpecialId

}) => {

    const specialIdToData = {};

    for( const { choice, specialId } of data ) {

        if( !specialIdToData[ specialId ] ) {

            specialIdToData[ specialId ] = {

                choices: [
                    choice,
                ]
            };
        }
        else {

            specialIdToData[ specialId ].choices.push(

                choice
            );
        }
    }

    const specialIds = Object.keys( specialIdToData );

    specialIds.forEach( specialId => {

        sortChoices({
            
            choices: specialIdToData[ specialId ].choices
        });
    });

    const sortByUserProcessedData = [];

    specialIds.forEach( specialId => {

        const data = specialIdToData[ specialId ];

        const processedData = {

            name: getName({ specialId }),
            choices: data.choices,
            own: (specialId === ownSpecialId),
        };

        sortByUserProcessedData.push( processedData );
        // sortByTicketProcessedData.push( data );
    });

    sortByUserProcessedData.sort( ( datumA, datumB ) => {

        return (datumB.choices.length - datumA.choices.length);
    });

    putOwnProcessedDataFirst({

        sortByUserProcessedData
    });

    return sortByUserProcessedData;
};