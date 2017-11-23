const React = require('react'); //because the JSX transpiles to React.createElement(...) we need this here implicitly
const vnumLogic = require('../../logic/vnums.js');

const RoomList = ({areaInfo, roomsData}) => {
    const vnum = vnumLogic.generator(areaInfo.minVnum);

    const Room = (room) => (
        <div key={room.id} className="room-list__room">
            <div className="room-list__room-name">#{ vnum(room.id) } { room.name }</div>
        </div>
    );

    return (<ul className="room-list">
        { Object.keys(roomsData.byId).map(roomId => Room(roomsData.byId[roomId])) }
    </ul>);
};

module.exports = RoomList;