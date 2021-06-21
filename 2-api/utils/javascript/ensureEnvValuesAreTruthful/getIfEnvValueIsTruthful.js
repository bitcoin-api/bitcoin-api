'use strict';


module.exports = Object.freeze( ({

    envKey

}) => {

    const envValue = process.env[ envKey ];

    const envValueIsTruthful = !(

        !envValue ||
        [
            'undefined',
            'null',
            '""',
            '"',
            `''`,
            `'`,

        ].includes( envValue )
    );

    return envValueIsTruthful;
});
