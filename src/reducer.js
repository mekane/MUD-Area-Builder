'use strict';
const defaultState = () => {
    return {
        areaInfo: {},
        roomsById: {},
        lastRoomId: 0
    };
};

const testApp = (currentState = defaultState(), action = {type: null}) => {

    switch (action.type) {
        case 'ADD_ROOM':
            const newId = nextRoomId();
            return Object.assign({}, defaultState, currentState, {
                roomsById: Object.assign({}, currentState.roomsById, {
                    [newId]: {
                        id: newId,
                        name: action.roomInfo ? action.roomInfo['name'] : ''
                    }
                }),
                lastRoomId: newId
            });
        default:
            return currentState;
    }

    function nextRoomId() {
        return (currentState.lastRoomId || 0) + 1;
    }
};

module.exports = testApp;