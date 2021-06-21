import isValidPasswordResetCode from '../../validation/isValidPasswordResetCode';


export default ({

    passwordResetCode

}) => {

    const {

        data

    } = isValidPasswordResetCode({

        passwordResetCode,
        shouldThrowError: true,
    });

    return data;
};
