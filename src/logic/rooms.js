const vnums = require('./vnums.js');

const exitDirectionToNumberCode = {
    n: '0',
    e: '1',
    s: '2',
    w: '3'
};
const exitDirections = Object.keys(exitDirectionToNumberCode);

const exitLockToNumberCode = {
    'open': 0,
    'closed': 1,
    'locked': 2 //also implies closed
};

const roomSectorToNumberCode = {
    'inside': '0',
    'city': '1',
    'field': '2',
    'forest': '3',
    'hills': '4',
    'mountain': '5',
    'water': '6',
    'deep water': '7',
    'air': '9',
    'desert': '10'
};

const roomEndSymbol = 'S';

function exportExit(exitDirection, exitData, vnumComputer = x => x) {
    if (typeof exitDirection !== 'string' || !(exitDirection in exitDirectionToNumberCode))
        return '';

    if (typeof exitData !== 'object' || !('destination' in exitData))
        return '';

    const directionCode = 'D' + exitDirectionToNumberCode[exitDirection];
    const exitDescription = exitData['description'] || '';
    const exitKeywords = exitData['keywords'] || '';

    const lock = exitData['lock'] ? exitLockToNumberCode[exitData['lock']] : '0';
    const keyVnum = exitData['key'] ? vnumComputer(exitData['key']) : '0';

    const destinationRoom = vnumComputer(exitData.destination);

    return `${directionCode}
${exitDescription}~
${exitKeywords}~
${lock} ${keyVnum} ${destinationRoom}`;
}

function exportToAreaFormat(startingVnum, room) {
    if (typeof startingVnum === 'undefined' || typeof room !== 'object' || typeof room.id === 'undefined')
        return '';

    const vnum = vnums.generator(startingVnum);

    const roomVnum = vnum(room.id);
    const sector = room['sector'] ? roomSectorToNumberCode[room['sector']] || '0' : '0';

    let exits = '';
    exitDirections.forEach(direction => {
        if (room.exit && room.exit[direction])
            exits += exportExit(direction, room.exit[direction], vnum) + '\n';
    });

    return `#${roomVnum}
${room.name}~
${room.description}
~
0 ${sector} 0
${exits}${roomEndSymbol}`;
}

const hasExit = (room, direction) => {
    return !!room && !!room.exit && !!room.exit[direction] && !!room.exit[direction].destination;
};

module.exports = {
    exportExit,
    exportToAreaFormat,
    hasExit
};