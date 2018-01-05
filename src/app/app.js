const React = require('react');
const ReactDOM = require('react-dom');
const Redux = require('redux');

const actions = require('../actions.js');
const reducer = require('../reducers/appState.js');

const App = require('../components/App.js');

const store = Redux.createStore(reducer);
const appStateHistory = {
    past: [],
    current: null,
    future: []
};

/**
 * This script is browserified, but it is the entry point for the browser to run the application
 */
const appElement = document.getElementById('app');

function handleAppAction() {
    const newState = store.getState();
    appStateHistory.push(newState);
    render(newState);
}

function render(nextState) {
    ReactDOM.render(<App state={nextState}></App>, appElement);
    console.log('rendered state', nextState);
}

store.subscribe(handleAppAction);

/* === LOAD TEST DATA === */
const testDataActions = require('../../exampleData/fourRoomsInASquare.json');
testDataActions.forEach(addRoom => store.dispatch(addRoom));
/* ---------------------- */

render();

//these will be available in the browser via a global variable called 'app'. See the browserify config in Gruntfile.js
const app = {
    actions,
    store
};
module.exports = app;
