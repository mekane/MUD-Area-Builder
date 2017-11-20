const expect = require('chai').expect;
const actions = require('../src/actions.js');

describe('The Action generator functions', () => {
    it('knows how to make a Set Area Info action', () => {
        expect(actions.setAreaInfo).to.be.a('function');
    });

    it('knows how to make an Add Roomaction', () => {
        expect(actions.addRoom).to.be.a('function');
    });

    it('knows how to make a Set Room Info', () => {
        expect(actions.setRoomInfo).to.be.a('function');
    });
});
