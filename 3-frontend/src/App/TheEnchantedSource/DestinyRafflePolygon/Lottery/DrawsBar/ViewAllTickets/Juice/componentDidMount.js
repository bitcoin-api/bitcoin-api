import { getState } from '../../../../../../reduxX';
import { actions } from '../../../../../../utils';


export default async ({
                    
    raffleId,

}) => {

    const ticketData = getState(
        
        'destinyRaffle',
        'raffleIdToTicketData'

    )[ raffleId ];

    if( !ticketData ) {

        await actions.refreshes.refreshRaffleTickets({

            raffleId,
        });
    }
};
