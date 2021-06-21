'use strict';


module.exports = Object.freeze( ({

    key,
    min = -Infinity,
    max = Infinity,
    shouldBeInteger = false,
    defaultValue = 'ENV_DEFAULT_VALUE_NOT_SET',

}) => {

    const envNumberValue = Number( process.env[ key ] );

    const numberIsInvalid = !(

        !Number.isNaN( envNumberValue ) &&
        (envNumberValue >= min) &&
        (envNumberValue <= max)
    );

    if( numberIsInvalid ) {

        return defaultValue;
    }
    else if( shouldBeInteger && !Number.isInteger( envNumberValue ) ) {

        return defaultValue;
    }

    return envNumberValue;
});
