const React = require('react'); //because the JSX transpiles to React.createElement(...) we need this here implicitly
const vnumLogic = require('../../logic/vnums.js');

const RoomMap = ({areaInfo, roomsData}) => {
    const vnum = vnumLogic.generator(areaInfo.minVnum);

    const Room = (room) => (
        <div key={room.id} className="room-map__room">
            <div className="room-map__room-name">#{ vnum(room.id) } { room.name }</div>
        </div>
    );

    const room = roomsData.byId;

    const allRooms = Object.keys(roomsData.byId).map(roomId => roomsData.byId[roomId]);


    return (
        <div className="room-map">
            { allRooms.map(Room) }
        </div>
    );
};

module.exports = RoomMap;