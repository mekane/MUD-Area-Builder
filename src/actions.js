function setAreaInfo(areaInfo) {
    return {
        type: 'SET_AREA_INFO',
        areaInfo: areaInfo
    }
}

function addRoom(newRoomInfo) {
    return {
        type: 'ADD_ROOM',
        roomInfo: newRoomInfo
    }
}

function setRoomInfo(updatedRoomInfo) {
    return {
        type: 'SET_ROOM_INFO',
        roomInfo: updatedRoomInfo
    }
}

module.exports = {
    setAreaInfo,
    addRoom,
    setRoomInfo
};