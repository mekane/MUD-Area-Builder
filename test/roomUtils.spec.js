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

    /**
     * Format for one Room:
     * #<vnum:number>
     <name:string>
     <description:string>
     <area:number> <room-flags:number> <sector-type:number>
     {
         D <door:number>
         <description:string>
         <keywords:string>
         <locks:number> <key:number> <to_room:number>
     }
     {
         E
         <keywords:string>
         <description:string>
     }
     M <mana:number> H <heal:number>
     clan <Clan Name>~
     S


     NOTES
     <area> is obsolete and is always 0

     <room-flag>
     DARK           (A)  A light source must be carried to see in this room
     NO_MOB         (C)  Monsters cannot enter this room
     INDOORS        (D)  Room is inside (i.e. not affected by weather)
     PRIVATE        (J)  Room is limited to two characters (i.e. chat rooms)
     SAFE           (K)  Safe from pkilling and aggressive mobs
     SOLITARY       (L)  One character only can enter this room
     PET_SHOP       (M)  see addendum about pet shops
     NO_RECALL      (N)  players cannot use the 'recall' command to leave this room

     Pet shops:  the room that the pets are to be sold in must be flagged act_pet.  However, the pets themselves must be loaded into the sequentially next room (ie if the shop is 1036, the pets MUST be loaded into 1037 for the shop to work).

     <sector-type>
     type       number  move pts  notes
     INSIDE      0         1
     CITY        1         2
     FIELD       2         2
     FOREST      3         3
     HILLS       4         4
     MOUNTAIN    5         6
     WATER       6         4       swimmable
     DEEP WATER  7         -       boat required
     AIR         9         -       fly spell required
     DESERT     10         9       will eventually affect thirst and recovery

     D is for all exits, not just doors
        door:number specifies the exit direction
        0 north
        1 east
        2 south
        3 west
        4 up
        5 down

        <locks> sets the door initial state and locking capabilities. Defaults to 0
        0 open
        1 closed
        2 closed and locked

        <key> is the vnum of the Object which is the key used to lock and unlock the door. Defaults to 0 for none

        <to_room> is the destination vnum of the room that the exit goes to

     E is for adding extra keywords and descriptions to the room for things like signs

     M and H are for setting the Mana and Hit Points healing rate, where 100 is the default. Range is 1 to 200, i.e. 1% heal rate to 200% heal rate

     clan is for assigning ownership of a room to a clan
*/
    describe('the exportToAreaFormat utility', () => {
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

        it('should export the vnum, name, description, and default flags given the starting vnum and room data', () => {
            const testRoom = {
                id: "4",
                name: "Room Four",
                description: "The fourth room",
                coordinates: {x: 0, y: 1}
            };

            const expectedOutput = `#1004
Room Four~
The fourth room
~
0 0 0
S`;

            const actualOutput = roomUtils.exportToAreaFormat(1000, testRoom);

            expect(actualOutput).to.equal(expectedOutput);
        });

            const actualOutput = roomUtils.exportToAreaFormat(1000, testRoom);

            expect(actualOutput).to.equal(expectedOutput);
        });
    });

});