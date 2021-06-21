import getAllTicketData from './getAllTicketData';
import { getState, setState } from '../../../../reduxX';
import { gameData } from '../../../../constants';


export default async ({
                    
    raffleId,
    sortByOption,

}) => {

    const data = await getAllTicketData({ raffleId });

    const raffleIdToTicketData = getState(
    
        'destinyRaffle',
        'raffleIdToTicketData'
    );

    const sortByOptionToUse = sortByOption || (

        !!raffleIdToTicketData[ raffleId ] &&
        !!raffleIdToTicketData[ raffleId ].sortByOption &&
        raffleIdToTicketData[ raffleId ].sortByOption

    ) || gameData.destinyRaffle.sortByTicket;

    const newRaffleIdToTicketData = Object.assign(

        {},
        raffleIdToTicketData,
        {
            [raffleId]: {

                sortByOption: sortByOptionToUse,
                data,                  
            }
        }
    );

    setState(

        [ 'destinyRaffle', 'raffleIdToTicketData' ],
        newRaffleIdToTicketData
    );
};
