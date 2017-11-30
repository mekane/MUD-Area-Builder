const React = require('react'); //because the JSX transpiles to React.createElement(...) we need this here implicitly
const room = require('../../logic/rooms.js');

class RoomForm extends React.Component {

    constructor(props) {
        super(props);

        this.room = props.room || {};

        this.state = {
            hasExit: {
                n: room.hasExit(this.room, 'n'),
                e: room.hasExit(this.room, 'e'),
                s: room.hasExit(this.room, 's'),
                w: room.hasExit(this.room, 'w')
            }
        };
    }

    getRoom() {
        const newRoomData = {
            name: this.roomNameInput.value,
            description: this.roomDescriptionInput.value
        };

        if (typeof(room.id) !== 'undefined' && room.id != null) {
            newRoomData.id = room.id;
        }

        return newRoomData;
    }

    updateInfo(that) {
        return function(e) {
            const room = that.getRoom();
            if ( room.id )
                app.store.dispatch(app.actions.setRoomInfo(room));
            else
                app.store.dispatch(app.actions.addRoom(room));
        }
    }

    render() {
        return <form className="room-form">
            <label className="room-form__label">
                Room Name:
                <input className="room-form__room-name" type="text" ref={(input) => this.roomNameInput = input}
                       defaultValue={this.room.name}/>
            </label>

            <label className="room-form__label">
                Description:
                <input className="room-form__room-description" type="text"
                       ref={(input) => this.roomDescriptionInput = input} defaultValue={this.room.description}/>
            </label>

            <header>Exits</header>
            <label className="room-form__checkbox-label">
                <input type="checkbox" ref={(input) => this.hasNorthExitInput = input} defaultValue={this.state.hasExit['n']} />
                North
            </label>

            <button type="button" className="room-form__update" onClick={this.updateInfo(this)}>Update</button>
        </form>
    }
}


module.exports = RoomForm;