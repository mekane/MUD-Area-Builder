const React = require('react'); //because the JSX transpiles to React.createElement(...) we need this here implicitly

const Room = (room) => (
    <div key={room.id} className="room-list__room">
        <div className="room-list__room-name">{ room.name }</div>
    </div>
);

const RoomList = ({roomsData}) => (
    <ul className="room-list">
        { Object.keys(roomsData.byId).map(roomId => Room(roomsData.byId[roomId])) }
    </ul>
);

module.exports = RoomList;