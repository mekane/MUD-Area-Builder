const expect = require('chai').expect;
const actions = require('../src/actions.js');

describe('The Action generator functions', () => {
    it('knows how to make a Set Area Info action', () => {
        expect(actions.setAreaInfo).to.be.a('function');
    });

    it('knows how to make an Add Room action', () => {
        expect(actions.addRoom).to.be.a('function');
    });

    it('knows how to make an Add and Connect Room action', () => {
        expect(actions.addAndConnectRoom).to.be.a('function');
    });

    it('knows how to make a Set Room Info', () => {
        expect(actions.setRoomInfo).to.be.a('function');
    });

    it('knows how to make an Undo action', () => {
        expect(actions.undo).to.be.a('function');
    });

    it('knows how to make a Redo action', () => {
        expect(actions.redo).to.be.a('function');
    });
});
