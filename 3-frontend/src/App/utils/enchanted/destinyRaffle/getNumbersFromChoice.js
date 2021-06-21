export default ({

    choice

}) => {

    const numbers = choice.split( '-' ).map( choiceNumberString => {

        const choiceNumber = Number( choiceNumberString );

        return choiceNumber;
    });

    return numbers;
};