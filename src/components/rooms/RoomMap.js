const React = require('react'); //because the JSX transpiles to React.createElement(...) we need this here implicitly
const vnumLogic = require('../../logic/vnums.js');
const mapper = require('../../logic/roomMapper.js');

const RoomMap = ({areaInfo, roomsData}) => {
    const vnum = vnumLogic.generator(areaInfo.minVnum);

    const Room = (room) => (
        <div key={room.id} className="room-map__room">
            <div className="room-map__room-name">#{ vnum(room.id) } { room.name }</div>
            <div className="room-map__room-coordinates">{ room.coordinates.x }, { room.coordinates.y }</div>
        </div>
    );

    const roomsMapped = mapper.generateCoordinates(roomsData.byId);
console.log('map', roomsMapped);
    const allRooms = Object.keys(roomsMapped).map(roomId => roomsMapped[roomId]);

    return (
        <div className="room-map">
            { allRooms.map(Room) }
        </div>
    );
};

module.exports = RoomMap;