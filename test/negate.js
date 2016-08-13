var chai = require('chai');
var expect = chai.expect;
var BigNumber = require("../src/infimath.js");

var tests = [
	// Each test is run as BigNumber(a).negate() === {data: b, decs: c, sign: d}
	// [a, b, c, d]
	
	[    "0", [   0],  0,  0],
	[    "1", [   1],  0, -1],
	[ "1000", [   1], -1, -1],
	[   "-1", [   1],  0, +1],
	["-1000", [   1], -1, +1],
	[  "0.1", [ 100],  1, -1],
	["0.001", [   1],  1, -1],
	[ "-0.1", [ 100],  1, +1],
	["-.001", [   1],  1, +1],
];

tests.forEach(function(test) {
	describe('BigNumber("' + test[0] + '").negate().calculate()', function() {
		var a = BigNumber(test[0]).negate().calculate();
		it('should have data of [' + test[1] + ']', function() {
			expect(a.data + '').to.equal(test[1] + '');
		});
		it('should have decs of ' + test[2], function() {
			expect(a.decs).to.equal(test[2]);
		});
		it('should have sign of ' + test[3], function() {
			expect(a.sign).to.equal(test[3]);
		});
	});
});
