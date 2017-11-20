'use strict';
const rooms = require('./rooms.js');

const defaultState = () => {
    return {
        areaInfo: {},
        rooms: {
            byId: {},
            lastId: 0
        }
    };
};

const appStateReducer = (currentState = defaultState(), action = {type: null}) => {

    switch (action.type) {
        case 'ADD_ROOM':
            const newRoomsState = rooms(currentState.rooms, action);
            return Object.assign({}, defaultState(), currentState, {rooms: newRoomsState});
            break;
        default:
            return currentState;
    }
};

module.exports = appStateReducer;