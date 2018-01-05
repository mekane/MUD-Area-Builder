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
        if ( currentState.past.length < 1 )
            return currentState;

        const newPast = currentState.past.slice();
        const newPresent = newPast.pop();
        const newFuture = [currentState.present].concat(currentState.future);

        return {
            past: newPast,
            present: newPresent,
            future: newFuture
        };
    }

    if ( action.type === 'REDO' ) {
        if ( currentState.future.length < 1 )
            return currentState;

        const newPast = currentState.past.slice().concat(currentState.present);
        const newPresent = currentState.future[0];
        const newFuture = currentState.future.slice(1);

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