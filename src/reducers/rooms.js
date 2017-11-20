const defaultState = () => {
    return {
        byId: {},
        lastId: 0
    };
};

const roomsStateReducer = (state = defaultState(), action = {type: null}) => {
    switch (action.type) {
        case 'ADD_ROOM':
            const newId = nextRoomId();
            return Object.assign({}, defaultState, state, {
                roomsById: Object.assign({}, state.roomsById, {
                    [newId]: {
                        id: newId,
                        name: action.roomInfo ? action.roomInfo['name'] : ''
                    }
                }),
                lastRoomId: newId
            });
        default:
            return state;
    }

    function nextRoomId() {
        return (state.lastRoomId || 0) + 1;
    }
};

module.exports = roomsStateReducer;