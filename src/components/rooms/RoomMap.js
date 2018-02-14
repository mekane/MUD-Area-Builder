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

//TODO: put in its own node module file, require here and in RoomForm
const sectors = {
    0: 'Inside',
    1: 'City',
    2: 'Field',
    3: 'Forest',
    4: 'Hills',
    5: 'Mountain',
    6: 'Water',
    7: 'Deep',
    9: 'Air',
    10: 'Desert'
};

function nameOfSector(sectorNumber) {
    return sectorNumber in sectors ? sectors[sectorNumber] : sectors[0];
}

function findMinimumCoordinates(minimumCoordinates, nextRoom) {
    return {
        x: nextRoom.coordinates.x < minimumCoordinates.x ? nextRoom.coordinates.x : minimumCoordinates.x,
        y: nextRoom.coordinates.y < minimumCoordinates.y ? nextRoom.coordinates.y : minimumCoordinates.y
    };
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
        const xValue = room.coordinates.x + coordinateAdjustment.x;
        const yValue = room.coordinates.y + coordinateAdjustment.y;

        const x = cssValueForCoordinate(xValue);
        const y = cssValueForCoordinate(yValue);

        const style = {
            transform: `translate(${x}px, ${y}px)`
        };

        function clickHandler(roomId) {
            return function (e) {
                setActiveRoom(roomId);
            };
        }

        const roomClass = `room-map__room room-map__room--${nameOfSector(room.sector)}`;

        return (
            <div key={room.id} className={roomClass} style={style} onClick={clickHandler(room.id)}>
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
    const minimumCoordinates = allRooms.reduce(findMinimumCoordinates, {x: 0, y: 0});
    const coordinateAdjustment = {
        x: Math.abs(minimumCoordinates.x),
        y: Math.abs(minimumCoordinates.y)
    };

    return (
        <div className="room-map">
            { allRooms.map(Room) }
        </div>
    );
};

module.exports = RoomMapComponent;