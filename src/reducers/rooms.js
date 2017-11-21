const defaultState = () => {
    return {
        byId: {},
        lastId: 0
    };
};

const roomsStateReducer = (state = defaultState(), action = {type: null}) => {
    switch (action.type) {
        case 'ADD_ROOM':
        case 'SET_ROOM':
            const newId = nextRoomId();
            return {
                byId: Object.assign({}, state.byId, {
                    [newId]: {
                        id: newId,
                        name: action.roomInfo ? action.roomInfo['name'] : ''
                    }
                }),
                lastId: newId
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