const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');

const actions = require('../src/actions.js');
const getNextState = require('../src/reducers/appState.js');

const defaultState = {
    areaInfo: {},
    rooms: {
        byId: {},
        lastId: 0
    }
};
deepFreeze(defaultState);

describe('The Test App root reducer', () => {
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
            returnThisInstance: true
        };
        const actualState = getNextState(originalState);

        expect(actualState).to.equal(originalState);
    });
});

describe('integrating area info', () => {
    it('sets area info properties from the action information', () => {
        const originalState = defaultState;
        const expectedState = {
            areaInfo: {
                name: 'Test Area',
                fileName: 'test.are',
                minLevel: 6,
                maxLevel: 36,
                authorName: 'Marty',
                minVnum: 1000,
                maxVnum: 1099
            },
            rooms: {
                byId: {},
                lastId: 0
            }
        };

        const setAreaInfoAction = actions.setAreaInfo({
            name: 'Test Area',
            fileName: 'test.are',
            minLevel: 6,
            maxLevel: 36,
            authorName: 'Marty',
            minVnum: 1000,
            maxVnum: 1099
        });

        const actualState = getNextState(originalState, setAreaInfoAction);

        expect(actualState).to.deep.equal(expectedState);
    });
});


/* These are duplicates of tests that are in the rooms state test, but are here for integration into the main state */
describe('integrating room state', () => {
    it('should add rooms to the list by ID if called with the ADD_ROOM action type', () => {
        const expectedState = {
            areaInfo: {},
            rooms: {
                byId: {
                    1: {
                        id: 1,
                        name: 'test',
                        description: '',
                        exit: {}
                    }
                },
                lastId: 1
            }
        };

        const addRoomAction = actions.addRoom({
            name: 'test'
        });

        const actualState = getNextState(defaultState, addRoomAction);

        expect(actualState).to.deep.equal(expectedState);
    });

    it('should continue to add more rooms to the list with subsequent actions', () => {
        const expectedState = {
            areaInfo: {},
            rooms: {
                byId: {
                    1: {id: 1, name: 'test', description: '', exit: {}},
                    2: {id: 2, name: 'test', description: '', exit: {}},
                    3: {id: 3, name: 'test', description: '', exit: {}}
                },
                lastId: 3
            }
        };

        const addRoomAction = actions.addRoom({
            name: 'test'
        });

        const firstState = getNextState(defaultState, addRoomAction);
        const secondState = getNextState(firstState, addRoomAction);
        const actualState = getNextState(secondState, addRoomAction);

        expect(actualState).to.deep.equal(expectedState);
    });

    it('should keep track of the last ID that was used', () => {
        expect(defaultState.rooms.lastId).to.equal(0);
    });

    it('should increment the IDs of subsequent rooms that are added', () => {
        const expectedState = {
            areaInfo: {},
            rooms: {
                byId: {
                    1: {id: 1, name: 'test', description: '', exit: {}},
                    2: {id: 2, name: 'test', description: '', exit: {}}
                },
                lastId: 2
            }
        };

        const addRoomAction = actions.addRoom({
            name: 'test'
        });

        const nextState = getNextState(defaultState, addRoomAction);
        const actualState = getNextState(nextState, addRoomAction);

        expect(actualState).to.deep.equal(expectedState);
    });
});


//TODO: one big integration test with multiple actions, checking the state between each. Deep-Freeze liberally
