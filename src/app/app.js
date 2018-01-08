const React = require('react');
const ReactDOM = require('react-dom');
const Redux = require('redux');

const actions = require('../actions.js');
const reducer = require('../reducers/appHistory.js');

const App = require('../components/App.js');

const store = Redux.createStore(reducer);

/**
 * This script is browserified, but it is the entry point for the browser to run the application
 */
const appElement = document.getElementById('app');

function handleAppAction() {
    const newState = store.getState();
    render(newState);
}

function render(globalAppState) {
    const canUndo = globalAppState.past.length;
    const canRedo = globalAppState.future.length;
    const appState = globalAppState.present;
    console.log('render app state', appState);
    ReactDOM.render(<App state={appState} canUndo={canUndo} canRedo={canRedo}></App>, appElement);
}

store.subscribe(handleAppAction);

/* === LOAD TEST DATA === */
const testDataActions = require('../../exampleData/fourRoomsInASquare.json');
testDataActions.forEach(addRoom => store.dispatch(addRoom));
/* ---------------------- */

//these will be available in the browser via a global variable called 'app'. See the browserify config in Gruntfile.js
const app = {
    actions,
    store
};
module.exports = app;
