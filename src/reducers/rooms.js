const freeze = require('deep-freeze');

const defaultState = () => ({
    byId: {},
    lastId: 0
});

const defaultRoom = () => ({
    name: '',
    description: '',
    exit: {}
});

const deepCopy = (object) => JSON.parse(JSON.stringify(object));

function addExit(room, direction, destination) {
    if (!room || !direction)
        return room;

    const updatedRoom = deepCopy(room);

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

    freeze(state);

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
            const roomId = action.roomInfo.id;
            if ( typeof roomId === 'undefined' || roomId == null )
                return state;
            
            const existingRoom = state.byId[roomId];
            
            if ( !existingRoom )
                return state;
            
            const updatedRoom = Object.assign({}, defaultRoom(), existingRoom, action.roomInfo);
            return {
                byId: Object.assign({}, state.byId, {
                    [roomId]: updatedRoom
                }),
                lastId: state.lastId
            };
            break;
        case 'DELETE_ROOM':
            const roomIdToDelete = action.roomId;

            if ( typeof roomIdToDelete !== 'undefined' && roomIdToDelete in state.byId ) {
                const newState = deepCopy(state);
                delete newState.byId[action.roomId];
                return newState;
            }
            return state;
            break;
        default:
            return state;
    }

    function nextRoomId() {
        return (state.lastId || 0) + 1;
    }
};

module.exports = roomsStateReducer;