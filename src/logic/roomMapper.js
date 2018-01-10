const generateCoordinates = (originalMapOfRoomsById) => {
    if (typeof(originalMapOfRoomsById) !== 'object') {
        return {};
    }

    const mapOfRoomsById = deepCopyMapOfRooms(originalMapOfRoomsById);

    const visited = {};

    const visit = (room, currentCoordinates) => {
        if (typeof(room) !== 'object' || visited[room.id]) {
            return;
        }

        visited[room.id] = true;

        room['coordinates'] = currentCoordinates;

        if (room.exit && room.exit.n) {
            const roomToTheNorth = mapOfRoomsById[room.exit.n.destination];
            const newCoordinates = {x: currentCoordinates.x, y: currentCoordinates.y - 1};
            visit(roomToTheNorth, newCoordinates);
        }

        if (room.exit && room.exit.e) {
            const roomToTheEast = mapOfRoomsById[room.exit.e.destination];
            const newCoordinates = {x: currentCoordinates.x + 1, y: currentCoordinates.y};
            visit(roomToTheEast, newCoordinates);
        }

        if (room.exit && room.exit.s) {
            const roomToTheSouth = mapOfRoomsById[room.exit.s.destination];
            const newCoordinates = {x: currentCoordinates.x, y: currentCoordinates.y + 1};
            visit(roomToTheSouth, newCoordinates);
        }

        if (room.exit && room.exit.w) {
            const roomToTheWest = mapOfRoomsById[room.exit.w.destination];
            const newCoordinates = {x: currentCoordinates.x - 1, y: currentCoordinates.y};
            visit(roomToTheWest, newCoordinates);
        }
    };

    const allRoomIds = Object.keys(mapOfRoomsById);
    if (allRoomIds.length === 0)
        return mapOfRoomsById;

    visit(mapOfRoomsById[allRoomIds[0]], {x: 0, y: 0});

    return mapOfRoomsById;
};

function deepCopyMapOfRooms(originalMapOfRoomsById) {
    const newRooms = Object.assign({}, originalMapOfRoomsById);
    Object.keys(newRooms).forEach(roomId => newRooms[roomId] = Object.assign({}, originalMapOfRoomsById[roomId]));

    return newRooms;
}

module.exports = {
    generateCoordinates
};