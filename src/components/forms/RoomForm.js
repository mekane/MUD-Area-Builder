const React = require('react');
const roomLogic = require('../../logic/rooms.js');

class RoomForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = RoomForm.generateComponentState(props.room);

        this.handleRoomInputChange = this.handleRoomInputChange.bind(this);
        this.handleExitInputChange = this.handleExitInputChange.bind(this);
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

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.room && nextProps.room !== this.state.room) {
            this.setState(RoomForm.generateComponentState(nextProps.room));
        }
    }

    updateInfo(that) {
        return function (e) {
            let room = that.state.room;

            if (room.id)
                app.store.dispatch(app.actions.setRoomInfo(room));
            else
                app.store.dispatch(app.actions.addRoom(room));
        }
    }

    handleRoomInputChange(event) {
        const target = event.target;
        //const value = target.type === 'checkbox' ? target.checked : target.value;
        const value = target.value;
        const name = target.name;

        const newRoomState = Object.assign({}, this.state.room, {[name]: value});

        this.setState({room: newRoomState});
    }

    handleExitInputChange(event) {
        const target = event.target;
        const value = target.checked;
        const name = target.name;

        const newHasExitState = Object.assign({}, this.state.hasExit, {[name]: value});

        this.setState({hasExit: newHasExitState});
    }

    render() {
        return <form className="room-form">
            <span>Room {this.state.room.id}</span>
            <label className="room-form__label">
                Room Name:
                <input className="room-form__room-name" type="text" name="name" value={this.state.room.name}
                       onChange={this.handleRoomInputChange}/>
            </label>

            <label className="room-form__label">
                Description:
                <input className="room-form__room-description" type="text" name="description"
                       value={this.state.room.description}
                       onChange={this.handleRoomInputChange}/>
            </label>

            <header>Exits</header>
            <label className="room-form__checkbox-label">
                <input type="checkbox" checked={this.state.hasExit['n']} name="n"
                       onChange={this.handleExitInputChange}/>
                North
            </label>

            <label className="room-form__checkbox-label">
                <input type="checkbox" checked={this.state.hasExit['e']} name="e"
                       onChange={this.handleExitInputChange}/>
                East
            </label>

            <label className="room-form__checkbox-label">
                <input type="checkbox" checked={this.state.hasExit['s']} name="s"
                       onChange={this.handleExitInputChange}/>
                South
            </label>

            <label className="room-form__checkbox-label">
                <input type="checkbox" checked={this.state.hasExit['w']} name="w"
                       onChange={this.handleExitInputChange}/>
                West
            </label>

            <button type="button" className="room-form__update" onClick={this.updateInfo(this)}>Update</button>
        </form>
    }
}


module.exports = RoomForm;