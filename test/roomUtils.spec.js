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
});