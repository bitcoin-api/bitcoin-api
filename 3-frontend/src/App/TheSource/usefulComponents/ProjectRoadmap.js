import { createElement as e } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const roadmapItems = [
    `Auto-Flip for Dragon's Talisman Bitcoin game`,
    `"Dragon Fire" server updates - increase play limits!`,
    `New secret financial product`,
    `Multiplayer Dragon's Talisman Bitcoin game mode`,
    `More fun games and tech!👾📲💻🎮🕹`
];


export default ({
    color = 'white',
    headerFontSize = 21,
    marginTop = 37,
    marginBottom = 45,
}) => {

    const roadmapItemElements = roadmapItems.map( roadmapItem => {

        return e(
            Typography,
            {
                style: {
                    width: '85%',
                    color,
                    marginBottom: 10,
                }
            },
            `• ${ roadmapItem }`
        );
    });

    return  e(

        Box,
        {
            style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                maxWidth: 620,
                marginTop,
                marginBottom,
                textAlign: 'left',
            }
        },
        e(
            Typography,
            {
                style: {

                    width: '90%',
                    color,
                    marginBottom: 10,
                    fontWeight: 'bold',
                    fontSize: headerFontSize,
                }
            },
            '🛣Dynasty Bitcoin Project Roadmap🗺'
        ),
        ...roadmapItemElements
    );
};
