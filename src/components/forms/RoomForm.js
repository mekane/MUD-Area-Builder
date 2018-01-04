const React = require('react');
const roomLogic = require('../../logic/rooms.js');

class RoomForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = RoomForm.generateComponentState(props.room);

        this.handleRoomInputChange = this.handleRoomInputChange.bind(this);
        this.handleExitToggleChange = this.handleExitToggleChange.bind(this);
        this.handleExitRoomChange = this.handleExitRoomChange.bind(this);
    }

    static generateComponentState(room) {
        return {
            hasExit: {
                n: roomLogic.hasExit(room, 'n'),
                e: roomLogic.hasExit(room, 'e'),
                s: roomLogic.hasExit(room, 's'),
                w: roomLogic.hasExit(room, 'w')
            },
            room: Object.assign({}, room)
        };
    }

    roomDestination(direction) {
        const exit = this.state.room.exit[direction];
        return exit && exit.destination || 0;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.room && nextProps.room !== this.state.room) {
            this.setState(RoomForm.generateComponentState(nextProps.room));
        }
    }

    updateInfo(that) {
        return function (e) {
            let room = that.state.room;

            //todo: delete exits that are not checked

            if (room.id)
                app.store.dispatch(app.actions.setRoomInfo(room));
            else
                app.store.dispatch(app.actions.addRoom(room));
        }
    }

    handleRoomInputChange(event) {
        const target = event.target;
        //const value = target.type === 'checkbox' ? target.checked : target.value;
        const newInputValue = target.value;
        const roomProperty = target.name;

        const newRoomState = Object.assign({}, this.state.room, {[roomProperty]: newInputValue});

        this.setState({room: newRoomState});
    }

    handleExitToggleChange(event) {
        const target = event.target;
        const hasExitBoolean = target.checked;
        const exitDirection = target.name;

        const newHasExitState = Object.assign({}, this.state.hasExit, {[exitDirection]: hasExitBoolean});

        this.setState({hasExit: newHasExitState});
    }

    handleExitRoomChange(event) {
        const target = event.target;
        const destination = target.value;
        const direction = target.name;

        const exit = this.state.room.exit[direction];

        const newExits = Object.assign({}, this.state.room.exit, {[direction]: {destination}});
        const newRoomState = Object.assign({}, this.state.room, {exit: newExits});

        this.setState({room: newRoomState});
    }

    render() {
        if (!this.props.room)
            return null; //don't render the room form when there is no active room

        const visibleExitRoomFieldClass = 'room-form__room-input-label';
        const hiddenExitRoomFieldClass = 'room-form__room-input-label--hidden';

        return <form className="room-form">
            <span>Exiting Room {this.state.room.id}</span>
            <label className="room-form__label">
                Room Name:
                <input className="room-form__room-name" type="text" name="name" value={this.state.room.name}
                       onChange={this.handleRoomInputChange}/>
            </label>

            <label className="room-form__label">
                Description:
                <input className="room-form__room-description"
                       type="text" value={this.state.room.description} name="description" onChange={this.handleRoomInputChange}/>
            </label>

            <header>Exits</header>
            <label className="room-form__checkbox-label">
                <input type="checkbox" checked={this.state.hasExit['n']} name="n" onChange={this.handleExitToggleChange}/>
                North
            </label>

            <label className={this.state.hasExit['n'] ? visibleExitRoomFieldClass : hiddenExitRoomFieldClass}>
                North exit goes to room
                <input className="room-form__exit-destination-input" type="number" value={this.roomDestination('n')} name="n" onChange={this.handleExitRoomChange}/>
            </label>

            <label className="room-form__checkbox-label">
                <input type="checkbox" checked={this.state.hasExit['e']} name="e" onChange={this.handleExitToggleChange}/>
                East
            </label>

            <label className={this.state.hasExit['e'] ? visibleExitRoomFieldClass : hiddenExitRoomFieldClass}>
                East exit goes to room
                <input className="room-form__exit-destination-input" type="number" value={this.roomDestination('e')} name="e" onChange={this.handleExitRoomChange}/>
            </label>

            <label className="room-form__checkbox-label">
                <input type="checkbox" checked={this.state.hasExit['s']} name="s" onChange={this.handleExitToggleChange}/>
                South
            </label>

            <label className={this.state.hasExit['s'] ? visibleExitRoomFieldClass : hiddenExitRoomFieldClass}>
                South exit goes to room
                <input className="room-form__exit-destination-input" type="number" value={this.roomDestination('s')} name="s" onChange={this.handleExitRoomChange}/>
            </label>

            <label className="room-form__checkbox-label">
                <input type="checkbox" checked={this.state.hasExit['w']} name="w" onChange={this.handleExitToggleChange}/>
                West
            </label>

            <label className={this.state.hasExit['w'] ? visibleExitRoomFieldClass : hiddenExitRoomFieldClass}>
                West exit goes to room
                <input className="room-form__exit-destination-input" type="number" value={this.roomDestination('w')} name="w" onChange={this.handleExitRoomChange}/>
            </label>

            <button type="button" className="room-form__update" onClick={this.updateInfo(this)}>Update</button>
        </form>
    }
}


module.exports = RoomForm;