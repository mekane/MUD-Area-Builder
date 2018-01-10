'use strict';
const areaInfo = require('./areaInfo.js');
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
        case 'SET_AREA_INFO':
            const newAreaInfo = areaInfo(currentState.areaInfo, action);
            return Object.assign(defaultState(), currentState, {areaInfo: newAreaInfo});
            break;
        case 'ADD_ROOM':
        case 'ADD_AND_CONNECT_ROOM':
        case 'SET_ROOM':
        case 'DELETE_ROOM':
            const newRoomsState = rooms(currentState.rooms, action);
            return Object.assign(defaultState(), currentState, {rooms: newRoomsState});
            break;
        default:
            return currentState;
    }
};

module.exports = appStateReducer;