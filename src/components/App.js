const React = require('react'); //because the JSX transpiles to React.createElement(...) we need this here implicitly
const AreaInfoForm = require('./forms/AreaInfoForm.js');
const RoomList = require('./rooms/RoomList.js');

const App = ({state}) => (
    <div className="app">
        <AreaInfoForm areaInfo={state.areaInfo}></AreaInfoForm>
        <div className="app-editor">
            <RoomList roomsData={state.rooms}></RoomList>
        </div>
    </div>
);

module.exports = App;