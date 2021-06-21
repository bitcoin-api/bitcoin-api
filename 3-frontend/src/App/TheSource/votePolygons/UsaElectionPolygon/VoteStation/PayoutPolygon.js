import { createElement as e } from 'react';
// import { setState } from '../../../../reduxX';
// import { validation } from '../../../../utils';
// import placeBet from './placeBet';
// import cancelBet from './cancelBet';


const getStyles = () => {

    return {

        payoutPolygon: {

            width: '100%',
            height: 300,
            backgroundColor: 'yellow',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        payoutPolygonText: {

            padding: 5,
            color: 'black',
        }
    };
};


export default ({

    resultAmount,
    resultChoice,
    currentAmount,

}) => {

    const styles = getStyles();

    return e(
        'div',
        {
            style: styles.payoutPolygon
        },
        e(
            'div',
            {
                style: styles.payoutPolygonText
            },
            (resultAmount !== 0 ) ? (

                'Won vote! ' +
                `Received payout of ${ resultAmount } Cryptos ` +
                `voting for ${ resultChoice } using ${ currentAmount } ` +
                `Cryptos.`

            ) : (

                'Lost vote - ' +
                `Voted for ${ resultChoice } using ${ currentAmount } ` +
                `Cryptos.`
            )
        )
    );
};
