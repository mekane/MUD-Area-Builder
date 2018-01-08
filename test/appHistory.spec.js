const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');

const actions = require('../src/actions.js');
const getNextAppState = require('../src/reducers/appState.js');
const getNextHistoryState = require('../src/reducers/appHistory.js');

const defaultState = {
    past: [],
    present: getNextAppState(),
    future: []
};
deepFreeze(defaultState);

describe('The high level app history reducer', function () {
    it('should be a function', function () {
        expect(getNextHistoryState).to.be.a('function');
    });

    it('should return the default state if called with none', () => {
        const expectedState = defaultState;
        const actualState = getNextHistoryState();

        expect(actualState).to.deep.equal(expectedState);
    });

    it('passes regular actions on to the app state reducer and updates the present state', () => {
        const expectedPresentState = {
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

        const actualState = getNextHistoryState(defaultState, actions.addRoom({name: 'test'}));

        expect(actualState.present).to.deep.equal(expectedPresentState);
    });

    it('saves the previous present state in the past array when regular actions change the present state', () => {
        const expectedHistoryState = {
            past: [
                {
                    areaInfo: {},
                    rooms: {
                        byId: {},
                        lastId: 0
                    }
                }
            ],
            present: {
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
            },
            future: []
        };

        const actualState = getNextHistoryState(defaultState, actions.addRoom({name: 'test'}));

        expect(actualState).to.deep.equal(expectedHistoryState);
    });

    it('continues to append the previous present state to the end of the past array as more regular actions fire', () => {
        const expectedHistoryState = {
            past: [
                {
                    areaInfo: {},
                    rooms: {
                        byId: {},
                        lastId: 0
                    }
                },
                {
                    areaInfo: {},
                    rooms: {
                        byId: {
                            1: {
                                id: 1,
                                name: 'test1',
                                description: '',
                                exit: {}
                            }
                        },
                        lastId: 1
                    }
                }
            ],
            present: {
                areaInfo: {},
                rooms: {
                    byId: {
                        1: {
                            id: 1,
                            name: 'test1',
                            description: '',
                            exit: {}
                        },
                        2: {
                            id: 2,
                            name: 'test2',
                            description: '',
                            exit: {}
                        }
                    },
                    lastId: 2
                }
            },
            future: []
        };

        const nextState = getNextHistoryState(defaultState, actions.addRoom({name: 'test1'}));
        const actualState = getNextHistoryState(nextState, actions.addRoom({name: 'test2'}));

        expect(actualState).to.deep.equal(expectedHistoryState);
    });

    it('does not push a new present or undo state if the regular action did not create a new state', () => {
        const expectedState = defaultState;
        const nextState = getNextHistoryState(defaultState);
        const actualState = getNextHistoryState(nextState);

        expect(actualState).to.deep.equal(expectedState);
    });

    it('clears the future state when a regular action fires', () => {
        const initialState = {
            past: [],
            present: getNextAppState(),
            future: [
                {
                    key: 'test past state'
                }
            ]
        };

        const expectedHistoryState = {
            past: [
                {
                    areaInfo: {},
                    rooms: {
                        byId: {},
                        lastId: 0
                    }
                }
            ],
            present: {
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
            },
            future: []
        };

        const actualState = getNextHistoryState(initialState, actions.addRoom({name: 'test'}));

        expect(actualState).to.deep.equal(expectedHistoryState);
    });

    it('on UNDO, it replaces the present state by popping the last past state, and un-shifts the present state onto the beginning of the future array', () => {
        const initialState = {
            past: [
                {
                    areaInfo: {},
                    rooms: {
                        byId: {},
                        lastId: 0
                    }
                }
            ],
            present: {
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
            },
            future: []
        };

        const expectedState = {
            past: [],
            present: {
                areaInfo: {},
                rooms: {
                    byId: {},
                    lastId: 0
                }
            },
            future: [{
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
            }]
        };

        const actualState = getNextHistoryState(initialState, actions.undo());

        expect(actualState).to.deep.equal(expectedState);
    });

    it('on UNDO, it continues to replace the present state by popping the last past state, and putting the present state in the past array', () => {
        const initialState = {
            past: [
                {
                    key: "past1"
                },
                {
                    key: "past2"
                },
                {
                    key: "past3"
                }
            ],
            present: {
                key: "present"
            },
            future: []
        };

        const expectedStateAfterOneUndo = {
            past: [
                {
                    key: "past1"
                },
                {
                    key: "past2"
                }
            ],
            present: {
                key: "past3"
            },
            future: [
                {
                    key: "present"
                }
            ]
        };

        const expectedStateAfterTwoUndos = {
            past: [
                {
                    key: "past1"
                }
            ],
            present: {
                key: "past2"
            },
            future: [
                {
                    key: "past3"
                },
                {
                    key: "present"
                }
            ]
        };

        const expectedStateAfterThreeUndos = {
            past: [],
            present: {
                key: "past1"
            },
            future: [
                {
                    key: "past2"
                },
                {
                    key: "past3"
                },
                {
                    key: "present"
                }
            ]
        };

        const actualStateAfterOneUndo = getNextHistoryState(initialState, actions.undo());
        const actualStateAfterTwoUndos = getNextHistoryState(actualStateAfterOneUndo, actions.undo());
        const actualStateAfterThreeUndos = getNextHistoryState(actualStateAfterTwoUndos, actions.undo());

        expect(actualStateAfterOneUndo).to.deep.equal(expectedStateAfterOneUndo);
        expect(actualStateAfterTwoUndos).to.deep.equal(expectedStateAfterTwoUndos);
        expect(actualStateAfterThreeUndos).to.deep.equal(expectedStateAfterThreeUndos);
    });

    it('does not have any effect to UNDO if there are no more past states', () => {
        const initialState = {
            past: [
                {
                    key: "past1"
                }
            ],
            present: {
                key: "present"
            },
            future: []
        };

        const expectedStateAfterOneUndo = {
            past: [],
            present: {
                key: "past1"
            },
            future: [
                {
                    key: "present"
                }
            ]
        };

        const expectedStateAfterTwoUndos = {
            past: [],
            present: {
                key: "past1"
            },
            future: [
                {
                    key: "present"
                }
            ]
        };

        const actualStateAfterOneUndo = getNextHistoryState(initialState, actions.undo());
        const actualStateAfterTwoUndos = getNextHistoryState(actualStateAfterOneUndo, actions.undo());

        expect(actualStateAfterOneUndo).to.deep.equal(expectedStateAfterOneUndo);
        expect(actualStateAfterTwoUndos).to.deep.equal(expectedStateAfterTwoUndos);
    });

    it('on REDO it shifts the first future item, sets it as the new present, and pushes present onto the past array', () => {
        const initialState = {
            past: [
                {
                    key: "past1"
                }
            ],
            present: {
                key: "past2"
            },
            future: [
                {
                    key: "past3"
                },
                {
                    key: "present"
                }
            ]
        };

        const expectedStateAfterOneRedo = {
            past: [
                {
                    key: "past1"
                },
                {
                    key: "past2"
                }
            ],
            present: {
                key: "past3"
            },
            future: [
                {
                    key: "present"
                }
            ]
        };

        const expectedStateAfterTwoRedos = {
            past: [
                {
                    key: "past1"
                },
                {
                    key: "past2"
                },
                {
                    key: "past3"
                }
            ],
            present: {
                key: "present"
            },
            future: []
        };

        const actualStateAfterOneRedo = getNextHistoryState(initialState, actions.redo());
        const actualStateAfterTwoRedos = getNextHistoryState(actualStateAfterOneRedo, actions.redo());

        expect(actualStateAfterOneRedo).to.deep.equal(expectedStateAfterOneRedo);
        expect(actualStateAfterTwoRedos).to.deep.equal(expectedStateAfterTwoRedos);
    });

    it('does not have any effect to REDO if there are no more future states', () => {
        const initialState = {
            past: [
                {
                    key: "past1"
                }
            ],
            present: {
                key: "past2"
            },
            future: [
                {
                    key: "past3"
                }
            ]
        };

        const expectedStateAfterOneRedo = {
            past: [
                {
                    key: "past1"
                },
                {
                    key: "past2"
                }
            ],
            present: {
                key: "past3"
            },
            future: []
        };

        const expectedStateAfterTwoRedos = {
            past: [
                {
                    key: "past1"
                },
                {
                    key: "past2"
                }
            ],
            present: {
                key: "past3"
            },
            future: []
        };

        const actualStateAfterOneRedo = getNextHistoryState(initialState, actions.redo());
        const actualStateAfterTwoRedos = getNextHistoryState(actualStateAfterOneRedo, actions.redo());

        expect(actualStateAfterOneRedo).to.deep.equal(expectedStateAfterOneRedo);
        expect(actualStateAfterTwoRedos).to.deep.equal(expectedStateAfterTwoRedos);
    });
});
