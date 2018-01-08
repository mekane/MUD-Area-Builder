const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');

const roomUtils = require('../src/logic/rooms.js');

describe('Room utility logic', () => {
    it('should be a module', () => {
        expect(roomUtils).to.be.an('object');
    });

    describe('the hasExit utility', () => {
        it('should export a hasExit function', () => {
            expect(roomUtils.hasExit).to.be.a('function');
        });

        it('should return false if room is absent or not an object', () => {
            expect(roomUtils.hasExit()).to.equal(false);
            expect(roomUtils.hasExit(null)).to.equal(false);
            expect(roomUtils.hasExit(12)).to.equal(false);
            expect(roomUtils.hasExit('')).to.equal(false);
            expect(roomUtils.hasExit([])).to.equal(false);
            expect(roomUtils.hasExit({})).to.equal(false);
        });

        it('should return false if the direction argument is missing', () => {
            const validRoom = {
                name: 'test room',
                description: 'test description',
                exit: {
                    n: {
                        destination: 1001
                    }
                }
            };

            expect(roomUtils.hasExit(validRoom)).to.equal(false);
        });

        it('should return false if the room does not have an exit in that direction', () => {
            const validRoom = {
                name: 'test room',
                description: 'test description',
                exit: {
                    n: {
                        destination: 1001
                    }
                }
            };

            expect(roomUtils.hasExit(validRoom, 's')).to.equal(false);
        });

        it('should return true if the room has an exit in the given direction', () => {
            const validRoom = {
                name: 'test room',
                description: 'test description',
                exit: {
                    n: {
                        destination: 1001
                    },
                    e: {
                        destination: 1002
                    }
                }
            };

            expect(roomUtils.hasExit(validRoom, 'n')).to.equal(true);
            expect(roomUtils.hasExit(validRoom, 'e')).to.equal(true);
        });
    });

    describe('the exportToAreaFormat utility', () => {
        const testRoom = {
            id: "4",
            name: "Room Four",
            description: "The fourth room",
            exit: {
                n: {
                    destination: 1
                },
                e: {
                    destination: 2
                }
            },
            coordinates: {x: 0, y: 1}
        };

        it('should export an exportToAreaFormat function', () => {
            expect(roomUtils.exportToAreaFormat).to.be.a('function');
        });

        it('returns an empty string for bad input', () => {
            expect(roomUtils.exportToAreaFormat()).to.equal('');
            expect(roomUtils.exportToAreaFormat(20)).to.equal('');
            expect(roomUtils.exportToAreaFormat(20, false)).to.equal('');
            expect(roomUtils.exportToAreaFormat(20, 'foo')).to.equal('');
            expect(roomUtils.exportToAreaFormat(20, 99)).to.equal('');
            expect(roomUtils.exportToAreaFormat(20, [])).to.equal('');
            expect(roomUtils.exportToAreaFormat(20, {})).to.equal('');
        });

        it('should export the vnum, name, and description of the room given the starting vnum and room data', () => {
            const expectedOutput = `#1004
Room Four~
The fourth room
~`;

            const actualOutput = roomUtils.exportToAreaFormat(1000, testRoom);

            expect(actualOutput).to.equal(expectedOutput);
        });
    });

});