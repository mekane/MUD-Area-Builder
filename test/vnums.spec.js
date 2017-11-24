const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');

const vnum = require('../src/logic/vnums.js');

describe('VNum Logic', () => {
    it('should be a module', () => {
        expect(vnum).to.be.an('object');
    });

    it('should export a generator function ', () => {
        expect(vnum.generator).to.be.a('function');
    });

    it('should take a starting vnum and return a function', () => {
        const newVnumGenerator = vnum.generator();
        expect(newVnumGenerator).to.be.a('function');
    });

    it('defaults to zero for non-integer values', () => {
        let vnumGenerator = vnum.generator();
        expect(vnumGenerator(0)).to.equal(0);

        vnumGenerator = vnum.generator('foo');
        expect(vnumGenerator(0)).to.equal(0);

        vnumGenerator = vnum.generator([]);
        expect(vnumGenerator(0)).to.equal(0);

        vnumGenerator = vnum.generator({});
        expect(vnumGenerator(0)).to.equal(0);

        vnumGenerator = vnum.generator();
        expect(vnumGenerator(0)).to.equal(0);
    });

    it('tries to convert things to integers if possible', () => {
        let vnumGenerator = vnum.generator("3");
        expect(vnumGenerator(0)).to.equal(3);

        vnumGenerator = vnum.generator(99.66);
        expect(vnumGenerator(0)).to.equal(99);

        vnumGenerator = vnum.generator("55.77");
        expect(vnumGenerator(0)).to.equal(55);

        vnumGenerator = vnum.generator(1000);
        expect(vnumGenerator("3")).to.equal(1003);

        vnumGenerator = vnum.generator(1000);
        expect(vnumGenerator(3.33)).to.equal(1003);

        vnumGenerator = vnum.generator(1000);
        expect(vnumGenerator("3.55")).to.equal(1003);

    });
    
    it('generator should take an argument and return it added to the starting vnum', () => {
        let vnumGenerator = vnum.generator(0);
        expect(vnumGenerator(0)).to.equal(0);
        expect(vnumGenerator(1)).to.equal(1);
        expect(vnumGenerator(9)).to.equal(9);

        vnumGenerator = vnum.generator(100);
        expect(vnumGenerator(0)).to.equal(100);
        expect(vnumGenerator(1)).to.equal(101);
        expect(vnumGenerator(9)).to.equal(109);

        vnumGenerator = vnum.generator(1000);
        expect(vnumGenerator(0)).to.equal(1000);
        expect(vnumGenerator(1)).to.equal(1001);
        expect(vnumGenerator(9)).to.equal(1009);
        expect(vnumGenerator(50)).to.equal(1050);

    });
});
