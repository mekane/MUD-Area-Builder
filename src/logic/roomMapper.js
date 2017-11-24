const generateCoordinates = (mapOfRoomsById) => {
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

    if (typeof(mapOfRoomsById) !== 'object') {
        return {};
    }

    const visited = {};

    const newRooms = Object.assign({}, mapOfRoomsById);
    const allRoomIds = Object.keys(newRooms);
    if (allRoomIds.length === 0)
        return newRooms;

    visit(mapOfRoomsById[allRoomIds[0]], {x: 0, y: 0});

    return newRooms;
};

module.exports = {
    generateCoordinates
};