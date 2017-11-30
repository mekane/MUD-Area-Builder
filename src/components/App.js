const React = require('react'); //because the JSX transpiles to React.createElement(...) we need this here implicitly
const AreaInfoForm = require('./forms/AreaInfoForm.js');
const RoomList = require('./rooms/RoomList.js');
const RoomMap = require('./rooms/RoomMap.js');
const RoomForm = require('./forms/RoomForm.js');

const App = ({state}) => (
    <div className="app">
        <div className="app__sidebar">
            <h2>Area Info</h2>
            <AreaInfoForm areaInfo={state.areaInfo}></AreaInfoForm>
            <h2>Rooms</h2>
            <RoomList areaInfo={state.areaInfo} roomsData={state.rooms}></RoomList>
        </div>
        <div className="app__editor">
            <h2>Map</h2>
            <RoomMap areaInfo={state.areaInfo} roomsData={state.rooms}></RoomMap>
            <RoomForm room={state.rooms[0]}></RoomForm>
        </div>
    </div>
);

module.exports = App;