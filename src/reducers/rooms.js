const defaultState = () => ({
    byId: {},
    lastId: 0
});

const defaultRoom = () => ({
    name: '',
    description: '',
    exit: {}
});

function addExit(room, direction, destination) {
    if (!room || !direction)
        return room;

    const updatedRoom = Object.assign({}, {exit: {}}, room);

    updatedRoom.exit[direction] = {
        destination
    };
    return updatedRoom;
}

function oppositeDirection(direction) {
    if (direction === 'n')
        return 's';
    if (direction === 'e')
        return 'w';
    if (direction === 's')
        return 'n';
    if (direction === 'w')
        return 'e';
    return '';
}

const roomsStateReducer = (state = defaultState(), action = {type: null}) => {
    let newRoomId = 0;
    let newRoom = {};

    switch (action.type) {
        case 'ADD_ROOM':
            newRoomId = nextRoomId();
            newRoom = Object.assign({}, defaultRoom(), {id: newRoomId}, action.roomInfo);
            return {
                byId: Object.assign({}, state.byId, {
                    [newRoomId]: newRoom
                }),
                lastId: newRoomId
            };
            break;
        case 'ADD_AND_CONNECT_ROOM':
            if (!action.sourceRoomId || !action.direction)
                return state;
            newRoomId = nextRoomId();
            newRoom = Object.assign({}, defaultRoom(), {id: newRoomId}, action.roomInfo);
            newRoom = addExit(newRoom, oppositeDirection(action.direction), action.sourceRoomId);

            const newState = {
                byId: Object.assign({}, state.byId, {
                    [newRoomId]: newRoom
                }),
                lastId: newRoomId
            };

            let sourceRoom = newState.byId[action.sourceRoomId];
            let roomWithExit = addExit(sourceRoom, action.direction, newRoomId);
            newState.byId[action.sourceRoomId] = roomWithExit;

            return newState;
            break;
        case 'SET_ROOM':
            const existingRoom = state.byId[action.roomInfo.id] || {};
            const updatedRoom = Object.assign({}, defaultRoom(), existingRoom, action.roomInfo);
            return {
                byId: Object.assign({}, state.byId, {
                    [action.roomInfo.id]: updatedRoom
                }),
                lastId: state.lastId
            };
            break;
        default:
            return state;
    }

    function nextRoomId() {
        return (state.lastId || 0) + 1;
    }
};

module.exports = roomsStateReducer;