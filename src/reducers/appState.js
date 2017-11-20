'use strict';
const rooms = require('./rooms.js');

const defaultState = () => {
    return {
        areaInfo: {},
        roomsById: {},
        lastRoomId: 0
    };
};

const appStateReducer = (currentState = defaultState(), action = {type: null}) => {

    switch (action.type) {
        case 'ADD_ROOM':
            const newRoomsState = rooms(currentState, action);

            return Object.assign({}, defaultState, currentState, newRoomsState);
        default:
            return currentState;
    }
};

module.exports = appStateReducer;