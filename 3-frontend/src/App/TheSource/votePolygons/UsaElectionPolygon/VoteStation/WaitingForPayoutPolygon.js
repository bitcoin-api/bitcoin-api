import { createElement as e } from 'react';
// import { setState } from '../../../../reduxX';
// import { validation } from '../../../../utils';
// import placeBet from './placeBet';
// import cancelBet from './cancelBet';


const getStyles = () => {

    return {

        polygon: {

            width: '100%',
            height: 300,
            backgroundColor: 'yellow',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        polygonText: {

            padding: 10,
            color: 'black',
        }
    };
};


export default ({

    currentAmount,
    currentChoice

}) => {

    const styles = getStyles();

    return e(
        'div',
        {
            style: styles.polygon
        },
        e(
            'div',
            {
                style: styles.polygonText
            },
            (currentAmount !== 0) ? (

                'Voting period has ended, ' +
                'Waiting for payout if won - ' +
                `current bet is ${ currentAmount } Cryptos ` +
                `on ${ currentChoice }.`
                 
            ) : (

                `Voting period has ended, no more votes are allowed.`
            )
        )
    );
};
