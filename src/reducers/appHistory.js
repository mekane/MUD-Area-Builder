'use strict';

const getNextAppState = require('./appState.js');

const defaultState = () => {
    return {
        past: [],
        present: getNextAppState(),
        future: []
    };
};

const appHistoryReducer = (currentState = defaultState(), action = {type: null}) => {
    if ( typeof action === 'undefined' || !action || action.type == null ) {
        return currentState;
    }

    if ( action.type === 'UNDO' ) {
        const newPast = currentState.past.slice();
        const newPresent = newPast.pop();
        const newFuture = [currentState.present].concat(currentState.future);

        return {
            past: newPast,
            present: newPresent,
            future: newFuture
        };
    }

    return {
        past: [currentState.present].concat(currentState.past),
        present: getNextAppState(currentState.present, action),
        future: []
    };
};

module.exports = appHistoryReducer;