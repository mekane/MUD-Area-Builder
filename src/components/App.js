const React = require('react');
const AreaInfoForm = require('./forms/AreaInfoForm.js');
const RoomList = require('./rooms/RoomList.js');
const RoomMap = require('./rooms/RoomMap.js');
const RoomForm = require('./forms/RoomForm.js');

class AppComponent extends React.Component {
    constructor(props) {
        super(props);

        this.activeRoomChanged = this.activeRoomChanged.bind(this);

        this.state = {
            activeRoom: null
        };
    }

    activeRoomChanged(newRoomId) {
        const newActiveRoom = this.props.state.rooms.byId[newRoomId] || null;
        this.setState({
            activeRoom: newActiveRoom
        });
    }

    render() {
        const areaInfo = this.props.state.areaInfo;
        const rooms = this.props.state.rooms;

        console.log('App render props, state', this.props, this.state);

        return <div className="app">
            <div className="app__sidebar">
                <h2>Area Info</h2>
                <AreaInfoForm areaInfo={areaInfo}></AreaInfoForm>
                <h2>Rooms</h2>
                <RoomList areaInfo={areaInfo} roomsData={rooms} setActiveRoom={this.activeRoomChanged}></RoomList>
            </div>
            <div className="app__editor">
                <h2>Map</h2>
                <RoomMap areaInfo={areaInfo} roomsData={rooms} setActiveRoom={this.activeRoomChanged}></RoomMap>
                <RoomForm room={this.state.activeRoom}></RoomForm>
            </div>
        </div>
    }
}

module.exports = AppComponent;