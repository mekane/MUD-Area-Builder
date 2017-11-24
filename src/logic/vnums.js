const toInteger = (arg) => {
    let intValue = 0;

    if ( typeof arg === 'number' ) {
        return Math.floor(arg);
    }
    else if ( typeof arg === 'string' ) {
        intValue = parseInt(arg);
    }

    return isNaN(intValue) ? 0 : intValue;
};

const vnumGenerator = function( minVnum ) {
    const startingVM = toInteger(minVnum);

    return function( id ) {
        return startingVM + toInteger(id);
    }
};

module.exports = {
    generator: vnumGenerator
};