const React = require('react'); //because the JSX transpiles to React.createElement(...) we need this here implicitly
const actions = require('../../actions.js');
const vnumLogic = require('../../logic/vnums.js');
const mapper = require('../../logic/roomMapper.js');

const roomSize = 80;
const gapBetweenRooms = 40;

const exits = ['n', 'e', 's', 'w'];

const cssValueForCoordinate = (val) => val * (roomSize + gapBetweenRooms);

function addRoom(action) {
    console.log('add and connect', action);
    app.store.dispatch(action);
}

const Exit = (room, direction) => {
    const exit = room.exit[direction];
    if (exit && exit.destination) {
        return <div key={direction} className={`room-map__room-exit--${direction}`}></div>;
    }
    else {
        const connectRoom = () => addRoom(actions.addAndConnectRoom(room.id, direction, {}));

        return <div key={direction} className={`room-map__room-exit-add--${direction}`} onClick={connectRoom}></div>;
    }
};

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
                <div className="room-map__room-exit">
                    { exits.map(e => Exit(room, e)) }
                </div>
            </div>
        );

        //TODO: add room action on click hover arrow
        //TODO: add "connect rooms" util function and auto-connect rooms when adding
        //TODO: edit room popup on room click
        //TODO: auto-show edit room for new room when clicking hover arrow
        //TODO: size the room-map to fit all the rooms, make its container scroll: auto
        //TODO: translate the whole room-map so negative indices are positive
        //TODO: draw prettier exit and "add" arrow
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