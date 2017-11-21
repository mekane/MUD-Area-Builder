const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');

const actions = require('../src/actions.js');
const getNextState = require('../src/reducers/areaInfo.js');

const defaultState = {
    name: '',
    fileName: '',
    minLevel: 0,
    maxLevel: 75,
    authorName: '',
    minVnum: 0,
    maxVnum: 99
};

describe('Area Info State - the reducer that handles the "area" property of the main app state', () => {
    it('should be a function', () => {
        expect(getNextState).to.be.a('function');
    });

    it('should return the default state if called empty', () => {
        expect(getNextState()).to.deep.equal(defaultState);
    });

    it('should return the identical original state if called with a bogus action type', () => {
        const originalState = {};
        const expectedState = originalState;
        const actualState = getNextState(originalState, {type: 'BOGUS'});

        expect(actualState).to.equal(expectedState);
    });

    it('sets area info properties from the action information', () => {
        const originalState = defaultState;
        const expectedState = {
            name: 'Test Area',
            fileName: 'test.are',
            minLevel: 6,
            maxLevel: 36,
            authorName: 'Marty',
            minVnum: 1000,
            maxVnum: 1099
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

    it('fills in area info defaults if missing from the action information', () => {
        const originalState = defaultState;
        const expectedState = {
            name: 'Test Area',
            fileName: 'test.are',
            minLevel: 0,
            maxLevel: 75,
            authorName: 'Marty',
            minVnum: 0,
            maxVnum: 99
        };

        const setAreaInfoAction = actions.setAreaInfo({
            name: 'Test Area',
            fileName: 'test.are',
            authorName: 'Marty'
        });

        const actualState = getNextState(originalState, setAreaInfoAction);

        expect(actualState).to.deep.equal(expectedState);
    });
});