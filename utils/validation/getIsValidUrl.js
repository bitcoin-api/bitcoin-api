'use strict';

const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/;


module.exports = Object.freeze( url => {

    const baseUrlIsValid = !!url.match( urlRegex );

    return baseUrlIsValid;
});