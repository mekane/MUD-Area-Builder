const vnums = require('./vnums.js');

function exportToAreaFormat(startingVnum, room) {
    if (typeof startingVnum === 'undefined' || typeof room !== 'object' || typeof room.id === 'undefined')
        return '';

    const vnum = vnums.generator(startingVnum);

    return `#${vnum(room.id)}
${room.name}~
${room.description}
~
0 0 0
S`;

}

const hasExit = (room, direction) => {
    return !!room && !!room.exit && !!room.exit[direction] && !!room.exit[direction].destination;
};

module.exports = {
    exportToAreaFormat,
    hasExit
};