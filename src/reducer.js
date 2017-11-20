'use strict';
const defaultState = () => {
    return {
        areaInfo: {},
        roomsById: {},
        lastRoomId: 0
    };
};

const testApp = (currentState = defaultState(), action) => {
    if (currentStateIsBogus() || actionIsBogus())
        return currentState;

    const newState = copyState(currentState);

    if (action.type === 'ADD_ROOM' && action.roomInfo) {
        const newId = lastItemId();
        newState.roomsById[newId] = {id: newId, name: action.roomInfo['name']};
        newState.lastRoomId = newId;
    }

    return newState;

    function currentStateIsBogus() {
        return hasBadType(currentState);
    }

    function actionIsBogus() {
        return hasBadType(action) || !action.type || !action.roomInfo;
    }

    function lastItemId() {
        return (currentState.lastRoomId || 0) + 1;
    }

    function copyState(oldState) {
        if (!oldState) {
            return defaultState();
        }

        const oldItems = oldState.items || [];

        return {
            areaInfo: Object.assign({}, oldState.areaInfo),
            roomsById: Object.assign({}, oldState.roomsById),
            lastRoomId: oldState.lastRoomId || 0
        }
    }
};

function hasBadType(argumentThatShouldBeAnObject) {
    return isNotObject(argumentThatShouldBeAnObject);
}

function isNotObject(testObject) {
    return (typeof testObject !== 'object');
}

module.exports = testApp;