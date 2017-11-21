const React = require('react');
const ReactDOM = require('react-dom');
const Redux = require('redux');

const actions = require('../actions.js');
const reducer = require('../reducers/appState.js');

const App = require('../components/App.js');

const store = Redux.createStore(reducer);

/**
 * This script is browserified, but it is the entry point for the browser to run the application
 */
const appElement = document.getElementById('app');

function render() {
    ReactDOM.render(<App state={store.getState()}></App>, appElement);
    console.log('rendered state', store.getState());
}

store.subscribe(render);

render();

//these will be available in the browser via a global variable called 'app'. See the browserify config in Gruntfile.js
const app = {
    actions,
    store
};
module.exports = app;
