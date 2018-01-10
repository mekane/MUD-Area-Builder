const React = require('react'); //because the JSX transpiles to React.createElement(...) we need this here implicitly
const vnumLogic = require('../../logic/vnums.js');

const RoomList = ({areaInfo, roomsData, setActiveRoom}) => {
    const vnum = vnumLogic.generator(areaInfo.minVnum);

    function clickHandler(roomId) {
        return function(e) {
            setActiveRoom(roomId);
        };
    }

    const Room = (room) => (
        <li key={room.id} className="room-list__room" onClick={clickHandler(room.id)}>
            <div className="room-list__room-name">#{ vnum(room.id) } { room.name }</div>
        </li>
    );

    return (<ul className="room-list">
        { Object.keys(roomsData.byId).map(roomId => Room(roomsData.byId[roomId])) }
    </ul>);
};

module.exports = RoomList;