const React = require('react'); //because the JSX transpiles to React.createElement(...) we need this here implicitly
const vnumLogic = require('../../logic/vnums.js');
const mapper = require('../../logic/roomMapper.js');

const roomSize = 80;
const gapBetweenRoom = 40;

const cssValueForCoordinate = (val) => val * (roomSize + gapBetweenRoom);

const RoomMap = ({areaInfo, roomsData}) => {
    const vnum = vnumLogic.generator(areaInfo.minVnum);

    const Room = (room) => {
        const x = cssValueForCoordinate(room.coordinates.x);
        const y = cssValueForCoordinate(room.coordinates.y);

        const style = {
            transform: `translate(${x}px, ${y}px)`
        };

        return (
            <div key={room.id} className="room-map__room" style={style}>
                <div className="room-map__room-name">#{ vnum(room.id) } { room.name }</div>
                <div className="room-map__room-coordinates">{ room.coordinates.x }, { room.coordinates.y }</div>
            </div>
        );
    };

    const roomsMapped = mapper.generateCoordinates(roomsData.byId);

    const allRooms = Object.keys(roomsMapped).map(roomId => roomsMapped[roomId]);

    return (
        <div className="room-map">
            { allRooms.map(Room) }
        </div>
    );
};

module.exports = RoomMap;