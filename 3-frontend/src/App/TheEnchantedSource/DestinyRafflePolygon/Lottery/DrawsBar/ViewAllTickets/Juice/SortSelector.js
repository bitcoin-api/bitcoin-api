import { createElement as e } from 'react';
import { getState, setState } from '../../../../../../reduxX';
// import {
//     usefulComponents,
//     // POWBlock,
// } from '../../TheSource';
// import {
//     usefulComponents
// } from '../../../../../TheSource';
import { gameData } from '../../../../../../constants';
import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const sortByUser = gameData.destinyRaffle.sortByUser;
const sortByTicket = gameData.destinyRaffle.sortByTicket;


const getStyles = () => {
    
    return {

        metaContainer: {

            width: '100%',
            
            // height: 25,
            // backgroundColor: 'green',

            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
    };
};


export default ({
    
    raffleDatum,
    isLocalLoading,
    
}) => {

    const styles = getStyles();

    const { raffleId } = raffleDatum;

    const {

        sortByOption

    } = getState(
        
        'destinyRaffle',
        'raffleIdToTicketData'

    )[ raffleId ] || {

        sortByOption: gameData.destinyRaffle.sortByTicket
    };

    return e(
        Box,
        {
            style: styles.metaContainer
        },
        e(
            FormControl,
            {
                styles: styles.formControl,
                disabled: isLocalLoading
            },
            e(
                InputLabel,
                {},
                'Sort by'
            ),
            e(
                Select,
                {
                    value: sortByOption,
                    onChange: event => {

                        const raffleIdToTicketData = getState(
        
                            'destinyRaffle',
                            'raffleIdToTicketData'
                        );
                        
                        const newRaffleIdToTicketData = Object.assign(
                
                            {},
                            raffleIdToTicketData,
                            {
                                [raffleId]: Object.assign(
                                    
                                    {},
                                    raffleIdToTicketData[ raffleId ],
                                    {
                                        sortByOption: event.target.value,
                                    }
                                )
                            }
                        );
                
                        setState(
                
                            [ 'destinyRaffle', 'raffleIdToTicketData' ],
                            newRaffleIdToTicketData
                        );
                    },
                },
                e(
                    MenuItem,
                    {
                        value: sortByTicket,
                    },
                    'Petal'
                ),
                e(
                    MenuItem,
                    {
                        value: sortByUser,
                    },
                    'User'
                )
            )
        )
    );
};
