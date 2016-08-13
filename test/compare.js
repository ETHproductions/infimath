var chai = require('chai');
var expect = chai.expect;
var BigNumber = require("../src/infimath.js");

var tests = [
	// Each test is run as BigNumber.compare(BigNumber(a), BigNumber(b), opts) === result
	// [a, b, opts, result]
	
	[   "0",    "0", undefined,  0],
	[   "0",    "1", undefined, -1],
	[   "1",    "0", undefined, +1],
	[   "1",    "1", undefined,  0],
	[   "1",    "2", undefined, -1],
	[   "2",    "1", undefined, +1],
	[   "1", "1000", undefined, -1],
	["1000",    "1", undefined, +1],
	["1000", "1000", undefined,  0],
	[   "1", ".001", undefined, +1],
	[".001",    "1", undefined, -1],
	[".001", ".001", undefined,  0],
	
	[   "0",   "-1", undefined, +1],
	[  "-1",    "0", undefined, -1],
	[  "-1",   "-1", undefined,  0],
	[   "1",   "-1", undefined, +1],
	[  "-1",    "1", undefined, -1],
	
	[   "0",    "0", {aligned: true},  0],
	
	[   "0",    "0", {aligned: true, ignoreSign: true},  0],
	[   "0",    "1", {aligned: true, ignoreSign: true}, -1],
	[   "1",    "0", {aligned: true, ignoreSign: true}, +1],
	[   "1",    "1", {aligned: true, ignoreSign: true},  0],
	[   "0",   "-1", {aligned: true, ignoreSign: true}, -1],
	[  "-1",    "0", {aligned: true, ignoreSign: true}, +1],
	[  "-1",   "-1", {aligned: true, ignoreSign: true},  0],
	[   "1",   "-1", {aligned: true, ignoreSign: true},  0],
	[  "-1",    "1", {aligned: true, ignoreSign: true},  0],
	[   "2",   "-1", {aligned: true, ignoreSign: true}, +1],
	[  "-2",    "1", {aligned: true, ignoreSign: true}, +1],
];

tests.forEach(function(test) {
	describe('BigNumber.compare(BigNumber("' + test[0] + '"), BigNumber("' + test[1] + '", ' + JSON.stringify(test[2]) + '))', function() {
		var a = BigNumber(test[0]),
			b = BigNumber(test[1]);
		it('should return ' + test[3], function() {
			expect(BigNumber.compare(a, b, test[2])).to.equal(test[3]);
		});
	});
	
	describe('BigNumber(' + test[0] + ').compare(BigNumber("' + test[1] + '", ' + JSON.stringify(test[2]) + '))', function() {
		var a = BigNumber(test[0]),
			b = BigNumber(test[1]);
		it('should return ' + test[3], function() {
			expect(a.compare(b, test[2])).to.equal(test[3]);
		});
	});
	
	describe('BigNumber(' + test[0] + ').less(BigNumber("' + test[1] + '", ' + JSON.stringify(test[2]) + '))', function() {
		var a = BigNumber(test[0]),
			b = BigNumber(test[1]);
		it('should return ' + test[3], function() {
			expect(a.less(b, test[2])).to.equal(test[3] === -1);
		});
	});
	
	describe('BigNumber(' + test[0] + ').greater(BigNumber("' + test[1] + '", ' + JSON.stringify(test[2]) + '))', function() {
		var a = BigNumber(test[0]),
			b = BigNumber(test[1]);
		it('should return ' + test[3], function() {
			expect(a.greater(b, test[2])).to.equal(test[3] === +1);
		});
	});
	
	describe('BigNumber(' + test[0] + ').equal(BigNumber("' + test[1] + '", ' + JSON.stringify(test[2]) + '))', function() {
		var a = BigNumber(test[0]),
			b = BigNumber(test[1]);
		it('should return ' + test[3], function() {
			expect(a.equal(b, test[2])).to.equal(test[3] ===  0);
		});
	});
});

describe('BigNumber.compare(BigNumber(1))', function() {
	var error = false;
	it('should error', function() {
		try {
			BigNumber.compare(BigNumber(1));
		} catch (e) {
			error = true;
		}
		expect(error).to.be.true;
	});
});

describe('BigNumber.compare(BigNumber(1), 1)', function() {
	var error = false;
	it('should error', function() {
		try {
			BigNumber.compare(BigNumber(1), 1);
		} catch (e) {
			error = true;
		}
		expect(error).to.be.true;
	});
});

describe('BigNumber.compare(1, BigNumber(1))', function() {
	var error = false;
	it('should error', function() {
		try {
			BigNumber.compare(1, BigNumber(1));
		} catch (e) {
			error = true;
		}
		expect(error).to.be.true;
	});
});
