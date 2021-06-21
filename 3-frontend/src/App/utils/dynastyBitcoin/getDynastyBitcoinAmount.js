const toFixedConstant = 5;
const amountMultiplier = 100000;


export default amount => {

    const dynastyBitcoinAmount = Number(
        (
            Math.round(
                Number(amount) * amountMultiplier
            ) / amountMultiplier
        ).toFixed( toFixedConstant )
    );

    return dynastyBitcoinAmount;
};
