const vnums = require('./vnums.js');

const exitDirectionToNumberCode = {
    n: '0',
    e: '1',
    s: '2',
    w: '3'
};

const exitLockToNumberCode = {
    'open': 0,
    'closed': 1,
    'locked': 2 //also implies closed
};

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

    let exits = '';
    if (room.exit) {
        exits = `D0
~
~
0 0 1010
D1
~
~
0 0 1011
`;
    }

    return `#${vnum(room.id)}
${room.name}~
${room.description}
~
0 0 0
${exits}S`;

}

const hasExit = (room, direction) => {
    return !!room && !!room.exit && !!room.exit[direction] && !!room.exit[direction].destination;
};

module.exports = {
    exportExit,
    exportToAreaFormat,
    hasExit
};