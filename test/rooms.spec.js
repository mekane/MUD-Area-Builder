const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');

const actions = require('../src/actions.js');
const getNextState = require('../src/reducers/rooms.js');

const defaultState = deepFreeze({
    byId: {},
    lastId: 0
});

describe('Room State - the reducer that handles the "rooms" property of the main app state', () => {
    describe('adding rooms', () => {
        it('should return the default state if called empty', () => {
            expect(getNextState()).to.deep.equal(defaultState);
        });

        it('should return the identical original state if called with a bogus action type', () => {
            const originalState = {};
            const expectedState = originalState;
            const actualState = getNextState(originalState, {type: 'BOGUS'});

            expect(actualState).to.equal(expectedState);
        });

        it('should add a totally default room if the room info is missing', () => {
            const emptyAddRoomAction = {
                type: 'ADD_ROOM'
            };

            const expectedState = {
                byId: {
                    1: {
                        id: 1,
                        name: '',
                        description: '',
                        exit: {}
                    }
                },
                lastId: 1
            };

            const actualState = getNextState(defaultState, emptyAddRoomAction);

            expect(actualState).to.deep.equal(expectedState);
        });

        it('should add rooms to the list by ID if called with the ADD_ROOM action type', () => {
            const expectedState = {
                byId: {
                    1: {id: 1, name: 'test', description: '', exit: {}}
                },
                lastId: 1
            };

            const addRoomAction = actions.addRoom({
                name: 'test'
            });

            const actualState = getNextState(defaultState, addRoomAction);

            expect(actualState).to.deep.equal(expectedState);
        });

        it('should continue to add more rooms to the list with subsequent actions', () => {
            const expectedState = {
                byId: {
                    1: {id: 1, name: 'test', description: '', exit: {}},
                    2: {id: 2, name: 'test', description: '', exit: {}},
                    3: {id: 3, name: 'test', description: '', exit: {}}
                },
                lastId: 3
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

        it('should add known room properties when provided', () => {
            const expectedRoom = {
                id: 1,
                name: 'test name',
                description: 'test desc',
                exit: {
                    n: {
                        destination: 2
                    },
                    e: {
                        destination: 3
                    }
                }
            };

            const addRoomAction = actions.addRoom({
                name: 'test name',
                description: 'test desc',
                exit: {
                    n: {
                        destination: 2
                    },
                    e: {
                        destination: 3

                    }
                }
            });

            const actualState = getNextState(defaultState, addRoomAction);
            const actualRoom = actualState.byId[1];

            expect(actualRoom).to.deep.equal(expectedRoom);
        });
    });

    describe('adding and connecting rooms', () => {
        it('should return the identical original state if called with missing data', () => {
            const badActionMissingDirection = actions.addAndConnectRoom(1);
            const badActionMissingSource = actions.addAndConnectRoom();

            const originalState = {};

            expect(getNextState(originalState, badActionMissingDirection)).to.equal(originalState);
            expect(getNextState(originalState, badActionMissingSource)).to.equal(originalState);
        });

        it('should add the new room and add an exit in the appropriate direction from the source room', () => {
            const originalState = {
                byId: {
                    1: {id: 1, name: 'one room', description: '', exit: {}}
                },
                lastId: 1
            };

            const expectedState = {
                byId: {
                    1: {id: 1, name: 'one room', description: '', exit: {e: {destination: 2}}},
                    2: {id: 2, name: 'New Room', description: '', exit: {w: {destination: 1}}}
                },
                lastId: 2
            };

            const addAndConnectRoomAction = actions.addAndConnectRoom(1, 'e', {name: 'New Room'});

            const actualState = getNextState(originalState, addAndConnectRoomAction);

            expect(actualState).to.deep.equal(expectedState);
        });
    });

    describe('updating rooms', () => {
        it('should return the original state, unmodified, if the room id is missing', () => {
            const originalState = {
                byId: {
                    1: {id: 1, name: 'test', description: '', exit: {}}
                },
                lastId: 1
            };

            const updateRoomActionNoId = actions.setRoomInfo({
                name: 'no id',
                description: 'new description'
            });

            const updateRoomActionIdNotFound = actions.setRoomInfo({
                id: 99,
                name: 'no room with this id',
                description: 'new description'
            });

            expect(getNextState(originalState, updateRoomActionNoId)).to.equal(originalState);
            expect(getNextState(originalState, updateRoomActionIdNotFound)).to.equal(originalState);
        });

        it('should update existing rooms based on the id passed in the roomInfo', () => {
            const originalState = {
                byId: {
                    1: {id: 1, name: 'test', description: '', exit: {}}
                },
                lastId: 1
            };

            const expectedState = {
                byId: {
                    1: {id: 1, name: 'new name', description: 'new description', exit: {}}
                },
                lastId: 1
            };

            const updateRoomAction = actions.setRoomInfo({
                id: 1,
                name: 'new name',
                description: 'new description'
            });

            const actualState = getNextState(originalState, updateRoomAction);

            expect(actualState).to.deep.equal(expectedState);
        });

        it('makes a new room, not touching the old one', () => {
            const originalState = {
                byId: {
                    1: {id: 1, name: 'test', description: '', exit: {}}
                },
                lastId: 1
            };

            const updateRoomAction = actions.setRoomInfo({
                id: 1,
                name: 'new name',
                description: 'new description'
            });

            deepFreeze(originalState);

            const nextState = getNextState(originalState, updateRoomAction);
            const updatedRoom = nextState.byId['1'];

            expect(updatedRoom).to.not.equal(originalState.byId['1']);
        });
    });

    describe('deleting rooms', () => {
        it('should remove the specified room from the list by ID', () => {
            const initialState = {
                byId: {
                    1: {id: 1, name: 'test1', description: '', exit: {}},
                    2: {id: 2, name: 'test2', description: '', exit: {}}
                },
                lastId: 2
            };

            const deleteRoomAction = actions.deleteRoom(initialState.byId[1]);

            const expectedState = {
                byId: {
                    2: {id: 2, name: 'test2', description: '', exit: {}}
                },
                lastId: 2
            };

            const actualState = getNextState(initialState, deleteRoomAction);

            expect(actualState).to.deep.equal(expectedState);
        });
    });


    describe('tracking room IDs', () => {
        it('should keep track of the last ID that was used', () => {
            expect(defaultState.lastId).to.equal(0);
        });

        it('should increment the IDs of subsequent rooms that are added', () => {
            const expectedState = {
                byId: {
                    1: {id: 1, name: 'test', description: '', exit: {}},
                    2: {id: 2, name: 'test', description: '', exit: {}}
                },
                lastId: 2
            };

            const addRoomAction = actions.addRoom({
                name: 'test'
            });

            const nextState = getNextState(defaultState, addRoomAction);
            const actualState = getNextState(nextState, addRoomAction);

            expect(actualState).to.deep.equal(expectedState);
        });

        it('should be able to continue from a known last ID, regardless of what rooms are in the list', () => {
            const originalState = Object.assign({}, defaultState);
            originalState.lastId = 3;

            const expectedState = {
                byId: {
                    4: {id: 4, name: 'test', description: '', exit: {}},
                    5: {id: 5, name: 'test', description: '', exit: {}}
                },
                lastId: 5
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