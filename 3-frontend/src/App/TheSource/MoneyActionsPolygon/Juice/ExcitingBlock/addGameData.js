import { createElement as e } from 'react';
// import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { moneyActions } from '../../../../constants';


const getStyles = ({

    dialogMode

}) => {
    
    const {

        color,

    } = dialogMode ? {

        color: 'white',

    } : {

        color: 'black',
    };
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        amountText: {

            color,
            fontSize: 14,
            marginLeft: 5,
            marginTop: 3,
        },
    };
};


export default ({
    excitingElements,
    moneyAction,
    dialogMode,
}) => {

    const styles = getStyles({

        dialogMode,
    });

    if(
        moneyAction.type ===
        moneyActions.types.game.talismanFlip
    ) {

        const isWinningFlip = moneyAction.amount > 0;
        const gameAmount = Math.abs( moneyAction.amount );

        excitingElements.push(

            e(
                Typography,
                {
                    style: styles.amountText
                },
                'Win: ' +
                (isWinningFlip ? 'yes!🥳' : 'no')
            ),
            e(
                Typography,
                {
                    style: styles.amountText
                },
                'DB wagered: ' +
                `${ gameAmount } DB`
            ),
        );

        if( isWinningFlip ) {

            const winningAmount = 2 * gameAmount;

            excitingElements.push(
                e(
                    Typography,
                    {
                        style: styles.amountText
                    },
                    'DB won: ' +
                    `${ winningAmount } DB`
                ),
            );
        }
    }
    else if(
        moneyAction.type ===
        moneyActions.types.game.talismanLotus
    ) {

        const gameAmount = Math.abs( moneyAction.amount );

        if( moneyAction.winData ) {

            excitingElements.push(
    
                e(
                    Typography,
                    {
                        style: styles.amountText
                    },
                    'DB wagered: ' +
                    `${ moneyAction.winData.amount } DB`
                ),
                e(
                    Typography,
                    {
                        style: styles.amountText
                    },
                    'DB Jackpot Won: ' +
                    `${ gameAmount } DB 🎈🎉🎊🎁🥳🎈, congrats!`
                )
            );
        }
        else {

            const isWinningFlip = moneyAction.amount > 0;
    
            excitingElements.push(
    
                e(
                    Typography,
                    {
                        style: styles.amountText
                    },
                    'Win: ' +
                    (isWinningFlip ? 'yes!🥳' : 'no')
                ),
                e(
                    Typography,
                    {
                        style: styles.amountText
                    },
                    'DB wagered: ' +
                    `${ gameAmount } DB`
                ),
            );
    
            if( isWinningFlip ) {
    
                const winningAmount = 2 * gameAmount;
    
                excitingElements.push(
                    e(
                        Typography,
                        {
                            style: styles.amountText
                        },
                        'DB won: ' +
                        `${ winningAmount } DB`
                    ),
                );
            }
        }
    }
    else if (
        moneyAction.type ===
        moneyActions.types.game.slot
    ) {

        const gameAmount = Math.abs( moneyAction.amount );

        if( moneyAction.amount === 0 ) {

            excitingElements.push(

                e(
                    Typography,
                    {
                        style: styles.amountText
                    },
                    'Tie game - no DB change'
                ),
            );
        }
        else if( moneyAction.amount > 0 ) {

            excitingElements.push(

                e(
                    Typography,
                    {
                        style: styles.amountText
                    },
                    `Won: ${ gameAmount } DB`
                ),
            );
        }
        else if( moneyAction.amount < 0 ) {

            excitingElements.push(

                e(
                    Typography,
                    {
                        style: styles.amountText
                    },
                    `Lost: ${ gameAmount } DB`
                ),
            );
        }
    }
    else if(
        moneyAction.type ===
        moneyActions.types.game.lotus.pickPetal
    ) {

        const petalPrice = Math.abs( moneyAction.amount );

        excitingElements.push(
            e(
                Typography,
                {
                    style: styles.amountText
                },
                `Petal Price: ${ petalPrice } DB`
            ),
            e(
                Typography,
                {
                    style: styles.amountText
                },
                `Petal Numbers: ${ moneyAction.choice }`
            )
        );
    }
    else if(
        moneyAction.type ===
        moneyActions.types.game.lotus.unpickPetal
    ) {

        const petalPrice = Math.abs( moneyAction.amount );

        excitingElements.push(
            e(
                Typography,
                {
                    style: styles.amountText
                },
                `Petal Price (refund): ${ petalPrice } DB`
            ),
            e(
                Typography,
                {
                    style: styles.amountText
                },
                `Petal Numbers: ${ moneyAction.choice }`
            )
        );
    }
    else if(
        moneyAction.type ===
        moneyActions.types.game.lotus.flowerPotPayout
    ) {

        excitingElements.push(
            e(
                Typography,
                {
                    style: styles.amountText
                },
                `Flower Pot Winning Payout: ${ moneyAction.amount } DB`
            ),
            e(
                Typography,
                {
                    style: styles.amountText
                },
                'Congratulations!!! 🥳🎊🎉🎈'
            )
        );
    }
};
