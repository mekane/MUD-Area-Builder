const defaultState = () => {
    return {
        byId: {},
        lastId: 0
    };
};

const defaultRoom = {
    name: '',
    description: '',
    exit: {}
};

const roomsStateReducer = (state = defaultState(), action = {type: null}) => {
    switch (action.type) {
        case 'ADD_ROOM':
            const newId = nextRoomId();
            const newRoom = Object.assign({}, defaultRoom, {id: newId}, action.roomInfo);
            return {
                byId: Object.assign({}, state.byId, {
                    [newId]: newRoom
                }),
                lastId: newId
            };
            break;
        case 'SET_ROOM':
            const existingRoom = state.byId[action.roomInfo.id] || {};
            const updatedRoom = Object.assign({}, defaultRoom, existingRoom, action.roomInfo);
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