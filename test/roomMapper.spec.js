const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');

const mapper = require('../src/logic/roomMapper.js');

describe('Room Mapping Logic', () => {
    it('should be a module', () => {
        expect(mapper).to.be.an('object');
    });

    it('should export a generator function ', () => {
        expect(mapper.generateCoordinates).to.be.a('function');
    });

    describe('the generateCoordinates function', () => {
        it('takes a map of rooms by id, and returns an empty object otherwise', () => {
            expect(mapper.generateCoordinates()).to.deep.equal({});
            expect(mapper.generateCoordinates(null)).to.deep.equal({});
            expect(mapper.generateCoordinates('')).to.deep.equal({});
            expect(mapper.generateCoordinates(15)).to.deep.equal({});
            expect(mapper.generateCoordinates([])).to.deep.equal({});
            expect(mapper.generateCoordinates({})).to.deep.equal({});
        });

        it('always returns a new object and does not modify the original', () => {
            const originalObject = {
                foo: 'bar'
            };
            deepFreeze(originalObject);

            const newObject = mapper.generateCoordinates(originalObject);

            expect(newObject).to.not.equal(originalObject);
        });

        it('returns an object with the same keys as the original', () => {
            const originalObject = {
                foo: 'bar',
                key: 'value'
            };
            deepFreeze(originalObject);

            const newObject = mapper.generateCoordinates(originalObject);

            expect(Object.keys(newObject)).to.deep.equal(Object.keys(originalObject));
        });
    });

    describe('adding coordinate to rooms', () => {
        it('adds coordinates (0,0) to a single room with no connections', () => {
            const singleRoom = {
                '0': {
                    id: 0,
                    name: 'Single Room'
                }
            };
            const roomsWithCoordinates = mapper.generateCoordinates(singleRoom);
            const expectedCoordinates = {
                x: 0,
                y: 0
            };

            expect(roomsWithCoordinates['0'].coordinates).to.deep.equal(expectedCoordinates);
        });

        it('adds coordinates (0,-1) to a second room north from the first', () => {
            const twoRooms = {
                '0': {
                    id: 0,
                    name: 'First Room',
                    exit: {
                        n: {
                            destination: 1
                        }
                    }
                },
                '1': {
                    id: 1,
                    name: 'Second Room'
                }
            };
            const roomsWithCoordinates = mapper.generateCoordinates(twoRooms);

            expect(roomsWithCoordinates['0'].coordinates).to.deep.equal({x: 0, y: 0});
            expect(roomsWithCoordinates['1'].coordinates).to.deep.equal({x: 0, y: -1});
        });

        it('adds coordinates (1, 0) to a second room east from the first', () => {
            const twoRooms = {
                '0': {
                    id: 0,
                    name: 'First Room',
                    exit: {
                        e: {
                            destination: 1
                        }
                    }
                },
                '1': {
                    id: 1,
                    name: 'Second Room'
                }
            };
            const roomsWithCoordinates = mapper.generateCoordinates(twoRooms);

            expect(roomsWithCoordinates['0'].coordinates).to.deep.equal({x: 0, y: 0});
            expect(roomsWithCoordinates['1'].coordinates).to.deep.equal({x: 1, y: 0});
        });

        it('adds coordinates (0, 1) to a second room south from the first', () => {
            const twoRooms = {
                '0': {
                    id: 0,
                    name: 'First Room',
                    exit: {
                        s: {
                            destination: 1
                        }
                    }
                },
                '1': {
                    id: 1,
                    name: 'Second Room'
                }
            };
            const roomsWithCoordinates = mapper.generateCoordinates(twoRooms);

            expect(roomsWithCoordinates['0'].coordinates).to.deep.equal({x: 0, y: 0});
            expect(roomsWithCoordinates['1'].coordinates).to.deep.equal({x: 0, y: 1});
        });

        it('adds coordinates (-1, 0) to a second room west from the first', () => {
            const twoRooms = {
                '0': {
                    id: 0,
                    name: 'First Room',
                    exit: {
                        w: {
                            destination: 1
                        }
                    }
                },
                '1': {
                    id: 1,
                    name: 'Second Room'
                }
            };
            const roomsWithCoordinates = mapper.generateCoordinates(twoRooms);

            expect(roomsWithCoordinates['0'].coordinates).to.deep.equal({x: 0, y: 0});
            expect(roomsWithCoordinates['1'].coordinates).to.deep.equal({x: -1, y: 0});
        });

        it('does not get stuck in an infinite loop when rooms have circular references', () => {
            const twoRooms = {
                '0': {
                    id: 0,
                    name: 'First Room',
                    exit: {
                        e: {
                            destination: 1
                        }
                    }
                },
                '1': {
                    id: 1,
                    name: 'Second Room',
                    exit: {
                        w: {
                            destination: 0
                        }
                    }
                }
            };
            const roomsWithCoordinates = mapper.generateCoordinates(twoRooms);

            expect(roomsWithCoordinates['0'].coordinates).to.deep.equal({x: 0, y: 0});
            expect(roomsWithCoordinates['1'].coordinates).to.deep.equal({x: 1, y: 0});
        });

        it('follows exits until it adds coordinates to all the rooms', () => {
            /* 5-4
             *   |
             *   0-1-2
             *       |
             *       3
             */
            const moreRooms = {
                '0': {
                    id: 0,
                    name: 'First Room',
                    exit: {
                        n: {
                            destination: 4
                        },
                        e: {
                            destination: 1
                        }
                    }
                },
                '1': {
                    id: 1,
                    name: 'Second Room',
                    exit: {
                        e: {
                            destination: 2
                        },
                        w: {
                            destination: 0
                        }
                    }
                },
                '2': {
                    id: 2,
                    name: 'Third Room',
                    exit: {
                        s: {
                            destination: 3
                        },
                        w: {
                            destination: 1
                        }

                    }
                },
                '3': {
                    id: 3,
                    name: 'Fourth Room',
                    exit: {
                        n: {
                            destination: 2
                        }
                    }
                },
                '4': {
                    id: 4,
                    name: 'Fifth Room',
                    exit: {
                        s: {
                            destination: 0
                        },
                        w: {
                            destination: 5
                        }
                    }
                },
                '5': {
                    id: 5,
                    name: 'Sixth Room',
                    exit: {
                        e: {
                            destination: 4
                        }
                    }
                }

            };
            const roomsWithCoordinates = mapper.generateCoordinates(moreRooms);

            expect(roomsWithCoordinates['0'].coordinates).to.deep.equal({x: 0, y: 0});
            expect(roomsWithCoordinates['1'].coordinates).to.deep.equal({x: 1, y: 0});
            expect(roomsWithCoordinates['2'].coordinates).to.deep.equal({x: 2, y: 0});
            expect(roomsWithCoordinates['3'].coordinates).to.deep.equal({x: 2, y: 1});
            expect(roomsWithCoordinates['4'].coordinates).to.deep.equal({x: 0, y: -1});
            expect(roomsWithCoordinates['5'].coordinates).to.deep.equal({x: -1, y: -1});
        });

    });
});
