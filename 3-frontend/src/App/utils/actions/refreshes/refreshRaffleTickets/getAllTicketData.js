import bitcoinExchange from '../../../bitcoinExchangeInstance';
import { getState } from '../../../../reduxX';
import { raffles } from '../../../../constants';


const getAllData = async ({
                    
    raffleId,

}) => {

    const allTicketData = [];

    let nextPageInfo = null;

    do {

        const userId = getState( 'auth', 'userId' );
        const loginToken = getState( 'auth', 'loginToken' );

        const params = {

            userId,
            loginToken,
            raffleId,
        };

        if( !!nextPageInfo ) {

            Object.assign(
                params,
                nextPageInfo
            );
        }

        const {
            
            tickets,
            pageInfo

        } = await bitcoinExchange.getRaffleTickets( params );

        allTicketData.push( ...tickets );

        if( !!pageInfo ) {

            nextPageInfo = pageInfo;
        }
        else if( !!nextPageInfo ) {

            nextPageInfo = null;
        }

    } while( nextPageInfo );

    return allTicketData;
};


const getProcessedTicketData = ({ allTicketData }) => {

    allTicketData.sort( ( datumA, datumB ) => {

        return datumA.time - datumB.time;
    });

    const userIdToChoice = {};

    allTicketData.forEach( ticketDatum => {

        if( ticketDatum.action === raffles.actions.buy ) {

            userIdToChoice[ ticketDatum.specialId ] = (

                userIdToChoice[ ticketDatum.specialId ] || {}
            );

            userIdToChoice[ ticketDatum.specialId ][ ticketDatum.choice ] = (

                ticketDatum
            );
        }
        else {

            if( !!userIdToChoice[ ticketDatum.specialId ] ) { // safeguard

                delete userIdToChoice[
                
                    ticketDatum.specialId
                ][
                    ticketDatum.choice
                ];
            }
        }
    });

    const processedTicketData = [];

    const userIds = Object.keys( userIdToChoice );

    for( const userId of userIds ) {

        const choices = Object.keys( userIdToChoice[ userId ] );

        for( const choice of choices ) {

            processedTicketData.push(

                userIdToChoice[ userId ][ choice ]
            );
        }
    }

    processedTicketData.sort( ( datumA, datumB ) => {

        return datumA.time - datumB.time;
    });

    const finalProcessedTicketData = processedTicketData.map(

        ({ choice, time, specialId }) => ({ choice, time, specialId })
    );

    return finalProcessedTicketData;
};


export default async ({
                    
    raffleId,

}) => {

    const allTicketData = await getAllData({

        raffleId,
    });

    const processedTicketData = getProcessedTicketData({

        allTicketData
    });

    return processedTicketData;
};
