const vnumGenerator = function( minVnum ) {
    let startingVM = 0;

    if ( typeof minVnum === 'number' ) {
        startingVM = Math.floor(minVnum);
    }
    else if ( typeof minVnum === 'string' ) {
        startingVM = parseInt(minVnum);
    }

    if ( isNaN(startingVM) ) {
        startingVM = 0;
    }

    return function( id ) {
        return startingVM + id;
    }
};

module.exports = {
    generator: vnumGenerator
};