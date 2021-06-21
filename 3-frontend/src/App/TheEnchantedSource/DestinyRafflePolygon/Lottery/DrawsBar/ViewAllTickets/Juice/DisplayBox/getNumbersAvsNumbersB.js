export default ({

    numbersA,
    numbersB

}) => {

    for( let i = 0; i < numbersA.length; i++ ) {

        const same = numbersA[i] === numbersB[i];

        if( !same ) {

            if( numbersA[i] > numbersB[i] ) {

                return 1;
            }
            else {

                return -1;
            }
        }
    }

    return 0;
};
