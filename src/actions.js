function setAreaInfo(areaInfo) {
    return {
        type: 'SET_AREA_INFO',
        areaInfo: areaInfo
    }
}

function addRoom(newRoomInfo = {}) {
    return {
        type: 'ADD_ROOM',
        roomInfo: newRoomInfo
    }
}

function addAndConnectRoom(sourceRoomId, direction, roomInfo = {}) {
    return {
        type: 'ADD_AND_CONNECT_ROOM',
        sourceRoomId,
        direction,
        roomInfo
    }
}

function setRoomInfo(updatedRoomInfo) {
    return {
        type: 'SET_ROOM',
        roomInfo: updatedRoomInfo
    }
}

function deleteRoom(roomInfo = {}) {
    return {
        type: 'DELETE_ROOM',
        roomId: roomInfo.id
    }
}

function undo() {
    return {
        type: 'UNDO'
    };
}

function redo() {
    return {
        type: 'REDO'
    };
}

module.exports = {
    setAreaInfo,
    addRoom,
    addAndConnectRoom,
    setRoomInfo,
    deleteRoom,
    undo,
    redo
};