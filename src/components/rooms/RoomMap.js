const React = require('react'); //because the JSX transpiles to React.createElement(...) we need this here implicitly
const actions = require('../../actions.js');
const vnumLogic = require('../../logic/vnums.js');
const mapper = require('../../logic/roomMapper.js');

const roomSize = 80;
const gapBetweenRooms = 40;

const exits = ['n', 'e', 's', 'w'];

const cssValueForCoordinate = (val) => val * (roomSize + gapBetweenRooms);

function addRoom(action) {
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

const RoomMapComponent = ({areaInfo, roomsData, setActiveRoom}) => {
    const vnum = vnumLogic.generator(areaInfo.minVnum);

    const Room = (room) => {
        const x = cssValueForCoordinate(room.coordinates.x);
        const y = cssValueForCoordinate(room.coordinates.y);

        const style = {
            transform: `translate(${x}px, ${y}px)`
        };

        function clickHandler(roomId) {
            return function(e) {
                setActiveRoom(roomId);
            };
        }

        return (
            <div key={room.id} className="room-map__room" style={style} onClick={clickHandler(room.id)}>
                <div className="room-map__room-name">#{ vnum(room.id) } { room.name }</div>
                <div className="room-map__room-coordinates">{ room.coordinates.x }, { room.coordinates.y }</div>
                <div className="room-map__room-exit">
                    { exits.map(e => Exit(room, e)) }
                </div>
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

module.exports = RoomMapComponent;