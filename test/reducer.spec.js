const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');
const getNextState = require('../src/reducer.js');

const actions = require('../src/actions.js');

describe('The Test App root reducer', () => {
    const defaultState = {
        areaInfo: {},
        roomsById: {},
        lastRoomId: 0
    };

    it('should be a function', () => {
        expect(getNextState).to.be.a('function');
    });

    it('should return the default state if called with none', () => {
        const expectedState = defaultState;
        const actualState = getNextState();

        expect(actualState).to.deep.equal(expectedState);
    });

    it('should return the identical original state if called with no action', () => {
        const originalState = {
            areaInfo: {}
        };
        const actualState = getNextState(originalState);

        expect(actualState).to.equal(originalState);
    });

    describe('adding rooms', () => {
        it('should return the identical original state if called with a bogus action', () => {
            const originalState = {};
            const expectedState = originalState;
            const actualState = getNextState(originalState, {bogus: true});

            expect(actualState).to.equal(expectedState);
        });

        it('should ignore the action if the room info is missing', () => {
            const bogusAddRoomAction = {
                type: 'ADD_ROOM'
            };

            const originalState = defaultState;

            const actualState = getNextState(originalState, bogusAddRoomAction);

            expect(actualState).to.equal(originalState);
        });

        it('should add rooms to the list by ID if called with the ADD_ROOM action type', () => {
            const expectedState = {
                areaInfo: {},
                roomsById: {
                    1: {id: 1, name: 'test'}
                },
                lastRoomId: 1
            };

            const addRoomAction = actions.addRoom({
                name: 'test'
            });

            const actualState = getNextState({}, addRoomAction);

            expect(actualState).to.deep.equal(expectedState);
        });

        it('should continue to add more rooms to the list with subsequent actions', () => {
            const expectedState = {
                areaInfo: {},
                roomsById: {
                    1: {id: 1, name: 'test'},
                    2: {id: 2, name: 'test'},
                    3: {id: 3, name: 'test'}
                },
                lastRoomId: 3
            };

            const addRoomAction = actions.addRoom({
                name: 'test'
            });

            const firstState = getNextState(defaultState, addRoomAction);
            const secondState = getNextState(firstState, addRoomAction);
            const actualState = getNextState(secondState, addRoomAction);

            expect(actualState).to.deep.equal(expectedState);
        });

        it('should never modify the previous state, only return new ones', () => {
            const originalState = {
                roomsById: ['do not modify']
            };

            const addRoomAction = actions.addRoom({
                name: 'test'
            });

            deepFreeze(originalState); //will throw an exception if anyone tries to mutate originalState

            getNextState(originalState, addRoomAction);
        });
    });

    describe('tracking room IDs', () => {
        it('should keep track of the last ID that was used', () => {
            expect(defaultState.lastRoomId).to.equal(0);
        });

        it('should increment the IDs of subsequent rooms that are added', () => {
            const expectedState = {
                areaInfo: {},
                roomsById: {
                    1: {id: 1, name: 'test'},
                    2: {id: 2, name: 'test'}
                },
                lastRoomId: 2
            };

            const addRoomAction = actions.addRoom({
                name: 'test'
            });

            const nextState = getNextState(defaultState, addRoomAction);
            const actualState = getNextState(nextState, addRoomAction);

            expect(actualState).to.deep.equal(expectedState);
        });

        it('should be able to continue from a known last ID, regardless of what rooms are in the list', () => {
            const originalState = {
                roomsById: {},
                lastRoomId: 3
            };

            const expectedState = {
                areaInfo: {},
                roomsById: {
                    4: {id: 4, name: 'test'},
                    5: {id: 5, name: 'test'}
                },
                lastRoomId: 5
            };

            const addRoomAction = actions.addRoom({
                name: 'test'
            });

            const nextState = getNextState(originalState, addRoomAction);
            const actualState = getNextState(nextState, addRoomAction);

            expect(actualState).to.deep.equal(expectedState);
        });
    });
});