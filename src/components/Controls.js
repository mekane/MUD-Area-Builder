const React = require('react'); //because the JSX transpiles to React.createElement(...) we need this here implicitly

const Controls = () => {
    let addItemInput = null;

    function getNewItemText() {
        return addItemInput.value;
    }

    function resetNewItemTextInput() {
        addItemInput.value = '';
    }

    function addItem() {
        app.store.dispatch(app.actions.addItem(getNewItemText()));
        resetNewItemTextInput();
    }

    return (
        <div className="controls">
            <input className="controls__addItem" type="text" ref={(input) => addItemInput = input}/>
            <button className="controls__addItemButton" onClick={addItem}>Add Item</button>
        </div>
    );
};

module.exports = Controls;